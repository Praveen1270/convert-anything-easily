import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

interface FormatSelectorProps {
  selectedFormat: string;
  onFormatChange: (format: string) => void;
  inputFormat: string;
}

const SUPPORTED_CONVERSIONS: Record<string, { category: string; formats: string[] }> = {
  // Image formats
  'image/png': { category: 'Image Converter', formats: ['jpg', 'webp', 'gif', 'bmp', 'heic'] },
  'image/jpeg': { category: 'Image Converter', formats: ['png', 'webp', 'gif', 'bmp', 'heic'] },
  'image/jpg': { category: 'Image Converter', formats: ['png', 'webp', 'gif', 'bmp', 'heic'] },
  'image/webp': { category: 'Image Converter', formats: ['png', 'jpg', 'gif', 'bmp', 'heic'] },
  'image/gif': { category: 'Image Converter', formats: ['png', 'jpg', 'webp', 'bmp'] },
  'image/bmp': { category: 'Image Converter', formats: ['png', 'jpg', 'webp', 'gif'] },
  'image/heic': { category: 'Image Converter', formats: ['jpg', 'png', 'webp'] },
  
  // Video formats
  'video/mp4': { category: 'Video Converter', formats: ['mov', 'avi', 'webm', 'gif', 'mp3'] },
  'video/mov': { category: 'Video Converter', formats: ['mp4', 'avi', 'webm', 'gif', 'mp3'] },
  'video/avi': { category: 'Video Converter', formats: ['mp4', 'mov', 'webm', 'gif', 'mp3'] },
  'video/webm': { category: 'Video Converter', formats: ['mp4', 'mov', 'avi', 'gif', 'mp3'] },
  
  // Audio formats
  'audio/mp3': { category: 'Audio Converter', formats: ['wav', 'aac', 'flac', 'ogg'] },
  'audio/wav': { category: 'Audio Converter', formats: ['mp3', 'aac', 'flac', 'ogg'] },
  'audio/aac': { category: 'Audio Converter', formats: ['mp3', 'wav', 'flac', 'ogg'] },
  'audio/flac': { category: 'Audio Converter', formats: ['mp3', 'wav', 'aac', 'ogg'] },
  'audio/ogg': { category: 'Audio Converter', formats: ['mp3', 'wav', 'aac', 'flac'] },
  
  // Document formats
  'application/pdf': { category: 'Document & Ebook', formats: ['docx', 'txt', 'html'] },
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': { category: 'Document & Ebook', formats: ['pdf', 'txt', 'html', 'docx'] },
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': { category: 'Document & Ebook', formats: ['csv', 'xlsx', 'txt'] },
  'text/markdown': { category: 'Document & Ebook', formats: ['epub', 'html', 'pdf', 'txt'] },
  
  // Text formats
  'text/plain': { category: 'Document & Ebook', formats: ['json', 'csv', 'xml', 'html', 'md'] },
  'application/json': { category: 'Document & Ebook', formats: ['txt', 'csv', 'xml'] },
  'text/csv': { category: 'Document & Ebook', formats: ['txt', 'json', 'xml', 'xlsx'] },
  'application/xml': { category: 'Document & Ebook', formats: ['txt', 'json', 'csv'] },
  'text/xml': { category: 'Document & Ebook', formats: ['txt', 'json', 'csv'] },
};

const FORMAT_LABELS: Record<string, string> = {
  // Images
  'png': 'PNG Image',
  'jpg': 'JPG Image', 
  'jpeg': 'JPEG Image',
  'webp': 'WebP Image',
  'gif': 'GIF Image',
  'bmp': 'BMP Image',
  'heic': 'HEIC Image',
  
  // Video
  'mp4': 'MP4 Video',
  'mov': 'MOV Video',
  'avi': 'AVI Video',
  'webm': 'WebM Video',
  
  // Audio
  'mp3': 'MP3 Audio',
  'wav': 'WAV Audio',
  'aac': 'AAC Audio',
  'flac': 'FLAC Audio',
  'ogg': 'OGG Audio',
  
  // Documents
  'pdf': 'PDF Document',
  'docx': 'Word Document',
  'xlsx': 'Excel Spreadsheet',
  'epub': 'ePub Ebook',
  'html': 'HTML Document',
  'md': 'Markdown File',
  
  // Text
  'txt': 'Text File',
  'json': 'JSON File',
  'csv': 'CSV File',
  'xml': 'XML File',
};

export const FormatSelector: React.FC<FormatSelectorProps> = ({
  selectedFormat,
  onFormatChange,
  inputFormat,
}) => {
  const conversionData = SUPPORTED_CONVERSIONS[inputFormat];
  const availableFormats = conversionData?.formats || [];
  const category = conversionData?.category || '';
  const currentFormatName = inputFormat.split('/').pop()?.toUpperCase() || 'Unknown';

  if (availableFormats.length === 0) {
    return (
      <Card className="file-card">
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">
            No conversions available for this file type yet.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="file-card border-dashed border-2 border-muted">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{category}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="text-sm text-muted-foreground">
            Converting from <strong>{currentFormatName}</strong>
          </div>
          
          <Select value={selectedFormat} onValueChange={onFormatChange}>
            <SelectTrigger className="w-full bg-yellow-300 text-black border-yellow-400 hover:bg-yellow-400">
              <SelectValue placeholder="Select..." />
            </SelectTrigger>
            <SelectContent className="bg-background border z-50">
              {availableFormats.map((format) => (
                <SelectItem 
                  key={format} 
                  value={format}
                  className="hover:bg-muted cursor-pointer"
                >
                  {FORMAT_LABELS[format] || format.toUpperCase()}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};