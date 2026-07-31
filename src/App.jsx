import React, { useState, useEffect } from 'react';
import { supabase } from './lib/supabaseClient';
import ResumeForm from './components/ResumeForm';
import ResumePreview from './components/ResumePreview';
import { FileText, LogOut } from 'lucide-react';
import './index.css';

function App() {
  const [template, setTemplate] = useState('classic');
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
      fullName: 'SUDIP PATRA',
      jobTitle: 'Electronics & Communication Engineering Undergraduate | MERN Stack & Frontend Developer',
      email: 'sudippatra@email.com',
      phone: '+91 98765 43210',
      address: 'Singur, West Bengal, India',
      linkedin: 'linkedin.com/in/sudip-patra-2b4366318',
      github: 'github.com/sudippatra',
      summary: 'Passionate and solution-oriented Electronics & Communication Engineering undergraduate with expertise in Frontend Development and the MERN Stack. Proficient in JavaScript, C, and Python, with hands-on experience building modern, responsive, and user-centric web applications. Adept at leveraging technical concepts to build innovative software solutions and eager to contribute to dynamic software engineering teams.'
    },
    experience: [
      {
        company: 'MERN Stack E-Commerce / Full-Stack Web Application',
        title: 'Full-Stack Developer Project',
        startDate: '2024',
        endDate: '',
        technologies: 'React.js, Node.js, Express.js, MongoDB, JWT, CSS3',
        description: '• Engineered a full-stack web application featuring user authentication, protected routes, dynamic data fetching, and state management.\n• Designed RESTful APIs using Express.js and Node.js for seamless interaction between client frontend and MongoDB database.\n• Implemented responsive, user-centric interfaces ensuring seamless cross-device display and optimal page loading speeds.'
      },
      {
        company: 'Interactive Frontend Dashboard Application',
        title: 'Frontend Developer Project',
        startDate: '2024',
        endDate: '',
        technologies: 'React.js, JavaScript (ES6+), HTML5, CSS3, REST APIs',
        description: '• Developed an interactive frontend web dashboard providing real-time data display and intuitive user controls.\n• Utilized reusable React components, modular layout architecture, and state hooks (`useState`, `useEffect`) for effective UI state management.\n• Integrated third-party APIs to process dynamic inputs and render clean visual analytics.'
      }
    ],
    education: [
      {
        school: 'Techno India College Of Technology',
        degree: 'Bachelor of Technology (B.Tech) in Electronics & Communication Engineering',
        startDate: 'Expected 2026',
        endDate: '',
        location: 'West Bengal, India',
        description: '• Relevant Coursework: Data Structures & Algorithms, Object-Oriented Programming (OOP), Digital Electronics, Microprocessors & Microcontrollers, Network Analysis.'
      }
    ],
    skills: [
      'Frontend Web Tech: HTML5, CSS3, JavaScript (ES6+), React.js, Redux, Bootstrap, Responsive Web Design',
      'Backend & Databases: Node.js, Express.js, MongoDB, RESTful APIs, JSON',
      'Programming Languages: C, Python, JavaScript',
      'Developer Tools & VCS: Git, GitHub, VS Code, Postman, Linux / Bash Basics',
      'Core Engineering Concepts: Data Structures & Algorithms, Object-Oriented Programming, Microprocessors, Computer Networks'
    ]
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
