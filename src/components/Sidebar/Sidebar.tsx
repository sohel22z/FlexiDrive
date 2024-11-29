import { FolderOpen, Star, Upload, HardDrive, FolderPlus, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';

interface SidebarProps {
  onUpload: () => void;
  onCreateNew: () => void;
}

export function Sidebar({ onUpload, onCreateNew }: SidebarProps) {
  const sidebarVariants = {
    hidden: { x: -300, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    }
  };

  const itemVariants = {
    hover: { x: 5, transition: { duration: 0.2 } }
  };

  return (
    <motion.div
      variants={sidebarVariants}
      initial="hidden"
      animate="visible"
      className="hidden md:flex h-full w-72 flex-col border-r bg-white px-6 py-8"
    >
      <div className="space-y-3">
        <Button
          onClick={onCreateNew}
          size="lg"
          className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-700"
        >
          <FolderPlus className="h-5 w-5" />
          <span>New</span>
        </Button>
        <Button
          onClick={onUpload}
          variant="secondary"
          size="lg"
          className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-gray-50 to-gray-100"
        >
          <Upload className="h-5 w-5" />
          <span>Upload</span>
        </Button>
      </div>

      <nav className="mt-8 space-y-1">
        {[
          { icon: FolderOpen, label: 'My Drive', active: true },
          { icon: Star, label: 'Starred' },
          { icon: HardDrive, label: 'Storage' },
        ].map(({ icon: Icon, label, active }) => (
          <motion.button
            key={label}
            variants={itemVariants}
            whileHover="hover"
            className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left transition-colors ${
              active 
                ? 'bg-blue-50 text-blue-600' 
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center space-x-3">
              <Icon className={`h-5 w-5 ${active ? 'text-blue-600' : 'text-gray-500'}`} />
              <span className="font-medium">{label}</span>
            </div>
            <ChevronRight className={`h-4 w-4 ${active ? 'text-blue-600' : 'text-gray-400'}`} />
          </motion.button>
        ))}
      </nav>

      <div className="mt-auto">
        <div className="rounded-xl bg-gray-50 p-4">
          <div className="mb-2 text-sm font-medium text-gray-600">Storage</div>
          <div className="mb-2 h-2 overflow-hidden rounded-full bg-gray-200">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "65%" }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-blue-500 to-blue-600"
            />
          </div>
          <div className="text-xs text-gray-500">
            65% of 100GB used
          </div>
        </div>
      </div>
    </motion.div>
  );
}