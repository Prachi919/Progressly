import { useState } from 'react';
import {
  GraduationCap,
  MapPin,
  Mail,
  Edit3,
  Flame,
  BookOpen,
  Code2,
  X,
  Shield
} from 'lucide-react';

export default function Profile({ user, onUpdateUser, journal, skills, privacySettings }) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user.name || '');
  const [role, setRole] = useState(user.role || '');
  const [bio, setBio] = useState(user.bio || '');
  const [college, setCollege] = useState(user.college || '');
  const [location, setLocation] = useState(user.location || '');

  const handleSave = (e) => {
    e.preventDefault();
    onUpdateUser({
      ...user,
      name: name.trim() || user.name,
      role: role.trim() || 'Learner / Developer',
      bio: bio.trim(),
      college: college.trim(),
      location: location.trim()
    });
    setIsEditing(false);
  };

  return (
    <div className="inline-style-3">
      <div
        className="glass-card inline-style-94"
        
      >
        <div className="inline-style-95">
          <div className="inline-style-96">
            <div
              className="inline-style-97"
            >
              ‍
            </div>

            <div>
              <div className="inline-style-43">
                <h1 className="inline-style-7">{user.name}</h1>
                <span className="badge badge-emerald">Living Portfolio</span>
                <span className="streak-flame">
                  <Flame size={14} fill="#fbbf24" /> {user.streakDays || 1} Days Streak
                </span>
              </div>
              <div className="inline-style-98">
                {user.role || 'Learner & Developer'}
              </div>
              <div className="inline-style-99">
                {user.college && (
                  <span className="inline-style-45">
                    <GraduationCap size={14} /> {user.college}
                  </span>
                )}
                {user.location && (
                  <span className="inline-style-45">
                    <MapPin size={14} /> {user.location}
                  </span>
                )}
                <span className="inline-style-45">
                  <Mail size={14} /> {user.email}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              setName(user.name || '');
              setRole(user.role || '');
              setBio(user.bio || '');
              setCollege(user.college || '');
              setLocation(user.location || '');
              setIsEditing(true);
            }}
            className="btn btn-secondary btn-sm inline-style-81"
            
          >
            <Edit3 size={15} />
            <span>Edit Profile</span>
          </button>
        </div>

        <p className="inline-style-100">
          {user.bio || 'No bio added yet. Click "Edit Profile" to add your introduction, goals, and learning vision.'}
        </p>

        <div className="inline-style-101">
          <Shield size={14} color="var(--accent-primary)" />
          <span>Profile Visibility: <strong className="inline-style-102">{privacySettings.profileVisibility}</strong></span>
        </div>
      </div>

      <div className="grid-2 inline-style-103" >
        <div className="glass-card">
          <div className="inline-style-104">
            <Code2 size={18} color="var(--accent-primary)" />
            <h3 className="inline-style-105">Technical Skills Summary</h3>
          </div>
          {skills && skills.length > 0 ? (
            <div className="inline-style-106">
              {skills.map((s) => (
                <span key={s.id} className="badge badge-emerald inline-style-107" >
                  {s.name} • {s.level}
                </span>
              ))}
            </div>
          ) : (
            <p className="inline-style-108">
              No skills added yet. Go to the Skills tab to add technologies you are learning.
            </p>
          )}
        </div>

        <div className="glass-card">
          <div className="inline-style-104">
            <BookOpen size={18} color="var(--accent-indigo)" />
            <h3 className="inline-style-105">Journey Record</h3>
          </div>
          <div className="inline-style-79">
            <div className="inline-style-109">
              <span className="inline-style-59">Total Journal Reflections:</span>
              <strong className="inline-style-58">{journal.length} entries</strong>
            </div>
            <div className="inline-style-109">
              <span className="inline-style-59">Active Continuous Streak:</span>
              <strong className="inline-style-110">{user.streakDays || 1} days</strong>
            </div>
            <div className="inline-style-109">
              <span className="inline-style-59">Skills Documented:</span>
              <strong className="inline-style-111">{skills.length} proficiencies</strong>
            </div>
          </div>
        </div>
      </div>

      {isEditing && (
        <div className="modal-backdrop" onClick={() => setIsEditing(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="inline-style-21">
              <h3 className="inline-style-22">Edit Living Portfolio</h3>
              <button
                onClick={() => setIsEditing(false)}
                className="btn btn-secondary btn-sm inline-style-23"
                
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSave} className="inline-style-14">
              <div className="form-group inline-style-24" >
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input"
                  required
                />
              </div>

              <div className="form-group inline-style-24" >
                <label className="form-label">Professional Role / Headline</label>
                <input
                  type="text"
                  placeholder="e.g. Student & React Developer"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="input"
                />
              </div>

              <div className="form-group inline-style-24" >
                <label className="form-label">Bio & Career Vision</label>
                <textarea
                  placeholder="Tell your growth story, career interests, and what you are learning..."
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="textarea"
                  rows={3}
                />
              </div>

              <div className="grid-2 inline-style-25" >
                <div className="form-group inline-style-24" >
                  <label className="form-label">College / Department</label>
                  <input
                    type="text"
                    placeholder="e.g. B.Tech Computer Science"
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
                    className="input"
                  />
                </div>
                <div className="form-group inline-style-24" >
                  <label className="form-label">Location</label>
                  <input
                    type="text"
                    placeholder="e.g. New Delhi, India"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="input"
                  />
                </div>
              </div>

              <div className="inline-style-29">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
