import { useState, useRef } from 'react';
import { Upload, X, FileText, FolderOpen, CheckCircle, AlertCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { filterValidDrawingFiles } from '@/lib/drawing-list-utils';

interface FileUploadProps {
  onFilesSelected: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  webkitdirectory?: boolean;
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export const FileUpload = ({ 
  onFilesSelected, 
  accept, 
  multiple = false, 
  webkitdirectory = false,
  title,
  description,
  icon
}: FileUploadProps) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    processFiles(files);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    processFiles(files);
  };

  const processFiles = (files: File[]) => {
    setStatus('processing');
    setStatusMessage('Processing files...');

    try {
      let processedFiles = files;
      
      // If this is for drawing files (folder upload), filter them
      if (webkitdirectory) {
        processedFiles = filterValidDrawingFiles(files);
        setStatusMessage(`Found ${processedFiles.length} valid drawing files out of ${files.length} total files`);
      } else {
        setStatusMessage(`Selected ${files.length} file${files.length !== 1 ? 's' : ''}`);
      }
      
      setSelectedFiles(processedFiles);
      setStatus(processedFiles.length > 0 ? 'success' : 'error');
      
      if (processedFiles.length === 0 && webkitdirectory) {
        setStatusMessage('No valid drawing files found. Files must follow structured naming patterns (e.g., ABC-DEF-123).');
      }
      
      onFilesSelected(processedFiles);
    } catch (error) {
      setStatus('error');
      setStatusMessage(`Error processing files: ${(error as Error).message}`);
    }
  };

  const clearFiles = () => {
    setSelectedFiles([]);
    setStatus('idle');
    setStatusMessage('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onFilesSelected([]);
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return icon || <Upload className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'success':
        return 'border-green-200 bg-green-50';
      case 'error':
        return 'border-red-200 bg-red-50';
      case 'processing':
        return 'border-blue-200 bg-blue-50';
      default:
        return isDragOver ? 'border-primary bg-primary/5' : 'border-dashed border-gray-300 bg-gray-50';
    }
  };

  return (
    <Card className="w-full glass-effect">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            {icon || <FolderOpen className="w-5 h-5 text-primary" />}
            <div>
              <h3 className="font-semibold text-foreground text-sm">{title}</h3>
              <p className="text-xs text-muted-foreground">{description}</p>
            </div>
          </div>

          <div
            className={`relative border-2 rounded-lg p-8 text-center transition-all duration-200 ${getStatusColor()}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileSelect}
              accept={accept}
              multiple={multiple}
              {...(webkitdirectory ? { webkitdirectory: 'true' } : {})}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            
            <div className="space-y-4">
              <div className="flex justify-center">
                {getStatusIcon()}
              </div>
              
              {selectedFiles.length === 0 ? (
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {webkitdirectory ? 'Click to select folder or drag folder here' : 'Click to select files or drag files here'}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {accept ? `Supported formats: ${accept}` : 'All file types supported'}
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-foreground">
                    {selectedFiles.length} file{selectedFiles.length !== 1 ? 's' : ''} selected
                  </p>
                  {selectedFiles.length <= 5 && (
                    <div className="space-y-1">
                      {selectedFiles.map((file, index) => (
                        <div key={index} className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                          <FileText className="w-3 h-3" />
                          <span className="truncate max-w-xs">{file.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {statusMessage && (
            <div className={`p-3 rounded-lg text-xs ${
              status === 'success' ? 'bg-primary/10 text-primary border border-primary/20' :
              status === 'error' ? 'bg-red-50 text-red-700 border border-red-200' :
              'bg-blue-50 text-blue-700 border border-blue-200'
            }`}>
              {statusMessage}
            </div>
          )}

          {selectedFiles.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={clearFiles}
              className="w-full"
            >
              <X className="w-4 h-4 mr-2" />
              Clear Selection
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
