import { useState, useMemo } from 'react';
import { FileGrid } from '../components/FileList/FileGrid';
import { FileList } from '../components/FileList/FileList';
import { FileHeader } from '../components/FileList/FileHeader';
import { PreviewModal } from '../components/Preview/PreviewModal';
import { EmptyState } from '../components/Brand/EmptyState';
import { useSearch } from '../hooks/useSearch';
import type { FileItem } from '../types/file';
import { loadFiles, saveFiles } from '../services/storage';

interface StarredPageProps {
  searchQuery: string;
}

export function StarredPage({ searchQuery }: StarredPageProps) {
  const [files, setFiles] = useState<FileItem[]>(loadFiles());
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);

  const starredFiles = useMemo(() => 
    files.filter(file => file.starred),
    [files]
  );

  const filteredFiles = useSearch(starredFiles, searchQuery);

  const handleFileSelect = (file: FileItem) => {
    if (file.type === 'folder') return;
    setSelectedFile(file);
  };

  const handleToggleStar = () => {
    if (!selectedFile) return;
    
    const updatedFiles = files.map(f => 
      f.id === selectedFile.id ? { ...f, starred: !f.starred } : f
    );
    setFiles(updatedFiles);
    saveFiles(updatedFiles);
    setSelectedFile(null);
  };

  return (
    <div className="mx-auto max-w-[2000px] px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
      {filteredFiles.length > 0 ? (
        <>
          <FileHeader
            totalFiles={filteredFiles.length}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
          />

          {viewMode === 'grid' ? (
            <FileGrid files={filteredFiles} onSelectFile={handleFileSelect} />
          ) : (
            <FileList files={filteredFiles} onSelectFile={handleFileSelect} />
          )}
        </>
      ) : (
        <EmptyState />
      )}

      {selectedFile && (
        <PreviewModal
          file={selectedFile}
          onClose={() => setSelectedFile(null)}
          onToggleStar={handleToggleStar}
        />
      )}
    </div>
  );
}