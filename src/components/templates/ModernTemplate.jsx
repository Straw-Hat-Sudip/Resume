import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

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
              <h2>Experience</h2>
              {data.experience.map((exp, index) => (
                <div key={index} className="item">
                  <div className="item-header-row">
                    <span className="item-title">{exp.title}</span>
                    <span className="item-date">{exp.startDate} - {exp.endDate}</span>
                  </div>
                  <div className="item-subtitle">{exp.company}</div>
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
