import { useState, useEffect, useMemo } from 'react';
import type { FileItem } from '../types/file';

export function useSearch(files: FileItem[], searchQuery: string) {
  const filteredFiles = useMemo(() => {
    if (!searchQuery.trim()) return files;
    
    const query = searchQuery.toLowerCase();
    return files.filter(file => 
      file.name.toLowerCase().includes(query)
    );
  }, [files, searchQuery]);

  return filteredFiles;
}