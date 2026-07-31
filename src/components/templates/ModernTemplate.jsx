import React from 'react';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';

const LinkedInIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const GitHubIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

const ModernTemplate = ({ data, templateRef }) => {
  return (
    <div className="resume-paper" ref={templateRef}>
      <div className="template-modern">
        <div className="sidebar">
          {data.personal.fullName && <h1>{data.personal.fullName}</h1>}
          {data.personal.jobTitle && <div className="role">{data.personal.jobTitle}</div>}
          
          <h2>Contact</h2>
          {data.personal.email && (
            <div className="contact-item">
              <Mail size={16} />
              <span>{data.personal.email}</span>
            </div>
          )}
          {data.personal.phone && (
            <div className="contact-item">
              <Phone size={16} />
              <span>{data.personal.phone}</span>
            </div>
          )}
          {data.personal.address && (
            <div className="contact-item">
              <MapPin size={16} />
              <span>{data.personal.address}</span>
            </div>
          )}
          {data.personal.linkedin && (
            <div className="contact-item">
              <LinkedInIcon size={16} />
              <span>{data.personal.linkedin}</span>
            </div>
          )}
          {data.personal.github && (
            <div className="contact-item">
              <GitHubIcon size={16} />
              <span>{data.personal.github}</span>
            </div>
          )}
          {data.personal.website && (
            <div className="contact-item">
              <Globe size={16} />
              <span>{data.personal.website}</span>
            </div>
          )}

          {data.skills.length > 0 && data.skills[0] !== "" && (
            <div>
              <h2>Skills</h2>
              <div style={{ marginTop: '12px' }}>
                {data.skills.map((skill, index) => (
                  <span key={index} className="skill-item">{skill}</span>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div className="main-col">
          {data.personal.summary && (
            <div>
              <h2>Profile</h2>
              <p style={{ lineHeight: '1.6', color: 'var(--text-muted)' }}>{data.personal.summary}</p>
            </div>
          )}

          {data.experience.length > 0 && (
            <div>
              <h2>Projects</h2>
              {data.experience.map((exp, index) => (
                <div key={index} className="item">
                  <div className="item-header-row">
                    <span className="item-title">{exp.title}</span>
                    <span className="item-date">{exp.startDate} - {exp.endDate}</span>
                  </div>
                  <div className="item-subtitle">{exp.company}</div>
                  {exp.technologies && (
                    <div style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 500, margin: '2px 0 6px 0' }}>
                      Technologies: {exp.technologies}
                    </div>
                  )}
                  <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>{exp.description}</p>
                </div>
              ))}
            </div>
          )}

          {data.education.length > 0 && (
            <div>
              <h2>Education</h2>
              {data.education.map((edu, index) => (
                <div key={index} className="item">
                  <div className="item-header-row">
                    <span className="item-title">{edu.degree}</span>
                    <span className="item-date">{edu.startDate} - {edu.endDate}</span>
                  </div>
                  <div className="item-subtitle">{edu.school}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModernTemplate;
