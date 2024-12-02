import {
  FolderOpen,
  Star,
  Upload,
  HardDrive,
  FolderPlus,
  ChevronRight,
  Trash2,
  Share2,
  Settings,
  Users,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';
import { Logo } from '../Brand/Logo';

interface SidebarProps {
  currentPath: string;
}

export function Sidebar({ currentPath }: SidebarProps) {
  const navigate = useNavigate();

  const menuItems = [
    { icon: FolderOpen, label: 'My Drive', path: '/' },
    { icon: Star, label: 'Starred', path: '/starred' },
    { icon: Share2, label: 'Shared', path: '/shared' },
    { icon: Trash2, label: 'Trash', path: '/trash' },
  ];

  return (
    <motion.div
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="hidden md:flex h-full w-72 flex-col border-r bg-white px-6 py-8"
    >
      <Link to="/" className="mb-8 block">
        <Logo />
      </Link>

      {/* <div className="space-y-2">
        <Button
          onClick={() => navigate('/')}
          size="md"
          className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all duration-300"
        >
          <FolderPlus className="h-5 w-5" />
          <span>New</span>
        </Button>
        <Button
          onClick={() => navigate('/')}
          variant="secondary"
          size="md"
          className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200"
        >
          <Upload className="h-5 w-5" />
          <span>Upload</span>
        </Button>
      </div> */}

      <nav className="mt-8 space-y-1">
        {menuItems.map(({ icon: Icon, label, path }) => {
          const isActive = currentPath === path;
          return (
            <Link key={path} to={path}>
              <motion.button
                whileHover={{ x: 5 }}
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
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto space-y-4">
        <motion.div 
          className="rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 p-4"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <div className="mb-2 text-sm font-medium text-gray-900">Storage</div>
          <div className="mb-2 h-2 overflow-hidden rounded-full bg-white/50">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '65%' }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-blue-500 to-blue-600"
            />
          </div>
          <div className="text-xs text-gray-700">65% of 100GB used</div>
          <Button
            variant="primary"
            size="sm"
            className="mt-3 w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all duration-300"
          >
            Upgrade Plan
          </Button>
        </motion.div>

        <Link to="/settings">
          <Button
            variant="outline"
            size="sm"
            className="w-full flex items-center justify-center space-x-2 hover:bg-gray-50 transition-colors duration-200"
          >
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}