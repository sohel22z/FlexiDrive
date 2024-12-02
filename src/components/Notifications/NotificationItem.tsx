import { motion } from 'framer-motion';
import { Share2, Upload, Bell } from 'lucide-react';
import type { Notification } from '../../types/notification';

interface NotificationItemProps {
  notification: Notification;
}

export function NotificationItem({ notification }: NotificationItemProps) {
  const getIcon = () => {
    switch (notification.type) {
      case 'share':
        return Share2;
      case 'upload':
        return Upload;
      default:
        return Bell;
    }
  };

  const Icon = getIcon();

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className={`flex items-start space-x-3 rounded-lg p-3 transition-colors ${
        notification.read ? 'bg-white' : 'bg-blue-50'
      }`}
    >
      <div className={`rounded-full p-2 ${
        notification.read ? 'bg-gray-100' : 'bg-blue-100'
      }`}>
        <Icon className={`h-4 w-4 ${
          notification.read ? 'text-gray-500' : 'text-blue-500'
        }`} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-gray-900">{notification.title}</p>
        <p className="mt-1 text-sm text-gray-500 line-clamp-2">{notification.message}</p>
        <p className="mt-1 text-xs text-gray-400">
          {notification.timestamp.toRelativeTimeString()}
        </p>
      </div>
    </motion.div>
  );
}