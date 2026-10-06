import React from 'react';
import { ThemeToggle } from '../ui/ThemeToggle';
import { userProfile } from '../../data/mockData';
import { api } from '../../services/api';

interface TopNavbarProps {
  onMenuClick: () => void;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({ onMenuClick }) => {
  const currentStudent = api.getStudent();
  const avatarInitials = currentStudent?.name ? currentStudent.name[0].toUpperCase() : userProfile.avatarInitials;

  return (
    <header className="h-16 px-4 md:px-8 border-b border-border-subtle bg-surface-card flex items-center justify-between sticky top-0 z-40 transition-colors duration-200">
      
      <div className="flex items-center gap-4 flex-1">
        <button 
          className="md:hidden p-1 text-text-secondary hover:text-text-primary transition-colors"
          onClick={onMenuClick}
          aria-label="Toggle mobile menu"
        >
          <span className="material-symbols-outlined text-[24px]">menu</span>
        </button>

        {/* Search Bar */}
        <div className="relative w-full max-w-md hidden sm:block">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-secondary">
            <span className="material-symbols-outlined text-[18px]">search</span>
          </span>
          <input
            type="text"
            placeholder="Search lessons, concepts, notebooks..."
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-page-bg border border-input-border focus:border-input-focus focus:ring-1 focus:ring-input-focus text-body-sm font-body-sm text-text-primary placeholder-text-secondary/70 transition-all outline-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4 ml-4 shrink-0">
        <button className="relative p-2 text-text-secondary hover:text-text-primary hover:bg-surface-subtle rounded-lg transition-colors">
          <span className="material-symbols-outlined text-[20px]">notifications</span>
          <span className="absolute top-2 right-2 w-2 h-2 bg-error-clr rounded-full border border-surface-card"></span>
        </button>

        <ThemeToggle />

        <div className="hidden sm:flex items-center gap-2 ml-2 pl-4 border-l border-border-subtle cursor-pointer hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 rounded-full bg-primary-navy text-white flex items-center justify-center font-label-lg font-bold">
            {avatarInitials}
          </div>
        </div>
      </div>
    </header>
  );
};
