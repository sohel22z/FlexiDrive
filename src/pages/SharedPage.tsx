import { motion } from 'framer-motion';
import { Users } from 'lucide-react';

export function SharedPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <Users className="mx-auto h-16 w-16 text-blue-500 opacity-50" />
        <h2 className="mt-4 text-xl font-semibold text-gray-900">Shared Files</h2>
        <p className="mt-2 text-gray-600">
          Coming soon! Share and collaborate on files with others.
        </p>
      </motion.div>
    </div>
  );
}