import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FileUpload } from '@/components/FileUpload';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FileSpreadsheet, FolderOpen, CheckCircle, XCircle, AlertTriangle, Play, Download } from 'lucide-react';
import { useWebhook } from '@/hooks/useWebhook';
import { WebhookModal } from '@/components/WebhookModal';
import * as XLSX from 'xlsx';
import {
  processExcelFile,
  analyzeWorkbookSheets,
  detectHeaderRow,
  autoDetectFileNameColumn,
  extractFileNamesFromExcel,
  compareDrawingList,
  type SheetAnalysis,
  type HeaderDetection,
  type ColumnDetection,
  type ComparisonResult
} from '@/lib/drawing-list-utils';

export default function DrawingListCheck() {
  // File upload states
  const [folderFiles, setFolderFiles] = useState<File[]>([]);
  const [excelFile, setExcelFile] = useState<File | null>(null);
  
  // Excel processing states
  const [workbook, setWorkbook] = useState<XLSX.WorkBook | null>(null);
  const [sheets, setSheets] = useState<SheetAnalysis[]>([]);
  const [selectedSheet, setSelectedSheet] = useState<string>('');
  const [headerDetection, setHeaderDetection] = useState<HeaderDetection | null>(null);
  const [columnDetection, setColumnDetection] = useState<ColumnDetection | null>(null);
  const [selectedColumn, setSelectedColumn] = useState<string>('');
  const [extractedFileNames, setExtractedFileNames] = useState<string[]>([]);
  
  // Analysis states
  const [analysisResult, setAnalysisResult] = useState<ComparisonResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisError, setAnalysisError] = useState<string>('');

  // Lead capture webhook
  const leadCaptureWebhook = useWebhook({
    source: "drawing-list-check-results",
    title: "Get Your Full QA Report",
    description: "Based on your drawing list analysis, get a comprehensive 48-hour QA report for your complete project deliverables.",
    submitButtonText: "Get My QA Report"
  });

  const handleFolderUpload = (files: File[]) => {
    setFolderFiles(files);
    setAnalysisResult(null);
    setAnalysisError('');
  };

  const handleExcelUpload = async (files: File[]) => {
    if (files.length === 0) return;
    
    const file = files[0];
    setExcelFile(file);
    setAnalysisResult(null);
    setAnalysisError('');
    
    try {
      console.log('Processing Excel file:', file.name);
      const wb = await processExcelFile(file);
      setWorkbook(wb);
      
      const sheetAnalysis = analyzeWorkbookSheets(wb);
      setSheets(sheetAnalysis);
      
      if (sheetAnalysis.length > 0) {
        const bestSheet = sheetAnalysis[0];
        setSelectedSheet(bestSheet.name);
        await processSheet(bestSheet);
      }
    } catch (error) {
      console.error('Excel processing error:', error);
      setAnalysisError(`Failed to process Excel file: ${(error as Error).message}`);
    }
  };

  const processSheet = async (sheet: SheetAnalysis) => {
    try {
      const headerDet = detectHeaderRow(sheet.data);
      setHeaderDetection(headerDet);
      
      if (headerDet.found) {
        const columnDet = autoDetectFileNameColumn(
          headerDet.headerRow,
          headerDet.rowIndex,
          sheet.data
        );
        setColumnDetection(columnDet);
        
        if (columnDet && columnDet.confidence > 75) {
          setSelectedColumn(columnDet.columnIndex.toString());
          const fileNames = extractFileNamesFromExcel(
            sheet.data,
            headerDet.rowIndex,
            columnDet.columnIndex
          );
          setExtractedFileNames(fileNames);
        }
      }
    } catch (error) {
      console.error('Sheet processing error:', error);
      setAnalysisError(`Failed to process sheet: ${(error as Error).message}`);
    }
  };

  const handleSheetChange = async (sheetName: string) => {
    setSelectedSheet(sheetName);
    const sheet = sheets.find(s => s.name === sheetName);
    if (sheet) {
      await processSheet(sheet);
    }
  };

  const handleColumnChange = (columnIndex: string) => {
    setSelectedColumn(columnIndex);
    
    if (headerDetection && workbook && selectedSheet) {
      const worksheet = workbook.Sheets[selectedSheet];
      const data = XLSX.utils.sheet_to_json(worksheet, { header: 1, raw: false }) as any[][];
      
      const fileNames = extractFileNamesFromExcel(
        data,
        headerDetection.rowIndex,
        parseInt(columnIndex)
      );
      setExtractedFileNames(fileNames);
    }
  };

  const runAnalysis = async () => {
    if (extractedFileNames.length === 0) {
      setAnalysisError('Please upload and configure an Excel register first');
      return;
    }
    
    if (folderFiles.length === 0) {
      setAnalysisError('Please upload a folder with drawing files');
      return;
    }
    
    setIsAnalyzing(true);
    setAnalysisError('');
    
    try {
      console.log('Running analysis with:', {
        excelEntries: extractedFileNames.length,
        folderFiles: folderFiles.length
      });
      
      const result = compareDrawingList(extractedFileNames, folderFiles);
      setAnalysisResult(result);
    } catch (error) {
      console.error('Analysis error:', error);
      setAnalysisError(`Analysis failed: ${(error as Error).message}`);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Done':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'To Do':
        return <XCircle className="w-4 h-4 text-red-500" />;
      case 'File not in Drawing List':
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Done':
        return <Badge variant="default" className="bg-green-100 text-green-800">✓ Done</Badge>;
      case 'To Do':
        return <Badge variant="destructive">✗ Missing</Badge>;
      case 'File not in Drawing List':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">! Extra</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const canRunAnalysis = extractedFileNames.length > 0 && folderFiles.length > 0;
  const showResults = analysisResult !== null;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Free Check: Are Your Design Deliverables Complete?
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Upload your drawing register and delivered files to instantly check completeness. 
            Get a detailed analysis of what's delivered, what's missing, and what's extra.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-1 space-y-6">
            {/* File Uploads */}
            <FileUpload
              title="1. Upload Drawing Register"
              description="Excel file with expected drawings"
              accept=".xlsx,.xls"
              onFilesSelected={handleExcelUpload}
              icon={<FileSpreadsheet className="w-5 h-5 text-primary" />}
            />

            <FileUpload
              title="2. Upload Delivered Files"
              description="Folder containing delivered drawings"
              onFilesSelected={handleFolderUpload}
              webkitdirectory={true}
              multiple={true}
              icon={<FolderOpen className="w-5 h-5 text-primary" />}
            />

            {/* Excel Configuration */}
            {sheets.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">3. Configure Analysis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Sheet Selection
                    </label>
                    <Select value={selectedSheet} onValueChange={handleSheetChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select sheet" />
                      </SelectTrigger>
                      <SelectContent>
                        {sheets.map((sheet) => (
                          <SelectItem key={sheet.name} value={sheet.name}>
                            {sheet.name} ({sheet.rowCount} rows)
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {headerDetection && (
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">
                        File Name Column
                      </label>
                      <Select value={selectedColumn} onValueChange={handleColumnChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select column" />
                        </SelectTrigger>
                        <SelectContent>
                          {headerDetection.headerRow.map((header, index) => (
                            <SelectItem key={index} value={index.toString()}>
                              {String.fromCharCode(65 + index)} - {header || `Column ${index + 1}`}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      
                      {columnDetection && selectedColumn === columnDetection.columnIndex.toString() && (
                        <p className="text-xs text-green-600 mt-1">
                          ✓ Auto-detected with {columnDetection.confidence}% confidence
                        </p>
                      )}
                    </div>
                  )}

                  {extractedFileNames.length > 0 && (
                    <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                      <strong>{extractedFileNames.length}</strong> drawing entries found
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Run Analysis Button */}
            <Button
              onClick={runAnalysis}
              disabled={!canRunAnalysis || isAnalyzing}
              className="w-full h-12 text-lg"
              size="lg"
            >
              {isAnalyzing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Analyzing...
                </>
              ) : (
                <>
                  <Play className="w-5 h-5 mr-2" />
                  Run Completeness Check
                </>
              )}
            </Button>

            {analysisError && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>{analysisError}</AlertDescription>
              </Alert>
            )}
          </div>

          {/* Results Section */}
          <div className="lg:col-span-2">
            {showResults ? (
              <div className="space-y-6">
                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-6 text-center">
                      <div className="text-3xl font-bold text-green-600 mb-2">
                        {analysisResult.summary.deliveryPercentage}%
                      </div>
                      <div className="text-sm text-gray-600">Completion Rate</div>
                      <Progress 
                        value={analysisResult.summary.deliveryPercentage} 
                        className="mt-2"
                      />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6 text-center">
                      <div className="text-2xl font-bold text-gray-900 mb-2">
                        {analysisResult.summary.done} / {analysisResult.summary.total}
                      </div>
                      <div className="text-sm text-gray-600">Files Delivered</div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6 text-center">
                      <div className="text-2xl font-bold text-yellow-600 mb-2">
                        {analysisResult.summary.extra}
                      </div>
                      <div className="text-sm text-gray-600">Extra Files</div>
                    </CardContent>
                  </Card>
                </div>

                {/* Lead Capture CTA */}
                <Card className="border-primary/20 bg-primary/5">
                  <CardContent className="p-6">
                    <div className="text-center space-y-4">
                      <h3 className="text-xl font-semibold text-gray-900">
                        Get Your Complete QA Report
                      </h3>
                      <p className="text-gray-600">
                        This quick check found {analysisResult.summary.todo} missing files and {analysisResult.summary.extra} extra files. 
                        Get a comprehensive 48-hour QA validation report for your complete project deliverables.
                      </p>
                      <Button 
                        onClick={leadCaptureWebhook.openModal}
                        size="lg"
                        className="bg-primary hover:bg-primary/90"
                      >
                        <Download className="w-5 h-5 mr-2" />
                        Get Full QA Report (Free)
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Detailed Results Table */}
                <Card>
                  <CardHeader>
                    <CardTitle>Detailed Analysis Results</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Expected Drawing</TableHead>
                            <TableHead>Matched File</TableHead>
                            <TableHead>Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {analysisResult.results.map((result, index) => (
                            <TableRow key={index}>
                              <TableCell className="font-medium">
                                {result.excelName}
                              </TableCell>
                              <TableCell>
                                <span className={result.matchedFile === 'N/A' ? 'text-gray-400' : ''}>
                                  {result.matchedFile}
                                </span>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  {getStatusIcon(result.status)}
                                  {getStatusBadge(result.status)}
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card className="h-96 flex items-center justify-center">
                <CardContent className="text-center">
                  <div className="text-gray-400 mb-4">
                    <FileSpreadsheet className="w-16 h-16 mx-auto mb-4" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Ready to Check Your Deliverables
                  </h3>
                  <p className="text-gray-600 max-w-md">
                    Upload your drawing register and delivered files to get an instant completeness analysis. 
                    We'll show you exactly what's delivered, missing, or extra.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>

      <Footer />

      {/* Lead Capture Modal */}
      <WebhookModal
        isOpen={leadCaptureWebhook.isModalOpen}
        onClose={leadCaptureWebhook.closeModal}
        onSubmit={leadCaptureWebhook.handleSubmit}
        {...leadCaptureWebhook.modalProps}
      />
    </div>
  );
}
