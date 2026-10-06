import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { AuthLayout } from '../components/layout/AuthLayout';
import { api } from '../services/api';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [status, setStatus] = useState<'default' | 'loading' | 'success' | 'error'>('default');
  const [errorMessage, setErrorMessage] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotStatus, setForgotStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [forgotMessage, setForgotMessage] = useState('');

  // Handle OAuth callback token or errors from redirect
  useEffect(() => {
    const token = searchParams.get('token');
    const oauthError = searchParams.get('oauth_error');

    if (token) {
      api.setToken(token);
      setStatus('loading');
      api.getMe()
        .then(() => {
          setStatus('success');
          setTimeout(() => navigate('/dashboard'), 800);
        })
        .catch(() => {
          setStatus('error');
          setErrorMessage('Failed to load user profile after OAuth authentication.');
        });
    } else if (oauthError) {
      setStatus('error');
      setErrorMessage(`OAuth authentication error: ${oauthError.replace(/_/g, ' ')}`);
    }
  }, [searchParams, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      await api.login(email, password);
      setStatus('success');
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err.message || 'Authentication failed. Please check your credentials.');
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = api.getGoogleAuthUrl();
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setForgotStatus('loading');
    try {
      const res = await api.forgotPassword(forgotEmail);
      setForgotStatus('success');
      setForgotMessage(res.message);
    } catch (err: any) {
      setForgotStatus('error');
      setForgotMessage(err.message || 'Could not process request. Please try again.');
    }
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
            <span className="font-label-sm text-label-sm text-text-secondary font-medium">Session: Encrypted</span>
            <span className="w-2 h-2 rounded-full bg-soft-navy"></span>
          </div>
        </div>

        <div className="w-full mx-auto my-auto py-space-md">
          <div className="mb-space-md text-left">
            <h2 className="font-headline-md text-headline-md text-text-primary font-bold tracking-tight">Welcome back</h2>
            <p className="font-body-md text-body-md text-text-secondary mt-1">
              Continue your personalized academic curriculum and synthesis notebook.
            </p>
          </div>

          {status === 'error' && (
            <div className="mb-space-md p-space-sm rounded-lg bg-error-container text-error-clr border border-error-clr/30 flex items-start gap-space-xs transition-all">
              <span className="material-symbols-outlined text-[18px] text-error-clr shrink-0 mt-0.5">error</span>
              <div className="text-body-sm font-body-sm leading-snug">
                <strong>Authentication failed.</strong> {errorMessage || 'The password entered does not match our records.'}
              </div>
            </div>
          )}

          {status === 'success' && (
            <div className="mb-space-md p-space-sm rounded-lg bg-success-container text-success-text border border-success-text/30 flex items-center gap-space-xs transition-all">
              <span className="material-symbols-outlined text-[20px] shrink-0">check_circle</span>
              <div className="text-body-sm font-body-sm font-medium">
                Identity verified. Synchronizing active study matrix and redirecting...
              </div>
            </div>
          )}

          <form className="space-y-space-md" onSubmit={handleSubmit}>
            <div className="space-y-1.5">
              <label className="block font-label-md text-label-md font-semibold text-text-primary" htmlFor="emailInput">
                Email address
              </label>
              <div className="relative">
                <input
                  id="emailInput"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@institution.edu"
                  autoComplete="email"
                  className="w-full h-11 px-3.5 pr-10 rounded-lg bg-surface-card text-text-primary text-body-md font-body-md placeholder:text-text-secondary/70 border border-input-border transition-all outline-none focus:border-input-focus focus:ring-1 focus:ring-input-focus shadow-xs"
                />
                <span className="material-symbols-outlined absolute right-3 top-3 text-[18px] text-text-secondary/70 pointer-events-none">
                  alternate_email
                </span>
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="font-label-md text-label-md font-semibold text-text-primary" htmlFor="passwordInput">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setShowForgotPassword(!showForgotPassword);
                    setForgotMessage('');
                    setForgotStatus('idle');
                  }}
                  className="font-label-sm text-label-sm text-copper hover:text-copper-hover font-semibold hover:underline transition-colors cursor-pointer"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <input
                  id="passwordInput"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your security phrase"
                  autoComplete="current-password"
                  className="w-full h-11 px-3.5 pr-11 rounded-lg bg-surface-card text-text-primary text-body-md font-body-md placeholder:text-text-secondary/70 border border-input-border transition-all outline-none focus:border-input-focus focus:ring-1 focus:ring-input-focus shadow-xs"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                  className="absolute right-2 top-2 h-7 w-7 flex items-center justify-center rounded text-text-secondary hover:text-text-primary hover:bg-surface-subtle transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">{showPassword ? 'visibility_off' : 'visibility'}</span>
                </button>
              </div>
            </div>

            {showForgotPassword && (
              <div className="p-3.5 bg-surface-card rounded-lg border border-border-subtle space-y-2.5 transition-all">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-label-sm font-semibold text-text-primary">Reset Password Link</span>
                  <button
                    type="button"
                    onClick={() => setShowForgotPassword(false)}
                    className="text-text-secondary hover:text-text-primary"
                  >
                    <span className="material-symbols-outlined text-[16px]">close</span>
                  </button>
                </div>
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    placeholder="Enter registered email"
                    className="flex-1 px-3 py-1.5 text-body-sm font-body-sm rounded-lg bg-page-bg border border-input-border outline-none focus:border-input-focus"
                  />
                  <button
                    type="button"
                    disabled={forgotStatus === 'loading' || !forgotEmail}
                    onClick={handleForgotPassword}
                    className="px-3 py-1.5 bg-primary-navy text-white text-label-sm font-medium rounded-lg hover:bg-[#314D5E] disabled:opacity-50 cursor-pointer"
                  >
                    {forgotStatus === 'loading' ? 'Sending...' : 'Send'}
                  </button>
                </div>
                {forgotMessage && (
                  <p className={`text-body-sm font-body-sm ${forgotStatus === 'success' ? 'text-success-text' : 'text-error-clr'}`}>
                    {forgotMessage}
                  </p>
                )}
              </div>
            )}

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-input-border text-primary-navy focus:ring-primary-navy/20 accent-primary-navy cursor-pointer"
                />
                <span className="font-body-md text-body-md text-text-secondary">Keep me signed in on this device</span>
              </label>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={status === 'loading'}
                className="relative w-full h-11 px-6 rounded-lg bg-primary-navy text-white font-label-lg text-label-lg font-semibold hover:bg-[#314D5E] active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer disabled:opacity-80"
              >
                <span>Log In</span>
                {!status || status !== 'loading' ? (
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                ) : (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                )}
              </button>
            </div>
          </form>

          <div className="relative my-space-lg flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border-subtle"></div>
            </div>
            <span className="relative px-3 bg-page-bg font-label-sm text-label-sm text-text-secondary uppercase tracking-wider font-semibold">
              OR
            </span>
          </div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full h-11 px-4 rounded-lg bg-surface-card text-text-primary border border-input-border hover:bg-surface-subtle transition-all flex items-center justify-center gap-3 font-label-md text-label-md font-semibold shadow-xs cursor-pointer"
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z" fill="#4285F4"></path>
              <path d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z" fill="#34A853"></path>
              <path d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.03 0 12s.45 3.82 1.25 5.42l4.03-3.15z" fill="#FBBC05"></path>
              <path d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z" fill="#EA4335"></path>
            </svg>
            <span>Continue with Google</span>
          </button>

          <p className="font-body-md text-body-md text-text-secondary text-center mt-space-lg">
            Don't have an account?{' '}
            <Link to="/register" className="font-label-md text-label-md font-semibold text-copper hover:text-copper-hover underline underline-offset-4 decoration-copper/40 hover:decoration-copper transition-all">
              Create an account
            </Link>
          </p>
        </div>

        <div className="w-full mx-auto pt-space-md border-t border-border-subtle flex items-center justify-center gap-2 text-center text-text-secondary mt-auto">
          <span className="material-symbols-outlined text-[16px] text-soft-navy">verified</span>
          <span className="font-body-sm text-body-sm">
            Protected by 256-bit SSL encryption • FERPA academic data protection standards.
          </span>
        </div>
      </section>
    </AuthLayout>
  );
};
