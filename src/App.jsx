import React, { useState, useEffect } from 'react';
import { supabase } from './lib/supabaseClient';
import ResumeForm from './components/ResumeForm';
import ResumePreview from './components/ResumePreview';
import { FileText, LogOut } from 'lucide-react';
import './index.css';

function App() {
  const [template, setTemplate] = useState('modern');
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const [resumeData, setResumeData] = useState({
    personal: {
      fullName: 'John Doe',
      jobTitle: 'Senior Software Engineer',
      email: 'john.doe@example.com',
      phone: '+1 (555) 123-4567',
      address: 'San Francisco, CA',
      summary: 'Experienced software engineer with a passion for developing innovative programs that expedite the efficiency and effectiveness of organizational success. Well-versed in technology and writing code to create systems that are reliable and user-friendly.'
    },
    experience: [
      {
        company: 'Tech Solutions Inc.',
        title: 'Senior Software Engineer',
        startDate: 'Jan 2021',
        endDate: 'Present',
        description: 'Led a team of 5 developers to create a new microservices architecture. Improved system performance by 40% and reduced downtime by 20%.'
      },
      {
        company: 'Web Innovations LLC',
        title: 'Frontend Developer',
        startDate: 'Mar 2018',
        endDate: 'Dec 2020',
        description: 'Developed responsive web applications using React and Redux. Collaborated closely with designers to ensure UI/UX consistency across all platforms.'
      }
    ],
    education: [
      {
        school: 'University of California, Berkeley',
        degree: 'B.S. Computer Science',
        startDate: 'Aug 2014',
        endDate: 'May 2018'
      }
    ],
    skills: ['JavaScript', 'React', 'Node.js', 'Python', 'SQL', 'AWS', 'Docker', 'Git']
  });

  return (
    <div className="app-container">
      <header className="header" style={{ justifyContent: 'space-between' }}>
        <div className="header-title">
          <FileText size={24} />
          Resume Builder
        </div>
        <div>
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
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
