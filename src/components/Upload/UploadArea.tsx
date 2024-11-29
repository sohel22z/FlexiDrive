import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FolderUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/Button';

interface UploadAreaProps {
  onFileUpload: (files: File[]) => void;
  onCreateNew: () => void;
}

export function UploadArea({ onFileUpload, onCreateNew }: UploadAreaProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onFileUpload(acceptedFiles);
  }, [onFileUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    noClick: true,
  });

  return (
    <div {...getRootProps()} className="relative mb-6">
      <AnimatePresence>
        {isDragActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-center justify-center rounded-2xl border-2 border-dashed border-blue-500 bg-blue-50/80 backdrop-blur-sm"
          >
            <div className="text-center">
              <Upload className="mx-auto h-12 w-12 text-blue-500" />
              <p className="mt-2 text-lg font-medium text-blue-700">Drop files here to upload</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
            <input {...getInputProps()} />
            <div className="relative z-10 text-center">
              <Upload className="mx-auto h-8 w-8 text-blue-500" />
              <h3 className="mt-2 font-medium text-gray-900">Upload Files</h3>
              <p className="mt-1 text-sm text-gray-500">Drag & drop or click to upload</p>
              <Button
                onClick={() => document.querySelector('input[type="file"]')?.click()}
                variant="primary"
                size="sm"
                className="mt-4"
              >
                Choose Files
              </Button>
            </div>
            <div className="absolute inset-0 z-0 opacity-50">
              <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-blue-100" />
              <div className="absolute -bottom-4 -left-4 h-24 w-24 rounded-full bg-indigo-100" />
            </div>
          </div>

          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 p-6">
            <div className="relative z-10 text-center">
              <FolderUp className="mx-auto h-8 w-8 text-purple-500" />
              <h3 className="mt-2 font-medium text-gray-900">Create New Folder</h3>
              <p className="mt-1 text-sm text-gray-500">Organize your files in folders</p>
              <Button
                onClick={onCreateNew}
                variant="primary"
                size="sm"
                className="mt-4 bg-gradient-to-r from-purple-500 to-pink-500"
              >
                New Folder
              </Button>
            </div>
            <div className="absolute inset-0 z-0 opacity-50">
              <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-purple-100" />
              <div className="absolute -bottom-4 -left-4 h-24 w-24 rounded-full bg-pink-100" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}