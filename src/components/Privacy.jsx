import { useState } from 'react';
import {
  Shield,
  Eye,
  CheckCircle2,
  Save,
  RotateCcw
} from 'lucide-react';

export default function Privacy({ privacySettings, onUpdatePrivacy, onResetData }) {
  const [settings, setSettings] = useState(privacySettings);
  const [savedMessage, setSavedMessage] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    onUpdatePrivacy(settings);
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 3000);
  };

  return (
    <div className="inline-style-120">
      {/* Header Banner */}
      <div
        className="glass-card inline-style-4"
        
      >
        <div>
          <div className="inline-style-5">
            <span className="badge badge-emerald">Trust & Data Control</span>
          </div>
          <h1 className="inline-style-7">Privacy & Visibility Settings</h1>
          <p className="inline-style-8">
            Control how your journal entries, skills, and living portfolio are shared.
          </p>
        </div>
      </div>

      {savedMessage && (
        <div
          className="inline-style-121"
        >
          <CheckCircle2 size={18} />
          <span>Privacy preferences updated successfully!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="inline-style-122">
        {/* Default Journal Visibility */}
        <div className="glass-card inline-style-14" >
          <div className="inline-style-118">
            <Shield size={20} color="var(--accent-primary)" />
            <div>
              <h3 className="inline-style-105">Default Journal Reflection Privacy</h3>
              <p className="inline-style-88">Choose the default visibility when writing new journal logs</p>
            </div>
          </div>

          <div className="inline-style-123">
            {[
              { id: 'public', label: ' Public', desc: 'Visible to anyone exploring Progressly' },
              { id: 'connections', label: ' Connections', desc: 'Visible only to accepted peers' },
              { id: 'private', label: ' Private', desc: 'Visible only to you' }
            ].map((opt) => (
              <label
                key={opt.id}
                className={`privacy-option ${settings.defaultVisibility === opt.id ? 'active' : ''}`}
              >
                <div className="inline-style-124">
                  <input
                    type="radio"
                    name="defaultVisibility"
                    value={opt.id}
                    checked={settings.defaultVisibility === opt.id}
                    onChange={(e) => setSettings({ ...settings, defaultVisibility: e.target.value })}
                    className="inline-style-125"
                  />
                  <span>{opt.label}</span>
                </div>
                <span className="inline-style-126">{opt.desc}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Profile Visibility */}
        <div className="glass-card inline-style-14" >
          <div className="inline-style-118">
            <Eye size={20} color="var(--accent-indigo)" />
            <div>
              <h3 className="inline-style-105">Living Portfolio Visibility</h3>
              <p className="inline-style-88">Who can see your profile, skills, and streak</p>
            </div>
          </div>

          <div className="inline-style-123">
            {[
              { id: 'public', label: ' Public Portfolio', desc: 'Anyone can view your living portfolio' },
              { id: 'connections', label: ' Connections Only', desc: 'Only professional connections can view' },
              { id: 'private', label: ' Private Portfolio', desc: 'Hidden from public explore' }
            ].map((opt) => (
              <label
                key={opt.id}
                className={`privacy-option privacy-option-indigo ${settings.profileVisibility === opt.id ? 'active' : ''}`}
              >
                <div className="inline-style-124">
                  <input
                    type="radio"
                    name="profileVisibility"
                    value={opt.id}
                    checked={settings.profileVisibility === opt.id}
                    onChange={(e) => setSettings({ ...settings, profileVisibility: e.target.value })}
                    className="inline-style-127"
                  />
                  <span>{opt.label}</span>
                </div>
                <span className="inline-style-126">{opt.desc}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Toggles */}
        <div className="glass-card inline-style-14" >
          <h3 className="inline-style-105">Activity Preferences</h3>

          <label className="inline-style-128">
            <div>
              <div className="inline-style-129">Display Learning Streak Badge</div>
              <div className="inline-style-73">Show flame streak count publicly on profile</div>
            </div>
            <input
              type="checkbox"
              checked={settings.showStreak}
              onChange={(e) => setSettings({ ...settings, showStreak: e.target.checked })}
              className="inline-style-130"
            />
          </label>

          <label className="inline-style-131">
            <div>
              <div className="inline-style-129">Include Skills in Progress Search</div>
              <div className="inline-style-73">Allow peers to discover you by skills matching</div>
            </div>
            <input
              type="checkbox"
              checked={settings.searchable}
              onChange={(e) => setSettings({ ...settings, searchable: e.target.checked })}
              className="inline-style-130"
            />
          </label>
        </div>

        <div className="inline-style-132">
          <button
            type="button"
            onClick={onResetData}
            className="btn btn-danger btn-sm inline-style-81"
            
          >
            <RotateCcw size={14} />
            <span>Reset Demo Data</span>
          </button>

          <button type="submit" className="btn btn-primary">
            <Save size={16} />
            <span>Save Preferences</span>
          </button>
        </div>
      </form>
    </div>
  );
}
