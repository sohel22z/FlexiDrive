import { CloudOff } from 'lucide-react';
import { motion } from 'framer-motion';

export function EmptyState() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-12"
    >
      <CloudOff className="h-16 w-16 text-gray-400" />
      <h3 className="mt-4 text-lg font-medium text-gray-900">No files yet</h3>
      <p className="mt-1 text-sm text-gray-500">
        Upload files or create folders to get started
      </p>
    </motion.div>
  );
}