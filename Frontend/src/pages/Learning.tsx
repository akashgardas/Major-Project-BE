import React, { useState } from 'react';
import { learningContextData, userProfile } from '../data/mockData';

export const Learning: React.FC = () => {
  const [chatInput, setChatInput] = useState('');
  
  return (
    <div className="max-w-[1400px] mx-auto p-4 sm:p-6 lg:p-8 flex flex-col h-full min-h-[calc(100vh-4rem)]">
      
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 font-label-sm text-[11px] uppercase tracking-widest text-text-secondary font-semibold mb-2">
            <span>ACADEMIC WORKSPACE</span>
            <span className="w-1 h-1 rounded-full bg-border-subtle"></span>
            <span>Session ID #8492</span>
          </div>
          <h1 className="font-headline-xl text-3xl sm:text-4xl text-text-primary font-bold tracking-tight">
            Learning Assistant
          </h1>
          <p className="font-body-md text-text-secondary mt-2 max-w-2xl">
            Learn, practice, and receive bespoke curriculum synthesis anchored directly to your active diagnostic record.
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-surface-card border border-border-subtle rounded-full text-label-sm font-semibold text-text-primary shadow-sm shrink-0">
          <span className="w-2 h-2 rounded-full bg-error-clr"></span>
          Currently learning: Machine Learning Fundamentals
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 flex-1 min-h-0">
        
        {/* Main Chat/Workspace Area */}
        <div className="xl:col-span-2 flex flex-col gap-6 h-full min-h-[600px]">
          
          {/* Current Path Card */}
          <div className="bg-surface-card border border-border-subtle rounded-xl p-5 sm:p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shrink-0">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-surface-subtle flex items-center justify-center text-text-primary border border-border-subtle shrink-0">
                <span className="material-symbols-outlined">account_tree</span>
              </div>
              <div>
                <div className="font-label-sm text-[11px] uppercase tracking-widest text-text-secondary font-semibold mb-1">Current Learning Path</div>
                <h2 className="font-headline-sm text-lg text-text-primary font-bold leading-tight">
                  {learningContextData.currentPath}
                </h2>
                <div className="flex flex-wrap items-center gap-3 mt-2 font-body-sm text-[11px] text-text-secondary">
                  <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">analytics</span> Recent diagnostic: <strong className="text-text-primary font-semibold">{learningContextData.recentDiagnostic}</strong></span>
                  <span className="w-1 h-1 rounded-full bg-border-subtle hidden sm:block"></span>
                  <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">schedule</span> Next milestone {learningContextData.nextMilestone}</span>
                </div>
              </div>
            </div>
            <div className="w-full sm:w-auto flex flex-col sm:items-end gap-3 shrink-0">
              <div className="w-full sm:w-40">
                <div className="flex justify-between font-label-sm text-[11px] font-bold tracking-wider mb-1.5">
                  <span className="text-text-secondary">Progress</span>
                  <span className="text-text-primary">{learningContextData.progress}%</span>
                </div>
                <div className="h-1.5 w-full bg-surface-subtle rounded-full overflow-hidden flex">
                  <div className="h-full bg-primary-navy" style={{ width: `${learningContextData.progress}%` }}></div>
                  <div className="h-full bg-copper" style={{ width: '10%' }}></div>
                </div>
              </div>
              <button className="w-full sm:w-auto px-4 py-2 bg-surface-subtle hover:bg-border-subtle text-text-primary border border-border-subtle rounded-lg font-label-md font-bold transition-colors flex items-center justify-center gap-2">
                View Syllabus <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* Chat Workspace */}
          <div className="bg-surface-card border border-border-subtle rounded-xl flex flex-col flex-1 min-h-0 overflow-hidden shadow-sm">
            {/* Chat Header */}
            <div className="p-4 border-b border-border-subtle flex items-center justify-between bg-page-bg/50 shrink-0">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-text-secondary text-[20px]">psychiatry</span>
                <h3 className="font-headline-sm text-[16px] text-text-primary font-bold">Workspace Dialectic</h3>
              </div>
              <span className="px-2 py-1 bg-copper/10 text-copper border border-copper/20 rounded-md font-label-sm text-[10px] uppercase tracking-wider font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">verified_user</span>
                Active Syllabus Grounded
              </span>
            </div>
            
            {/* Chat Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
              <p className="text-center font-body-sm text-[11px] text-text-secondary">
                Inquire freely, request step-wise derivations, or review previous diagnostic misconceptions.
              </p>
              
              <div className="flex items-start gap-2 max-w-3xl mx-auto bg-error-container/40 border border-error-clr/20 rounded-lg p-3 text-error-clr">
                <span className="material-symbols-outlined text-[18px] shrink-0 mt-0.5">info</span>
                <p className="font-body-sm text-sm">
                  Grounding reference: Harika scored 82% on Yesterday's Feature Selection diagnostic probe.
                </p>
              </div>

              <div className="flex justify-center">
                <span className="px-4 py-1 bg-surface-subtle border border-border-subtle rounded-full text-text-secondary font-label-sm text-[10px] uppercase tracking-wider font-semibold">
                  Session opened with context: Dimensionality Reduction &amp; Mutual Information
                </span>
              </div>

              {/* User Message */}
              <div className="flex items-end gap-3 justify-end">
                <div className="max-w-[80%]">
                  <div className="bg-surface-subtle text-text-primary p-4 rounded-2xl rounded-br-sm border border-border-subtle font-body-md leading-relaxed">
                    Can you explain feature selection in simple terms? I keep mixing up filter methods and wrapper methods.
                  </div>
                  <div className="font-body-sm text-[10px] text-text-secondary text-right mt-1.5">
                    You • 10:14 AM
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-primary-navy text-white flex items-center justify-center font-label-sm font-bold shrink-0 mb-5">
                  {userProfile.avatarInitials}
                </div>
              </div>

              {/* Assistant Message */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-surface-card border border-border-subtle text-text-primary flex items-center justify-center font-label-sm font-bold shrink-0 mt-1 shadow-sm">
                  <span className="material-symbols-outlined text-[16px]">school</span>
                </div>
                <div className="max-w-[85%] border-l-[3px] border-copper pl-4 space-y-4">
                  <p className="font-body-md text-text-primary leading-relaxed">
                    Think of feature selection as curate-before-you-calculate: selecting the most descriptive subset of signals while discarding noise and redundant proxies.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="bg-surface-subtle p-3 rounded-lg border border-border-subtle">
                      <h4 className="font-label-sm text-[11px] font-bold tracking-wider uppercase flex items-center gap-1.5 mb-2 text-text-primary">
                        <span className="material-symbols-outlined text-[14px]">filter_alt</span> Filter Methods
                      </h4>
                      <p className="font-body-sm text-text-secondary text-[13px] leading-relaxed">
                        Ranked purely by statistical metrics (e.g. Pearson correlation or Mutual Information) <em className="italic">independent</em> of any ML algorithm. Fast and cheap.
                      </p>
                    </div>
                    <div className="bg-surface-subtle p-3 rounded-lg border border-border-subtle">
                      <h4 className="font-label-sm text-[11px] font-bold tracking-wider uppercase flex items-center gap-1.5 mb-2 text-text-primary">
                        <span className="material-symbols-outlined text-[14px]">layers</span> Wrapper Methods
                      </h4>
                      <p className="font-body-sm text-text-secondary text-[13px] leading-relaxed">
                        Uses an actual estimator as a scorecard, iteratively adding or pruning features (e.g., Forward Stepwise). Accurate but compute-intensive.
                      </p>
                    </div>
                  </div>

                  <p className="font-body-md text-text-primary leading-relaxed">
                    If predicting real estate appraisal: location and square footage are high-generalizable variance and must be omitted.
                  </p>
                </div>
              </div>
            </div>

            {/* Chat Input Area */}
            <div className="p-4 border-t border-border-subtle bg-page-bg shrink-0">
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="font-label-sm text-[10px] text-text-secondary uppercase tracking-widest flex items-center mr-1">
                  <span className="material-symbols-outlined text-[14px] mr-1">bolt</span> Prompt shortcuts:
                </span>
                {['Explain a concept', 'Quiz me', 'Provide an applied example', 'Summarize'].map((shortcut) => (
                  <button key={shortcut} className="px-3 py-1.5 bg-surface-card border border-border-subtle hover:bg-surface-subtle text-text-primary rounded-full font-label-sm text-[11px] font-medium transition-colors">
                    {shortcut}
                  </button>
                ))}
              </div>
              <div className="relative flex items-end gap-2 bg-surface-card border border-input-border rounded-xl p-2 focus-within:border-input-focus focus-within:ring-1 focus-within:ring-input-focus shadow-sm transition-all">
                <button className="p-2 text-text-secondary hover:text-text-primary transition-colors shrink-0 rounded-lg hover:bg-surface-subtle">
                  <span className="material-symbols-outlined text-[20px]">attach_file</span>
                </button>
                <button className="p-2 text-text-secondary hover:text-text-primary transition-colors shrink-0 rounded-lg hover:bg-surface-subtle">
                  <span className="material-symbols-outlined text-[20px]">mic</span>
                </button>
                <textarea 
                  className="flex-1 bg-transparent border-none focus:ring-0 resize-none max-h-32 min-h-[44px] py-3 text-body-md font-body-md text-text-primary placeholder-text-secondary outline-none"
                  placeholder='Ask anything regarding Feature Selection, or press "Quiz me"'
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  rows={1}
                ></textarea>
                <button className="px-4 py-2.5 bg-primary-navy hover:bg-opacity-90 text-white rounded-lg font-label-md font-bold transition-colors flex items-center justify-center gap-1.5 shrink-0 shadow-sm">
                  Send <span className="material-symbols-outlined text-[16px]">arrow_upward</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6 h-full flex flex-col min-h-0 overflow-y-auto hide-scrollbar pb-6">
          
          {/* Curriculum Context */}
          <div className="bg-surface-card border border-border-subtle rounded-xl p-6 shadow-sm">
            <div className="flex items-start justify-between mb-6">
              <h3 className="font-headline-sm text-lg text-text-primary font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-copper">menu_book</span>
                Curriculum Context
              </h3>
              <div className="text-right">
                <span className="font-label-sm text-[10px] text-text-secondary uppercase tracking-widest block">Unit 3 of 8</span>
              </div>
            </div>

            <div className="bg-surface-subtle border border-border-subtle rounded-lg p-4 mb-6">
              <div className="font-label-sm text-[10px] uppercase tracking-widest text-text-secondary font-bold mb-1">Active Topic</div>
              <div className="font-label-md font-bold text-text-primary leading-tight mb-3">
                {learningContextData.activeTopic}
              </div>
              <div className="flex justify-between font-label-sm text-[11px] font-bold tracking-wider mb-1.5">
                <span className="text-text-secondary">{learningContextData.exercisesCompleted}</span>
                <span className="text-text-primary">68%</span>
              </div>
              <div className="h-1 w-full bg-border-subtle rounded-full overflow-hidden">
                <div className="h-full bg-primary-navy" style={{ width: '68%' }}></div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-6">
              <div className="bg-page-bg border border-border-subtle rounded-lg p-3 text-center">
                <div className="font-label-sm text-[10px] text-text-secondary uppercase tracking-wider mb-1">Diagnostic</div>
                <div className="font-headline-sm text-xl text-text-primary font-bold">{learningContextData.stats.diagnostic}%</div>
                <div className="font-label-sm text-[9px] text-copper uppercase mt-1 font-bold">Top 10%</div>
              </div>
              <div className="bg-page-bg border border-border-subtle rounded-lg p-3 text-center">
                <div className="font-label-sm text-[10px] text-text-secondary uppercase tracking-wider mb-1">Cadence</div>
                <div className="font-headline-sm text-xl text-text-primary font-bold flex items-center justify-center gap-0.5">
                  {learningContextData.stats.cadence} <span className="material-symbols-outlined text-[14px] text-copper">local_fire_department</span>
                </div>
                <div className="font-label-sm text-[9px] text-text-secondary uppercase mt-1">Days Active</div>
              </div>
              <div className="bg-page-bg border border-border-subtle rounded-lg p-3 text-center">
                <div className="font-label-sm text-[10px] text-text-secondary uppercase tracking-wider mb-1">Mastery</div>
                <div className="font-headline-sm text-xl text-text-primary font-bold">{learningContextData.stats.mastery}</div>
                <div className="font-label-sm text-[9px] text-text-secondary uppercase mt-1">Concepts</div>
              </div>
            </div>

            <div>
              <div className="flex justify-between font-label-sm text-[10px] uppercase tracking-wider font-bold mb-2">
                <span className="text-text-secondary">Retention Stability</span>
                <span className="text-text-primary">Stable (0.91)</span>
              </div>
              <div className="flex gap-1 h-6">
                <div className="flex-1 bg-soft-navy/30 rounded-sm"></div>
                <div className="flex-1 bg-soft-navy/50 rounded-sm"></div>
                <div className="flex-1 bg-soft-navy/70 rounded-sm"></div>
                <div className="flex-1 bg-soft-navy/90 rounded-sm"></div>
                <div className="flex-1 bg-primary-navy rounded-sm"></div>
                <div className="flex-1 bg-primary-navy rounded-sm"></div>
                <div className="flex-1 bg-copper rounded-sm"></div>
              </div>
            </div>
          </div>

          {/* Recommended Next */}
          <div className="bg-surface-card border border-border-subtle rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <span className="font-label-sm text-[10px] px-2 py-1 bg-surface-subtle text-text-secondary rounded border border-border-subtle uppercase tracking-wider font-bold">
                Recommended Next
              </span>
              <span className="font-label-sm text-[11px] text-text-secondary font-medium flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">schedule</span> {learningContextData.recommendedNext.time}
              </span>
            </div>
            
            <h4 className="font-headline-sm text-lg text-text-primary font-bold mb-2">
              {learningContextData.recommendedNext.title}
            </h4>
            <p className="font-body-sm text-text-secondary mb-5">
              {learningContextData.recommendedNext.description}
            </p>

            <button className="w-full py-2.5 bg-copper hover:bg-copper-hover text-white rounded-lg font-label-md font-bold transition-all flex items-center justify-center gap-2 shadow-sm">
              <span>Commence Targeted Practice</span>
              <span className="material-symbols-outlined text-[18px]">play_arrow</span>
            </button>
          </div>

          {/* Pinned Syllabus Resources */}
          <div>
            <div className="flex items-center justify-between mb-3 px-1">
              <h4 className="font-label-sm text-[11px] uppercase tracking-widest text-text-secondary font-bold">Pinned Syllabus Resources</h4>
              <span className="material-symbols-outlined text-[16px] text-text-secondary">push_pin</span>
            </div>
            <div className="space-y-2">
              {[
                { icon: 'description', title: 'Variance Inflation Factor Cheat Sheet' },
                { icon: 'menu_book', title: 'PCA vs. LDA Dimensionality Trade-offs' },
                { icon: 'data_object', title: 'Scikit-Learn SelectKBest Reference' }
              ].map((res, i) => (
                <a key={i} href="#" className="flex items-center justify-between p-3 bg-surface-card hover:bg-surface-subtle border border-border-subtle rounded-lg transition-colors group">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <span className="material-symbols-outlined text-[18px] text-copper shrink-0">{res.icon}</span>
                    <span className="font-label-md text-text-primary truncate">{res.title}</span>
                  </div>
                  <span className="material-symbols-outlined text-[16px] text-text-secondary group-hover:text-text-primary transition-colors shrink-0">arrow_outward</span>
                </a>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};
