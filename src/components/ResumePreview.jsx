import React, { useRef, useState } from 'react';
import html2pdf from 'html2pdf.js';
import { Download, Lock } from 'lucide-react';
import PlainTemplate from './templates/PlainTemplate';
import ModernTemplate from './templates/ModernTemplate';
import ClassicTemplate from './templates/ClassicTemplate';
import AuthModal from './AuthModal';

const ResumePreview = ({ resumeData, template, setTemplate, user }) => {
  const resumeRef = useRef();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleDownloadPDF = () => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }

    const element = resumeRef.current;
    
    const opt = {
      margin:       0,
      filename:     `${resumeData.personal.fullName || 'Resume'}.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true, logging: false },
      jsPDF:        { unit: 'px', format: [800, 1131], orientation: 'portrait' }
    };

    html2pdf().from(element).set(opt).save();
  };

  return (
    <div className="preview-section">
      <div className="preview-toolbar">
        <div className="template-selector">
          <span style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-muted)' }}>Template:</span>
          <button 
            className={`template-btn ${template === 'classic' ? 'active' : ''}`}
            onClick={() => setTemplate('classic')}
          >
            Classic Blue
          </button>
          <button 
            className={`template-btn ${template === 'modern' ? 'active' : ''}`}
            onClick={() => setTemplate('modern')}
          >
            Modern
          </button>
          <button 
            className={`template-btn ${template === 'plain' ? 'active' : ''}`}
            onClick={() => setTemplate('plain')}
          >
            Plain
          </button>
        </div>
        <button className="btn-primary" onClick={handleDownloadPDF}>
          {!user ? <Lock size={18} /> : <Download size={18} />}
          Generate Resume
        </button>
      </div>

      <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        {template === 'classic' ? (
          <ClassicTemplate data={resumeData} templateRef={resumeRef} />
        ) : template === 'plain' ? (
          <PlainTemplate data={resumeData} templateRef={resumeRef} />
        ) : (
          <ModernTemplate data={resumeData} templateRef={resumeRef} />
        )}
      </div>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </div>
  );
};

export default ResumePreview;
