import React, { useState, useEffect } from 'react';
import { FileGrid } from './components/FileList/FileGrid';
import { FileList } from './components/FileList/FileList';
import { FileHeader } from './components/FileList/FileHeader';
import { Sidebar } from './components/Sidebar/Sidebar';
import { CreateDialog } from './components/CreateDialog';
import { MobileNav } from './components/MobileNav';
import { UploadArea } from './components/Upload/UploadArea';
import { PreviewModal } from './components/Preview/PreviewModal';
import type { FileItem } from './types/file';
import { loadFiles, saveFiles, generateId } from './services/storage';

function App() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);

  useEffect(() => {
    const storedFiles = loadFiles();
    setFiles(storedFiles);
  }, []);

  const handleFileSelect = (file: FileItem) => {
    if (file.type === 'folder') {
      // Handle folder navigation here
      return;
    }
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
      // Add some example preview URLs for demonstration
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
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar 
        onUpload={() => document.querySelector('input[type="file"]')?.click()}
        onCreateNew={() => setShowCreateDialog(true)}
      />
      <main className="flex-1 overflow-auto">
        <div className="mx-auto max-w-[2000px] px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
          <UploadArea
            onFileUpload={handleFileUpload}
            onCreateNew={() => setShowCreateDialog(true)}
          />
          
          <FileHeader
            totalFiles={files.length}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
          />

          {viewMode === 'grid' ? (
            <FileGrid files={files} onSelectFile={handleFileSelect} />
          ) : (
            <FileList files={files} onSelectFile={handleFileSelect} />
          )}
        </div>
      </main>
      
      <MobileNav
        onUpload={() => document.querySelector('input[type="file"]')?.click()}
        onCreateNew={() => setShowCreateDialog(true)}
      />
      
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

export default App;