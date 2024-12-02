import { motion } from 'framer-motion';
import { CloudLightning } from 'lucide-react';

export function Logo({ showText = true }: { showText?: boolean }) {
  return (
    <motion.div 
      className="flex items-center space-x-2"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30
      }}
    >
      <div className="relative">
        <motion.div
          whileHover={{ rotate: [0, -10, 10, -10, 0] }}
          transition={{ duration: 0.5 }}
        >
          <CloudLightning className="h-8 w-8 text-blue-600" />
        </motion.div>
        <motion.div
          className="absolute -inset-1 rounded-full bg-blue-100 -z-10 opacity-50 blur-sm"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
        />
      </div>
      
      {showText && (
        <motion.span 
          className="text-xl font-bold"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            Flexi
          </span>
          <span className="bg-gradient-to-r from-blue-800 to-indigo-600 bg-clip-text text-transparent">
            Drive
          </span>
        </motion.span>
      )}
    </motion.div>
  );
}