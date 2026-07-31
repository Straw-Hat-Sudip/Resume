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

        {data.skills && data.skills.some(s => {
          const obj = typeof s === 'object' && s !== null ? s : (typeof s === 'string' && s.includes(':') ? { category: s.split(':')[0], details: s.split(':')[1] } : { category: '', details: s });
          return (obj.category && obj.category.trim() !== '') || (obj.details && obj.details.trim() !== '');
        }) && (
          <div>
            <h2>Skills</h2>
            {data.skills.map((skill, index) => {
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
                <div key={index} className="item" style={{ marginBottom: '6px' }}>
                  <p style={{ margin: 0 }}>
                    {category ? <strong>• {category}: </strong> : <strong>• </strong>}
                    <span>{details}</span>
                  </p>
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
