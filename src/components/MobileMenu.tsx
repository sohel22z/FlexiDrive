import { motion } from 'framer-motion';
import {
  FolderOpen,
  Star,
  Share2,
  Trash2,
  Settings,
  ChevronRight,
} from 'lucide-react';

interface MobileMenuProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  className?: string;
}

export function MobileMenu({ currentPath, onNavigate, className = '' }: MobileMenuProps) {
  const menuItems = [
    { icon: FolderOpen, label: 'My Drive', path: '/' },
    { icon: Star, label: 'Starred', path: '/starred' },
    { icon: Share2, label: 'Shared', path: '/shared' },
    { icon: Trash2, label: 'Trash', path: '/trash' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <nav className={`space-y-2 ${className}`}>
      {menuItems.map(({ icon: Icon, label, path }) => {
        const isActive = currentPath === path;
        return (
          <motion.button
            key={path}
            whileTap={{ scale: 0.98 }}
            onClick={() => onNavigate(path)}
            className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left transition-all duration-200 ${
              isActive
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center space-x-3">
              <Icon
                className={`h-5 w-5 ${
                  isActive ? 'text-blue-600' : 'text-gray-500'
                }`}
              />
              <span className="font-medium">{label}</span>
            </div>
            <ChevronRight
              className={`h-4 w-4 ${
                isActive ? 'text-blue-600' : 'text-gray-400'
              }`}
            />
          </motion.button>
        );
      })}
    </nav>
  );
}