import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, File, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface FileWithPreview extends File {
  preview?: string;
}

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  selectedFile?: File | null;
  onRemoveFile: () => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelect,
  selectedFile,
  onRemoveFile,
}) => {
  const [isDragActive, setIsDragActive] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0] as FileWithPreview;
      onFileSelect(file);
    }
    setIsDragActive(false);
  }, [onFileSelect]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
    onDragEnter: () => setIsDragActive(true),
    onDragLeave: () => setIsDragActive(false),
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.bmp', '.svg'],
      'text/*': ['.txt', '.csv', '.json', '.xml'],
      'application/*': ['.pdf', '.docx', '.zip']
    }
  });

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (selectedFile) {
    return (
      <Card className="file-card p-6">
        <CardContent className="p-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <File className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">{selectedFile.name}</p>
                <p className="text-sm text-muted-foreground">
                  {formatFileSize(selectedFile.size)}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onRemoveFile}
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div
      {...getRootProps()}
      className={`upload-zone text-center cursor-pointer transition-all duration-300 ${
        isDragActive 
          ? 'border-primary bg-primary/5 scale-105' 
          : 'hover:bg-card/70'
      }`}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center gap-4">
        <div className={`w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center transition-all duration-300 ${
          isDragActive ? 'bg-primary/20 scale-110' : ''
        }`}>
          <Upload className={`w-8 h-8 text-primary transition-transform duration-300 ${
            isDragActive ? 'scale-110' : ''
          }`} />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Drop your file here
          </h3>
          <p className="text-muted-foreground mb-4">
            or click to browse from your computer
          </p>
          <div className="text-sm text-muted-foreground">
            Supports images, documents, and text files
          </div>
        </div>
      </div>
    </div>
  );
};