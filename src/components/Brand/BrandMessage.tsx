import { motion } from 'framer-motion';
import { Logo } from './Logo';

interface BrandMessageProps {
  title: string;
  message: string;
  className?: string;
}

export function BrandMessage({ title, message, className = '' }: BrandMessageProps) {
  return (
    <motion.div 
      className={`text-center ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30
      }}
    >
      <div className="mb-6">
        <Logo showText={false} />
      </div>
      <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
      <p className="mt-2 text-gray-600">{message}</p>
    </motion.div>
  );
}