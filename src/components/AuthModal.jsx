import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { X } from 'lucide-react';

const AuthModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
        const { error } = await supabase.auth.signUp({ email, password });
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

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          <X size={20} />
        </button>
        <h2 className="modal-title">{isLogin ? 'Sign In to Download' : 'Create an Account'}</h2>
        <p className="modal-subtitle">
          {isLogin 
            ? 'You need to be signed in to download your resume.' 
            : 'Sign up for free to download and save your resumes.'}
        </p>

        {error && <div className="modal-alert error">{error}</div>}
        {message && <div className="modal-alert success">{message}</div>}

        <form onSubmit={handleAuth} className="modal-form">
          <div className="form-group-modal">
            <label>Email</label>
            <input 
              type="email" 
              required 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              placeholder="you@example.com"
            />
          </div>
          <div className="form-group-modal">
            <label>Password</label>
            <input 
              type="password" 
              required 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              placeholder="••••••••"
            />
          </div>
          <button type="submit" className="btn-primary full-width" disabled={loading}>
            {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Sign Up')}
          </button>
        </form>

        <div className="modal-footer">
          {isLogin ? (
            <p>Don't have an account? <button type="button" className="text-btn" onClick={() => { setIsLogin(false); setError(null); setMessage(null); }}>Sign up</button></p>
          ) : (
            <p>Already have an account? <button type="button" className="text-btn" onClick={() => { setIsLogin(true); setError(null); setMessage(null); }}>Sign in</button></p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
