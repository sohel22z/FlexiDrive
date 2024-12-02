import { LucideIcon } from 'lucide-react';

export interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  type: 'share' | 'upload' | 'system';
  icon?: LucideIcon;
}