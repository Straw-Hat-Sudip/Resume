import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

const ResumeForm = ({ resumeData, setResumeData }) => {
  const handleChange = (section, field, value) => {
    setResumeData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleArrayChange = (section, index, field, value) => {
    setResumeData(prev => {
      const newArray = [...prev[section]];
      newArray[index] = { ...newArray[index], [field]: value };
      return { ...prev, [section]: newArray };
    });
  };

  const addArrayItem = (section, defaultItem) => {
    setResumeData(prev => ({
      ...prev,
      [section]: [...prev[section], defaultItem]
    }));
  };

  const removeArrayItem = (section, index) => {
    setResumeData(prev => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="form-section">
      <div className="form-group">
        <h3>Personal Details</h3>
        <div className="input-row">
          <div className="input-col">
            <label>Full Name</label>
            <input 
              type="text" 
              value={resumeData.personal.fullName} 
              onChange={(e) => handleChange('personal', 'fullName', e.target.value)} 
              placeholder="e.g. John Doe"
            />
          </div>
          <div className="input-col">
            <label>Job Title</label>
            <input 
              type="text" 
              value={resumeData.personal.jobTitle} 
              onChange={(e) => handleChange('personal', 'jobTitle', e.target.value)} 
              placeholder="e.g. Software Engineer"
            />
          </div>
        </div>
        <div className="input-row">
          <div className="input-col">
            <label>Email</label>
            <input 
              type="email" 
              value={resumeData.personal.email} 
              onChange={(e) => handleChange('personal', 'email', e.target.value)} 
              placeholder="e.g. john@example.com"
            />
          </div>
          <div className="input-col">
            <label>Phone</label>
            <input 
              type="text" 
              value={resumeData.personal.phone} 
              onChange={(e) => handleChange('personal', 'phone', e.target.value)} 
              placeholder="e.g. +1 234 567 890"
            />
          </div>
        </div>
        <div className="input-row">
          <div className="input-col">
            <label>Address</label>
            <input 
              type="text" 
              value={resumeData.personal.address || ''} 
              onChange={(e) => handleChange('personal', 'address', e.target.value)} 
              placeholder="e.g. Singur, West Bengal, India"
            />
          </div>
        </div>
        <div className="input-row">
          <div className="input-col">
            <label>LinkedIn</label>
            <input 
              type="text" 
              value={resumeData.personal.linkedin || ''} 
              onChange={(e) => handleChange('personal', 'linkedin', e.target.value)} 
              placeholder="e.g. linkedin.com/in/username"
            />
          </div>
          <div className="input-col">
            <label>GitHub</label>
            <input 
              type="text" 
              value={resumeData.personal.github || ''} 
              onChange={(e) => handleChange('personal', 'github', e.target.value)} 
              placeholder="e.g. github.com/username"
            />
          </div>
        </div>
        <div className="input-col">
          <label>Professional Summary</label>
          <textarea 
            rows="4" 
            value={resumeData.personal.summary} 
            onChange={(e) => handleChange('personal', 'summary', e.target.value)} 
            placeholder="A brief summary of your professional background..."
          />
        </div>
      </div>

      <div className="form-group">
        <h3>Projects</h3>
        {resumeData.experience.map((exp, index) => (
          <div key={index} className="dynamic-item">
            <div className="dynamic-item-header">
              <span style={{fontWeight: 600}}>Project {index + 1}</span>
              <button className="remove-btn" onClick={() => removeArrayItem('experience', index)}>
                <Trash2 size={16} />
              </button>
            </div>
            <div className="input-row">
              <div className="input-col">
                <label>Project / Company Name</label>
                <input 
                  type="text" 
                  value={exp.company} 
                  onChange={(e) => handleArrayChange('experience', index, 'company', e.target.value)} 
                  placeholder="e.g. E-Commerce Web App"
                />
              </div>
              <div className="input-col">
                <label>Role / Subtitle</label>
                <input 
                  type="text" 
                  value={exp.title} 
                  onChange={(e) => handleArrayChange('experience', index, 'title', e.target.value)} 
                  placeholder="e.g. Full-Stack Developer Project"
                />
              </div>
            </div>
            <div className="input-col" style={{ marginBottom: '16px' }}>
              <label>Technologies Used</label>
              <input 
                type="text" 
                value={exp.technologies || ''} 
                onChange={(e) => handleArrayChange('experience', index, 'technologies', e.target.value)} 
                placeholder="e.g. React.js, Node.js, Express.js, MongoDB, JWT, CSS3"
              />
            </div>
            <div className="input-row">
              <div className="input-col">
                <label>Start Date</label>
                <input 
                  type="text" 
                  value={exp.startDate} 
                  onChange={(e) => handleArrayChange('experience', index, 'startDate', e.target.value)} 
                  placeholder="e.g. 2024"
                />
              </div>
              <div className="input-col">
                <label>End Date</label>
                <input 
                  type="text" 
                  value={exp.endDate} 
                  onChange={(e) => handleArrayChange('experience', index, 'endDate', e.target.value)} 
                  placeholder="e.g. Present"
                />
              </div>
            </div>
            <div className="input-col">
              <label>Description</label>
              <textarea 
                rows="3" 
                value={exp.description} 
                onChange={(e) => handleArrayChange('experience', index, 'description', e.target.value)} 
                placeholder="Key highlights and achievements..."
              />
            </div>
          </div>
        ))}
        <button 
          className="add-btn" 
          onClick={() => addArrayItem('experience', { company: '', title: '', technologies: '', startDate: '', endDate: '', description: '' })}
        >
          <Plus size={18} /> Add Project
        </button>
      </div>

      <div className="form-group">
        <h3>Education</h3>
        {resumeData.education.map((edu, index) => (
          <div key={index} className="dynamic-item">
            <div className="dynamic-item-header">
              <span style={{fontWeight: 600}}>Education {index + 1}</span>
              <button className="remove-btn" onClick={() => removeArrayItem('education', index)}>
                <Trash2 size={16} />
              </button>
            </div>
            <div className="input-row">
              <div className="input-col">
                <label>Institution</label>
                <input 
                  type="text" 
                  value={edu.school} 
                  onChange={(e) => handleArrayChange('education', index, 'school', e.target.value)} 
                  placeholder="e.g. MIT"
                />
              </div>
              <div className="input-col">
                <label>Degree</label>
                <input 
                  type="text" 
                  value={edu.degree} 
                  onChange={(e) => handleArrayChange('education', index, 'degree', e.target.value)} 
                  placeholder="e.g. B.S. Computer Science"
                />
              </div>
            </div>
            <div className="input-row">
              <div className="input-col">
                <label>Start Date</label>
                <input 
                  type="text" 
                  value={edu.startDate} 
                  onChange={(e) => handleArrayChange('education', index, 'startDate', e.target.value)} 
                  placeholder="e.g. Sep 2016"
                />
              </div>
              <div className="input-col">
                <label>End Date</label>
                <input 
                  type="text" 
                  value={edu.endDate} 
                  onChange={(e) => handleArrayChange('education', index, 'endDate', e.target.value)} 
                  placeholder="e.g. May 2020"
                />
              </div>
            </div>
          </div>
        ))}
        <button 
          className="add-btn" 
          onClick={() => addArrayItem('education', { school: '', degree: '', startDate: '', endDate: '' })}
        >
          <Plus size={18} /> Add Education
        </button>
      </div>

      <div className="form-group">
        <h3>Skills</h3>
        {resumeData.skills.map((skill, index) => {
          let category = '';
          let details = '';
          if (typeof skill === 'object' && skill !== null) {
            category = skill.category || '';
            details = skill.details || '';
          } else if (typeof skill === 'string') {
            if (skill.includes(':')) {
              const colonIdx = skill.indexOf(':');
              category = skill.substring(0, colonIdx).trim();
              details = skill.substring(colonIdx + 1).trim();
            } else {
              details = skill;
            }
          }

          const updateSkillField = (field, value) => {
            setResumeData(prev => {
              const newSkills = [...prev.skills];
              newSkills[index] = {
                category: field === 'category' ? value : category,
                details: field === 'details' ? value : details
              };
              return { ...prev, skills: newSkills };
            });
          };

          return (
            <div key={index} className="dynamic-item">
              <div className="dynamic-item-header">
                <span style={{ fontWeight: 600 }}>Skill Group {index + 1}</span>
                <button className="remove-btn" onClick={() => removeArrayItem('skills', index)}>
                  <Trash2 size={16} />
                </button>
              </div>
              <div className="input-row">
                <div className="input-col">
                  <label>Category Title (Optional)</label>
                  <input 
                    type="text" 
                    value={category} 
                    onChange={(e) => updateSkillField('category', e.target.value)} 
                    placeholder="e.g. Frontend Web Tech"
                  />
                </div>
              </div>
              <div className="input-col">
                <label>Skills / Technologies</label>
                <input 
                  type="text" 
                  value={details} 
                  onChange={(e) => updateSkillField('details', e.target.value)} 
                  placeholder="e.g. HTML5, CSS3, JavaScript (ES6+), React.js"
                />
              </div>
            </div>
          );
        })}
        <button 
          className="add-btn" 
          onClick={() => addArrayItem('skills', { category: '', details: '' })}
        >
          <Plus size={18} /> Add Skill Category
        </button>
      </div>
    </div>
  );
};

export default ResumeForm;
