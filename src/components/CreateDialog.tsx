import { useState } from 'react';
import { Folder, File, X } from 'lucide-react';
import { Button } from './ui/Button';
import { motion, AnimatePresence } from 'framer-motion';

interface CreateDialogProps {
  onClose: () => void;
  onCreate: (name: string, type: 'file' | 'folder') => void;
}

export function CreateDialog({ onClose, onCreate }: CreateDialogProps) {
  const [name, setName] = useState('');
  const [type, setType] = useState<'file' | 'folder'>('folder');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onCreate(name.trim(), type);
      onClose();
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const dialogVariants = {
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
          variants={dialogVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="relative w-full max-w-md rounded-2xl bg-white p-4 sm:p-6 shadow-xl"
          onClick={e => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute right-3 top-3 sm:right-4 sm:top-4 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>

          <h2 className="mb-4 sm:mb-6 text-xl sm:text-2xl font-semibold text-gray-900">Create New</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <Button
                type="button"
                size="lg"
                variant={type === 'folder' ? 'primary' : 'secondary'}
                onClick={() => setType('folder')}
                className="relative flex items-center overflow-hidden"
              >
                <motion.div
                  animate={{ 
                    backgroundColor: type === 'folder' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0)',
                  }}
                  className="absolute inset-0"
                />
                <Folder className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                Folder
              </Button>
              <Button
                type="button"
                size="lg"
                variant={type === 'file' ? 'primary' : 'secondary'}
                onClick={() => setType('file')}
                className="relative flex items-center overflow-hidden"
              >
                <motion.div
                  animate={{ 
                    backgroundColor: type === 'file' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0)',
                  }}
                  className="absolute inset-0"
                />
                <File className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                File
              </Button>
            </div>

            <div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={`Enter ${type} name`}
                className="w-full rounded-xl border-2 border-gray-200 px-3 py-2 sm:px-4 sm:py-3 text-gray-900 placeholder-gray-400 transition-colors focus:border-blue-500 focus:outline-none"
                autoFocus
              />
            </div>

            <div className="flex justify-end space-x-3">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={!name.trim()}
                className="bg-gradient-to-r from-blue-600 to-blue-700"
              >
                Create
              </Button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}