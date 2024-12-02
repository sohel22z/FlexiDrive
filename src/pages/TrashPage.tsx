import { motion } from 'framer-motion';
import { Trash2 } from 'lucide-react';
import { Button } from '../components/ui/Button';

export function TrashPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <Trash2 className="mx-auto h-16 w-16 text-gray-400" />
        <h2 className="mt-4 text-xl font-semibold text-gray-900">Trash is Empty</h2>
        <p className="mt-2 text-gray-600">
          Items in trash will be automatically deleted after 30 days
        </p>
        <Button
          variant="outline"
          className="mt-4"
        >
          Empty Trash
        </Button>
      </motion.div>
    </div>
  );
}