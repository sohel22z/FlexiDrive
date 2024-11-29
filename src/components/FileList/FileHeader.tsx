import { Grid2X2, List, SortAsc } from 'lucide-react';
import { Button } from '../ui/Button';

interface FileHeaderProps {
  totalFiles: number;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
}

export function FileHeader({ totalFiles, viewMode, onViewModeChange }: FileHeaderProps) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <h2 className="text-lg font-medium text-gray-900">
        All Files
        <span className="ml-2 text-sm text-gray-500">({totalFiles} items)</span>
      </h2>
      
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          className="hidden sm:flex items-center space-x-1"
        >
          <SortAsc className="h-4 w-4" />
          <span>Sort</span>
        </Button>

        <div className="flex items-center rounded-lg border border-gray-200">
          <Button
            variant={viewMode === 'grid' ? 'primary' : 'outline'}
            size="sm"
            className="rounded-r-none border-0"
            onClick={() => onViewModeChange('grid')}
          >
            <Grid2X2 className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'primary' : 'outline'}
            size="sm"
            className="rounded-l-none border-0"
            onClick={() => onViewModeChange('list')}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}