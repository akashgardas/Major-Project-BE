import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ThemeToggle } from '../ui/ThemeToggle';

export const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md transition-colors duration-200 border-b border-border-subtle bg-page-bg/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo / Wordmark */}
        <Link to="/" className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-copper rounded-lg p-1">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center font-semibold text-white shadow-sm transition-transform duration-200 group-hover:scale-[1.02] bg-primary-navy border border-copper/35">
            <svg className="w-5 h-5 text-page-bg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="9"/>
              <path d="M12 3a9 9 0 0 1 9 9" stroke="#B8734A" strokeWidth="2.5"/>
              <circle cx="12" cy="12" r="3.5" fill="currentColor"/>
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-text-primary">LearnSphere</span>
            <span className="text-[10px] uppercase font-semibold tracking-wider -mt-1 text-soft-navy">Agentic Learning</span>
          </div>
        </Link>

        {/* Center Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-[14.5px] font-medium text-text-secondary" aria-label="Main Navigation">
          <a href="#features" className="hover:text-text-primary transition-colors py-1.5 focus:outline-none">Features</a>
          <a href="#how-it-works" className="hover:text-text-primary transition-colors py-1.5 focus:outline-none">How It Works</a>
          <a href="#learning-paths" className="hover:text-text-primary transition-colors py-1.5 focus:outline-none">Learning Paths</a>
          <a href="#adaptive-engine" className="hover:text-text-primary transition-colors py-1.5 focus:outline-none">Adaptive Engine</a>
        </nav>

        {/* Right Action Items & Theme Toggle */}
        <div className="flex items-center gap-3 sm:gap-4">
          <ThemeToggle />
          
          <Link to="/login" className="hidden sm:inline-block text-[14.5px] font-medium px-3 py-2 rounded-lg transition-colors text-text-secondary hover:text-text-primary">
            Log In
          </Link>

          <Link to="/register" className="inline-flex items-center justify-center text-[14.5px] font-semibold px-4 sm:px-5 py-2.5 rounded-lg text-white shadow-sm transition-all duration-150 hover:brightness-105 active:scale-[0.98] bg-copper">
            Get Started
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button 
            type="button" 
            aria-label="Open mobile menu" 
            className="md:hidden p-2 rounded-lg border transition-colors bg-surface-card border-border-subtle text-text-primary"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className="material-symbols-outlined text-[20px]">
              {isMobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-b px-4 py-4 space-y-3 transition-colors bg-surface-card border-border-subtle">
          <a href="#features" className="block text-sm font-medium py-1.5 text-text-primary" onClick={() => setIsMobileMenuOpen(false)}>Features</a>
          <a href="#how-it-works" className="block text-sm font-medium py-1.5 text-text-primary" onClick={() => setIsMobileMenuOpen(false)}>How It Works</a>
          <a href="#learning-paths" className="block text-sm font-medium py-1.5 text-text-primary" onClick={() => setIsMobileMenuOpen(false)}>Learning Paths</a>
          <div className="pt-3 border-t flex flex-col gap-2 border-border-subtle">
            <Link to="/login" className="text-sm font-medium py-2 text-center rounded-lg border border-border-subtle text-text-primary" onClick={() => setIsMobileMenuOpen(false)}>Log In</Link>
            <Link to="/register" className="text-sm font-semibold py-2 text-center rounded-lg text-white bg-copper" onClick={() => setIsMobileMenuOpen(false)}>Get Started</Link>
          </div>
        </div>
      )}
    </header>
  );
};
