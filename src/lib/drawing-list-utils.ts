import * as XLSX from 'xlsx';

// ============================================================================
// TEXT NORMALIZATION UTILITIES
// ============================================================================

/**
 * Normalizes text for comparison by removing case, extra spaces, and special characters
 */
export function normalizeText(text: string | null | undefined): string {
  if (!text) return '';
  return text.toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, ' ');
}

/**
 * Strips file extension from filename
 */
export function stripExtension(fileName: string): string {
  const lastDot = fileName.lastIndexOf('.');
  return lastDot > 0 ? fileName.substring(0, lastDot) : fileName;
}

/**
 * Extracts potential drawing number from filename using multiple patterns
 */
export function extractDrawingNumber(fileName: string): string | null {
  const patterns = [
    /^([A-Z]-?\d+)/i,    // A-001 or A001 at start
    /^(\d+)/,            // 001 at start  
    /([A-Z]-?\d+)/i      // A-001 anywhere
  ];
  
  for (const pattern of patterns) {
    const match = fileName.match(pattern);
    if (match) return match[1];
  }
  
  return null;
}

// ============================================================================
// FILE VALIDATION
// ============================================================================

/**
 * Validates if a filename represents a valid drawing file
 * Uses structured pattern analysis to filter out non-drawing entries
 */
export function isValidDrawingFileName(fileName: string): boolean {
  const name = fileName.toString().trim();
  
  // Minimum length check
  if (name.length < 8) {
    console.log(`Excluded "${name}" - too short (${name.length} chars)`);
    return false;
  }
  
  // Look for structured pattern: 3+ consecutive alphanumeric segments separated by - or _
  const structuredPattern = /^([A-Z0-9]+[-_]){2,}[A-Z0-9]+/i;
  const match = name.match(structuredPattern);
  
  if (!match) {
    console.log(`Excluded "${name}" - no structured pattern found`);
    return false;
  }
  
  // Validate segment count
  const structuredPart = match[0];
  const segments = structuredPart.split(/[-_]+/).filter(seg => seg.length > 0);
  
  if (segments.length < 3) {
    console.log(`Excluded "${name}" - structured part has only ${segments.length} segments, need 3+`);
    return false;
  }
  
  // Validate alphanumeric segments
  const validSegments = segments.every(seg => /^[A-Z0-9]+$/i.test(seg));
  if (!validSegments) {
    console.log(`Excluded "${name}" - segments contain non-alphanumeric characters`);
    return false;
  }
  
  // Must contain both letters and numbers
  const hasLetters = /[A-Z]/i.test(structuredPart);
  const hasNumbers = /[0-9]/.test(structuredPart);
  if (!hasLetters || !hasNumbers) {
    console.log(`Excluded "${name}" - structured part missing letters or numbers`);
    return false;
  }
  
  console.log(`✓ Valid drawing file name: "${name}" (structured part: "${structuredPart}" with ${segments.length} segments)`);
  return true;
}

/**
 * Filters array of files to only include valid drawing files
 */
export function filterValidDrawingFiles(files: File[]): File[] {
  return files.filter(file => isValidDrawingFileName(file.name));
}

// ============================================================================
// EXCEL PROCESSING
// ============================================================================

export interface SheetAnalysis {
  name: string;
  rowCount: number;
  hasData: boolean;
  data: any[][];
}

export interface HeaderDetection {
  found: boolean;
  rowIndex: number;
  headerRow: any[];
  score?: any;
}

export interface ColumnDetection {
  columnIndex: number;
  confidence: number;
  allCandidates: any[];
}

/**
 * Processes an Excel file and extracts workbook data
 */
export async function processExcelFile(file: File): Promise<XLSX.WorkBook> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = function(e) {
      try {
        const data = new Uint8Array(e.target.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        resolve(workbook);
      } catch (error) {
        reject(new Error(`Failed to process Excel file: ${(error as Error).message}`));
      }
    };
    
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsArrayBuffer(file);
  });
}

/**
 * Analyzes workbook sheets and ranks them by data content
 */
export function analyzeWorkbookSheets(workbook: XLSX.WorkBook): SheetAnalysis[] {
  return workbook.SheetNames.map(sheetName => {
    const worksheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(worksheet, { header: 1, raw: false }) as any[][];
    const rowCount = data.length;
    const hasData = rowCount > 1;
    
    return { 
      name: sheetName, 
      rowCount, 
      hasData,
      data 
    };
  }).sort((a, b) => {
    // Sort by data richness
    if (a.hasData && !b.hasData) return -1;
    if (!a.hasData && b.hasData) return 1;
    return b.rowCount - a.rowCount;
  });
}

/**
 * Intelligent header row detection using content analysis
 */
export function detectHeaderRow(data: any[][]): HeaderDetection {
  console.log('=== HEADER ROW DETECTION START ===');
  console.log(`Analyzing ${Math.min(data.length, 25)} rows for header detection`);
  
  let bestHeader: HeaderDetection = {
    found: false,
    rowIndex: 0,
    headerRow: data[0] || [],
    score: null
  };
  
  // Analyze up to 25 rows for header-like content
  for (let rowIndex = 0; rowIndex < Math.min(data.length, 25); rowIndex++) {
    const row = data[rowIndex];
    if (!row || row.length === 0) continue;
    
    const headerScore = scoreRowAsHeader(row, rowIndex);
    console.log(`Row ${rowIndex + 1} header score:`, headerScore.totalScore, 'Details:', headerScore);
    
    if (headerScore.isLikelyHeader) {
      if (!bestHeader.found || headerScore.totalScore > (bestHeader.score?.totalScore || 0)) {
        bestHeader = {
          found: true,
          rowIndex: rowIndex,
          headerRow: row,
          score: headerScore
        };
        console.log(`NEW BEST HEADER: Row ${rowIndex + 1} with score ${headerScore.totalScore}`);
      }
    }
  }
  
  if (bestHeader.found) {
    console.log(`=== FINAL HEADER DETECTED: Row ${bestHeader.rowIndex + 1} ===`);
  } else {
    console.log('=== NO CLEAR HEADER DETECTED, USING ROW 1 ===');
    bestHeader = {
      found: false,
      rowIndex: 0,
      headerRow: data[0] || []
    };
  }
  
  return bestHeader;
}

/**
 * Scores a row's likelihood of being a header row
 */
function scoreRowAsHeader(row: any[], rowIndex: number) {
  let score = {
    hasFileNameVariants: 0,
    hasCommonHeaders: 0,
    textQuality: 0,
    exactFileNameMatch: 0,
    totalScore: 0,
    isLikelyHeader: false,
    rowIndex: rowIndex
  };
  
  // File name detection patterns
  const fileNameVariants = [
    'file name', 'filename', 'file_name', 'file-name',
    'bestandsnaam', 'dateiname', 'nom de fichier'
  ];
  
  const exactFileNameMatches = ['file name', 'filename'];
  
  // Common drawing register headers
  const commonHeaders = [
    'drawing', 'sheet', 'title', 'description', 'status', 'revision', 'rev',
    'date', 'code', 'number', 'type', 'discipline', 'level', 'zone',
    'document', 'dwg', 'plan', 'section', 'detail', 'schedule'
  ];
  
  console.log(`Scoring row ${rowIndex + 1}:`, row);
  
  row.forEach((cell, cellIndex) => {
    if (!cell || typeof cell !== 'string') return;
    
    const cellText = cell.toString().toLowerCase().trim();
    console.log(`  Cell ${cellIndex} (${String.fromCharCode(65 + cellIndex)}): "${cellText}"`);
    
    // Check for exact file name matches (HIGHEST SCORE)
    if (exactFileNameMatches.some(variant => cellText === variant)) {
      score.exactFileNameMatch += 100;
      console.log(`    ✓ EXACT FILE NAME MATCH: +100 points`);
    }
    // Check for file name variants
    else if (fileNameVariants.some(variant => cellText.includes(variant))) {
      score.hasFileNameVariants += 50;
      console.log(`    ✓ File name variant: +50 points`);
    }
    
    // Check for common headers
    if (commonHeaders.some(header => cellText.includes(header))) {
      score.hasCommonHeaders += 10;
      console.log(`    ✓ Common header: +10 points`);
    }
    
    // Text quality checks
    if (cellText.length > 2 && cellText.length < 50) {
      score.textQuality += 2;
    }
  });
  
  // Calculate total score
  score.totalScore = score.exactFileNameMatch + score.hasFileNameVariants + 
                    score.hasCommonHeaders + score.textQuality;
  
  // Determine if this is likely a header
  score.isLikelyHeader = score.totalScore >= 25 || score.exactFileNameMatch > 0;
  
  console.log(`  ROW ${rowIndex + 1} FINAL SCORE: ${score.totalScore} (isHeader: ${score.isLikelyHeader})`);
  
  return score;
}

/**
 * Auto-detects the file name column with confidence scoring
 */
export function autoDetectFileNameColumn(headerRow: any[], headerRowIndex: number, allData: any[][]): ColumnDetection | null {
  if (!headerRow || !Array.isArray(headerRow) || !Array.isArray(allData)) {
    console.error('Invalid data provided to autoDetectFileNameColumn');
    return null;
  }
  
  const dataRows = allData.slice(headerRowIndex + 1);
  
  if (dataRows.length === 0) {
    console.warn('No data rows found after header row');
    return null;
  }
  
  console.log('=== FILE NAME COLUMN DETECTION START ===');
  console.log(`Header row: Row ${headerRowIndex + 1}`, headerRow);
  console.log(`Data rows available: ${dataRows.length}`);
  
  const columnScores: any[] = [];
  
  headerRow.forEach((header, index) => {
    const columnData = dataRows.map(row => row[index]).filter(cell => cell && cell.trim && cell.trim());
    const score = scoreFileNameColumn(header, columnData, index);
    
    console.log(`Column ${String.fromCharCode(65 + index)} ("${header}") score: ${score.total}`, score);
    
    columnScores.push({
      index: index,
      header: header || `Column ${String.fromCharCode(65 + index)}`,
      score: score.total,
      details: score,
      sampleData: columnData.slice(0, 3)
    });
  });
  
  // Sort by score (highest first)
  columnScores.sort((a, b) => b.score - a.score);
  
  console.log('=== TOP 3 COLUMN CANDIDATES ===');
  columnScores.slice(0, 3).forEach((col, i) => {
    console.log(`${i + 1}. Column ${String.fromCharCode(65 + col.index)} ("${col.header}") - Score: ${col.score}`);
    console.log(`   Sample data:`, col.sampleData);
  });
  
  const bestMatch = columnScores[0];
  const confidence = Math.min(Math.round((bestMatch.score / 200) * 100), 100);
  
  return {
    columnIndex: bestMatch.index,
    confidence: confidence,
    allCandidates: columnScores
  };
}

/**
 * Scores a column's likelihood of containing file names
 */
function scoreFileNameColumn(header: any, columnData: string[], columnIndex: number) {
  let score = {
    headerMatch: 0,
    exactHeaderMatch: 0,
    patternCompliance: 0,
    averageLength: 0,
    containsDrawingNumber: 0,
    uniqueValues: 0,
    positionProximity: 0,
    patternConsistency: 0,
    total: 0
  };
  
  if (columnData.length === 0) return score;
  
  console.log(`  Scoring column ${String.fromCharCode(65 + columnIndex)} ("${header}"):`);
  
  // Header matching
  const exactFileNameMatches = ['file name', 'filename'];
  const fileNameVariants = [
    'File Name', 'FileName', 'File_Name', 'File-Name',
    'Filename', 'FILENAME', 'file name', 'file_name',
    'Bestandsnaam', 'Dateiname', 'Nom de fichier'
  ];
  
  if (header) {
    const headerLower = header.toString().trim().toLowerCase();
    
    if (exactFileNameMatches.includes(headerLower)) {
      score.exactHeaderMatch = 200;
      console.log(`    ✓ EXACT FILE NAME HEADER MATCH: +200 points`);
    } else if (fileNameVariants.some(variant => 
      headerLower === variant.toLowerCase())) {
      score.headerMatch = 100;
      console.log(`    ✓ File name variant match: +100 points`);
    }
  }
  
  // Pattern analysis
  const patternAnalysis = analyzeFileNamingPatterns(columnData);
  score.patternCompliance = patternAnalysis.score;
  score.patternConsistency = patternAnalysis.consistency;
  
  // Length analysis
  const avgLength = columnData.reduce((sum, cell) => sum + cell.length, 0) / columnData.length;
  if (avgLength >= 30) score.averageLength = 40;
  else if (avgLength >= 20) score.averageLength = 25;
  else if (avgLength >= 15) score.averageLength = 10;
  
  // Unique values ratio
  const uniqueRatio = new Set(columnData).size / columnData.length;
  score.uniqueValues = Math.round(uniqueRatio * 25);
  
  // Position proximity (first columns are more likely to contain drawing numbers)
  if (columnIndex <= 3) score.positionProximity = 15 - (columnIndex * 3);
  
  // Calculate total score
  score.total = score.exactHeaderMatch + score.headerMatch + score.patternCompliance + 
                score.averageLength + score.containsDrawingNumber + score.uniqueValues + 
                score.positionProximity + score.patternConsistency;
  
  console.log(`    Final score: ${score.total}`);
  
  return score;
}

/**
 * Analyzes file naming patterns in column data
 */
function analyzeFileNamingPatterns(columnData: string[]) {
  let patternScore = 0;
  let consistentPatterns = 0;
  const totalRows = columnData.length;
  
  if (totalRows === 0) return { score: 0, consistency: 0 };
  
  columnData.forEach(cell => {
    const text = cell.toString().trim();
    
    // Analyze different separator patterns
    const hyphenSegments = text.split('-').filter(seg => seg.length > 0);
    const underscoreSegments = text.split('_').filter(seg => seg.length > 0);
    const mixedSegments = text.split(/[-_]/).filter(seg => seg.length > 0);
    
    let cellScore = 0;
    
    // Score based on segment count (indicates structured naming)
    if (hyphenSegments.length >= 4) {
      cellScore += 80;
      consistentPatterns++;
    } else if (hyphenSegments.length >= 3) {
      cellScore += 60;
      consistentPatterns++;
    } else if (underscoreSegments.length >= 4) {
      cellScore += 80;
      consistentPatterns++;
    } else if (underscoreSegments.length >= 3) {
      cellScore += 60;
      consistentPatterns++;
    } else if (mixedSegments.length >= 4) {
      cellScore += 70;
      consistentPatterns++;
    } else if (mixedSegments.length >= 3) {
      cellScore += 50;
      consistentPatterns++;
    }
    
    // Bonus for longer names (typical of structured file names)
    if (text.length >= 30) cellScore += 20;
    else if (text.length >= 20) cellScore += 10;
    
    patternScore += cellScore;
  });
  
  const avgPatternScore = Math.round(patternScore / totalRows);
  const consistencyScore = Math.round((consistentPatterns / totalRows) * 20);
  
  return {
    score: Math.min(avgPatternScore, 80),
    consistency: consistencyScore
  };
}

/**
 * Extracts file names from Excel data with optional revision filtering
 */
export function extractFileNamesFromExcel(
  allData: any[][], 
  headerRowIndex: number, 
  fileNameColumnIndex: number, 
  onlyLatest = false
): string[] {
  console.log(`=== EXTRACTING FILE NAMES (onlyLatest: ${onlyLatest}) ===`);
  
  const fileNames: string[] = [];
  let totalRows = 0;
  let filteredOutRows = 0;
  
  for (let rowIndex = headerRowIndex + 1; rowIndex < allData.length; rowIndex++) {
    const row = allData[rowIndex];
    if (!row || row.length === 0) continue;
    
    totalRows++;
    const fileName = row[fileNameColumnIndex];
    if (!fileName || !fileName.toString().trim()) {
      continue;
    }
    
    // Validate if this is actually a drawing file name
    if (!isValidDrawingFileName(fileName.toString().trim())) {
      console.log(`Row ${rowIndex + 1}: Filtered out non-drawing entry: "${fileName}"`);
      filteredOutRows++;
      continue;
    }
    
    fileNames.push(fileName.toString().trim());
  }
  
  console.log(`=== EXTRACTION SUMMARY ===`);
  console.log(`Valid drawing file names: ${fileNames.length}`);
  console.log(`Filtered out non-drawing entries: ${filteredOutRows}`);
  
  return fileNames;
}

// ============================================================================
// MATCHING ENGINE
// ============================================================================

export interface MatchResult {
  excelName: string;
  matchedFile: string;
  status: 'Done' | 'To Do' | 'File not in Drawing List';
  matchType: 'exact' | 'none' | 'extra';
}

export interface ComparisonSummary {
  done: number;
  todo: number;
  extra: number;
  total: number;
  deliveryPercentage: number;
}

export interface ComparisonResult {
  results: MatchResult[];
  summary: ComparisonSummary;
}

/**
 * Core Drawing List comparison algorithm
 * Compares expected drawings from Excel against delivered files
 */
export function compareDrawingList(excelNames: string[], folderFiles: File[]): ComparisonResult {
  const results: MatchResult[] = [];
  const folderFileNames = folderFiles.map(f => stripExtension(f.name));
  const matchedFiles = new Set<string>();
  
  console.log('=== DRAWING LIST COMPARISON START ===');
  console.log(`Excel entries: ${excelNames.length}`);
  console.log(`Folder files: ${folderFiles.length}`);
  
  // Phase 1: Check each Excel entry against folder files
  excelNames.forEach(excelName => {
    const normalizedExcel = normalizeText(excelName);
    
    // Find matching file using normalized comparison
    const matchedFile = folderFiles.find(f => 
      normalizeText(stripExtension(f.name)) === normalizedExcel
    );
    
    if (matchedFile) {
      matchedFiles.add(matchedFile.name);
      console.log(`✓ MATCH: "${excelName}" → "${matchedFile.name}"`);
    } else {
      console.log(`✗ MISSING: "${excelName}" (not found in delivery)`);
    }
    
    results.push({
      excelName: excelName,
      matchedFile: matchedFile ? matchedFile.name : 'N/A',
      status: matchedFile ? 'Done' : 'To Do',
      matchType: matchedFile ? 'exact' : 'none'
    });
  });
  
  // Phase 2: Identify files not in Excel register
  folderFiles.forEach(file => {
    if (!matchedFiles.has(file.name)) {
      console.log(`⚠ EXTRA: "${file.name}" (delivered but not in register)`);
      results.push({
        excelName: 'N/A',
        matchedFile: file.name,
        status: 'File not in Drawing List',
        matchType: 'extra'
      });
    }
  });
  
  // Calculate summary metrics
  const doneCount = results.filter(r => r.status === 'Done').length;
  const todoCount = results.filter(r => r.status === 'To Do').length;
  const extraCount = results.filter(r => r.status === 'File not in Drawing List').length;
  
  console.log('=== COMPARISON SUMMARY ===');
  console.log(`Done (Delivered): ${doneCount}`);
  console.log(`To Do (Missing): ${todoCount}`);
  console.log(`Extra (Not in Register): ${extraCount}`);
  console.log(`Total Results: ${results.length}`);
  
  return {
    results: results,
    summary: {
      done: doneCount,
      todo: todoCount,
      extra: extraCount,
      total: excelNames.length,
      deliveryPercentage: excelNames.length > 0 ? Math.round((doneCount / excelNames.length) * 100) : 0
    }
  };
}
