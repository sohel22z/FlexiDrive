import { motion, AnimatePresence } from 'framer-motion';
import type { FileItem as FileItemType } from '../../types/file';
import { FileItem } from './FileItem';

interface FileGridProps {
  files: FileItemType[];
  onSelectFile: (file: FileItemType) => void;
}

export function FileGrid({ files, onSelectFile }: FileGridProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
    >
      <AnimatePresence>
        {files.map((file) => (
          <motion.div
            key={file.id}
            variants={item}
            layout
            layoutId={file.id}
          >
            <FileItem file={file} onSelect={onSelectFile} />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}