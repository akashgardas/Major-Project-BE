import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';

export const Landing: React.FC = () => {
  return (
    <div data-theme="forest" className="min-h-screen selection:bg-copper selection:text-white flex flex-col">
      <Navbar />

      <main className="flex-1 flex flex-col">
        {/* ================= HERO SECTION ================= */}
        <section id="home" className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden transition-colors duration-200 bg-page-bg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              
              {/* Left: Editorial Headline, Subtitle, and Restrained CTAs */}
              <div className="lg:col-span-6 space-y-6 sm:space-y-8 text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase border transition-colors bg-surface-card border-border-subtle text-copper">
                  <span className="w-2 h-2 rounded-full bg-copper"></span>
                  Adaptive Cohort &amp; Self-Paced Platform
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-[56px] leading-[1.12] font-serif-italic font-medium tracking-tight text-text-primary">
                  Learn with intention.<br/>
                  <span className="italic font-normal text-copper">Grow with direction.</span>
                </h1>

                <p className="text-lg sm:text-[19px] leading-relaxed max-w-xl font-normal text-text-secondary">
                  An adaptive learning platform that understands your goals, guides your learning journey, and helps you improve at your own pace.
                </p>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                  <Link to="/register" className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-lg text-[15px] font-semibold text-white shadow-sm transition-all duration-150 hover:brightness-105 active:scale-[0.99] bg-copper hover:bg-copper-hover">
                    <span>Start Learning</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                    </svg>
                  </Link>

                  <a href="#how-it-works" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg text-[15px] font-medium border transition-colors hover:bg-black/5 dark:hover:bg-white/5 border-border-subtle text-text-primary">
                    <span>Explore How It Works</span>
                  </a>
                </div>

                {/* Trust Badges */}
                <div className="pt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-medium text-soft-navy">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px]">psychology</span>
                    <span>Cognitive Mastery Model</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px]">speed</span>
                    <span>Self-Paced Progression</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px]">verified_user</span>
                    <span>FERPA Compliant Privacy</span>
                  </div>
                </div>
              </div>

              {/* Right: Authentic, High-Fidelity Educational SaaS Dashboard Preview */}
              <div className="lg:col-span-6">
                <div className="rounded-xl border transition-colors p-1.5 sm:p-2.5 shadow-xl bg-surface-subtle border-border-subtle">
                  <div className="rounded-lg border transition-colors overflow-hidden bg-surface-card border-border-subtle">
                    <div className="px-4 py-3 border-b flex items-center justify-between text-xs transition-colors bg-surface-subtle border-border-subtle">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-error-clr"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-copper"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-[#2A9D8F]/70"></div>
                        <span className="ml-2 font-mono text-[11px] font-medium text-text-secondary">student.learnsphere.org/workspace</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider bg-copper/10 text-copper">
                          Live Session
                        </span>
                      </div>
                    </div>

                    <div className="p-4 sm:p-5 space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border-subtle">
                        <div>
                          <div className="text-xs font-medium text-text-secondary">Good afternoon, Julian</div>
                          <div className="text-base font-bold tracking-tight text-text-primary">Machine Learning Systems &amp; Data Engineering</div>
                        </div>
                        <div className="text-left sm:text-right">
                          <span className="text-xs font-semibold px-2.5 py-1 rounded-full border inline-block bg-surface-subtle border-border-subtle text-copper">
                            Path Velocity: On Track
                          </span>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-medium text-text-secondary">Overall Curriculum Mastery</span>
                          <span className="font-bold font-mono text-text-primary">68% Complete</span>
                        </div>
                        <div className="w-full h-2 rounded-full overflow-hidden bg-surface-subtle">
                          <div className="h-full rounded-full transition-all duration-500 w-[68%] bg-copper"></div>
                        </div>
                        <div className="flex justify-between text-[11px] text-soft-navy">
                          <span>Module 04: Neural Attention Mechanisms</span>
                          <span>14 of 22 Competencies Verified</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                        <div className="p-3.5 rounded-lg border transition-colors flex flex-col justify-between bg-surface-subtle border-border-subtle">
                          <div className="space-y-1.5">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-primary-navy/10 text-text-primary">In Progress</span>
                              <span className="text-[11px] font-mono text-soft-navy">35 min left</span>
                            </div>
                            <h4 className="text-sm font-semibold text-text-primary">Multi-Head Self-Attention Implementation</h4>
                            <p className="text-xs line-clamp-2 text-text-secondary">Writing scaled dot-product attention in NumPy &amp; PyTorch with shape verification tests.</p>
                          </div>
                          <div className="pt-3 flex items-center justify-between">
                            <span className="text-xs font-medium text-copper">Resume Challenge &rarr;</span>
                            <span className="w-2 h-2 rounded-full animate-ping bg-copper"></span>
                          </div>
                        </div>

                        <div className="p-3.5 rounded-lg border transition-colors flex flex-col justify-between bg-surface-subtle border-border-subtle">
                          <div className="space-y-1.5">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded border border-border-subtle text-soft-navy">Recommended Next</span>
                              <span className="text-[11px] font-mono text-soft-navy">Adaptive</span>
                            </div>
                            <h4 className="text-sm font-semibold text-text-primary">Positional Encoding &amp; Sequence Masks</h4>
                            <p className="text-xs line-clamp-2 text-text-secondary">Recommended because your assessment indicated need for matrix-masking intuition.</p>
                          </div>
                          <div className="pt-3">
                            <span className="text-xs font-medium text-soft-navy">Queued after Module 04</span>
                          </div>
                        </div>
                      </div>

                      <div className="p-3 rounded-lg border transition-colors grid grid-cols-3 divide-x divide-border-subtle text-center bg-surface-card border-border-subtle">
                        <div className="px-2">
                          <div className="text-[11px] text-text-secondary">Retention Score</div>
                          <div className="text-base font-bold font-mono text-text-primary">94.2%</div>
                        </div>
                        <div className="px-2">
                          <div className="text-[11px] text-text-secondary">Practice Streak</div>
                          <div className="text-base font-bold font-mono text-copper">18 Days</div>
                        </div>
                        <div className="px-2">
                          <div className="text-[11px] text-text-secondary">Adaptive Quiz</div>
                          <div className="text-xs font-semibold mt-0.5 text-text-primary">Tomorrow, 10 AM</div>
                        </div>
                      </div>

                      <div className="p-3 rounded-lg border text-xs space-y-2 transition-colors bg-surface-subtle border-border-subtle">
                        <div className="flex items-start gap-2">
                          <span className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center text-[10px] font-bold text-white bg-primary-navy">AI</span>
                          <p className="text-text-primary">
                            <strong className="text-copper">Tutor Note:</strong> In line 42, your transpose swapped sequence length with embedding dimension. Look at the key dimension shape requirements before the matrix multiplication.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= TRUST / VALUE STRIP ================= */}
        <section className="border-y transition-colors py-10 bg-surface-card border-border-subtle">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center border transition-colors bg-surface-subtle border-border-subtle text-copper">
                  <span className="material-symbols-outlined text-[20px]">account_tree</span>
                </div>
                <div>
                  <h3 className="text-sm font-bold tracking-tight text-text-primary">Personalized Learning</h3>
                  <p className="text-xs mt-1 leading-normal text-text-secondary">Calibrated curriculums structured specifically for your knowledge gaps.</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center border transition-colors bg-surface-subtle border-border-subtle text-copper">
                  <span className="material-symbols-outlined text-[20px]">tune</span>
                </div>
                <div>
                  <h3 className="text-sm font-bold tracking-tight text-text-primary">Adaptive Practice</h3>
                  <p className="text-xs mt-1 leading-normal text-text-secondary">Assessments that scale dynamically based on demonstrated mastery.</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center border transition-colors bg-surface-subtle border-border-subtle text-copper">
                  <span className="material-symbols-outlined text-[20px]">forum</span>
                </div>
                <div>
                  <h3 className="text-sm font-bold tracking-tight text-text-primary">AI Tutoring</h3>
                  <p className="text-xs mt-1 leading-normal text-text-secondary">Socratic conversation that challenges reasoning rather than giving away solutions.</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center border transition-colors bg-surface-subtle border-border-subtle text-copper">
                  <span className="material-symbols-outlined text-[20px]">show_chart</span>
                </div>
                <div>
                  <h3 className="text-sm font-bold tracking-tight text-text-primary">Progress Tracking</h3>
                  <p className="text-xs mt-1 leading-normal text-text-secondary">Retention curves and conceptual velocity measured with research precision.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= FEATURES SECTION ================= */}
        <section id="features" className="py-20 md:py-28 transition-colors bg-page-bg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl text-left mb-16 space-y-3">
              <span className="text-xs uppercase font-bold tracking-wider text-copper">Modular Architecture</span>
              <h2 className="text-3xl sm:text-4xl font-serif-italic font-medium tracking-tight text-text-primary">
                Everything you need to learn better.
              </h2>
              <p className="text-base sm:text-lg text-text-secondary">
                Purpose-built instruments designed for depth, discipline, and verifiable intellectual retention.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {[
                { title: 'Personalized Learning Paths', icon: 'route', desc: 'Learning plans adapt to your goals, progress, and knowledge level. Topics automatically re-order and expand when foundational concepts require reinforcement.' },
                { title: 'AI Learning Assistant', icon: 'smart_toy', desc: 'Ask questions, get explanations, and learn through interactive conversations. The assistant guides your mental model using targeted questioning rather than static answers.' },
                { title: 'Adaptive Assessments', icon: 'quiz', desc: 'Quizzes and practice sessions adjust to your performance in real time. Items increase in nuance as you demonstrate mastery, ensuring zero time is wasted on resolved topics.' },
                { title: 'Coding Practice', icon: 'code', desc: 'Practice programming with guided challenges, hints, and feedback. In-browser sandbox runs unit tests immediately with algorithmic time-complexity checks.' },
                { title: 'Learn From Your Documents', icon: 'upload_file', desc: 'Upload learning material, research papers, lecture slide decks, and syllabi to interact through intelligent Q&A with citeable margin annotations.' },
                { title: 'Progress Intelligence', icon: 'insights', desc: 'Understand your strengths, weak areas, and what to learn next. Visual retention decay modeling prompts timely revisions before concepts fade.' },
              ].map((f, i) => (
                <div key={i} className="p-7 rounded-xl border transition-all duration-200 flex flex-col justify-between hover:-translate-y-1 hover:shadow-md bg-surface-card border-border-subtle">
                  <div className="space-y-4">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center border bg-surface-subtle border-border-subtle text-copper">
                      <span className="material-symbols-outlined text-[20px]">{f.icon}</span>
                    </div>
                    <h3 className="text-lg font-bold tracking-tight text-text-primary">{f.title}</h3>
                    <p className="text-sm leading-relaxed text-text-secondary">{f.desc}</p>
                  </div>
                  <div className="mt-6 pt-4 border-t text-xs font-semibold flex items-center gap-1.5 border-border-subtle text-copper">
                    <span>Explore feature</span>
                    <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= FINAL CTA SECTION ================= */}
        <section id="get-started" className="py-20 md:py-28 transition-colors border-t bg-surface-card border-border-subtle">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-2xl mx-auto space-y-6">
              <span className="text-xs uppercase font-bold tracking-wider text-copper">Begin Today</span>
              <h2 className="text-3xl sm:text-5xl font-serif-italic font-medium tracking-tight text-text-primary">
                Your learning journey starts here.
              </h2>
              <p className="text-base sm:text-lg leading-relaxed font-normal text-text-secondary">
                Build skills at your pace, follow a path designed around you, and keep improving with measurable, verifiable mastery.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/register" className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-lg text-base font-semibold text-white shadow-sm transition-all duration-150 hover:brightness-105 active:scale-[0.99] bg-copper hover:bg-copper-hover">
                  <span>Start Learning</span>
                  <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                </Link>
                <Link to="/login" className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-4 rounded-lg text-base font-medium border transition-colors hover:bg-surface-subtle border-border-subtle text-text-primary">
                  Sign in to existing account
                </Link>
              </div>

              <p className="text-xs text-soft-navy">
                No credit card required. Free tier includes your first personalized learning path and 3 adaptive assessments.
              </p>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};
