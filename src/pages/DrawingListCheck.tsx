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
    
    // Auto-run analysis if we have both files and extracted file names
    if (files.length > 0 && extractedFileNames.length > 0) {
      setTimeout(() => {
        runAnalysisWithData(extractedFileNames, files);
      }, 500); // Small delay to ensure state is updated
    }
  };

  const runAnalysisWithData = async (fileNames: string[], folderFilesData: File[]) => {
    setIsAnalyzing(true);
    setAnalysisError('');
    
    try {
      console.log('Auto-running analysis with:', {
        excelEntries: fileNames.length,
        folderFiles: folderFilesData.length
      });
      
      const result = compareDrawingList(fileNames, folderFilesData);
      setAnalysisResult(result);
      
      // Show success message for auto-analysis
      console.log('✅ Auto-analysis completed successfully!');
    } catch (error) {
      console.error('Analysis error:', error);
      setAnalysisError(`Analysis failed: ${(error as Error).message}`);
    } finally {
      setIsAnalyzing(false);
    }
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
          
          // Auto-run analysis if we have both files and extracted file names
          if (folderFiles.length > 0 && fileNames.length > 0) {
            setTimeout(() => {
              runAnalysisWithData(fileNames, folderFiles);
            }, 500); // Small delay to ensure state is updated
          }
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
      
      // Auto-run analysis if we have both files and extracted file names
      if (folderFiles.length > 0 && fileNames.length > 0) {
        setTimeout(() => {
          runAnalysisWithData(fileNames, folderFiles);
        }, 500); // Small delay to ensure state is updated
      }
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
    
    await runAnalysisWithData(extractedFileNames, folderFiles);
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
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="py-8 bg-[#F3F6F8]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-lg md:text-xl lg:text-2xl font-semibold text-foreground leading-tight tracking-tight mb-3">
            <span className="text-primary bg-gradient-to-r from-primary to-primary-hover bg-clip-text text-transparent">
              Free Check: Are Your Design Deliverables Complete?
            </span>
          </h1>
          <div className="text-sm text-muted-foreground leading-relaxed font-normal max-w-2xl mx-auto">
            <p>Upload your drawing register and delivered files to instantly check completeness and get a detailed analysis.</p>
          </div>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 py-6">

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Input Section */}
          <div className="lg:col-span-1 space-y-4">
            {/* File Uploads */}
            <FileUpload
              title="1. Upload Delivered Files"
              description="Folder containing delivered drawings"
              onFilesSelected={handleFolderUpload}
              webkitdirectory={true}
              multiple={true}
              icon={<FolderOpen className="w-5 h-5 text-primary" />}
            />

            <FileUpload
              title="2. Upload Drawing Register"
              description="Excel file with expected drawings"
              accept=".xlsx,.xls"
              onFilesSelected={handleExcelUpload}
              icon={<FileSpreadsheet className="w-5 h-5 text-primary" />}
            />

            {/* Excel Configuration */}
            {sheets.length > 0 && (
              <Card className="glass-effect">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <FileSpreadsheet className="w-4 h-4 text-primary" />
                      <div>
                        <h3 className="font-semibold text-foreground text-sm">3. Configure Analysis</h3>
                        <p className="text-xs text-muted-foreground">
                          {columnDetection && folderFiles.length > 0 && extractedFileNames.length > 0 
                            ? "Auto-configured and ready" 
                            : "Select sheet and column"}
                        </p>
                      </div>
                    </div>
                    
                    {/* Show manual configuration only if not running automatically */}
                    {!(columnDetection && folderFiles.length > 0 && extractedFileNames.length > 0) && (
                      <>
                        <div>
                          <label className="text-xs font-medium text-muted-foreground mb-1 block uppercase tracking-wider">
                            Sheet Selection
                          </label>
                          <Select value={selectedSheet} onValueChange={handleSheetChange}>
                            <SelectTrigger className="text-sm h-10">
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
                            <label className="text-xs font-medium text-muted-foreground mb-1 block uppercase tracking-wider">
                              File Name Column
                            </label>
                            <Select value={selectedColumn} onValueChange={handleColumnChange}>
                              <SelectTrigger className="text-sm h-10">
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
                          </div>
                        )}
                      </>
                    )}
                    
                    {/* Show auto-detection status when running automatically */}
                    {columnDetection && folderFiles.length > 0 && extractedFileNames.length > 0 && (
                      <div className="bg-primary/10 p-3 rounded-lg">
                        <p className="text-xs text-primary font-medium mb-1">
                          ✓ Auto-detected: Sheet "{selectedSheet}", Column {String.fromCharCode(65 + parseInt(selectedColumn))}
                        </p>
                        <p className="text-xs text-green-600 font-medium">
                          🚀 Analysis ready to run automatically
                        </p>
                      </div>
                    )}

                  {extractedFileNames.length > 0 && (
                    <div className="text-xs text-muted-foreground bg-muted/30 p-2 rounded">
                      <strong className="text-foreground">{extractedFileNames.length}</strong> drawing entries found
                    </div>
                  )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Run Analysis Button */}
            <Button
              onClick={runAnalysis}
              disabled={!canRunAnalysis || isAnalyzing}
              className="w-full"
              size="lg"
              variant="cta"
            >
              {isAnalyzing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Analyzing...
                </>
              ) : canRunAnalysis ? (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Re-run Analysis
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Upload Files to Start
                </>
              )}
            </Button>

            {analysisError && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription className="text-sm">{analysisError}</AlertDescription>
              </Alert>
            )}
          </div>

          {/* Results Section */}
          <div className="lg:col-span-2">
            {showResults ? (
              <div className="space-y-6">
                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="glass-effect">
                    <CardContent className="p-6 text-center">
                      <div className="text-2xl md:text-3xl font-semibold text-primary mb-2">
                        {analysisResult.summary.deliveryPercentage}%
                      </div>
                      <div className="text-xs text-muted-foreground uppercase tracking-wider">Completion Rate</div>
                      <Progress 
                        value={analysisResult.summary.deliveryPercentage} 
                        className="mt-3"
                      />
                    </CardContent>
                  </Card>

                  <Card className="glass-effect">
                    <CardContent className="p-6 text-center">
                      <div className="text-xl md:text-2xl font-semibold text-foreground mb-2">
                        {analysisResult.summary.done} / {analysisResult.summary.total}
                      </div>
                      <div className="text-xs text-muted-foreground uppercase tracking-wider">Files Delivered</div>
                    </CardContent>
                  </Card>

                  <Card className="glass-effect">
                    <CardContent className="p-6 text-center">
                      <div className="text-xl md:text-2xl font-semibold text-yellow-600 mb-2">
                        {analysisResult.summary.extra}
                      </div>
                      <div className="text-xs text-muted-foreground uppercase tracking-wider">Extra Files</div>
                    </CardContent>
                  </Card>
                </div>

                {/* Lead Capture CTA */}
                <Card className="glass-effect border-primary/20 bg-primary/5">
                  <CardContent className="p-4">
                    <div className="text-center space-y-3">
                      <h3 className="text-base font-semibold text-foreground">
                        Get Your Complete QA Report
                      </h3>
                      <div className="text-xs text-muted-foreground leading-relaxed space-y-1">
                        <p>This quick check found <strong className="text-foreground">{analysisResult.summary.todo} missing files</strong> and <strong className="text-foreground">{analysisResult.summary.extra} extra files</strong>.</p>
                        <p>Get a comprehensive 48-hour QA validation report for your complete project deliverables.</p>
                      </div>
                      <Button 
                        onClick={leadCaptureWebhook.openModal}
                        size="default"
                        variant="cta"
                        className="h-9"
                      >
                        <Download className="w-3 h-3 mr-2" />
                        Get Full QA Report (Free)
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Detailed Results Table */}
                <Card className="glass-effect">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-base font-semibold">Detailed Analysis Results</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {/* Desktop Table View */}
                    <div className="hidden sm:block rounded-lg border border-border/50 overflow-x-auto">
                      <Table className="w-full table-fixed">
                        <colgroup>
                          <col className="w-[40%]" />
                          <col className="w-[40%]" />
                          <col className="w-[20%]" />
                        </colgroup>
                        <TableHeader>
                          <TableRow className="bg-muted/30">
                            <TableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-3 py-2">Expected Drawing</TableHead>
                            <TableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-3 py-2">Matched File</TableHead>
                            <TableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-3 py-2 w-24">Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {analysisResult.results.map((result, index) => (
                            <TableRow key={index} className="hover:bg-muted/20">
                              <TableCell className="font-medium text-xs px-3 py-2 max-w-0">
                                <div className="truncate" title={result.excelName}>
                                  {result.excelName}
                                </div>
                              </TableCell>
                              <TableCell className="text-xs px-3 py-2 max-w-0">
                                <div className={`truncate ${result.matchedFile === 'N/A' ? 'text-muted-foreground' : 'text-foreground'}`} title={result.matchedFile}>
                                  {result.matchedFile}
                                </div>
                              </TableCell>
                              <TableCell className="px-3 py-2">
                                <div className="flex items-center justify-center">
                                  {result.status === 'Done' && (
                                    <div className="flex items-center gap-1">
                                      <CheckCircle className="w-3 h-3 text-green-500" />
                                      <span className="text-xs text-green-700 font-medium">Done</span>
                                    </div>
                                  )}
                                  {result.status === 'To Do' && (
                                    <div className="flex items-center gap-1">
                                      <XCircle className="w-3 h-3 text-red-500" />
                                      <span className="text-xs text-red-700 font-medium">Missing</span>
                                    </div>
                                  )}
                                  {result.status === 'File not in Drawing List' && (
                                    <div className="flex items-center gap-1">
                                      <AlertTriangle className="w-3 h-3 text-yellow-500" />
                                      <span className="text-xs text-yellow-700 font-medium">Extra</span>
                                    </div>
                                  )}
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>

                    {/* Mobile Card View */}
                    <div className="sm:hidden space-y-2">
                      {analysisResult.results.map((result, index) => (
                        <div key={index} className="bg-muted/10 rounded-lg p-3 space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Expected</div>
                            <div className="flex items-center gap-1">
                              {result.status === 'Done' && <CheckCircle className="w-3 h-3 text-green-500" />}
                              {result.status === 'To Do' && <XCircle className="w-3 h-3 text-red-500" />}
                              {result.status === 'File not in Drawing List' && <AlertTriangle className="w-3 h-3 text-yellow-500" />}
                              <span className={`text-xs font-medium ${
                                result.status === 'Done' ? 'text-green-700' :
                                result.status === 'To Do' ? 'text-red-700' : 'text-yellow-700'
                              }`}>
                                {result.status === 'Done' ? 'Done' : result.status === 'To Do' ? 'Missing' : 'Extra'}
                              </span>
                            </div>
                          </div>
                          <div className="text-xs font-medium text-foreground break-all">
                            {result.excelName}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            <span className="font-medium">Matched: </span>
                            <span className={result.matchedFile === 'N/A' ? 'text-muted-foreground' : 'text-foreground'}>
                              {result.matchedFile}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card className="glass-effect h-96 flex items-center justify-center">
                <CardContent className="text-center">
                  <div className="text-muted-foreground mb-4">
                    <FileSpreadsheet className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  </div>
                  <h3 className="text-base font-semibold text-foreground mb-2">
                    Ready to Check Your Deliverables
                  </h3>
                  <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
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
