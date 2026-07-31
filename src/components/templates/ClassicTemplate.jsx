import React from 'react';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';

const LinkedInIcon = ({ size = 13 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const GitHubIcon = ({ size = 13 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

const ClassicTemplate = ({ data, templateRef }) => {
  const { personal = {}, experience = [], education = [], skills = [] } = data || {};

  return (
    <div className="resume-paper" ref={templateRef}>
      <div className="template-classic">
        {/* Header Section */}
        <header className="classic-header">
          {personal.fullName && <h1 className="classic-name">{personal.fullName}</h1>}
          {personal.jobTitle && <div className="classic-title">{personal.jobTitle}</div>}
          
          <div className="classic-contact">
            {personal.address && (
              <span className="contact-item">
                <MapPin size={13} />
                {personal.address}
              </span>
            )}
            {personal.email && (
              <span className="contact-item">
                <Mail size={13} />
                {personal.email}
              </span>
            )}
            {personal.phone && (
              <span className="contact-item">
                <Phone size={13} />
                {personal.phone}
              </span>
            )}
            {personal.linkedin && (
              <span className="contact-item">
                <LinkedInIcon size={13} />
                {personal.linkedin}
              </span>
            )}
            {personal.github && (
              <span className="contact-item">
                <GitHubIcon size={13} />
                {personal.github}
              </span>
            )}
            {personal.website && (
              <span className="contact-item">
                <Globe size={13} />
                {personal.website}
              </span>
            )}
          </div>
          <div className="classic-divider"></div>
        </header>

        {/* Professional Summary */}
        {personal.summary && (
          <section className="classic-section">
            <h2 className="classic-section-title">PROFESSIONAL SUMMARY</h2>
            <p className="classic-summary">{personal.summary}</p>
          </section>
        )}

        {/* Technical Skills */}
        {skills && skills.some(s => {
          const obj = typeof s === 'object' && s !== null ? s : (typeof s === 'string' && s.includes(':') ? { category: s.split(':')[0], details: s.split(':')[1] } : { category: '', details: s });
          return (obj.category && obj.category.trim() !== '') || (obj.details && obj.details.trim() !== '');
        }) && (
          <section className="classic-section">
            <h2 className="classic-section-title">TECHNICAL SKILLS</h2>
            <div className="classic-skills-container">
              {skills.map((skill, index) => {
                let category = '';
                let details = '';
                if (typeof skill === 'object' && skill !== null) {
                  category = (skill.category || '').trim();
                  details = (skill.details || '').trim();
                } else if (typeof skill === 'string') {
                  if (skill.includes(':')) {
                    const colonIdx = skill.indexOf(':');
                    category = skill.substring(0, colonIdx).trim();
                    details = skill.substring(colonIdx + 1).trim();
                  } else {
                    details = skill.trim();
                  }
                }
                if (!category && !details) return null;
                return (
                  <div key={index} className="classic-skill-row">
                    {category && <span className="skill-category">{category}:</span>}
                    {details && <span className="skill-items">{details}</span>}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Education */}
        {education && education.length > 0 && (
          <section className="classic-section">
            <h2 className="classic-section-title">EDUCATION</h2>
            {education.map((edu, index) => (
              <div key={index} className="classic-item">
                <div className="classic-item-row">
                  <span className="classic-item-bold">{edu.school}</span>
                  <span className="classic-item-date">{edu.startDate} {edu.endDate ? `- ${edu.endDate}` : ''}</span>
                </div>
                <div className="classic-item-row">
                  <span className="classic-item-italic">{edu.degree}</span>
                  {edu.location && <span className="classic-item-subdate">{edu.location}</span>}
                </div>
                {edu.description && (
                  <div className="classic-bullets">
                    {edu.description.split('\n').map((line, lIdx) => (
                      <p key={lIdx}>{line}</p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Projects */}
        {experience && experience.length > 0 && (
          <section className="classic-section">
            <h2 className="classic-section-title">PROJECTS</h2>
            {experience.map((exp, index) => (
              <div key={index} className="classic-item">
                <div className="classic-item-row">
                  <span className="classic-item-bold">{exp.company || exp.title}</span>
                  <span className="classic-item-date">{exp.startDate} {exp.endDate ? `- ${exp.endDate}` : ''}</span>
                </div>
                {exp.company && exp.title && (
                  <div className="classic-item-subtitle">{exp.title}</div>
                )}
                {exp.technologies && (
                  <div className="classic-tech-stack">
                    <span style={{ fontWeight: 600 }}>Technologies: </span>
                    {exp.technologies}
                  </div>
                )}
                {exp.description && (
                  <div className="classic-bullets">
                    {exp.description.split('\n').map((line, lIdx) => (
                      <p key={lIdx}>{line}</p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
};

export default ClassicTemplate;
