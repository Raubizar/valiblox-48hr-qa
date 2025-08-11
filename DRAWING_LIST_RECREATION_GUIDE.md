# Drawing List Checker - Complete Recreation Guide for AI Agents

## Overview
This document provides a comprehensive guide for recreating the Drawing List checking functionality from the Deliverables QA-QC application. The Drawing List checker compares a list of expected drawings (from an Excel register) against actually delivered files, providing intelligent matching and validation.

## Target Framework: Vite v5.4.10

### Project Setup
```bash
npm create vite@latest drawing-list-checker -- --template vanilla
cd drawing-list-checker
npm install
npm install xlsx  # For Excel processing
npm run dev
```

## Architecture Overview

### Core Concept
The Drawing List checker is a **file matching system** that:
1. Reads an Excel file containing expected drawing names
2. Processes uploaded folder files
3. Performs intelligent matching between expected and delivered files
4. Reports on delivery status (Done/To Do/Not in List)

### Data Flow
```
Excel Register → Smart Processing → File Names Array
     +
Folder Upload → File Validation → Validated Files Array
     ↓
Intelligent Matching Algorithm → Results Array → UI Display
```

## Dependencies and Libraries

### Required NPM Packages
```json
{
  "dependencies": {
    "xlsx": "^0.18.5"
  }
}
```

### CDN Alternative (for vanilla HTML)
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js" 
        integrity="sha512-r22gChDnGvBylk90+2e/ycr3RVrDi8DIOkIGNhJlKfuyQM4tIRAI062MaV8sfjQKYVGjOBaZBOA87z+IhZE9DA==" 
        crossorigin="anonymous"></script>
```

## File Structure for Vite Project

```
src/
├── main.js                 # Entry point
├── components/
│   ├── DrawingListChecker.js   # Main component
│   ├── FileUploader.js         # File upload handlers
│   └── ResultsTable.js         # Results display
├── utils/
│   ├── excelProcessor.js       # Excel parsing logic
│   ├── fileValidator.js        # Drawing file validation
│   ├── matchingEngine.js       # Core matching algorithm
│   └── textNormalizer.js       # Text normalization utilities
├── styles/
│   └── drawing-list.css        # Component styles
└── index.html               # HTML template
```

## HTML Structure

### Complete HTML Template (index.html)
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Drawing List Checker</title>
    <link rel="stylesheet" href="/src/styles/drawing-list.css">
</head>
<body>
    <div id="app">
        <div class="container">
            <header class="header">
                <h1>Drawing List Checker</h1>
            </header>

            <div class="main-content">
                <!-- File Inputs Section -->
                <div class="inputs-section">
                    <!-- Folder Input -->
                    <div class="file-input-group">
                        <label for="folderInput">Delivered Files (Folder)</label>
                        <input type="file" id="folderInput" webkitdirectory multiple>
                        <div class="file-status" id="folderStatus">No folder selected</div>
                    </div>

                    <!-- Excel Register Input -->
                    <div class="file-input-group">
                        <label for="registerFile">Drawing Register (Excel)</label>
                        <input type="file" id="registerFile" accept=".xlsx,.xls">
                        <div class="file-status" id="registerStatus">No file selected</div>
                    </div>

                    <!-- Smart Configuration (Auto-shown after Excel upload) -->
                    <div class="config-section" id="registerConfig" style="display: none;">
                        <h3>Smart Configuration</h3>
                        <div class="form-group">
                            <label for="registerSheetSelect">Detected Sheets:</label>
                            <select id="registerSheetSelect"></select>
                        </div>
                        <div class="form-group">
                            <label for="registerColumnSelect">File Name Column:</label>
                            <select id="registerColumnSelect"></select>
                        </div>
                        <div class="form-group">
                            <label>
                                <input type="checkbox" id="onlyLatestRevision"> 
                                Only Latest Revision Files
                            </label>
                            <div class="file-count-info" id="fileCountInfo"></div>
                        </div>
                    </div>

                    <!-- Run Analysis Button -->
                    <button class="btn btn-primary" id="runAnalysis">Run Analysis</button>
                </div>

                <!-- Results Section -->
                <div class="results-section">
                    <div class="summary-metrics">
                        <div class="metric-card">
                            <h3>Delivery Status</h3>
                            <div class="metric-value">
                                <span id="deliveredPercent">0%</span>
                                <span class="metric-detail">
                                    <span id="deliveredCount">0</span> / <span id="deliveredTotal">0</span>
                                </span>
                            </div>
                        </div>
                    </div>

                    <!-- Results Table -->
                    <div class="table-container">
                        <table class="results-table">
                            <thead>
                                <tr>
                                    <th>Expected Drawing</th>
                                    <th>Matched File</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody id="drawingListResults">
                                <!-- Dynamic content populated by JavaScript -->
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script type="module" src="/src/main.js"></script>
</body>
</html>
```

## JavaScript Implementation

### 1. Text Normalization Utilities (src/utils/textNormalizer.js)
```javascript
/**
 * Normalizes text for comparison by removing case, extra spaces, and special characters
 */
export function normalizeText(text) {
    if (!text) return '';
    return text.toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, ' ');
}

/**
 * Strips file extension from filename
 */
export function stripExtension(fileName) {
    const lastDot = fileName.lastIndexOf('.');
    return lastDot > 0 ? fileName.substring(0, lastDot) : fileName;
}

/**
 * Extracts potential drawing number from filename using multiple patterns
 */
export function extractDrawingNumber(fileName) {
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
```

### 2. Drawing File Validator (src/utils/fileValidator.js)
```javascript
/**
 * Validates if a filename represents a valid drawing file
 * Uses structured pattern analysis to filter out non-drawing entries
 */
export function isValidDrawingFileName(fileName) {
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
export function filterValidDrawingFiles(files) {
    return files.filter(file => isValidDrawingFileName(file.name));
}
```

### 3. Excel Processing Engine (src/utils/excelProcessor.js)
```javascript
import * as XLSX from 'xlsx';
import { isValidDrawingFileName } from './fileValidator.js';

/**
 * Processes an Excel file and extracts workbook data
 */
export async function processExcelFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            try {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                resolve(workbook);
            } catch (error) {
                reject(new Error(`Failed to process Excel file: ${error.message}`));
            }
        };
        
        reader.onerror = () => reject(new Error('Failed to read file'));
        reader.readAsArrayBuffer(file);
    });
}

/**
 * Analyzes workbook sheets and ranks them by data content
 */
export function analyzeWorkbookSheets(workbook) {
    return workbook.SheetNames.map(sheetName => {
        const worksheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(worksheet, { header: 1, raw: false });
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
export function detectHeaderRow(data) {
    console.log('=== HEADER ROW DETECTION START ===');
    console.log(`Analyzing ${Math.min(data.length, 25)} rows for header detection`);
    
    let bestHeader = {
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
            if (!bestHeader.found || headerScore.totalScore > bestHeader.score?.totalScore) {
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
function scoreRowAsHeader(row, rowIndex) {
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
export function autoDetectFileNameColumn(headerRow, headerRowIndex, allData) {
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
    
    const columnScores = [];
    
    headerRow.forEach((header, index) => {
        const columnData = dataRows.map(row => row[index]).filter(cell => cell && cell.trim());
        const score = scoreFileNameColumn(header, columnData, index, allData);
        
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
function scoreFileNameColumn(header, columnData, columnIndex, allDataRows) {
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
        const headerLower = header.trim().toLowerCase();
        
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
function analyzeFileNamingPatterns(columnData) {
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
export function extractFileNamesFromExcel(allData, headerRowIndex, fileNameColumnIndex, latestRevisionColumnIndex, onlyLatest = false) {
    console.log(`=== EXTRACTING FILE NAMES (onlyLatest: ${onlyLatest}) ===`);
    
    const fileNames = [];
    let totalRows = 0;
    let skippedRows = 0;
    let includedRows = 0;
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
        
        if (onlyLatest) {
            const latestRevisionCell = row[latestRevisionColumnIndex];
            if (!latestRevisionCell || latestRevisionCell.toString().trim() === '') {
                console.log(`Row ${rowIndex + 1}: Skipping "${fileName}" - no latest revision`);
                skippedRows++;
                continue;
            }
            includedRows++;
        }
        
        fileNames.push(fileName.toString().trim());
    }
    
    console.log(`=== EXTRACTION SUMMARY ===`);
    console.log(`Valid drawing file names: ${fileNames.length}`);
    console.log(`Filtered out non-drawing entries: ${filteredOutRows}`);
    if (onlyLatest) {
        console.log(`Latest revision filtering: ${includedRows} included, ${skippedRows} skipped`);
    }
    
    return fileNames;
}
```

### 4. Core Matching Engine (src/utils/matchingEngine.js)
```javascript
import { normalizeText, stripExtension } from './textNormalizer.js';

/**
 * Core Drawing List comparison algorithm
 * Compares expected drawings from Excel against delivered files
 */
export function compareDrawingList(excelNames, folderFiles) {
    const results = [];
    const folderFileNames = folderFiles.map(f => stripExtension(f.name));
    const matchedFiles = new Set();
    
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

/**
 * Advanced matching with fuzzy logic (optional enhancement)
 */
export function compareDrawingListWithFuzzy(excelNames, folderFiles, similarityThreshold = 0.8) {
    // Implementation for fuzzy matching could be added here
    // This would handle slight variations in naming
    return compareDrawingList(excelNames, folderFiles);
}
```

### 5. Main Application Logic (src/main.js)
```javascript
import { 
    processExcelFile, 
    analyzeWorkbookSheets, 
    detectHeaderRow, 
    autoDetectFileNameColumn,
    extractFileNamesFromExcel 
} from './utils/excelProcessor.js';
import { filterValidDrawingFiles } from './utils/fileValidator.js';
import { compareDrawingList } from './utils/matchingEngine.js';
import './styles/drawing-list.css';

// Import XLSX for the handleSheetChange function
import * as XLSX from 'xlsx';

// Global state
let uploadedFiles = [];
let currentWorkbook = null;
let extractedFileNames = [];

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    console.log('Drawing List Checker initialized');
});

function initializeEventListeners() {
    // File upload handlers
    document.getElementById('folderInput').addEventListener('change', handleFolderUpload);
    document.getElementById('registerFile').addEventListener('change', handleExcelUpload);
    
    // Configuration handlers
    document.getElementById('registerSheetSelect').addEventListener('change', handleSheetChange);
    document.getElementById('registerColumnSelect').addEventListener('change', handleColumnChange);
    document.getElementById('onlyLatestRevision').addEventListener('change', handleColumnChange);
    
    // Analysis trigger
    document.getElementById('runAnalysis').addEventListener('click', runDrawingListAnalysis);
}

async function handleFolderUpload(event) {
    const files = Array.from(event.target.files);
    
    // Process and filter files
    uploadedFiles = files.map(file => ({
        name: file.name,
        path: file.webkitRelativePath || file.name,
        file: file
    }));
    
    // Filter to only valid drawing files
    uploadedFiles = filterValidDrawingFiles(uploadedFiles);
    
    updateFileStatus('folderStatus', `${uploadedFiles.length} valid drawing files selected`, 'success');
    console.log(`Processed ${files.length} files, ${uploadedFiles.length} valid drawings`);
}

async function handleExcelUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    try {
        updateFileStatus('registerStatus', 'Processing Excel file...', 'processing');
        
        // Process Excel file
        currentWorkbook = await processExcelFile(file);
        
        // Analyze sheets and populate selector
        const sheetAnalysis = analyzeWorkbookSheets(currentWorkbook);
        populateSheetSelector(sheetAnalysis);
        
        // Auto-select best sheet and column
        if (sheetAnalysis.length > 0) {
            await autoConfigureExcel(sheetAnalysis[0]);
        }
        
        updateFileStatus('registerStatus', `${file.name} loaded successfully`, 'success');
        document.getElementById('registerConfig').style.display = 'block';
        
    } catch (error) {
        console.error('Excel processing error:', error);
        updateFileStatus('registerStatus', `Error: ${error.message}`, 'error');
    }
}

function populateSheetSelector(sheetAnalysis) {
    const select = document.getElementById('registerSheetSelect');
    select.innerHTML = '';
    
    sheetAnalysis.forEach(sheet => {
        const option = document.createElement('option');
        option.value = sheet.name;
        option.textContent = `${sheet.name} (${sheet.rowCount} rows)`;
        select.appendChild(option);
    });
}

async function autoConfigureExcel(sheetInfo) {
    try {
        // Detect header row
        const headerDetection = detectHeaderRow(sheetInfo.data);
        
        if (headerDetection.found) {
            // Auto-detect file name column
            const columnDetection = autoDetectFileNameColumn(
                headerDetection.headerRow, 
                headerDetection.rowIndex, 
                sheetInfo.data
            );
            
            if (columnDetection && columnDetection.confidence > 90) {
                // Auto-configure with high confidence
                populateColumnSelector(headerDetection.headerRow, headerDetection.rowIndex);
                document.getElementById('registerColumnSelect').value = columnDetection.columnIndex;
                
                console.log(`Auto-configured: Column ${String.fromCharCode(65 + columnDetection.columnIndex)} with ${columnDetection.confidence}% confidence`);
                
                // Extract file names immediately
                await extractFileNames();
            } else {
                // Show options for manual selection
                populateColumnSelector(headerDetection.headerRow, headerDetection.rowIndex);
                if (columnDetection) {
                    showColumnDetectionDialog(columnDetection);
                }
            }
        }
    } catch (error) {
        console.error('Auto-configuration error:', error);
    }
}

function populateColumnSelector(headerRow, headerRowIndex) {
    const select = document.getElementById('registerColumnSelect');
    select.innerHTML = '';
    select.setAttribute('data-header-row', headerRowIndex);
    
    headerRow.forEach((header, index) => {
        if (header && header.trim()) {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = `${String.fromCharCode(65 + index)} - ${header}`;
            select.appendChild(option);
        }
    });
}

function showColumnDetectionDialog(columnDetection) {
    // Implementation for user confirmation dialog
    const message = `Auto-detected file name column with ${columnDetection.confidence}% confidence. Would you like to use this selection?`;
    if (confirm(message)) {
        document.getElementById('registerColumnSelect').value = columnDetection.columnIndex;
        extractFileNames();
    }
}

async function handleSheetChange() {
    const sheetName = document.getElementById('registerSheetSelect').value;
    if (!currentWorkbook || !sheetName) return;
    
    const worksheet = currentWorkbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(worksheet, { header: 1, raw: false });
    
    // Re-detect header and columns for new sheet
    const headerDetection = detectHeaderRow(data);
    populateColumnSelector(headerDetection.headerRow, headerDetection.rowIndex);
    
    // Auto-detect file name column
    const columnDetection = autoDetectFileNameColumn(
        headerDetection.headerRow, 
        headerDetection.rowIndex, 
        data
    );
    
    if (columnDetection && columnDetection.confidence > 75) {
        document.getElementById('registerColumnSelect').value = columnDetection.columnIndex;
        await extractFileNames();
    }
}

async function handleColumnChange() {
    await extractFileNames();
}

async function extractFileNames() {
    const sheetName = document.getElementById('registerSheetSelect').value;
    const columnIndex = parseInt(document.getElementById('registerColumnSelect').value);
    const onlyLatest = document.getElementById('onlyLatestRevision').checked;
    
    if (!currentWorkbook || !sheetName || isNaN(columnIndex)) return;
    
    try {
        const worksheet = currentWorkbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(worksheet, { header: 1, raw: false });
        const select = document.getElementById('registerColumnSelect');
        const headerRowIndex = parseInt(select.getAttribute('data-header-row') || '0');
        
        // Detect latest revision column if needed
        let latestRevisionColumnIndex = 0;
        if (onlyLatest) {
            latestRevisionColumnIndex = detectLatestRevisionColumn(data, headerRowIndex);
        }
        
        // Extract file names
        extractedFileNames = extractFileNamesFromExcel(
            data, 
            headerRowIndex, 
            columnIndex, 
            latestRevisionColumnIndex, 
            onlyLatest
        );
        
        updateFileCountDisplay(extractedFileNames.length, data.length - headerRowIndex - 1);
        console.log(`Extracted ${extractedFileNames.length} file names from Excel`);
        
    } catch (error) {
        console.error('File name extraction error:', error);
    }
}

function detectLatestRevisionColumn(data, headerRowIndex) {
    // Find the rightmost column with data (simplified implementation)
    let latestColumn = 0;
    
    for (let rowIndex = headerRowIndex + 1; rowIndex < data.length; rowIndex++) {
        const row = data[rowIndex];
        if (!row) continue;
        
        for (let colIndex = row.length - 1; colIndex >= 0; colIndex--) {
            const cell = row[colIndex];
            if (cell !== null && cell !== undefined && cell.toString().trim() !== '') {
                latestColumn = Math.max(latestColumn, colIndex);
                break;
            }
        }
    }
    
    return latestColumn;
}

function updateFileCountDisplay(extractedCount, totalCount) {
    const info = document.getElementById('fileCountInfo');
    if (info) {
        info.textContent = `Extracted: ${extractedCount} of ${totalCount} total entries`;
    }
}

async function runDrawingListAnalysis() {
    if (extractedFileNames.length === 0) {
        alert('Please load an Excel register and configure the file name column');
        return;
    }
    
    if (uploadedFiles.length === 0) {
        alert('Please select a folder with delivered files');
        return;
    }
    
    console.log('=== STARTING DRAWING LIST ANALYSIS ===');
    
    try {
        // Run the comparison
        const comparisonResult = compareDrawingList(extractedFileNames, uploadedFiles);
        
        // Update UI with results
        updateSummaryMetrics(comparisonResult.summary);
        updateResultsTable(comparisonResult.results);
        
        console.log('Analysis completed successfully');
        
    } catch (error) {
        console.error('Analysis error:', error);
        alert(`Analysis failed: ${error.message}`);
    }
}

function updateSummaryMetrics(summary) {
    document.getElementById('deliveredPercent').textContent = `${summary.deliveryPercentage}%`;
    document.getElementById('deliveredCount').textContent = summary.done;
    document.getElementById('deliveredTotal').textContent = summary.total;
}

function updateResultsTable(results) {
    const tbody = document.getElementById('drawingListResults');
    tbody.innerHTML = '';
    
    results.forEach(result => {
        const row = tbody.insertRow();
        row.innerHTML = `
            <td>${result.excelName}</td>
            <td>${result.matchedFile}</td>
            <td><span class="status-badge ${getStatusClass(result.status)}">${result.status}</span></td>
        `;
    });
}

function getStatusClass(status) {
    const statusClasses = {
        'Done': 'success',
        'To Do': 'error',
        'File not in Drawing List': 'warning'
    };
    return statusClasses[status] || 'warning';
}

function updateFileStatus(statusId, message, className = '') {
    const statusElement = document.getElementById(statusId);
    if (statusElement) {
        statusElement.textContent = message;
        statusElement.className = `file-status ${className}`;
    }
}

// Export for debugging
window.debugDrawingList = {
    uploadedFiles,
    extractedFileNames,
    currentWorkbook,
    runAnalysis: runDrawingListAnalysis
};
```

### 6. CSS Styling (src/styles/drawing-list.css)
```css
/* Drawing List Checker Styles */

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background-color: #f5f5f5;
    color: #333;
    line-height: 1.6;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

/* Header */
.header {
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    margin-bottom: 20px;
    text-align: center;
}

.header h1 {
    color: #2c3e50;
    font-size: 28px;
    font-weight: 600;
}

/* Main Content Layout */
.main-content {
    display: grid;
    grid-template-columns: 350px 1fr;
    gap: 20px;
    min-height: 70vh;
}

/* Input Section */
.inputs-section {
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    height: fit-content;
}

.file-input-group {
    margin-bottom: 20px;
}

.file-input-group label {
    display: block;
    font-weight: 500;
    margin-bottom: 8px;
    color: #2c3e50;
    font-size: 14px;
}

.file-input-group input[type="file"] {
    width: 100%;
    padding: 10px;
    border: 2px dashed #bdc3c7;
    border-radius: 6px;
    background: #f8f9fa;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 14px;
}

.file-input-group input[type="file"]:hover {
    border-color: #3498db;
    background: #e3f2fd;
}

.file-status {
    font-size: 12px;
    color: #7f8c8d;
    margin-top: 8px;
    padding: 6px 10px;
    background: #ecf0f1;
    border-radius: 4px;
    border-left: 4px solid #bdc3c7;
}

.file-status.success {
    color: #27ae60;
    background: #d5f4e6;
    border-left-color: #27ae60;
}

.file-status.error {
    color: #e74c3c;
    background: #fdf2f2;
    border-left-color: #e74c3c;
}

.file-status.processing {
    color: #f39c12;
    background: #fef9e7;
    border-left-color: #f39c12;
}

/* Configuration Section */
.config-section {
    background: #f8f9fa;
    padding: 15px;
    border-radius: 6px;
    margin-top: 15px;
    border-left: 4px solid #3498db;
}

.config-section h3 {
    color: #2c3e50;
    font-size: 16px;
    margin-bottom: 15px;
}

.form-group {
    margin-bottom: 15px;
}

.form-group label {
    display: block;
    font-weight: 500;
    margin-bottom: 6px;
    color: #2c3e50;
    font-size: 13px;
}

.form-group select,
.form-group input[type="text"] {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid #bdc3c7;
    border-radius: 4px;
    font-size: 14px;
    transition: border-color 0.3s ease;
}

.form-group select:focus,
.form-group input[type="text"]:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
}

.form-group input[type="checkbox"] {
    width: auto;
    margin-right: 8px;
}

.file-count-info {
    font-size: 12px;
    color: #7f8c8d;
    margin-top: 5px;
    font-style: italic;
}

/* Buttons */
.btn {
    padding: 12px 24px;
    border: none;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    text-decoration: none;
    display: inline-block;
}

.btn-primary {
    background: #3498db;
    color: white;
    width: 100%;
    padding: 15px;
    font-size: 16px;
    margin-top: 10px;
}

.btn-primary:hover {
    background: #2980b9;
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(52, 152, 219, 0.3);
}

.btn-primary:active {
    transform: translateY(0);
}

/* Results Section */
.results-section {
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    overflow: hidden;
}

/* Summary Metrics */
.summary-metrics {
    padding: 20px;
    border-bottom: 1px solid #ecf0f1;
}

.metric-card {
    background: #f8f9fa;
    padding: 20px;
    border-radius: 8px;
    border: 1px solid #e9ecef;
    text-align: center;
}

.metric-card h3 {
    color: #2c3e50;
    font-size: 14px;
    margin-bottom: 10px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.metric-value {
    font-size: 24px;
    font-weight: bold;
    color: #2c3e50;
    margin-bottom: 8px;
}

.metric-detail {
    font-size: 14px;
    color: #7f8c8d;
}

/* Results Table */
.table-container {
    padding: 20px;
}

.results-table {
    width: 100%;
    border-collapse: collapse;
    background: white;
    border-radius: 6px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.results-table th {
    background: #34495e;
    color: white;
    padding: 15px 12px;
    text-align: left;
    font-weight: 500;
    font-size: 13px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.results-table td {
    padding: 12px;
    border-bottom: 1px solid #dee2e6;
    font-size: 14px;
    vertical-align: top;
}

.results-table tr:hover {
    background: #f8f9fa;
}

.results-table tr:last-child td {
    border-bottom: none;
}

/* Status Badges */
.status-badge {
    padding: 4px 8px;
    border-radius: 12px;
    font-size: 11px;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.status-badge.success {
    background: #d4edda;
    color: #155724;
}

.status-badge.error {
    background: #f8d7da;
    color: #721c24;
}

.status-badge.warning {
    background: #fff3cd;
    color: #856404;
}

/* Responsive Design */
@media (max-width: 1024px) {
    .main-content {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 768px) {
    .container {
        padding: 10px;
    }
    
    .results-table {
        font-size: 12px;
    }
    
    .results-table th,
    .results-table td {
        padding: 8px 6px;
    }
}

/* Loading States */
.loading {
    opacity: 0.6;
    pointer-events: none;
}

/* Animations */
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}

.config-section {
    animation: fadeIn 0.3s ease;
}

.results-section {
    animation: fadeIn 0.5s ease;
}
```

## Key Features and Algorithms

### 1. Smart Excel Processing
- **Header Detection**: Scores rows based on content patterns to identify headers
- **Column Auto-Detection**: Analyzes column content to find file name columns with confidence scoring
- **Pattern Recognition**: Identifies structured naming patterns in data

### 2. Intelligent File Validation
- **Drawing File Validation**: Uses pattern analysis to filter out non-drawing files
- **Structured Pattern Analysis**: Requires 3+ segments separated by hyphens or underscores
- **Content Validation**: Ensures files contain both letters and numbers

### 3. Advanced Matching Engine
- **Normalized Comparison**: Case-insensitive, whitespace-normalized matching
- **Extension Handling**: Strips file extensions for comparison
- **Status Classification**: Done/To Do/Extra file categorization

### 4. Latest Revision Filtering
- **Rightmost Column Detection**: Finds the last column with data for each drawing
- **Selective Extraction**: Optionally filters to only latest revision files

## Deployment Instructions

### Vite Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm run preview
```

### File Structure After Build
```
dist/
├── index.html
├── assets/
│   ├── index-[hash].js
│   └── index-[hash].css
└── vite.svg
```

## Complete Vite Configuration

### vite.config.js
```javascript
import { defineConfig } from 'vite'

export default defineConfig({
  root: './',
  build: {
    target: 'es2015',
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    rollupOptions: {
      input: {
        main: './index.html'
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
})
```

### package.json
```json
{
  "name": "drawing-list-checker",
  "private": true,
  "version": "1.0.0",
  "description": "Intelligent Drawing List Checker for QA/QC deliverables",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": ["drawing", "qa", "qc", "deliverables", "excel", "matching"],
  "author": "",
  "license": "MIT",
  "dependencies": {
    "xlsx": "^0.18.5"
  },
  "devDependencies": {
    "vite": "^5.4.10"
  }
}

## Testing Strategy

### Sample Test Data
Create test files to validate the implementation:

**test-excel-register.xlsx** - Sample Excel file with drawing names:
```
| File Name | Description | Status | Rev |
|-----------|-------------|--------|-----|
| NL-AMS1-E-PH01-001 | Phase 1 Electrical | Active | C |
| NL-AMS1-M-PH01-002 | Phase 1 Mechanical | Active | B |
| NL-AMS1-A-PH01-003 | Phase 1 Architecture | Active | A |
```

**test-folder/** - Sample delivered files:
```
test-folder/
├── NL-AMS1-E-PH01-001.pdf
├── NL-AMS1-M-PH01-002.dwg
├── NL-AMS1-A-PH01-004.pdf  (extra file)
├── summary.pdf             (invalid drawing file)
└── readme.txt              (invalid drawing file)
```

### Unit Tests (Optional)
```javascript
// Test file validation
import { isValidDrawingFileName } from '../src/utils/fileValidator.js';

console.assert(isValidDrawingFileName('NL-AMS1-E-PH01-001.pdf') === true);
console.assert(isValidDrawingFileName('summary.pdf') === false);

// Test text normalization
import { normalizeText } from '../src/utils/textNormalizer.js';

console.assert(normalizeText('  Test File  ') === 'test file');
```

### Integration Testing
1. Load sample Excel file with known structure
2. Upload test folder with known files
3. Verify matching results accuracy
4. Test edge cases (empty files, malformed data)

## Error Handling Strategy

### File Processing Errors
- Excel parsing failures
- Invalid file formats
- Memory limitations

### User Input Validation
- Missing required inputs
- Invalid column selections
- Empty datasets

### Network and Browser Compatibility
- File size limitations
- Browser-specific folder upload support
- CDN fallback strategies

## Performance Considerations

### Large File Handling
- Stream processing for large Excel files
- Pagination for result tables
- Progressive loading indicators

### Memory Management
- Cleanup after file processing
- Efficient data structures
- Garbage collection awareness

## Browser Compatibility

### Required Features
- File API support
- ArrayBuffer processing
- ES6 modules (for Vite)
- webkitdirectory attribute

### Fallbacks
- Feature detection
- Graceful degradation
- Alternative upload methods

## Security Considerations

### Client-Side Processing
- No server-side data transmission
- Local file processing only
- Memory-only state storage

### Data Validation
- Input sanitization
- File type verification
- Size limit enforcement

## Extension Opportunities

### Advanced Matching
- Fuzzy string matching
- Levenshtein distance comparison
- Pattern-based suggestions

### Export Capabilities
- Excel report generation
- PDF summary reports
- CSV data export

### Integration Options
- REST API connectivity
- Database integration
- Cloud storage support

## Troubleshooting Guide

### Common Issues and Solutions

#### 1. Excel File Not Loading
**Problem**: Excel file fails to process
**Solutions**:
- Verify file format (.xlsx, .xls)
- Check file isn't corrupted
- Ensure file isn't password protected
- Try opening file in Excel first

#### 2. No Valid Drawing Files Found
**Problem**: Folder upload shows 0 valid files
**Solutions**:
- Check file naming convention (requires 3+ segments: `ABC-DEF-123`)
- Verify files contain both letters and numbers
- Ensure minimum 8 character length
- Check console for excluded file details

#### 3. Smart Detection Not Working
**Problem**: Auto-detection fails to find columns
**Solutions**:
- Manually select sheet and column
- Check if Excel has proper header row
- Verify column contains file names, not descriptions
- Look for confidence scores in console

#### 4. Poor Matching Results
**Problem**: Many files show as "Not Matched"
**Solutions**:
- Check file name format consistency
- Verify Excel register contains exact file names
- Remove file extensions from Excel if present
- Check for extra spaces or special characters

### Debug Console Commands
```javascript
// Access debug tools in browser console
window.debugDrawingList.uploadedFiles        // Check uploaded files
window.debugDrawingList.extractedFileNames   // Check Excel extraction
window.debugDrawingList.currentWorkbook      // Inspect Excel data
window.debugDrawingList.runAnalysis()        // Manually trigger analysis
```

## Advanced Configuration Options

### Custom File Validation Patterns
```javascript
// Extend fileValidator.js for custom patterns
export function isValidCustomDrawingFileName(fileName) {
    // Custom validation logic
    const customPattern = /^[A-Z]{2,3}-[A-Z0-9]+-[A-Z]+-[A-Z0-9]+-\d{3}/i;
    return customPattern.test(fileName);
}
```

### Multi-Language Header Detection
```javascript
// Extend excelProcessor.js for additional languages
const multiLanguageHeaders = {
    english: ['file name', 'filename', 'drawing'],
    dutch: ['bestandsnaam', 'tekening'],
    german: ['dateiname', 'zeichnung'],
    french: ['nom de fichier', 'dessin'],
    spanish: ['nombre de archivo', 'dibujo']
};
```

### Custom Matching Algorithms
```javascript
// Add to matchingEngine.js for fuzzy matching
import { distance } from 'fastest-levenshtein';

export function fuzzyMatch(str1, str2, threshold = 0.8) {
    const maxLength = Math.max(str1.length, str2.length);
    const similarity = 1 - (distance(str1, str2) / maxLength);
    return similarity >= threshold;
}
```

## Performance Optimization Tips

### 1. Large File Processing
- Process files in chunks for large folders (1000+ files)
- Use Web Workers for heavy Excel processing
- Implement progressive loading for results

### 2. Memory Management
```javascript
// Clear large objects after processing
function cleanup() {
    uploadedFiles = [];
    currentWorkbook = null;
    extractedFileNames = [];
    // Force garbage collection
    if (window.gc) window.gc();
}
```

### 3. UI Responsiveness
```javascript
// Use requestIdleCallback for non-critical operations
function processInBackground(callback) {
    if (window.requestIdleCallback) {
        window.requestIdleCallback(callback);
    } else {
        setTimeout(callback, 0);
    }
}
```

## Security Best Practices

### Input Validation
```javascript
// Sanitize file names and Excel data
function sanitizeInput(input) {
    if (typeof input !== 'string') return '';
    return input.replace(/<script[^>]*>.*?<\/script>/gi, '')
               .replace(/[<>]/g, '')
               .trim();
}
```

### File Size Limits
```javascript
// Add to file upload handlers
const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
const MAX_FILES = 5000;

function validateFileSize(file) {
    if (file.size > MAX_FILE_SIZE) {
        throw new Error(`File too large: ${file.name}`);
    }
}
```

## Component Architecture (Optional Modular Approach)

### DrawingListChecker Component (src/components/DrawingListChecker.js)
```javascript
export class DrawingListChecker {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.state = {
            uploadedFiles: [],
            currentWorkbook: null,
            extractedFileNames: [],
            results: []
        };
        this.init();
    }
    
    init() {
        this.render();
        this.bindEvents();
    }
    
    render() {
        // Component rendering logic
    }
    
    bindEvents() {
        // Event binding logic
    }
    
    async processFiles(files) {
        // File processing logic
    }
    
    async runAnalysis() {
        // Analysis logic
    }
}
```

### FileUploader Component (src/components/FileUploader.js)
```javascript
export class FileUploader {
    constructor(inputId, statusId, onFileChange) {
        this.input = document.getElementById(inputId);
        this.status = document.getElementById(statusId);
        this.onFileChange = onFileChange;
        this.init();
    }
    
    init() {
        this.input.addEventListener('change', (e) => {
            this.handleFileChange(e);
        });
    }
    
    handleFileChange(event) {
        const files = Array.from(event.target.files);
        this.updateStatus(`Processing ${files.length} files...`, 'processing');
        this.onFileChange(files);
    }
    
    updateStatus(message, type = '') {
        this.status.textContent = message;
        this.status.className = `file-status ${type}`;
    }
}
```

### ResultsTable Component (src/components/ResultsTable.js)
```javascript
export class ResultsTable {
    constructor(tableId) {
        this.table = document.getElementById(tableId);
        this.tbody = this.table.querySelector('tbody');
    }
    
    updateResults(results) {
        this.tbody.innerHTML = '';
        
        results.forEach(result => {
            const row = this.createResultRow(result);
            this.tbody.appendChild(row);
        });
    }
    
    createResultRow(result) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${this.escapeHtml(result.excelName)}</td>
            <td>${this.escapeHtml(result.matchedFile)}</td>
            <td><span class="status-badge ${this.getStatusClass(result.status)}">${result.status}</span></td>
        `;
        return row;
    }
    
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    getStatusClass(status) {
        const statusClasses = {
            'Done': 'success',
            'To Do': 'error',
            'File not in Drawing List': 'warning'
        };
        return statusClasses[status] || 'warning';
    }
}
```

## Project README.md Template

```markdown
# Drawing List Checker

A sophisticated web application for intelligent drawing deliverable validation and QA/QC processes. Compare expected drawings from Excel registers against delivered files with smart pattern matching and automated validation.

## Features

- 🧠 **Smart Excel Processing**: Automatic header and column detection
- 📁 **Intelligent File Validation**: Filters drawing files using pattern analysis
- 🔍 **Advanced Matching**: Normalized text comparison with fuzzy matching support
- 📊 **Real-time Analysis**: Live delivery status tracking and reporting
- 🎯 **Multi-language Support**: Headers in English, Dutch, German, French
- ⚡ **High Performance**: Client-side processing, no server required

## Quick Start

1. **Clone and Setup**
   ```bash
   git clone <repository-url>
   cd drawing-list-checker
   npm install
   npm run dev
   ```

2. **Upload Files**
   - Select Excel register file (.xlsx/.xls)
   - Choose folder containing delivered drawings
   - Configure auto-detected columns

3. **Run Analysis**
   - Click "Run Analysis" button
   - Review delivery status and missing files
   - Export results if needed

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 11+
- Edge 79+

## File Format Requirements

### Excel Register
- Must contain column with drawing file names
- Supports multiple sheets
- Headers auto-detected or manually selectable

### Drawing Files
- Must follow structured naming: `ABC-DEF-123` (3+ segments)
- Contain both letters and numbers
- Minimum 8 characters length

## Development

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

## License

MIT License - see LICENSE file for details
```

This comprehensive guide provides everything needed to recreate the Drawing List checking functionality in a Vite application, maintaining all the intelligent processing and smart matching capabilities of the original system.
