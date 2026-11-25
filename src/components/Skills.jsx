import { useState } from 'react';
import {
  PlusCircle,
  Trash2,
  X
} from 'lucide-react';

export default function Skills({ skills, onAddSkill, onDeleteSkill }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Frontend');
  const [level, setLevel] = useState('Intermediate');
  const [percent, setPercent] = useState(75);

  const categories = ['Frontend', 'Languages', 'Tools & Workflow', 'Backend / Full-Stack'];
  const levels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

  const handleAdd = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    onAddSkill({
      id: `s-${Date.now()}`,
      name: name.trim(),
      category,
      level,
      percent: Number(percent)
    });

    setName('');
    setPercent(75);
    setIsModalOpen(false);
  };

  // Group by category
  const grouped = {};
  for (let i = 0; i < categories.length; i += 1) {
    const categorySkills = [];
    for (let j = 0; j < skills.length; j += 1) {
      if (skills[j].category === categories[i]) {
        categorySkills.push(skills[j]);
      }
    }
    grouped[categories[i]] = categorySkills;
  }

  return (
    <div className="inline-style-3">
      {/* Header Banner */}
      <div
        className="glass-card inline-style-4"
        
      >
        <div>
          <div className="inline-style-5">
            <span className="badge badge-indigo">Technical Competencies</span>
            <span className="inline-style-6">• {skills.length} Documented Skills</span>
          </div>
          <h1 className="inline-style-7">Skills & Growth Tracker</h1>
          <p className="inline-style-8">
            Track technologies you are learning, update your proficiency levels, and showcase your expertise.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="btn btn-primary inline-style-9"
          
        >
          <PlusCircle size={17} />
          <span>Add New Skill</span>
        </button>
      </div>

      {/* Categorized Skills Grid */}
      <div className="grid-2 inline-style-10" >
        {categories.map((cat) => (
          <div key={cat} className="glass-card inline-style-11" >
            <div className="inline-style-12">
              <h3 className="inline-style-13">{cat}</h3>
              <span className="badge badge-muted">{grouped[cat]?.length || 0} skills</span>
            </div>

            {grouped[cat] && grouped[cat].length > 0 ? (
              <div className="inline-style-14">
                {grouped[cat].map((skill) => (
                  <div
                    key={skill.id}
                    className="inline-style-15"
                  >
                    <div className="inline-style-16">
                      <span className="inline-style-17">
                        {skill.name}
                      </span>
                      <div className="inline-style-9">
                        <span className="badge badge-emerald inline-style-18" >
                          {skill.level} ({skill.percent}%)
                        </span>
                        <button
                          onClick={() => onDeleteSkill(skill.id)}
                          className="inline-style-19"
                          title="Delete skill"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>

                    <div className="progress-container">
                      <div className="progress-fill" style={{ width: `${skill.percent}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="inline-style-20">
                No skills added yet in {cat}.
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add Skill Modal */}
      {isModalOpen && (
        <div className="modal-backdrop" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="inline-style-21">
              <h3 className="inline-style-22">Add New Skill</h3>
              <button onClick={() => setIsModalOpen(false)} className="btn btn-secondary btn-sm inline-style-23" >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleAdd} className="inline-style-14">
              <div className="form-group inline-style-24" >
                <label className="form-label">Skill Name *</label>
                <input
                  type="text"
                  placeholder="e.g. React, JavaScript, CSS"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input"
                  required
                />
              </div>

              <div className="grid-2 inline-style-25" >
                <div>
                  <label className="form-label">Category</label>
                  <select value={category} onChange={(e) => setCategory(e.target.value)} className="select">
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="form-label">Proficiency Level</label>
                  <select value={level} onChange={(e) => setLevel(e.target.value)} className="select">
                    {levels.map(l => <option key={l} value={l}>{l}</option>)}
                  </select>
                </div>
              </div>

              <div className="form-group inline-style-24" >
                <div className="inline-style-26">
                  <label className="form-label">Proficiency Percentage</label>
                  <span className="inline-style-27">{percent}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  step="5"
                  value={percent}
                  onChange={(e) => setPercent(e.target.value)}
                  className="inline-style-28"
                />
              </div>

              <div className="inline-style-29">
                <button type="button" onClick={() => setIsModalOpen(false)} className="btn btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Skill
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
