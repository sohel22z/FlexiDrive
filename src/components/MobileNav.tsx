import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Button } from './ui/Button';

interface MobileNavProps {
  onUpload: () => void;
  onCreateNew: () => void;
}

export function MobileNav({ onUpload, onCreateNew }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  const menuVariants = {
    closed: { opacity: 0, x: "100%" },
    open: { 
      opacity: 1, 
      x: "0%",
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 200
      }
    }
  };

  return (
    <>
      <Button
        variant="outline"
        className="fixed right-4 top-4 z-50 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-y-0 right-0 z-40 w-full bg-white p-6 shadow-xl md:hidden"
          >
            <div className="mt-16 space-y-4">
              <Button
                onClick={() => {
                  onCreateNew();
                  setIsOpen(false);
                }}
                className="w-full justify-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-700"
              >
                Create New
              </Button>
              <Button
                onClick={() => {
                  onUpload();
                  setIsOpen(false);
                }}
                variant="secondary"
                className="w-full justify-center"
              >
                Upload
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}