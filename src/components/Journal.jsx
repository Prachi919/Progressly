import { useState } from 'react';
import {
  PlusCircle,
  Lock,
  Users,
  Globe,
  Trash2,
  Calendar,
  Search,
  AlertTriangle,
  Lightbulb,
  X
} from 'lucide-react';

export default function Journal({ journal, onAddEntry, onDeleteEntry, defaultPrivacy = 'public' }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [privacyFilter, setPrivacyFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Form State
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [challenge, setChallenge] = useState('');
  const [takeaway, setTakeaway] = useState('');
  const [mood, setMood] = useState(' Excited');
  const [privacy, setPrivacy] = useState(defaultPrivacy);
  const [skillsInput, setSkillsInput] = useState('');

  const moods = [' Excited', ' Inspired', ' Productive', ' Creative', ' Focused', ' Debugging'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const skills = skillsInput
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    onAddEntry({
      id: `j-${Date.now()}`,
      title: title.trim(),
      content: content.trim(),
      challenge: challenge.trim() || undefined,
      takeaway: takeaway.trim() || undefined,
      mood,
      privacy,
      skills: skills.length > 0 ? skills : ['React', 'Web Dev'],
      date: new Date().toISOString().split('T')[0]
    });

    setTitle('');
    setContent('');
    setChallenge('');
    setTakeaway('');
    setSkillsInput('');
    setIsModalOpen(false);
  };

  const getPrivacyBadge = (p) => {
    switch (p) {
      case 'private':
        return <span className="privacy-badge privacy-private"><Lock size={12} /> Private</span>;
      case 'connections':
        return <span className="privacy-badge privacy-connections"><Users size={12} /> Connections</span>;
      case 'public':
      default:
        return <span className="privacy-badge privacy-public"><Globe size={12} /> Public</span>;
    }
  };

  const filtered = journal.filter(entry => {
    if (privacyFilter !== 'all' && entry.privacy !== privacyFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = entry.title.toLowerCase().includes(q);
      const matchContent = entry.content.toLowerCase().includes(q);
      const matchSkills = entry.skills && entry.skills.some(s => s.toLowerCase().includes(q));
      if (!matchTitle && !matchContent && !matchSkills) return false;
    }
    return true;
  });

  return (
    <div className="inline-style-3">
      {/* Header Banner */}
      <div
        className="glass-card inline-style-4"
        
      >
        <div>
          <div className="inline-style-5">
            <span className="badge badge-emerald">Daily Growth Diary</span>
            <span className="inline-style-6">• {journal.length} Total Logs</span>
          </div>
          <h1 className="inline-style-7">Progress Journal</h1>
          <p className="inline-style-8">
            Document what you learned, challenges faced, and select individual privacy visibility.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="btn btn-primary inline-style-9"
          
        >
          <PlusCircle size={17} />
          <span>Write Daily Log</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-card inline-style-42" >
        <div className="inline-style-43">
          <span className="inline-style-44">
            Privacy:
          </span>
          <button
            onClick={() => setPrivacyFilter('all')}
            className={`btn btn-sm ${privacyFilter === 'all' ? 'btn-primary' : 'btn-secondary'}`}
          >
            All Logs ({journal.length})
          </button>
          <button
            onClick={() => setPrivacyFilter('public')}
            className={`btn btn-sm inline-style-45 ${privacyFilter === 'public' ? 'btn-primary' : 'btn-secondary'}`}
          >
            <Globe size={13} /> Public ({journal.filter(j => j.privacy === 'public').length})
          </button>
          <button
            onClick={() => setPrivacyFilter('connections')}
            className={`btn btn-sm inline-style-45 ${privacyFilter === 'connections' ? 'btn-primary' : 'btn-secondary'}`}
          >
            <Users size={13} /> Connections ({journal.filter(j => j.privacy === 'connections').length})
          </button>
          <button
            onClick={() => setPrivacyFilter('private')}
            className={`btn btn-sm inline-style-45 ${privacyFilter === 'private' ? 'btn-primary' : 'btn-secondary'}`}
          >
            <Lock size={13} /> Private ({journal.filter(j => j.privacy === 'private').length})
          </button>
        </div>

        <div className="inline-style-46">
          <Search size={15} className="inline-style-47" />
          <input
            type="text"
            placeholder="Search entries & tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input inline-style-48"
            
          />
        </div>
      </div>

      {/* Journal Entries List */}
      <div className="inline-style-11">
        {filtered.length > 0 ? (
          filtered.map((entry) => (
            <article key={entry.id} className="glass-card inline-style-49" >
              <div className="inline-style-50">
                <div className="inline-style-43">
                  <span className="inline-style-51">
                    <Calendar size={13} /> {entry.date}
                  </span>
                  <span className="badge badge-amber">{entry.mood}</span>
                  {getPrivacyBadge(entry.privacy)}
                </div>

                <button
                  onClick={() => onDeleteEntry(entry.id)}
                  className="inline-style-52"
                  title="Delete entry"
                >
                  <Trash2 size={15} />
                </button>
              </div>

              <h3 className="inline-style-53">{entry.title}</h3>
              <p className="inline-style-54">{entry.content}</p>

              {(entry.challenge || entry.takeaway) && (
                <div className="inline-style-55">
                  {entry.challenge && (
                    <div className="inline-style-56">
                      <AlertTriangle size={15} color="#f59e0b" className="inline-style-57" />
                      <div><strong className="inline-style-58">Problem / Challenge: </strong><span className="inline-style-59">{entry.challenge}</span></div>
                    </div>
                  )}
                  {entry.takeaway && (
                    <div className="inline-style-56">
                      <Lightbulb size={15} color="#10b981" className="inline-style-57" />
                      <div><strong className="inline-style-58">Key Solution / Takeaway: </strong><span className="inline-style-59">{entry.takeaway}</span></div>
                    </div>
                  )}
                </div>
              )}

              {entry.skills && entry.skills.length > 0 && (
                <div className="inline-style-60">
                  {entry.skills.map((s, idx) => (
                    <span key={idx} className="badge badge-muted inline-style-61" >
                      #{s}
                    </span>
                  ))}
                </div>
              )}
            </article>
          ))
        ) : (
          <div className="glass-card inline-style-62" >
            <p className="inline-style-63">No reflections found for this filter.</p>
            <button onClick={() => setIsModalOpen(true)} className="btn btn-primary btn-sm">
              <PlusCircle size={15} /> Write a Log
            </button>
          </div>
        )}
      </div>

      {/* New Journal Modal */}
      {isModalOpen && (
        <div className="modal-backdrop" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="inline-style-21">
              <h3 className="inline-style-22">New Progress Journal Log</h3>
              <button onClick={() => setIsModalOpen(false)} className="btn btn-secondary btn-sm inline-style-23" >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="inline-style-14">
              <div className="form-group inline-style-24" >
                <label className="form-label">Title *</label>
                <input
                  type="text"
                  placeholder="e.g. Mastered Controlled Components & Form Validation"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="input"
                  required
                />
              </div>

              <div className="form-group inline-style-24" >
                <label className="form-label">What did you learn today? *</label>
                <textarea
                  placeholder="Write your reflection on what you built, learned, or explored..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="textarea"
                  rows={3}
                  required
                />
              </div>

              <div className="form-group inline-style-24" >
                <label className="form-label">Problem / Challenge Faced (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Struggled with asynchronous state updates"
                  value={challenge}
                  onChange={(e) => setChallenge(e.target.value)}
                  className="input"
                />
              </div>

              <div className="form-group inline-style-24" >
                <label className="form-label">Key Takeaway / Solution (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Used functional setState updater pattern"
                  value={takeaway}
                  onChange={(e) => setTakeaway(e.target.value)}
                  className="input"
                />
              </div>

              <div className="grid-2 inline-style-25" >
                <div>
                  <label className="form-label">Mood / Energy</label>
                  <select value={mood} onChange={(e) => setMood(e.target.value)} className="select">
                    {moods.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
                <div>
                  <label className="form-label">Privacy Visibility</label>
                  <select value={privacy} onChange={(e) => setPrivacy(e.target.value)} className="select">
                    <option value="public"> Public</option>
                    <option value="connections"> Connections Only</option>
                    <option value="private"> Private (Only Me)</option>
                  </select>
                </div>
              </div>

              <div className="form-group inline-style-24" >
                <label className="form-label">Skills / Tags (Comma-separated)</label>
                <input
                  type="text"
                  placeholder="React, Hooks, Forms, State"
                  value={skillsInput}
                  onChange={(e) => setSkillsInput(e.target.value)}
                  className="input"
                />
              </div>

              <div className="inline-style-64">
                <button type="button" onClick={() => setIsModalOpen(false)} className="btn btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Publish Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
