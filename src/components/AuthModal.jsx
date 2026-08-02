import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { X, Mail, Lock, Eye, EyeOff, AlertCircle, CheckCircle, Sparkles } from 'lucide-react';

const AuthModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  if (!isOpen) return null;

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        onClose(); // Close modal on successful login
      } else {
        const { error } = await supabase.auth.signUp({ 
          email, 
          password,
          options: {
            emailRedirectTo: window.location.origin
          }
        });
        if (error) throw error;
        setMessage('Verification link was sent to your email! Please check your inbox and confirm before signing in.');
        setIsLogin(true); // Switch to login view
      }
    } catch (err) {
      let errMsg = err.message || 'An error occurred during authentication.';
      if (errMsg.toLowerCase().includes('email not confirmed')) {
        errMsg = 'Verification link was sent to your email, but not confirmed yet.';
      }
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  const switchMode = (loginMode) => {
    setIsLogin(loginMode);
    setError(null);
    setMessage(null);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content auth-modal">
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          <X size={18} />
        </button>

        <div className="auth-header">
          <div className="auth-icon-badge">
            <Sparkles size={22} />
          </div>
          <h2 className="modal-title">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
          <p className="modal-subtitle">
            {isLogin 
              ? 'Sign in to generate & download your professional resume.' 
              : 'Create a free account to save & download your resumes.'}
          </p>
        </div>

        {/* Mode Toggle Tabs */}
        <div className="auth-tabs">
          <button 
            type="button" 
            className={`auth-tab ${isLogin ? 'active' : ''}`}
            onClick={() => switchMode(true)}
          >
            Sign In
          </button>
          <button 
            type="button" 
            className={`auth-tab ${!isLogin ? 'active' : ''}`}
            onClick={() => switchMode(false)}
          >
            Sign Up
          </button>
        </div>

        {error && (
          <div className="modal-alert error">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}
        {message && (
          <div className="modal-alert success">
            <CheckCircle size={18} />
            <span>{message}</span>
          </div>
        )}

        <form onSubmit={handleAuth} className="modal-form">
          <div className="form-group-modal">
            <label>Email Address</label>
            <div className="input-with-icon">
              <Mail size={18} className="field-icon" />
              <input 
                type="email" 
                required 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                placeholder="name@example.com"
              />
            </div>
          </div>

          <div className="form-group-modal">
            <label>Password</label>
            <div className="input-with-icon">
              <Lock size={18} className="field-icon" />
              <input 
                type={showPassword ? 'text' : 'password'} 
                required 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                placeholder="••••••••"
                minLength={6}
              />
              <button 
                type="button" 
                className="toggle-password" 
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button type="submit" className="btn-primary full-width auth-submit-btn " disabled={loading}>
            {loading ? (
              <span className="btn-spinner">Processing...</span>
            ) : (
              <span>{isLogin ? 'Sign In & Continue' : 'Create Free Account'}</span>
            )}
          </button>
        </form>

        <div className="modal-footer">
          {isLogin ? (
            <p>Don't have an account? <button type="button" className="text-btn" onClick={() => switchMode(false)}>Create one for free</button></p>
          ) : (
            <p>Already have an account? <button type="button" className="text-btn" onClick={() => switchMode(true)}>Sign in instead</button></p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
