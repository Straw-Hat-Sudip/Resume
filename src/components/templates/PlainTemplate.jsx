import React from 'react';

const PlainTemplate = ({ data, templateRef }) => {
  return (
    <div className="resume-paper" ref={templateRef}>
      <div className="template-plain">
        <h1>{data.personal.fullName || 'YOUR NAME'}</h1>
        
        <div className="contact-info">
          {[
            data.personal.address,
            data.personal.phone,
            data.personal.email,
            data.personal.linkedin,
            data.personal.github,
            data.personal.website
          ].filter(Boolean).join(' | ')}
        </div>

        {data.personal.summary && (
          <div className="item">
            <p>{data.personal.summary}</p>
          </div>
        )}

        {data.experience.length > 0 && (
          <div>
            <h2>Projects</h2>
            {data.experience.map((exp, index) => (
              <div key={index} className="item">
                <div className="item-header">
                  <span>{exp.title}</span>
                  <span>{exp.startDate}{exp.endDate ? ` - ${exp.endDate}` : ''}</span>
                </div>
                <div className="item-sub">{exp.company}</div>
                {exp.technologies && (
                  <div style={{ fontSize: '0.85rem', fontStyle: 'italic', marginBottom: '4px' }}>
                    Technologies: {exp.technologies}
                  </div>
                )}
                <p>{exp.description}</p>
              </div>
            ))}
          </div>
        )}

        {data.education.length > 0 && (
          <div>
            <h2>Education</h2>
            {data.education.map((edu, index) => (
              <div key={index} className="item">
                <div className="item-header">
                  <span>{edu.degree}</span>
                  <span>{edu.startDate}{edu.endDate ? ` - ${edu.endDate}` : ''}</span>
                </div>
                <div className="item-sub">{edu.school}</div>
              </div>
            ))}
          </div>
        )}

        {data.skills.length > 0 && data.skills[0] !== "" && (
          <div>
            <h2>Skills</h2>
            {data.skills.map((skill, index) => {
              if (typeof skill === 'string' && skill.includes(':')) {
                const colonIdx = skill.indexOf(':');
                const category = skill.substring(0, colonIdx).trim();
                const items = skill.substring(colonIdx + 1).trim();
                return (
                  <div key={index} className="item" style={{ marginBottom: '6px' }}>
                    <p style={{ margin: 0 }}>
                      <strong>• {category}: </strong>
                      <span>{items}</span>
                    </p>
                  </div>
                );
              }
              return (
                <div key={index} className="item" style={{ marginBottom: '6px' }}>
                  <p style={{ margin: 0 }}>• {skill}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default PlainTemplate;
