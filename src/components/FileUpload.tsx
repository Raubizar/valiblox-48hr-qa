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
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

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
        // Log subdirectory information
        const filesInSubdirs = files.filter(f => (f.webkitRelativePath || f.name).includes('/'));
        console.log(`🔍 Processing folder with ${files.length} total files (${filesInSubdirs.length} in subdirectories)`);
        
        processedFiles = filterValidDrawingFiles(files);
        setStatusMessage(`Found ${processedFiles.length} valid drawing files out of ${files.length} total files (including subdirectories)`);
      } else {
        setStatusMessage(`Selected ${files.length} file${files.length !== 1 ? 's' : ''}`);
      }
      
      setSelectedFiles(processedFiles);
      setStatus(processedFiles.length > 0 ? 'success' : 'error');
      
      if (processedFiles.length === 0 && webkitdirectory) {
        setStatusMessage('No valid drawing files found in folder or subdirectories. Files must follow structured naming patterns (e.g., ABC-DEF-123).');
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

  const handleButtonClick = () => {
    fileInputRef.current?.click();
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

  return (
    <Card className="w-full glass-effect">
      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            {icon || <FolderOpen className="w-4 h-4 text-primary" />}
            <div>
              <h3 className="font-semibold text-foreground text-sm">{title}</h3>
              <p className="text-xs text-muted-foreground">{description}</p>
            </div>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileSelect}
            accept={accept}
            multiple={multiple}
            {...(webkitdirectory ? { webkitdirectory: 'true' } : {})}
            className="hidden"
          />
          
          <Button
            onClick={handleButtonClick}
            variant="outline"
            className="w-full h-10 text-sm"
            disabled={status === 'processing'}
          >
            <div className="flex items-center gap-2">
              {getStatusIcon()}
              <span>
                {status === 'processing' ? 'Processing...' :
                 selectedFiles.length > 0 ? `${selectedFiles.length} file${selectedFiles.length !== 1 ? 's' : ''} selected` :
                 webkitdirectory ? 'Select Folder' : 'Select File'}
              </span>
            </div>
          </Button>

          {statusMessage && (
            <div className={`p-2 rounded text-xs ${
              status === 'success' ? 'bg-primary/10 text-primary' :
              status === 'error' ? 'bg-red-50 text-red-700' :
              'bg-blue-50 text-blue-700'
            }`}>
              {statusMessage}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
