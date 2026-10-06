import React from 'react';
import { dashboardData } from '../data/mockData';
import { Link } from 'react-router-dom';

export const Dashboard: React.FC = () => {
  return (
    <div className="max-w-[1400px] mx-auto p-4 sm:p-6 lg:p-8">
      
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 font-label-sm text-[11px] uppercase tracking-widest text-text-secondary font-semibold mb-2">
            <span>{dashboardData.academicCohort}</span>
            <span className="w-1 h-1 rounded-full bg-border-subtle"></span>
            <span>{dashboardData.specialization}</span>
          </div>
          <h1 className="font-headline-xl text-3xl sm:text-4xl text-text-primary font-bold tracking-tight flex items-center gap-3">
            {dashboardData.greeting} <span className="text-3xl animate-bounce" style={{animationDuration: '2s'}}>👋</span>
          </h1>
          <p className="font-body-md text-text-secondary mt-2 max-w-2xl">
            Ready to continue your learning journey? Your next recommended step is calibrated and ready.
          </p>
        </div>
        
        <div className="flex items-center gap-3 bg-surface-card border border-border-subtle rounded-xl p-3 shadow-sm shrink-0">
          <div className="w-10 h-10 rounded-lg bg-surface-subtle flex items-center justify-center text-copper">
            <span className="material-symbols-outlined">local_fire_department</span>
          </div>
          <div>
            <div className="font-label-md text-text-primary font-bold">{dashboardData.streak}</div>
            <div className="font-label-sm text-text-secondary">{dashboardData.pacingScore}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Left/Main Column */}
        <div className="xl:col-span-2 space-y-6">
          
          {/* Continue Learning */}
          <div className="bg-surface-card border-t-[4px] border-t-primary-navy border-x border-b border-border-subtle rounded-xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
            <div className="flex items-start justify-between gap-4 mb-6">
              <div className="flex items-center gap-2 font-label-sm text-[11px] uppercase tracking-widest text-copper font-semibold">
                <span className="w-2 h-2 rounded-full bg-copper"></span>
                <span>Active Module • Machine Learning Fundamentals</span>
              </div>
              <div className="px-2.5 py-1 bg-surface-subtle border border-border-subtle rounded-md font-label-sm text-text-secondary whitespace-nowrap">
                {dashboardData.activeModule.timeRemaining}
              </div>
            </div>
            
            <h2 className="font-headline-lg text-2xl sm:text-3xl text-text-primary font-bold tracking-tight mb-3">
              {dashboardData.activeModule.title}
            </h2>
            <p className="font-body-lg text-text-secondary max-w-2xl mb-8">
              {dashboardData.activeModule.lessonInfo}
            </p>

            <div className="mb-6">
              <div className="flex justify-between font-label-sm text-[11px] font-bold tracking-wider uppercase mb-2">
                <span className="text-text-primary">{dashboardData.activeModule.progress}% Complete</span>
                <span className="text-text-secondary">12 of 18 lessons mastered</span>
              </div>
              <div className="h-2 w-full bg-surface-subtle rounded-full overflow-hidden">
                <div className="h-full bg-primary-navy" style={{ width: `${dashboardData.activeModule.progress}%` }}></div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-8">
              <button className="px-6 py-2.5 bg-primary-navy hover:bg-[#314D5E] text-white rounded-lg font-label-lg font-medium transition-colors flex items-center justify-center gap-2 group">
                <span>Continue Learning</span>
                <span className="material-symbols-outlined text-[18px] group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
              </button>
              <button className="flex items-center justify-center gap-2 text-copper hover:text-copper-hover font-label-md font-medium transition-colors">
                <span className="material-symbols-outlined text-[18px]">account_tree</span>
                <span>View Curriculum Graph</span>
              </button>
            </div>
          </div>

          {/* Today's Learning Plan */}
          <div className="bg-surface-card border border-border-subtle rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-headline-md text-xl text-text-primary font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-text-secondary">calendar_today</span>
                Today's Learning Plan
              </h2>
              <span className="font-label-sm text-text-secondary uppercase tracking-wider">1 of 4 completed</span>
            </div>

            <div className="space-y-3">
              {dashboardData.learningPlan.map((item) => (
                <div key={item.id} className={`flex items-center justify-between gap-4 p-4 rounded-xl border ${
                  item.status === 'Done' ? 'bg-success-container/30 border-success-container/50' : 
                  item.status === 'Resume' ? 'bg-surface-subtle border-border-subtle' : 
                  'bg-surface-card border-border-subtle opacity-70'
                }`}>
                  <div className="flex items-center gap-4 min-w-0">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 border ${
                      item.status === 'Done' ? 'bg-success-text text-white border-success-text' : 
                      item.status === 'Resume' ? 'border-primary-navy border-2' : 
                      'border-border-subtle bg-surface-subtle'
                    }`}>
                      {item.status === 'Done' && <span className="material-symbols-outlined text-[14px] font-bold">check</span>}
                      {item.status === 'Resume' && <div className="w-2.5 h-2.5 rounded-full bg-primary-navy"></div>}
                    </div>
                    <div className="min-w-0">
                      <div className={`font-label-md font-bold truncate ${item.status === 'Done' ? 'text-text-secondary line-through' : 'text-text-primary'}`}>
                        {item.title}
                      </div>
                      <div className="font-body-sm text-text-secondary mt-0.5">{item.meta}</div>
                    </div>
                  </div>
                  {item.status !== 'Queued' && (
                    <button className={`shrink-0 px-3 py-1.5 rounded-md font-label-sm uppercase tracking-wider font-bold transition-colors ${
                      item.status === 'Done' ? 'bg-border-subtle/50 text-text-secondary' : 'bg-primary-navy text-white hover:bg-opacity-90'
                    }`}>
                      {item.status}
                    </button>
                  )}
                  {item.status === 'Queued' && (
                    <span className="font-label-sm text-text-secondary uppercase tracking-wider shrink-0 px-2 hidden sm:block">Queued</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Curriculum Trajectory */}
          <div className="bg-surface-card border border-border-subtle rounded-xl p-6 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="font-label-sm text-[11px] uppercase tracking-widest text-text-secondary font-semibold mb-1">Specialization Roadmap</div>
                <h2 className="font-headline-md text-xl text-text-primary font-bold">Machine Learning Curriculum</h2>
              </div>
              <button className="flex items-center gap-1 text-text-secondary hover:text-text-primary font-label-sm uppercase tracking-wider transition-colors">
                Full Map <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>

            <div className="flex gap-3 overflow-x-auto pb-4 snap-x hide-scrollbar">
              {/* Completed Node */}
              <div className="snap-start shrink-0 w-36 bg-surface-subtle border border-border-subtle rounded-lg p-3 opacity-60">
                <div className="flex items-center gap-1.5 text-success-text mb-2">
                  <span className="material-symbols-outlined text-[16px]">check_circle</span>
                  <span className="font-label-sm text-[10px] uppercase tracking-wider font-bold">Stage 01</span>
                </div>
                <div className="font-label-md font-bold text-text-primary leading-tight">Python Intro</div>
                <div className="font-body-sm text-text-secondary mt-1">Completed</div>
              </div>

              {/* Completed Node */}
              <div className="snap-start shrink-0 w-36 bg-surface-subtle border border-border-subtle rounded-lg p-3 opacity-60">
                <div className="flex items-center gap-1.5 text-success-text mb-2">
                  <span className="material-symbols-outlined text-[16px]">check_circle</span>
                  <span className="font-label-sm text-[10px] uppercase tracking-wider font-bold">Stage 02</span>
                </div>
                <div className="font-label-md font-bold text-text-primary leading-tight">Data Structures</div>
                <div className="font-body-sm text-text-secondary mt-1">Completed</div>
              </div>

              {/* Active Node */}
              <div className="snap-start shrink-0 w-44 bg-surface-card border-2 border-copper/50 rounded-lg p-3 shadow-sm relative">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5 text-copper">
                    <div className="w-1.5 h-1.5 rounded-full bg-copper"></div>
                    <span className="font-label-sm text-[10px] uppercase tracking-wider font-bold">03 Now</span>
                  </div>
                  <span className="font-label-sm text-[10px] text-copper font-bold">68%</span>
                </div>
                <div className="font-label-md font-bold text-text-primary leading-tight">Machine Learning</div>
                <div className="font-body-sm text-copper mt-1 font-medium">In Progress</div>
              </div>

              {/* Upcoming Node */}
              <div className="snap-start shrink-0 w-36 bg-page-bg border border-border-subtle rounded-lg p-3">
                <div className="flex items-center gap-1.5 text-text-secondary mb-2">
                  <span className="material-symbols-outlined text-[16px]">lock</span>
                  <span className="font-label-sm text-[10px] uppercase tracking-wider font-bold">Stage 04</span>
                </div>
                <div className="font-label-md font-bold text-text-primary leading-tight text-text-secondary">Deep Learning</div>
                <div className="font-body-sm text-text-secondary mt-1">Upcoming</div>
              </div>

              {/* Upcoming Node */}
              <div className="snap-start shrink-0 w-36 bg-page-bg border border-border-subtle rounded-lg p-3">
                <div className="flex items-center gap-1.5 text-text-secondary mb-2">
                  <span className="material-symbols-outlined text-[16px]">lock</span>
                  <span className="font-label-sm text-[10px] uppercase tracking-wider font-bold">Stage 05</span>
                </div>
                <div className="font-label-md font-bold text-text-primary leading-tight text-text-secondary">NLP &amp; LLMs</div>
                <div className="font-body-sm text-text-secondary mt-1">Upcoming</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar Column */}
        <div className="space-y-6">
          
          {/* Recommendation Card */}
          <div className="bg-surface-subtle border border-border-subtle rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <span className="font-label-sm text-[10px] px-2 py-1 bg-copper/10 text-copper rounded border border-copper/20 uppercase tracking-wider font-bold flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[14px]">tune</span>
                Adaptive Recommendation
              </span>
              <span className="font-label-sm text-[10px] uppercase tracking-wider text-text-secondary font-semibold">High Impact</span>
            </div>
            
            <h3 className="font-headline-sm text-lg text-text-primary font-bold mb-2">
              {dashboardData.recommendedPractice.title}
            </h3>
            <p className="font-body-md text-text-secondary mb-4 line-clamp-3">
              {dashboardData.recommendedPractice.description}
            </p>
            
            <div className="flex items-center gap-2 font-label-sm text-[11px] text-text-primary bg-surface-card px-3 py-2 rounded-lg border border-border-subtle mb-5 shadow-xs">
              <span className="material-symbols-outlined text-[16px] text-copper">trending_up</span>
              <span>{dashboardData.recommendedPractice.impact}</span>
            </div>

            <button className="w-full py-2.5 bg-surface-card hover:bg-surface-subtle border border-border-subtle text-text-primary rounded-lg font-label-md font-bold transition-all flex items-center justify-center gap-2 shadow-sm">
              <span className="material-symbols-outlined text-[18px]">play_circle</span>
              <span>Start Practice ({dashboardData.recommendedPractice.time})</span>
            </button>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-surface-card border border-border-subtle rounded-xl p-4 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between text-text-secondary mb-2">
                <span className="font-label-sm text-[10px] uppercase tracking-wider font-bold">Learning Streak</span>
                <span className="material-symbols-outlined text-[16px] text-copper">local_fire_department</span>
              </div>
              <div>
                <div className="font-headline-md text-2xl text-text-primary font-bold">7 Days</div>
                <div className="font-body-sm text-[11px] text-text-secondary mt-0.5">Daily goal achieved</div>
              </div>
            </div>
            
            <div className="bg-surface-card border border-border-subtle rounded-xl p-4 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between text-text-secondary mb-2">
                <span className="font-label-sm text-[10px] uppercase tracking-wider font-bold">Lessons Mastered</span>
                <span className="material-symbols-outlined text-[16px]">library_books</span>
              </div>
              <div>
                <div className="font-headline-md text-2xl text-text-primary font-bold">42</div>
                <div className="font-body-sm text-[11px] text-text-secondary mt-0.5">Across 3 core modules</div>
              </div>
            </div>

            <div className="bg-surface-card border border-border-subtle rounded-xl p-4 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between text-text-secondary mb-2">
                <span className="font-label-sm text-[10px] uppercase tracking-wider font-bold">Practice Accuracy</span>
                <span className="material-symbols-outlined text-[16px]">analytics</span>
              </div>
              <div>
                <div className="font-headline-md text-2xl text-text-primary font-bold">86%</div>
                <div className="font-body-sm text-[11px] text-text-secondary mt-0.5">14 assessed quizzes</div>
              </div>
            </div>

            <div className="bg-surface-card border border-border-subtle rounded-xl p-4 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between text-text-secondary mb-2">
                <span className="font-label-sm text-[10px] uppercase tracking-wider font-bold">Study Time</span>
                <span className="material-symbols-outlined text-[16px]">schedule</span>
              </div>
              <div>
                <div className="font-headline-md text-2xl text-text-primary font-bold">18h 40m</div>
                <div className="font-body-sm text-[11px] text-text-secondary mt-0.5">During current month</div>
              </div>
            </div>
          </div>

          {/* Socratic AI Tutor */}
          <div className="bg-surface-card border-l-[4px] border-l-copper border-y border-r border-border-subtle rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-headline-sm text-lg text-text-primary font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-copper">psychiatry</span>
                Socratic AI Tutor
              </h3>
              <span className="font-label-sm text-[10px] px-2 py-0.5 bg-surface-subtle text-text-secondary rounded border border-border-subtle uppercase tracking-wider">Always Active</span>
            </div>
            <p className="font-body-sm text-text-secondary mb-5 leading-relaxed">
              Stuck on Variance Inflation Factor or L1/L2 Regularization? Ask your dialectic tutor for an intuitive derivation, interactive mathematical graph, or practical code walkthrough.
            </p>
            <Link to="/learn" className="w-full block text-center py-2 bg-surface-subtle hover:bg-border-subtle text-text-primary border border-border-subtle rounded-lg font-label-md font-bold transition-colors">
              Ask AI Tutor <span className="material-symbols-outlined text-[14px] align-middle ml-1">chat_bubble</span>
            </Link>
          </div>

          {/* Coming Up */}
          <div>
            <h3 className="font-label-sm text-[11px] uppercase tracking-widest text-text-secondary font-bold mb-4">Coming Up</h3>
            <div className="space-y-3">
              {dashboardData.milestones.map((m) => (
                <div key={m.id} className="flex items-start gap-3 bg-surface-card border border-border-subtle rounded-lg p-3 shadow-xs">
                  <div className="w-8 h-8 rounded-md bg-surface-subtle flex items-center justify-center text-text-secondary shrink-0">
                    <span className="material-symbols-outlined text-[16px]">{m.icon}</span>
                  </div>
                  <div>
                    <div className="font-label-md font-bold text-text-primary leading-tight">{m.title}</div>
                    <div className="font-body-sm text-[11px] text-text-secondary mt-0.5">{m.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <h3 className="font-label-sm text-[11px] uppercase tracking-widest text-text-secondary font-bold mb-4 mt-6">Recent Activity</h3>
            <div className="space-y-4 relative before:absolute before:inset-y-0 before:left-[11px] before:w-[2px] before:bg-border-subtle">
              {dashboardData.recentActivity.map((activity, idx) => (
                <div key={activity.id} className="flex items-start gap-4 relative z-10">
                  <div className="w-6 h-6 rounded-full bg-surface-card border-2 border-border-subtle flex items-center justify-center shrink-0 mt-0.5">
                    {idx === 0 ? (
                      <span className="material-symbols-outlined text-[12px] text-text-primary">check</span>
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-border-subtle"></span>
                    )}
                  </div>
                  <div>
                    <div className="font-label-md font-medium text-text-primary leading-tight" dangerouslySetInnerHTML={{__html: activity.title.replace('Scored 90%', '<strong class="font-bold">Scored 90%</strong>')}}></div>
                    <div className="font-body-sm text-[11px] text-text-secondary mt-1">{activity.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
