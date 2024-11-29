import { motion } from 'framer-motion';
import type { FileItem as FileItemType } from '../../types/file';
import { FileItem } from './FileItem';

interface FileListProps {
  files: FileItemType[];
  onSelectFile: (file: FileItemType) => void;
}

export function FileList({ files, onSelectFile }: FileListProps) {
  return (
    <div className="divide-y divide-gray-100">
      {files.map((file) => (
        <motion.div
          key={file.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="py-2"
        >
          <FileItem file={file} onSelect={onSelectFile} layout="list" />
        </motion.div>
      ))}
    </div>
  );
}