import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { userProfile } from '../../data/mockData';
import { api } from '../../services/api';

export const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const currentStudent = api.getStudent();
  const displayName = currentStudent?.name || userProfile.name;
  const avatarInitials = displayName ? displayName[0].toUpperCase() : userProfile.avatarInitials;

  const topNavItems = [
    { name: 'Dashboard', path: '/dashboard', icon: 'grid_view' },
    { name: 'Learning', path: '/learning', icon: 'menu_book' },
    { name: 'AI Tutor', path: '/learn', icon: 'psychiatry' },
    { name: 'Quizzes', path: '/quiz', icon: 'quiz' },
    { name: 'Coding Practice', path: '/coding', icon: 'code' },
    { name: 'Documents', path: '/docs', icon: 'folder' },
    { name: 'Progress', path: '/progress', icon: 'trending_up' },
    { name: 'Recommendations', path: '/recommendations', icon: 'hub' },
    { name: 'Interview Prep', path: '/interview', icon: 'record_voice_over' },
  ];

  const handleLogout = async () => {
    await api.logout();
    navigate('/login');
  };

  return (
    <aside className="w-64 bg-surface-subtle dark:bg-page-bg border-r border-border-subtle flex flex-col justify-between h-full overflow-y-auto shrink-0 transition-colors duration-200">
      
      {/* Brand & Top Nav */}
      <div>
        <div className="h-16 px-gutter flex items-center gap-space-xs mb-4">
          <span className="w-8 h-8 rounded-lg bg-primary-navy flex items-center justify-center text-white shrink-0">
            <span className="material-symbols-outlined text-[18px]">auto_stories</span>
          </span>
          <span className="font-headline-sm text-[20px] text-text-primary font-bold tracking-tight shrink-0">LearnSphere</span>
          <span className="ml-auto font-label-sm text-[10px] uppercase tracking-wider text-text-secondary bg-surface-card border border-border-subtle px-1.5 py-0.5 rounded">v2.8</span>
        </div>

        <nav className="px-space-md space-y-1">
          {topNavItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg font-label-md text-[13px] font-medium transition-all ${
                  isActive
                    ? 'bg-primary-navy text-white shadow-sm'
                    : 'text-text-secondary hover:text-text-primary hover:bg-surface-card dark:hover:bg-surface-elevated'
                }`
              }
            >
              <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* User & Bottom Nav */}
      <div className="p-space-md mt-6">
        <div className="flex items-center gap-3 mb-space-sm px-2">
          <div className="w-9 h-9 rounded-full bg-primary-navy text-white flex items-center justify-center font-label-lg font-bold">
            {avatarInitials}
          </div>
          <div>
            <div className="font-label-md text-label-md text-text-primary font-bold truncate max-w-[140px]">{displayName}</div>
            <div className="font-label-sm text-[11px] text-text-secondary uppercase tracking-wider">{userProfile.tier}</div>
          </div>
        </div>
        
        <div className="space-y-1">
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg font-label-md text-[13px] font-medium transition-all ${
                isActive
                  ? 'bg-primary-navy text-white shadow-sm'
                  : 'text-text-secondary hover:text-text-primary hover:bg-surface-card dark:hover:bg-surface-elevated'
              }`
            }
          >
            <span className="material-symbols-outlined text-[18px]">settings</span>
            <span>Settings</span>
          </NavLink>

          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg font-label-md text-[13px] font-medium transition-all text-text-secondary hover:text-text-primary hover:bg-surface-card dark:hover:bg-surface-elevated cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">logout</span>
            <span>Logout</span>
          </button>
        </div>
      </div>
      
    </aside>
  );
};
