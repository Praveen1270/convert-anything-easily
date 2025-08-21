import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

interface ConversionProgressProps {
  status: 'idle' | 'converting' | 'completed' | 'error';
  progress: number;
  error?: string;
}

export const ConversionProgress: React.FC<ConversionProgressProps> = ({
  status,
  progress,
  error,
}) => {
  if (status === 'idle') return null;

  const getStatusIcon = () => {
    switch (status) {
      case 'converting':
        return <Loader2 className="w-5 h-5 text-primary animate-spin" />;
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-success" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-destructive" />;
      default:
        return null;
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'converting':
        return 'Converting your file...';
      case 'completed':
        return 'Conversion completed successfully!';
      case 'error':
        return error || 'An error occurred during conversion';
      default:
        return '';
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'converting':
        return 'text-primary';
      case 'completed':
        return 'text-success';
      case 'error':
        return 'text-destructive';
      default:
        return 'text-foreground';
    }
  };

  return (
    <Card className="file-card">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            {getStatusIcon()}
            <span className={`font-medium ${getStatusColor()}`}>
              {getStatusText()}
            </span>
          </div>
          
          {status === 'converting' && (
            <div className="space-y-2">
              <Progress 
                value={progress} 
                className="w-full"
              />
              <div className="text-sm text-muted-foreground text-center">
                {progress}% complete
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};