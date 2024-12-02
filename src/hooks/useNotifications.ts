import { useState, useEffect } from 'react';
import type { Notification } from '../types/notification';

const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'New share request',
    message: 'John Doe wants to share "Project Proposal.pdf" with you',
    timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
    read: false,
    type: 'share'
  },
  {
    id: '2',
    title: 'Upload complete',
    message: 'Your file "presentation.pptx" has been uploaded successfully',
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    read: true,
    type: 'upload'
  },
  {
    id: '3',
    title: 'Storage alert',
    message: 'You\'re running low on storage space. Consider upgrading your plan.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    read: false,
    type: 'system'
  }
];

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(n => ({ ...n, read: true }))
    );
  };

  return {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead
  };
}