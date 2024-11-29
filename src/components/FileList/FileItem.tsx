import { motion } from 'framer-motion';
import { File, Folder, Star, MoreVertical } from 'lucide-react';
import type { FileItem as FileItemType } from '../../types/file';
import { Card } from '../ui/Card';
import { cn } from '../../utils/cn';

interface FileItemProps {
  file: FileItemType;
  onSelect: (file: FileItemType) => void;
  layout?: 'grid' | 'list';
}

export function FileItem({ file, onSelect, layout = 'grid' }: FileItemProps) {
  const iconVariants = {
    initial: { scale: 0.5, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    hover: { rotate: [0, -10, 10, -10, 0], transition: { duration: 0.5 } }
  };

  if (layout === 'list') {
    return (
      <div
        onClick={() => onSelect(file)}
        className="group flex items-center space-x-4 rounded-xl px-4 py-2 hover:bg-gray-50 cursor-pointer"
      >
        <motion.div
          variants={iconVariants}
          initial="initial"
          animate="animate"
          whileHover="hover"
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-50 to-blue-100"
        >
          {file.type === 'folder' ? (
            <Folder className="h-5 w-5 text-blue-600" />
          ) : (
            <File className="h-5 w-5 text-blue-600" />
          )}
        </motion.div>

        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-gray-900 truncate">{file.name}</h3>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <span className="truncate">{file.size ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : '--'}</span>
            <span>•</span>
            <span className="truncate">{file.modified.toLocaleDateString()}</span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {file.starred && (
            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
          )}
          <button className="rounded-full p-1 opacity-0 hover:bg-gray-100 group-hover:opacity-100">
            <MoreVertical className="h-4 w-4 text-gray-500" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <Card
      onClick={() => onSelect(file)}
      className={cn(
        "group cursor-pointer transition-all hover:bg-gray-50",
        layout === 'list' && 'flex items-center space-x-4'
      )}
    >
      <div className="flex items-start space-x-3 sm:space-x-4">
        <motion.div
          variants={iconVariants}
          initial="initial"
          animate="animate"
          whileHover="hover"
          className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-50 to-blue-100"
        >
          {file.type === 'folder' ? (
            <Folder className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
          ) : (
            <File className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
          )}
        </motion.div>

        <div className="flex-1 min-w-0 space-y-1">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-gray-900 truncate pr-2">{file.name}</h3>
            <motion.button
              initial={{ opacity: 0 }}
              whileHover={{ scale: 1.1 }}
              className="rounded-full p-1 opacity-0 hover:bg-gray-100 group-hover:opacity-100 sm:block hidden"
            >
              <MoreVertical className="h-4 w-4 text-gray-500" />
            </motion.button>
          </div>
          
          <div className="flex items-center space-x-2 sm:space-x-4 text-xs sm:text-sm text-gray-500">
            <span className="truncate">{file.size ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : '--'}</span>
            <span>•</span>
            <span className="truncate">{file.modified.toLocaleDateString()}</span>
          </div>
        </div>

        {file.starred && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute right-2 top-2"
          >
            <Star className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400 fill-yellow-400" />
          </motion.div>
        )}
      </div>
    </Card>
  );
}