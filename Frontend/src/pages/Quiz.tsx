import React from 'react';
import { quizData } from '../data/mockData';

export const Quiz: React.FC = () => {
  return (
    <div className="max-w-[1400px] mx-auto p-4 sm:p-6 lg:p-8 flex flex-col h-full">
      
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 font-label-sm text-[11px] uppercase tracking-widest text-text-secondary font-semibold mb-2">
            <span>ACADEMIC ASSESSMENT</span>
            <span className="w-1 h-1 rounded-full bg-border-subtle"></span>
            <span>SESSION #QA-4190</span>
          </div>
          <h1 className="font-headline-xl text-3xl sm:text-4xl text-text-primary font-bold tracking-tight">
            {quizData.title}
          </h1>
          <p className="font-body-md text-text-secondary mt-2 max-w-2xl">
            Test your core conceptual mastery and diagnostic stability across applied dimensional structures.
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-surface-card border border-border-subtle rounded-md text-label-sm font-medium text-text-secondary shadow-sm">
            <span className="material-symbols-outlined text-[16px]">topic</span> {quizData.topic}
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-surface-card border border-border-subtle rounded-md text-label-sm font-medium text-text-secondary shadow-sm">
            <span className="material-symbols-outlined text-[16px]">show_chart</span> {quizData.difficulty}
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-surface-card border border-border-subtle rounded-md text-label-sm font-medium text-text-secondary shadow-sm">
            <span className="material-symbols-outlined text-[16px]">format_list_numbered</span> {quizData.totalQuestions} Questions
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-surface-card border border-border-subtle rounded-md text-label-sm font-medium text-text-secondary shadow-sm">
            <span className="material-symbols-outlined text-[16px]">schedule</span> {quizData.timeEstimate}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 flex-1">
        
        {/* Main Quiz Area */}
        <div className="xl:col-span-2 space-y-6 flex flex-col">
          
          {/* Progress & Tools Header */}
          <div className="bg-surface-card border border-border-subtle rounded-xl p-4 shadow-sm flex items-center justify-between gap-4 overflow-x-auto hide-scrollbar">
            <div className="flex flex-col gap-1 min-w-[120px]">
              <span className="font-label-sm text-[10px] uppercase tracking-widest text-text-secondary font-bold">Assessment Phase</span>
              <div className="font-headline-sm text-lg text-text-primary">
                <strong className="font-bold">Question {quizData.question.number}</strong> <span className="text-text-secondary text-base">of {quizData.totalQuestions}</span>
              </div>
            </div>
            
            <div className="flex-1 min-w-[150px] max-w-xs px-4 border-l border-r border-border-subtle hidden sm:block">
              <div className="flex justify-between font-label-sm text-[10px] font-bold tracking-wider mb-1.5 text-text-secondary">
                <span>Overall Progress</span>
                <span className="text-text-primary">{quizData.progress.percent}%</span>
              </div>
              <div className="h-1.5 w-full bg-surface-subtle rounded-full overflow-hidden">
                <div className="h-full bg-copper" style={{ width: `${quizData.progress.percent}%` }}></div>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-surface-subtle border border-border-subtle rounded-md font-label-md font-bold text-text-primary">
                <span className="material-symbols-outlined text-[18px]">hourglass_top</span> {quizData.progress.timeRemaining}
              </div>
              <button className="flex items-center gap-1.5 px-3 py-1.5 text-text-secondary hover:text-text-primary hover:bg-surface-subtle rounded-md transition-colors font-label-md font-medium">
                <span className="material-symbols-outlined text-[18px]">bookmark_border</span> Review
              </button>
            </div>
          </div>

          {/* Question Box */}
          <div className="bg-surface-card border-l-[4px] border-l-primary-navy border-y border-r border-border-subtle rounded-xl flex flex-col flex-1 shadow-sm">
            <div className="p-6 sm:p-8 flex-1">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2 font-label-sm text-[11px] uppercase tracking-widest text-text-secondary font-semibold">
                  <span className="w-2 h-2 rounded-full bg-copper"></span>
                  <span>Question {quizData.question.number} • {quizData.question.type}</span>
                </div>
                <span className="font-label-sm text-[11px] text-text-secondary font-medium">Single response required</span>
              </div>
              
              <h2 className="font-headline-lg text-2xl sm:text-3xl text-text-primary font-bold mb-8 leading-tight">
                {quizData.question.text}
              </h2>

              <div className="space-y-4">
                {quizData.question.options.map((option) => (
                  <label 
                    key={option.id} 
                    className={`flex items-center justify-between p-4 sm:p-5 rounded-xl border-2 cursor-pointer transition-all ${
                      option.isSelected 
                        ? 'border-copper bg-copper/5 shadow-sm' 
                        : 'border-border-subtle bg-surface-card hover:border-input-focus'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded flex items-center justify-center font-headline-sm font-bold shrink-0 transition-colors ${
                        option.isSelected ? 'bg-copper text-white' : 'bg-surface-subtle text-text-secondary'
                      }`}>
                        {option.id}
                      </div>
                      <span className={`font-body-lg ${option.isSelected ? 'text-text-primary font-medium' : 'text-text-primary'}`}>
                        {option.text}
                      </span>
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                      option.isSelected ? 'border-copper bg-copper text-white' : 'border-border-subtle'
                    }`}>
                      {option.isSelected && <span className="material-symbols-outlined text-[14px] font-bold">check</span>}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Question Footer */}
            <div className="p-4 sm:px-8 sm:py-5 border-t border-border-subtle bg-page-bg/50 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button className="text-text-secondary hover:text-text-primary font-label-sm text-[11px] uppercase tracking-wider font-semibold transition-colors flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px]">refresh</span> Clear Selection
              </button>
              
              <div className="flex items-center gap-1 font-label-sm text-[11px] text-text-secondary hidden sm:flex">
                <span className="material-symbols-outlined text-[16px]">keyboard</span>
                Select options with numeric keys 1 – 4
              </div>
            </div>
          </div>

          {/* Bottom Navigation */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-auto">
            <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar max-w-full">
              {[1, 2, 3].map(n => (
                <button key={n} className="w-10 h-10 rounded-lg bg-surface-subtle border border-border-subtle text-success-text flex items-center justify-center shrink-0 hover:bg-border-subtle transition-colors">
                  <span className="material-symbols-outlined text-[16px]">check</span>
                </button>
              ))}
              <button className="w-10 h-10 rounded-lg bg-primary-navy text-white font-label-md font-bold flex items-center justify-center shrink-0 shadow-sm">
                4
              </button>
              {[5, 6, 7, 8, 9, 10].map(n => (
                <button key={n} className="w-10 h-10 rounded-lg bg-surface-card border border-border-subtle text-text-secondary hover:text-text-primary hover:bg-surface-subtle font-label-md font-medium flex items-center justify-center shrink-0 transition-colors">
                  {n}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto shrink-0">
              <button className="flex-1 sm:flex-none px-4 py-3 bg-surface-card hover:bg-surface-subtle border border-border-subtle text-text-primary rounded-lg font-label-md font-bold transition-all flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-[18px]">arrow_back</span> Previous
              </button>
              <button className="flex-1 sm:flex-none px-6 py-3 bg-primary-navy hover:bg-[#314D5E] text-white rounded-lg font-label-md font-bold transition-all flex items-center justify-center gap-2 shadow-sm">
                Next Question <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* Context Banner */}
          <div className="bg-surface-card border-l-[4px] border-l-copper border-y border-r border-border-subtle rounded-xl p-5 sm:p-6 shadow-sm flex gap-4 mt-2">
            <div className="w-10 h-10 rounded-full bg-surface-subtle border border-border-subtle flex items-center justify-center text-copper shrink-0">
              <span className="material-symbols-outlined">track_changes</span>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-label-sm text-[11px] uppercase tracking-widest text-text-primary font-bold">Why you're seeing this question</h4>
                <span className="px-2 py-0.5 bg-surface-subtle border border-border-subtle rounded text-[9px] uppercase tracking-wider font-bold text-text-secondary">Diagnostic Node</span>
              </div>
              <p className="font-body-sm text-text-secondary leading-relaxed">
                Based on your recent module practice, we are evaluating your conceptual retention of <strong className="text-text-primary font-semibold">feature projection and orthogonal decomposition</strong> before advancing you toward high-dimensional manifold optimization.
              </p>
            </div>
          </div>
          
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          
          {/* Active Telemetry */}
          <div className="bg-surface-card border border-border-subtle rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-label-sm text-[11px] uppercase tracking-widest text-text-secondary font-bold">Active Telemetry</h3>
              <span className="px-2 py-0.5 bg-success-container/50 border border-success-text/20 text-success-text rounded text-[10px] uppercase tracking-wider font-bold">Live Session</span>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="bg-surface-subtle border border-border-subtle rounded-lg p-3">
                <div className="font-label-sm text-[10px] text-text-secondary uppercase tracking-wider mb-1">Answered</div>
                <div className="font-headline-sm text-xl text-text-primary font-bold">
                  {quizData.progress.answered} <span className="text-sm text-text-secondary font-medium">/ {quizData.totalQuestions}</span>
                </div>
                <div className="font-label-sm text-[10px] text-success-text mt-1">3 verified</div>
              </div>
              <div className="bg-surface-subtle border border-border-subtle rounded-lg p-3">
                <div className="font-label-sm text-[10px] text-text-secondary uppercase tracking-wider mb-1">Marked Review</div>
                <div className="font-headline-sm text-xl text-text-primary font-bold flex items-center gap-1.5">
                  {quizData.progress.flagged} <span className="text-sm text-text-secondary font-medium">flagged</span>
                </div>
                <div className="font-label-sm text-[10px] text-text-secondary mt-1">Q3 pending</div>
              </div>
            </div>

            <div className="space-y-3 mb-8">
              <div className="flex justify-between font-label-md text-[13px]">
                <span className="text-text-secondary">Historical Topic Accuracy</span>
                <span className="text-text-primary font-bold">86%</span>
              </div>
              <div className="flex gap-1 h-6">
                <div className="flex-1 bg-primary-navy/20 rounded-sm"></div>
                <div className="flex-1 bg-primary-navy/40 rounded-sm"></div>
                <div className="flex-1 bg-primary-navy/60 rounded-sm"></div>
                <div className="flex-1 bg-primary-navy/80 rounded-sm"></div>
                <div className="flex-1 bg-primary-navy rounded-sm"></div>
              </div>
              <div className="flex justify-between font-label-sm text-[10px] uppercase tracking-wider text-text-secondary font-bold">
                <span>Prior Sessions (5)</span>
                <span>Target: 85%+</span>
              </div>
            </div>

            <div className="border-t border-border-subtle pt-6">
              <h3 className="font-label-sm text-[11px] uppercase tracking-widest text-text-secondary font-bold mb-4">Competency Trajectory</h3>
              <div className="space-y-2 mb-6">
                {quizData.competency.map((comp, idx) => (
                  <div key={idx} className={`flex items-center justify-between p-2.5 rounded-lg border ${
                    comp.status === 'Mastered' ? 'bg-surface-subtle border-border-subtle' :
                    comp.status === 'In Progress' ? 'bg-copper/5 border-copper/30' :
                    'bg-page-bg border-border-subtle opacity-70'
                  }`}>
                    <div className="flex items-center gap-2">
                      <span className={`material-symbols-outlined text-[16px] ${
                        comp.status === 'Mastered' ? 'text-success-text' :
                        comp.status === 'In Progress' ? 'text-copper' :
                        'text-text-secondary'
                      }`}>
                        {comp.status === 'Mastered' ? 'check_circle' : comp.status === 'In Progress' ? 'pending' : 'lock'}
                      </span>
                      <span className={`font-label-md text-[13px] ${
                        comp.status === 'In Progress' ? 'text-text-primary font-bold' : 'text-text-secondary'
                      }`}>{comp.name}</span>
                    </div>
                    <span className={`font-label-sm text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded ${
                      comp.status === 'Mastered' ? 'bg-border-subtle text-text-secondary' :
                      comp.status === 'In Progress' ? 'bg-copper/20 text-copper' :
                      'text-text-secondary'
                    }`}>{comp.status}</span>
                  </div>
                ))}
              </div>
              
              <button className="w-full py-3 bg-surface-subtle hover:bg-border-subtle text-text-primary border border-border-subtle rounded-lg font-label-md font-bold transition-all flex items-center justify-center gap-2 shadow-sm mb-3">
                <span className="material-symbols-outlined text-[18px]">fact_check</span>
                <span>Submit Assessment Early</span>
              </button>
              <p className="text-center font-label-sm text-[10px] text-text-secondary">Auto-saves question state upon selection</p>
            </div>
          </div>

          {/* Scholar Support */}
          <div className="bg-surface-card border border-border-subtle rounded-xl p-5 shadow-sm">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-surface-subtle border border-border-subtle flex items-center justify-center text-text-primary shrink-0">
                <span className="material-symbols-outlined text-[16px]">school</span>
              </div>
              <div>
                <h4 className="font-label-md font-bold text-text-primary leading-tight mb-1">Need conceptual clarification?</h4>
                <p className="font-body-sm text-[11px] text-text-secondary">The AI Tutor can pause timer for safe review.</p>
              </div>
            </div>
            <button className="w-full py-2 bg-page-bg hover:bg-surface-subtle border border-border-subtle text-text-primary rounded-lg font-label-md text-[13px] font-medium transition-colors flex items-center justify-between px-3">
              <span>Request Hint (-2 pts)</span>
              <span className="material-symbols-outlined text-[16px] text-text-secondary">help_outline</span>
            </button>
          </div>
          
        </div>
      </div>
    </div>
  );
};
