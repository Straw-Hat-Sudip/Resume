import React, { useState, useEffect } from 'react';
import { supabase } from './lib/supabaseClient';
import ResumeForm from './components/ResumeForm';
import ResumePreview from './components/ResumePreview';
import { FileText, LogOut, Check, RotateCcw } from 'lucide-react';
import './index.css';

const defaultEmptyResume = {
  personal: {
    fullName: '',
    jobTitle: '',
    email: '',
    phone: '',
    address: '',
    linkedin: '',
    github: '',
    summary: ''
  },
  experience: [],
  education: [],
  skills: []
};

function App() {
  const [template, setTemplate] = useState('classic');
  const [user, setUser] = useState(null);
  const [saveStatus, setSaveStatus] = useState('Saved'); // 'Saved', 'Saving...'

  // Initialize resumeData from localStorage draft if available
  const [resumeData, setResumeData] = useState(() => {
    try {
      const saved = localStorage.getItem('resume_builder_draft');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object' && parsed.personal) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Error reading draft from localStorage:', e);
    }
    return defaultEmptyResume;
  });

  useEffect(() => {
    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);

      // Restore user cloud draft if available
      if (currentUser?.user_metadata?.resumeData) {
        setResumeData(currentUser.user_metadata.resumeData);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Save draft locally on every change & sync with cloud when logged in
  useEffect(() => {
    setSaveStatus('Saving...');

    try {
      localStorage.setItem('resume_builder_draft', JSON.stringify(resumeData));
    } catch (e) {
      console.error('Error saving local draft:', e);
    }

    const timer = setTimeout(async () => {
      setSaveStatus('Saved');
      if (user) {
        try {
          // Save draft to Supabase user_metadata
          await supabase.auth.updateUser({
            data: { resumeData }
          });
          // Attempt table save if table exists
          await supabase
            .from('resumes')
            .upsert({ user_id: user.id, data: resumeData, updated_at: new Date() })
            .catch(() => {});
        } catch (e) {
          // Ignore cloud error, local storage draft persists
        }
      }
    }, 800);

    return () => clearTimeout(timer);
  }, [resumeData, user]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const handleResetForm = () => {
    if (window.confirm('Are you sure you want to clear all form fields and start fresh?')) {
      setResumeData(defaultEmptyResume);
      localStorage.removeItem('resume_builder_draft');
    }
  };

  return (
    <div className="app-container">
      <header className="header" style={{ justifyContent: 'space-between' }}>
        <div className="header-title">
          <FileText size={24} />
          Resume Builder
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {/* Draft Auto-save Indicator */}
          <span 
            style={{ 
              fontSize: '0.8rem', 
              color: 'var(--text-muted)', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '4px',
              background: 'var(--secondary)',
              padding: '4px 10px',
              borderRadius: '12px'
            }}
          >
            <Check size={14} color="var(--primary)" />
            {saveStatus === 'Saving...' ? 'Saving...' : 'Auto-Saved'}
          </span>

          <button 
            onClick={handleResetForm}
            title="Reset Form"
            style={{ 
              background: 'none', 
              border: '1px solid var(--border)', 
              borderRadius: 'var(--radius-sm)',
              padding: '6px 12px',
              color: 'var(--text-muted)', 
              cursor: 'pointer', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '6px',
              fontSize: '0.85rem'
            }}
          >
            <RotateCcw size={14} /> Clear Form
          </button>

          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{user.email}</span>
              <button 
                onClick={handleLogout} 
                style={{ background: 'none', border: 'none', color: 'var(--text-main)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <LogOut size={16} /> Logout
              </button>
            </div>
          ) : (
            <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Use the builder for free!</span>
          )}
        </div>
      </header>
      
      <main className="main-content">
        <ResumeForm resumeData={resumeData} setResumeData={setResumeData} />
        <ResumePreview resumeData={resumeData} template={template} setTemplate={setTemplate} user={user} />
      </main>
    </div>
  );
}

export default App;
