import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

interface FormatSelectorProps {
  selectedFormat: string;
  onFormatChange: (format: string) => void;
  inputFormat: string;
}

const SUPPORTED_CONVERSIONS: Record<string, string[]> = {
  // Image formats
  'image/png': ['jpg', 'webp', 'gif', 'bmp'],
  'image/jpeg': ['png', 'webp', 'gif', 'bmp'],
  'image/jpg': ['png', 'webp', 'gif', 'bmp'],
  'image/webp': ['png', 'jpg', 'gif', 'bmp'],
  'image/gif': ['png', 'jpg', 'webp', 'bmp'],
  'image/bmp': ['png', 'jpg', 'webp', 'gif'],
  
  // Text formats
  'text/plain': ['json', 'csv', 'xml'],
  'application/json': ['txt', 'csv', 'xml'],
  'text/csv': ['txt', 'json', 'xml'],
  'application/xml': ['txt', 'json', 'csv'],
  'text/xml': ['txt', 'json', 'csv'],
};

const FORMAT_LABELS: Record<string, string> = {
  'png': 'PNG Image',
  'jpg': 'JPG Image',
  'jpeg': 'JPEG Image',
  'webp': 'WebP Image',
  'gif': 'GIF Image',
  'bmp': 'BMP Image',
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
  const availableFormats = SUPPORTED_CONVERSIONS[inputFormat] || [];
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
    <Card className="file-card">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Convert Format</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div className="text-sm text-muted-foreground mb-1">From</div>
            <div className="px-3 py-2 bg-muted/50 rounded-md font-medium">
              {currentFormatName}
            </div>
          </div>
          
          <ArrowRight className="w-5 h-5 text-primary flex-shrink-0" />
          
          <div className="flex-1">
            <div className="text-sm text-muted-foreground mb-1">To</div>
            <Select value={selectedFormat} onValueChange={onFormatChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select format" />
              </SelectTrigger>
              <SelectContent>
                {availableFormats.map((format) => (
                  <SelectItem key={format} value={format}>
                    {FORMAT_LABELS[format] || format.toUpperCase()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};