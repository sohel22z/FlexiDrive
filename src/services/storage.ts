import type { FileItem } from '../types/file';

const STORAGE_KEY = 'drive_files';

export function loadFiles(): FileItem[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];
  
  const files = JSON.parse(stored);
  return files.map((file: any) => ({
    ...file,
    modified: new Date(file.modified)
  }));
}

export function saveFiles(files: FileItem[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(files));
}

export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}