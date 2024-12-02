import { motion } from 'framer-motion';
import { Settings, X } from 'lucide-react';
import type { Notification } from '../../types/notification';
import { NotificationItem } from './NotificationItem';
import { Button } from '../ui/Button';

interface NotificationDropdownProps {
  notifications: Notification[];
  onClose: () => void;
}

export function NotificationDropdown({ notifications, onClose }: NotificationDropdownProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="absolute right-0 top-12 z-50 w-80 rounded-xl bg-white p-4 shadow-xl ring-1 ring-black ring-opacity-5"
    >
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            className="p-1 hover:bg-gray-100"
            onClick={() => {}}
          >
            <Settings className="h-4 w-4 text-gray-500" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="p-1 hover:bg-gray-100"
            onClick={onClose}
          >
            <X className="h-4 w-4 text-gray-500" />
          </Button>
        </div>
      </div>

      <div className="space-y-2 max-h-[400px] overflow-auto">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <NotificationItem 
              key={notification.id}
              notification={notification}
            />
          ))
        ) : (
          <div className="py-8 text-center text-gray-500">
            <p>No notifications</p>
          </div>
        )}
      </div>

      {notifications.length > 0 && (
        <div className="mt-4 text-center">
          <Button
            variant="ghost"
            size="sm"
            className="text-sm text-blue-600 hover:text-blue-700"
          >
            Mark all as read
          </Button>
        </div>
      )}
    </motion.div>
  );
}