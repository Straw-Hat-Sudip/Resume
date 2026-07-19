import React from 'react';

const PlainTemplate = ({ data, templateRef }) => {
  return (
    <div className="resume-paper" ref={templateRef}>
      <div className="template-plain">
        <h1>{data.personal.fullName || 'YOUR NAME'}</h1>
        
        <div className="contact-info">
          {data.personal.address && <span>{data.personal.address} | </span>}
          {data.personal.phone && <span>{data.personal.phone} | </span>}
          {data.personal.email && <span>{data.personal.email}</span>}
        </div>

        {data.personal.summary && (
          <div className="item">
            <p>{data.personal.summary}</p>
          </div>
        )}

        {data.experience.length > 0 && (
          <div>
            <h2>Experience</h2>
            {data.experience.map((exp, index) => (
              <div key={index} className="item">
                <div className="item-header">
                  <span>{exp.title}</span>
                  <span>{exp.startDate} - {exp.endDate}</span>
                </div>
                <div className="item-sub">{exp.company}</div>
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
                  <span>{edu.startDate} - {edu.endDate}</span>
                </div>
                <div className="item-sub">{edu.school}</div>
              </div>
            ))}
          </div>
        )}

        {data.skills.length > 0 && data.skills[0] !== "" && (
          <div>
            <h2>Skills</h2>
            <p>{data.skills.join(', ')}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlainTemplate;
