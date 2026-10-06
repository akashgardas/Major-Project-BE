import React from 'react';
import { ThemeToggle } from '../ui/ThemeToggle';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col w-full min-h-screen lg:flex-row bg-page-bg">
      {/* LEFT EDITORIAL BRAND PANEL (~42% desktop) */}
      <aside className="relative flex flex-col justify-between w-full lg:w-[42%] bg-page-bg text-text-primary p-space-lg lg:p-margin overflow-hidden border-b lg:border-b-0 lg:border-r border-border-subtle">
        {/* Subtle Architectural Grid Background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(to right, var(--grid-line-color) 1px, transparent 1px), linear-gradient(to bottom, var(--grid-line-color) 1px, transparent 1px)',
            backgroundSize: '36px 36px',
          }}
        ></div>
        
        {/* Top Metadata & Monogram */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-space-sm">
            <div className="w-10 h-10 rounded-lg bg-surface-card flex items-center justify-center border border-border-subtle shadow-sm">
              <svg className="w-5 h-5 text-primary-navy dark:text-copper" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <circle className="opacity-30" cx="12" cy="12" r="9" strokeDasharray="2 2"></circle>
                <circle className="opacity-75" cx="12" cy="12" r="5"></circle>
                <circle cx="12" cy="12" fill="currentColor" r="2"></circle>
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-headline-sm text-headline-sm text-text-primary tracking-tight leading-none font-bold">LearnSphere</span>
              <span className="font-label-sm text-label-sm text-soft-navy mt-1 uppercase tracking-widest">Cognitive Core</span>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-card border border-border-subtle text-soft-navy font-label-sm text-label-sm tracking-wide shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-copper"></span>
            v2.8 ACADEMIC
          </span>
        </div>

        {/* Center Narrative & Interactive Knowledge Graph Map */}
        <div className="relative z-10 my-space-xl lg:my-auto flex flex-col gap-space-lg">
          <div className="space-y-space-sm max-w-lg">
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-copper font-semibold">Autonomous Pedagogy</span>
            <h1 className="font-serif-italic text-headline-xl lg:text-[40px] leading-[1.15] text-text-primary font-medium tracking-tight">
              Learn with intention. <br />
              <span className="italic font-normal text-copper">Grow with direction.</span>
            </h1>
            <p className="font-body-lg text-body-lg text-text-secondary max-w-md pt-space-xs leading-relaxed">
              Your personalized learning trajectory, calibrated continuously by discreet cognitive agents built around your intellectual milestones.
            </p>
          </div>

          {/* Verified Mastery Roadmap Visualization */}
          <div className="w-full bg-surface-card rounded-xl p-space-md border border-border-subtle shadow-sm hidden sm:block">
            <div className="flex items-center justify-between pb-space-sm border-b border-border-subtle">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-copper">insights</span>
                <span className="font-label-md text-label-md text-text-primary uppercase tracking-wider font-semibold">Curriculum Path</span>
              </div>
              <span className="font-label-sm text-label-sm px-2.5 py-0.5 rounded-md bg-surface-subtle text-primary-navy dark:text-text-primary border border-border-subtle font-mono font-medium">
                Velocity +14%
              </span>
            </div>
            
            <div className="pt-space-md space-y-space-md">
              {/* Node 1: Completed */}
              <div className="flex items-center gap-space-md">
                <div className="relative flex items-center justify-center w-7 h-7 rounded-full bg-primary-navy text-white shadow-sm font-label-sm font-bold shrink-0">
                  <span className="material-symbols-outlined text-[16px]">check</span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-label-md text-label-md text-text-primary font-medium truncate">Python Fundamentals</span>
                    <span className="font-label-sm text-label-sm text-text-secondary">100% Mastery</span>
                  </div>
                  <div className="w-full h-1.5 bg-surface-subtle rounded-full mt-1.5 overflow-hidden">
                    <div className="w-full h-full bg-primary-navy"></div>
                  </div>
                </div>
              </div>
              <div className="w-0.5 h-3 bg-border-subtle ml-3.5 -my-2"></div>
              
              {/* Node 2: Completed */}
              <div className="flex items-center gap-space-md">
                <div className="relative flex items-center justify-center w-7 h-7 rounded-full bg-primary-navy text-white shadow-sm font-label-sm font-bold shrink-0">
                  <span className="material-symbols-outlined text-[16px]">check</span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-label-md text-label-md text-text-primary font-medium truncate">Data Structures &amp; Algorithms</span>
                    <span className="font-label-sm text-label-sm text-text-secondary">100% Mastery</span>
                  </div>
                  <div className="w-full h-1.5 bg-surface-subtle rounded-full mt-1.5 overflow-hidden">
                    <div className="w-full h-full bg-primary-navy"></div>
                  </div>
                </div>
              </div>
              <div className="w-0.5 h-3 bg-copper/50 ml-3.5 -my-2"></div>
              
              {/* Node 3: Active */}
              <div className="flex items-center gap-space-md p-space-xs rounded-lg bg-surface-subtle/80 border border-copper/35">
                <div className="relative flex items-center justify-center w-7 h-7 rounded-full bg-copper/15 text-copper font-label-sm font-bold shrink-0">
                  <span className="w-2.5 h-2.5 rounded-full bg-copper"></span>
                  <span className="absolute inset-0 rounded-full border border-copper animate-ping opacity-40"></span>
                </div>
                <div className="min-w-0 flex-1 pr-1">
                  <div className="flex items-center justify-between">
                    <span className="font-label-md text-label-md text-copper font-semibold truncate">Machine Learning Foundations</span>
                    <span className="font-label-sm text-label-sm text-copper font-mono font-medium">68% Active</span>
                  </div>
                  <div className="w-full h-1.5 bg-border-subtle rounded-full mt-1.5 overflow-hidden">
                    <div className="w-[68%] h-full bg-copper"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Proof of Rigor & Trust Standards */}
        <div className="relative z-10 pt-space-md border-t border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm text-text-secondary">
          <p className="font-body-sm text-body-sm italic">
            "Engineered for intellectual retention and adaptive mastery."
          </p>
          <div className="flex items-center gap-2 font-label-sm text-label-sm uppercase tracking-wider shrink-0 bg-surface-card px-2.5 py-1 rounded border border-border-subtle shadow-sm">
            <span className="material-symbols-outlined text-[15px] text-copper">verified_user</span>
            <span className="font-medium">FERPA • SOC-2 TYPE II</span>
          </div>
        </div>
      </aside>

      {/* RIGHT AUTHENTICATION PANEL */}
      <main className="flex-1 flex flex-col relative w-full lg:w-[58%]">
        <div className="absolute top-space-lg right-space-lg lg:top-margin lg:right-margin">
          <ThemeToggle />
        </div>
        <div className="flex-1 flex items-center justify-center px-gutter-mobile py-space-xl lg:px-0">
          <div className="w-full max-w-[420px]">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};
