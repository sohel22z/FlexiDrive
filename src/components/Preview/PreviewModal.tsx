import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Star, ExternalLink } from 'lucide-react';
import { Button } from '../ui/Button';
import type { FileItem } from '../../types/file';

interface PreviewModalProps {
  file: FileItem;
  onClose: () => void;
  onToggleStar: () => void;
}

export function PreviewModal({ file, onClose, onToggleStar }: PreviewModalProps) {
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const modalVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  };

  const getPreviewContent = () => {
    const extension = file.name.split('.').pop()?.toLowerCase();
    
    if (file.previewUrl) {
      if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension || '')) {
        return (
          <img
            src={file.previewUrl}
            alt={file.name}
            className="max-h-[60vh] w-auto rounded-lg object-contain"
          />
        );
      } else if (['mp4', 'webm'].includes(extension || '')) {
        return (
          <video
            src={file.previewUrl}
            controls
            className="max-h-[60vh] w-auto rounded-lg"
          />
        );
      }
    }

    return (
      <div className="flex h-[60vh] items-center justify-center rounded-lg bg-gray-50 p-8">
        <div className="text-center">
          <p className="text-lg font-medium text-gray-900">{file.name}</p>
          <p className="mt-2 text-sm text-gray-500">Preview not available</p>
        </div>
      </div>
    );
  };

  return (
    <AnimatePresence>
      <motion.div
        variants={overlayVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
        onClick={onClose}
      >
        <motion.div
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="relative w-full max-w-4xl rounded-2xl bg-white p-4 shadow-xl"
          onClick={e => e.stopPropagation()}
        >
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">{file.name}</h2>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={onToggleStar}
                className={file.starred ? 'text-yellow-500' : 'text-gray-500'}
              >
                <Star className={`h-4 w-4 ${file.starred ? 'fill-yellow-500' : ''}`} />
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                <ExternalLink className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="overflow-hidden rounded-lg">
            {getPreviewContent()}
          </div>

          <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
            <div>
              {file.size && `${(file.size / 1024 / 1024).toFixed(2)} MB`}
            </div>
            <div>
              Modified: {file.modified.toLocaleDateString()}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}