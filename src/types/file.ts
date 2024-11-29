export interface FileItem {
  id: string;
  name: string;
  type: 'file' | 'folder';
  size?: number;
  modified: Date;
  starred?: boolean;
  content?: string;
  previewUrl?: string;
}