import { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Sidebar } from '../Sidebar/Sidebar';
import { Header } from './Header';
import { MobileNav } from '../MobileNav';
import { MyDrivePage } from '../../pages/MyDrivePage';
import { StarredPage } from '../../pages/StarredPage';
import { SharedPage } from '../../pages/SharedPage';
import { TrashPage } from '../../pages/TrashPage';
import { SettingsPage } from '../../pages/SettingsPage';

export function AppLayout() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const location = useLocation();

  const handleCreateNew = () => {
    setShowCreateDialog(true);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar currentPath={location.pathname} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        
        <main className="flex-1 overflow-auto">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route 
                path="/" 
                element={<MyDrivePage searchQuery={searchQuery} />} 
              />
              <Route 
                path="/starred" 
                element={<StarredPage searchQuery={searchQuery} />} 
              />
              <Route 
                path="/shared" 
                element={<SharedPage searchQuery={searchQuery} />} 
              />
              <Route 
                path="/trash" 
                element={<TrashPage searchQuery={searchQuery} />} 
              />
              <Route 
                path="/settings" 
                element={<SettingsPage />} 
              />
            </Routes>
          </AnimatePresence>
        </main>
      </div>
      
      <MobileNav 
        onCreateNew={handleCreateNew}
      />
    </div>
  );
}