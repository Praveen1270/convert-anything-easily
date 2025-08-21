import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileUpload } from './FileUpload';
import { FormatSelector } from './FormatSelector';
import { ConversionProgress } from './ConversionProgress';
import { Download, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const FileConverter: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<string>('');
  const [conversionStatus, setConversionStatus] = useState<'idle' | 'converting' | 'completed' | 'error'>('idle');
  const [progress, setProgress] = useState(0);
  const [convertedFileUrl, setConvertedFileUrl] = useState<string | null>(null);
  const [error, setError] = useState<string>('');
  
  const { toast } = useToast();

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setSelectedFormat('');
    setConversionStatus('idle');
    setConvertedFileUrl(null);
    setError('');
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setSelectedFormat('');
    setConversionStatus('idle');
    setConvertedFileUrl(null);
    setError('');
  };

  const convertImageFile = async (file: File, targetFormat: string): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);

        const mimeType = targetFormat === 'jpg' ? 'image/jpeg' : `image/${targetFormat}`;
        canvas.toBlob((blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Failed to convert image'));
          }
        }, mimeType, 0.9);
      };

      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = URL.createObjectURL(file);
    });
  };

  const convertTextFile = async (file: File, targetFormat: string): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = () => {
        try {
          const content = reader.result as string;
          let convertedContent = '';

          if (targetFormat === 'json' && file.type === 'text/csv') {
            // Convert CSV to JSON
            const lines = content.split('\n').filter(line => line.trim());
            const headers = lines[0].split(',').map(h => h.trim());
            const result = lines.slice(1).map(line => {
              const values = line.split(',').map(v => v.trim());
              const obj: any = {};
              headers.forEach((header, index) => {
                obj[header] = values[index] || '';
              });
              return obj;
            });
            convertedContent = JSON.stringify(result, null, 2);
          } else if (targetFormat === 'csv' && file.type === 'application/json') {
            // Convert JSON to CSV
            const data = JSON.parse(content);
            if (Array.isArray(data) && data.length > 0) {
              const headers = Object.keys(data[0]);
              const csvLines = [headers.join(',')];
              data.forEach(item => {
                const values = headers.map(header => item[header] || '');
                csvLines.push(values.join(','));
              });
              convertedContent = csvLines.join('\n');
            }
          } else {
            // Default: just copy content for txt conversion
            convertedContent = content;
          }

          const blob = new Blob([convertedContent], { 
            type: targetFormat === 'json' ? 'application/json' : 'text/plain' 
          });
          resolve(blob);
        } catch (err) {
          reject(new Error('Failed to convert text file'));
        }
      };

      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsText(file);
    });
  };

  const handleConvert = async () => {
    if (!selectedFile || !selectedFormat) return;

    setConversionStatus('converting');
    setProgress(0);
    setError('');

    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 100);

      let convertedBlob: Blob;

      if (selectedFile.type.startsWith('image/')) {
        convertedBlob = await convertImageFile(selectedFile, selectedFormat);
      } else if (selectedFile.type.startsWith('text/') || selectedFile.type === 'application/json') {
        convertedBlob = await convertTextFile(selectedFile, selectedFormat);
      } else if (selectedFile.type.startsWith('video/') || selectedFile.type.startsWith('audio/')) {
        throw new Error('Video and audio conversions require server-side processing and are not available in this demo version.');
      } else if (selectedFile.type.includes('document') || selectedFile.type === 'application/pdf') {
        throw new Error('Document conversions require server-side processing and are not available in this demo version.');
      } else {
        throw new Error('This file type conversion is not supported in the current demo version.');
      }

      clearInterval(progressInterval);
      setProgress(100);

      // Create download URL
      const url = URL.createObjectURL(convertedBlob);
      setConvertedFileUrl(url);
      setConversionStatus('completed');

      toast({
        title: "Conversion completed!",
        description: "Your file has been converted successfully.",
      });
    } catch (err) {
      setConversionStatus('error');
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      
      toast({
        title: "Conversion failed",
        description: err instanceof Error ? err.message : "There was an error converting your file.",
        variant: "destructive",
      });
    }
  };

  const handleDownload = () => {
    if (!convertedFileUrl || !selectedFile) return;

    const link = document.createElement('a');
    link.href = convertedFileUrl;
    
    const fileName = selectedFile.name.replace(/\.[^/.]+$/, '');
    link.download = `${fileName}.${selectedFormat}`;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Download started",
      description: "Your converted file is being downloaded.",
    });
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <Card className="border-0 shadow-lg bg-gradient-to-br from-card to-card/80 backdrop-blur-sm">
        <CardContent className="p-8">
          {!selectedFile ? (
            <FileUpload
              onFileSelect={handleFileSelect}
              selectedFile={selectedFile}
              onRemoveFile={handleRemoveFile}
            />
          ) : (
            <div className="space-y-6">
              {/* File info and actions */}
              <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="text-sm font-medium">{selectedFile.name}</div>
                  <div className="text-xs text-muted-foreground">
                    ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleRemoveFile}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Remove
                </Button>
              </div>

              {/* Conversion interface */}
              <div className="grid md:grid-cols-2 gap-8 items-start">
                {/* Left side - Format selector */}
                <FormatSelector
                  selectedFormat={selectedFormat}
                  onFormatChange={setSelectedFormat}
                  inputFormat={selectedFile.type}
                />

                {/* Right side - Convert section */}
                <div className="space-y-4">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-4">
                      Select the output format and click Convert
                    </p>
                    {selectedFormat && conversionStatus === 'idle' && (
                      <Button
                        onClick={handleConvert}
                        className="convert-button px-8 py-3 text-lg font-semibold w-full"
                        size="lg"
                      >
                        <Zap className="w-5 h-5 mr-2" />
                        Convert
                      </Button>
                    )}
                  </div>

                  <ConversionProgress
                    status={conversionStatus}
                    progress={progress}
                    error={error}
                  />

                  {conversionStatus === 'completed' && convertedFileUrl && (
                    <div className="text-center">
                      <Button
                        onClick={handleDownload}
                        className="bg-success hover:bg-success/90 text-success-foreground px-8 py-3 text-lg font-semibold w-full"
                        size="lg"
                      >
                        <Download className="w-5 h-5 mr-2" />
                        Download Converted File
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};