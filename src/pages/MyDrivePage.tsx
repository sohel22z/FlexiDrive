import { useState } from 'react';
import { FileGrid } from '../components/FileList/FileGrid';
import { FileList } from '../components/FileList/FileList';
import { FileHeader } from '../components/FileList/FileHeader';
import { CreateDialog } from '../components/CreateDialog';
import { UploadArea } from '../components/Upload/UploadArea';
import { PreviewModal } from '../components/Preview/PreviewModal';
import { EmptyState } from '../components/Brand/EmptyState';
import { useSearch } from '../hooks/useSearch';
import type { FileItem } from '../types/file';
import { loadFiles, saveFiles, generateId } from '../services/storage';

interface MyDrivePageProps {
  searchQuery: string;
}

export function MyDrivePage({ searchQuery }: MyDrivePageProps) {
  const [files, setFiles] = useState<FileItem[]>(loadFiles());
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);

  const filteredFiles = useSearch(files, searchQuery);

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
    setSelectedFile({ ...selectedFile, starred: !selectedFile.starred });
  };

  const handleCreate = (name: string, type: 'file' | 'folder') => {
    const newFile: FileItem = {
      id: generateId(),
      name,
      type,
      modified: new Date(),
      size: type === 'file' ? Math.random() * 1024 * 1024 : undefined,
      previewUrl: type === 'file' && name.match(/\.(jpg|jpeg|png|gif)$/i) 
        ? 'https://source.unsplash.com/random/800x600'
        : undefined
    };
    
    const updatedFiles = [...files, newFile];
    setFiles(updatedFiles);
    saveFiles(updatedFiles);
  };

  const handleFileUpload = (uploadedFiles: File[]) => {
    const processFile = async (file: File): Promise<FileItem> => {
      let previewUrl;
      
      if (file.type.startsWith('image/')) {
        previewUrl = URL.createObjectURL(file);
      }

      return {
        id: generateId(),
        name: file.name,
        type: 'file',
        modified: new Date(),
        size: file.size,
        previewUrl
      };
    };

    Promise.all(uploadedFiles.map(processFile)).then(newFiles => {
      const updatedFiles = [...files, ...newFiles];
      setFiles(updatedFiles);
      saveFiles(updatedFiles);
    });
  };

  return (
    <div className="mx-auto max-w-[2000px] px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
      <UploadArea
        onFileUpload={handleFileUpload}
        onCreateNew={() => setShowCreateDialog(true)}
      />
      
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

      {showCreateDialog && (
        <CreateDialog
          onClose={() => setShowCreateDialog(false)}
          onCreate={handleCreate}
        />
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