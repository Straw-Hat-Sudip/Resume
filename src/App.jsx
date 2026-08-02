import React, { useState, useEffect } from 'react';
import { supabase } from './lib/supabaseClient';
import ResumeForm from './components/ResumeForm';
import ResumePreview from './components/ResumePreview';
import { FileText, LogOut, Check, RotateCcw, Sparkles } from 'lucide-react';
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
      <header className="header">
        <div className="header-brand">
          <div className="logo-badge">
            <FileText size={20} />
          </div>
          <span className="brand-title">Resume Builder</span>
        </div>

        <div className="header-controls">
          {/* Draft Auto-save Indicator */}
          <div className="save-status-badge">
            <span className={`status-dot ${saveStatus === 'Saving...' ? 'saving' : ''}`}></span>
            <span>{saveStatus === 'Saving...' ? 'Saving draft...' : 'Auto-Saved'}</span>
          </div>

          <button 
            onClick={handleResetForm}
            className="clear-btn"
            title="Clear form and start fresh"
          >
            <RotateCcw size={14} /> Clear Form
          </button>

          {user ? (
            <div className="user-profile-pill">
              <span className="user-email">{user.email}</span>
              <button 
                onClick={handleLogout} 
                className="logout-btn"
                title="Logout"
              >
                <LogOut size={15} /> Logout
              </button>
            </div>
          ) : (
            <span className="free-badge">✨ Free Resume Builder</span>
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
