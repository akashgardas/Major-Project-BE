import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t transition-colors duration-200 py-16 bg-page-bg border-border-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 pb-12">
          {/* Col 1: Brand Info */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center font-semibold text-white bg-primary-navy border border-copper/35">
                <svg className="w-4 h-4 text-page-bg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <circle cx="12" cy="12" r="9"/>
                  <path d="M12 3a9 9 0 0 1 9 9" stroke="#B8734A" strokeWidth="2.5"/>
                </svg>
              </div>
              <span className="text-lg font-bold tracking-tight text-text-primary">LearnSphere</span>
            </div>
            <p className="text-xs leading-relaxed max-w-sm text-text-secondary">
              An agentic educational platform engineered with editorial discipline, cognitive science principles, and adaptive mastery tracking.
            </p>
            <div className="text-xs font-mono text-soft-navy">
              Engine Version 2.8 · Academic Release
            </div>
          </div>

          {/* Col 2: Product */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase font-bold tracking-wider text-text-primary">Product</h4>
            <ul className="space-y-2 text-xs text-text-secondary">
              <li><a href="#features" className="hover:underline">Features</a></li>
              <li><a href="#learning-paths" className="hover:underline">Learning Paths</a></li>
              <li><a href="#pricing" className="hover:underline">Pricing</a></li>
              <li><a href="#adaptive-engine" className="hover:underline">Adaptive Engine</a></li>
            </ul>
          </div>

          {/* Col 3: Resources */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase font-bold tracking-wider text-text-primary">Resources</h4>
            <ul className="space-y-2 text-xs text-text-secondary">
              <li><a href="#help" className="hover:underline">Help &amp; Support</a></li>
              <li><a href="#documentation" className="hover:underline">Documentation</a></li>
              <li><a href="#contact" className="hover:underline">Contact</a></li>
              <li><a href="#research" className="hover:underline">Methodology Paper</a></li>
            </ul>
          </div>

          {/* Col 4: Account */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase font-bold tracking-wider text-text-primary">Account</h4>
            <ul className="space-y-2 text-xs text-text-secondary">
              <li><Link to="/login" className="hover:underline">Log In</Link></li>
              <li><Link to="/register" className="hover:underline">Sign Up</Link></li>
              <li><a href="#institutions" className="hover:underline">Institutional Grants</a></li>
              <li><a href="#privacy" className="hover:underline">Privacy &amp; Data Control</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t flex flex-col sm:flex-row items-center justify-between text-xs gap-4 border-border-subtle text-soft-navy">
          <p>&copy; 2025 LearnSphere Systems Inc. All intellectual property reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#terms" className="hover:underline">Terms of Service</a>
            <a href="#privacy" className="hover:underline">Privacy Policy</a>
            <a href="#academic" className="hover:underline">FERPA Compliance</a>
            <a href="#status" className="hover:underline">System Status</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
