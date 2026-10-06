import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthLayout } from '../components/layout/AuthLayout';
import { api } from '../services/api';

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [status, setStatus] = useState<'default' | 'loading' | 'success' | 'error' | 'mismatch'>('default');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setStatus('mismatch');
      return;
    }
    setStatus('loading');
    setErrorMessage('');

    try {
      await api.register(name, email, password);
      setStatus('success');
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err.message || 'Registration failed. Please check your details.');
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = api.getGoogleAuthUrl();
  };

  return (
    <AuthLayout>
      <section className="flex-1 flex flex-col justify-between text-text-primary h-full">
        <div className="flex items-center justify-between w-full mx-auto">
          <Link to="/" className="inline-flex items-center gap-1.5 font-label-md text-label-md text-text-secondary hover:text-text-primary transition-colors group">
            <span className="material-symbols-outlined text-[18px] group-hover:-translate-x-0.5 transition-transform">arrow_back</span>
            <span>Back to homepage</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="font-label-sm text-label-sm text-text-secondary font-medium">Network: Secure</span>
            <span className="w-2 h-2 rounded-full bg-soft-navy"></span>
          </div>
        </div>

        <div className="w-full mx-auto my-auto py-space-md">
          <div className="mb-space-md text-left">
            <h2 className="font-headline-md text-headline-md text-text-primary font-bold tracking-tight">Create an account</h2>
            <p className="font-body-md text-body-md text-text-secondary mt-1">
              Begin your personalized curriculum and interactive learning journey.
            </p>
          </div>

          {status === 'error' && (
            <div className="mb-space-md p-space-sm rounded-lg bg-error-container text-error-clr border border-error-clr/30 flex items-start gap-space-xs transition-all">
              <span className="material-symbols-outlined text-[18px] text-error-clr shrink-0 mt-0.5">error</span>
              <div className="text-body-sm font-body-sm leading-snug">
                <strong>Registration failed.</strong> {errorMessage}
              </div>
            </div>
          )}

          {status === 'success' && (
            <div className="mb-space-md p-space-sm rounded-lg bg-success-container text-success-text border border-success-text/30 flex items-center gap-space-xs transition-all">
              <span className="material-symbols-outlined text-[20px] shrink-0">check_circle</span>
              <div className="text-body-sm font-body-sm font-medium">
                Account created successfully. Initializing your cognitive core...
              </div>
            </div>
          )}

          <form className="space-y-space-md" onSubmit={handleSubmit}>
            <div className="space-y-1.5">
              <label className="block font-label-sm text-label-sm font-semibold text-text-primary" htmlFor="reg-name">Full name</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-soft-navy">
                  <span className="material-symbols-outlined text-[18px]">person</span>
                </span>
                <input
                  id="reg-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-lg bg-surface-card border border-input-border focus:border-input-focus focus:ring-1 focus:ring-input-focus shadow-xs text-body-md font-body-md text-text-primary placeholder-text-secondary/70 transition-all outline-none"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block font-label-sm text-label-sm font-semibold text-text-primary" htmlFor="reg-email">Email address</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-soft-navy">
                  <span className="material-symbols-outlined text-[18px]">alternate_email</span>
                </span>
                <input
                  id="reg-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className={`w-full pl-10 pr-3.5 py-2.5 rounded-lg bg-surface-card border focus:ring-1 shadow-xs text-body-md font-body-md text-text-primary placeholder-text-secondary/70 transition-all outline-none ${status === 'error' ? 'border-error-clr focus:border-error-clr focus:ring-error-clr' : 'border-input-border focus:border-input-focus focus:ring-input-focus'}`}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block font-label-sm text-label-sm font-semibold text-text-primary" htmlFor="reg-password">Password</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-soft-navy">
                  <span className="material-symbols-outlined text-[18px]">lock</span>
                </span>
                <input
                  id="reg-password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password"
                  className="w-full pl-10 pr-10 py-2.5 rounded-lg bg-surface-card border border-input-border focus:border-input-focus focus:ring-1 focus:ring-input-focus shadow-xs text-body-md font-body-md text-text-primary placeholder-text-secondary/70 transition-all outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-soft-navy hover:text-text-primary"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
              <div className="flex items-center gap-1.5 text-body-sm font-body-sm text-text-secondary pt-0.5">
                <span className="material-symbols-outlined text-[14px] text-copper">info</span>
                <span>Use at least 8 characters with a number and special character.</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="block font-label-sm text-label-sm font-semibold text-text-primary" htmlFor="reg-confirm-password">Confirm password</label>
                {status === 'mismatch' && (
                  <span className="text-label-sm font-label-sm text-error-clr">Passwords do not match</span>
                )}
              </div>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-soft-navy">
                  <span className="material-symbols-outlined text-[18px]">lock_reset</span>
                </span>
                <input
                  id="reg-confirm-password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if (status === 'mismatch') setStatus('default');
                  }}
                  placeholder="Re-enter your password"
                  className={`w-full pl-10 pr-10 py-2.5 rounded-lg bg-surface-card border focus:ring-1 shadow-xs text-body-md font-body-md text-text-primary placeholder-text-secondary/70 transition-all outline-none ${status === 'mismatch' ? 'border-error-clr focus:border-error-clr focus:ring-error-clr' : 'border-input-border focus:border-input-focus focus:ring-input-focus'}`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label="Toggle confirm password visibility"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-soft-navy hover:text-text-primary"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {showConfirmPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            <div className="flex items-start gap-2.5 pt-1">
              <input
                id="terms-check"
                type="checkbox"
                required
                className="mt-1 h-4 w-4 rounded border-input-border text-primary-navy focus:ring-primary-navy/20 accent-primary-navy cursor-pointer"
              />
              <label className="font-body-sm text-body-sm text-text-secondary cursor-pointer leading-tight" htmlFor="terms-check">
                I agree to the <a className="text-copper hover:underline font-medium" href="#">Terms of Service</a> and <a className="text-copper hover:underline font-medium" href="#">Privacy Policy</a>
              </label>
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full mt-2 py-3 px-4 rounded-lg bg-primary-navy hover:bg-[#314D5E] text-white font-label-lg text-label-lg font-medium transition-all shadow-xs flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-80"
            >
              <span>{status === 'loading' ? 'Creating account...' : 'Create Account'}</span>
              {status === 'loading' ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <span className="material-symbols-outlined text-[18px] group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
              )}
            </button>
          </form>

          <div className="relative flex items-center justify-center my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full bg-border-subtle h-[1px]"></div>
            </div>
            <span className="relative px-3 bg-page-bg text-label-sm font-label-sm uppercase tracking-wider text-text-secondary">or</span>
          </div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full py-2.5 px-4 rounded-lg bg-surface-card shadow-xs hover:bg-surface-subtle text-text-primary border border-input-border font-label-lg text-label-lg font-medium transition-all flex items-center justify-center gap-3 cursor-pointer"
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.87c2.26-2.09 3.675-5.17 3.675-9.15z" fill="#4285F4"></path>
              <path d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.87-3.05c-1.08.72-2.45 1.16-4.06 1.16-3.13 0-5.78-2.11-6.73-4.96H1.25v3.15C3.26 21.36 7.35 24 12 24z" fill="#34A853"></path>
              <path d="M5.27 14.24c-.25-.72-.38-1.49-.38-2.24s.13-1.52.38-2.24V6.61H1.25C.45 8.22 0 10.05 0 12s.45 3.78 1.25 5.39l4.02-3.15z" fill="#FBBC05"></path>
              <path d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.35 0 3.26 2.64 1.25 6.61l4.02 3.15c.95-2.85 3.6-4.96 6.73-4.96z" fill="#EA4335"></path>
            </svg>
            <span>Continue with Google</span>
          </button>

          <div className="text-center font-body-sm text-body-sm text-text-secondary mt-4">
            Already have an account?{' '}
            <Link to="/login" className="text-copper font-medium hover:underline ml-1">Log in</Link>
          </div>
        </div>

        <div className="flex items-center justify-center gap-1.5 text-label-sm font-label-sm text-text-secondary pt-2 mt-auto">
          <span className="material-symbols-outlined text-[15px] text-primary-navy">verified_user</span>
          <span>Protected by 256-bit SSL encryption • FERPA academic data protection standards.</span>
        </div>
      </section>
    </AuthLayout>
  );
};
