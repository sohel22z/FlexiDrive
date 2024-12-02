import { Logo } from '../Brand/Logo';
import { Button } from '../ui/Button';
import { Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { NotificationBell } from '../Notifications/NotificationBell';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function Header({ searchQuery, onSearchChange }: HeaderProps) {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-30 border-b bg-white/80 backdrop-blur-sm"
    >
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex md:hidden">
          <Logo showText={false} />
        </div>
        
        <div className="flex-1 max-w-2xl mx-4">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-blue-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search files and folders..."
              className="w-full rounded-lg border border-gray-200 pl-10 pr-4 py-2 text-sm 
                transition-all duration-200 ease-in-out
                focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500
                group-hover:border-gray-300"
            />
            <AnimatePresence>
              {searchQuery && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 
                    hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <X className="h-4 w-4 text-gray-400" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-4">
          <NotificationBell />
          
          <Button
            variant="outline"
            size="sm"
            className="hidden sm:flex items-center space-x-2"
          >
            <span>Upgrade Storage</span>
          </Button>
          
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 cursor-pointer" 
          />
        </div>
      </div>
    </motion.header>
  );
}