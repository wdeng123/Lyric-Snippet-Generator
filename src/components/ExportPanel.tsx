import { useState } from 'react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Download, FileText, Image, FileCode, CheckCircle2 } from 'lucide-react';
import { exportAsText, exportAsImage, exportAsMarkdown, type LyricMetadata } from '../utils/exportUtils';

interface ExportPanelProps {
  lyrics: { verse: string[]; chorus: string[]; bridge: string[] };
  metadata: LyricMetadata;
  printElementId?: string;
}

type ExportStatus = 'idle' | 'exporting' | 'success';
type ExportFormat = 'txt' | 'png' | 'md';

export const ExportPanel = ({ lyrics, metadata, printElementId = 'lyrics-display' }: ExportPanelProps) => {
  const [exportStatus, setExportStatus] = useState<Record<ExportFormat, ExportStatus>>({
    txt: 'idle',
    png: 'idle',
    md: 'idle',
  });

  const handleExport = async (format: ExportFormat) => {
    setExportStatus((prev) => ({ ...prev, [format]: 'exporting' }));

    try {
      switch (format) {
        case 'txt':
          exportAsText(lyrics, metadata);
          break;
        case 'png':
          await exportAsImage(printElementId);
          break;
        case 'md':
          exportAsMarkdown(lyrics, metadata);
          break;
      }

      setExportStatus((prev) => ({ ...prev, [format]: 'success' }));

      // Reset status after 2 seconds
      setTimeout(() => {
        setExportStatus((prev) => ({ ...prev, [format]: 'idle' }));
      }, 2000);
    } catch (error) {
      console.error(`Export as ${format} failed:`, error);
      setExportStatus((prev) => ({ ...prev, [format]: 'idle' }));
      alert(`Failed to export as ${format.toUpperCase()}. Please try again.`);
    }
  };

  const getButtonContent = (format: ExportFormat, icon: typeof FileText, label: string) => {
    const status = exportStatus[format];
    const Icon = icon;

    if (status === 'success') {
      return (
        <>
          <CheckCircle2 className="w-5 h-5 mr-2" />
          Exported!
        </>
      );
    }

    if (status === 'exporting') {
      return (
        <>
          <div className="w-5 h-5 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
          Exporting...
        </>
      );
    }

    return (
      <>
        <Icon className="w-5 h-5 mr-2" />
        {label}
      </>
    );
  };

  return (
    <Card className="mt-6 bg-gradient-to-br from-slate-50 to-gray-50 border-slate-200">
      <div className="flex items-center gap-2 mb-4">
        <Download className="w-5 h-5 text-slate-600" />
        <h3 className="text-lg font-semibold text-gray-800">Export Options</h3>
      </div>

      <p className="text-sm text-gray-600 mb-4">
        Save your lyrics in your preferred format
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Button
          onClick={() => handleExport('txt')}
          variant="secondary"
          size="md"
          className="w-full"
          disabled={exportStatus.txt !== 'idle'}
        >
          {getButtonContent('txt', FileText, 'Export as TXT')}
        </Button>

        <Button
          onClick={() => handleExport('png')}
          variant="secondary"
          size="md"
          className="w-full"
          disabled={exportStatus.png !== 'idle'}
        >
          {getButtonContent('png', Image, 'Export as PNG')}
        </Button>

        <Button
          onClick={() => handleExport('md')}
          variant="secondary"
          size="md"
          className="w-full"
          disabled={exportStatus.md !== 'idle'}
        >
          {getButtonContent('md', FileCode, 'Export as MD')}
        </Button>
      </div>

      <p className="text-xs text-gray-500 mt-4 text-center">
        Exports include all metadata and formatting
      </p>
    </Card>
  );
};
