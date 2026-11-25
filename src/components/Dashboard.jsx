import {
  Flame,
  BookOpen,
  Code2,
  Shield,
  PlusCircle,
  ArrowRight,
  Calendar,
  Lock,
  Users,
  Globe
} from 'lucide-react';

export default function Dashboard({
  user,
  journal,
  skills,
  privacySettings,
  setActiveTab
}) {
  const recentEntry = journal && journal.length > 0 ? journal[0] : null;

  const getPrivacyBadge = (privacy) => {
    switch (privacy) {
      case 'private':
        return <span className="privacy-badge privacy-private"><Lock size={11} /> Private</span>;
      case 'connections':
        return <span className="privacy-badge privacy-connections"><Users size={11} /> Connections</span>;
      case 'public':
      default:
        return <span className="privacy-badge privacy-public"><Globe size={11} /> Public</span>;
    }
  };

  return (
    <div className="inline-style-3">
      {/* Welcome Command Center Header */}
      <div
        className="glass-card inline-style-65"
        
      >
        <div>
          <div className="inline-style-66">
            <span className="badge badge-emerald">Personal Growth Command Center</span>
            {user.college && <span className="inline-style-6">• {user.college}</span>}
          </div>
          <h1 className="inline-style-67">
            Welcome, {user.name ? user.name.split(' ')[0] : 'Learner'}! 
          </h1>
          <p className="inline-style-68">
            {journal.length === 0
              ? "Your growth journal is fresh and ready. Start documenting what you learn today!"
              : `You're on a growth streak. Keep documenting your learning reflections and skills.`}
          </p>
        </div>

        <button
          onClick={() => setActiveTab('journal')}
          className="btn btn-primary inline-style-69"
          
        >
          <PlusCircle size={18} />
          <span>️ What did you learn today?</span>
        </button>
      </div>

      {/* 4 Stats Cards */}
      <div className="grid-4">
        {/* Streak */}
        <div className="glass-card inline-style-70" >
          <div className="inline-style-71">
            <Flame size={24} fill="#f59e0b" />
          </div>
          <div>
            <div className="inline-style-72">{user.streakDays || 1} Days</div>
            <div className="inline-style-73">Learning Streak</div>
          </div>
        </div>

        {/* Journal Entries */}
        <div className="glass-card inline-style-70" >
          <div className="inline-style-74">
            <BookOpen size={22} />
          </div>
          <div>
            <div className="inline-style-72">{journal.length} Logs</div>
            <div className="inline-style-73">Journal Entries</div>
          </div>
        </div>

        {/* Skills Tracked */}
        <div className="glass-card inline-style-70" >
          <div className="inline-style-75">
            <Code2 size={22} />
          </div>
          <div>
            <div className="inline-style-72">{skills.length} Skills</div>
            <div className="inline-style-73">Tracked Proficiencies</div>
          </div>
        </div>

        {/* Privacy Status */}
        <div className="glass-card inline-style-70" >
          <div className="inline-style-76">
            <Shield size={22} />
          </div>
          <div>
            <div className="inline-style-77">
              {privacySettings.defaultVisibility}
            </div>
            <div className="inline-style-73">Default Privacy</div>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Column (Recent Log) | Right Column (Skills in Progress) */}
      <div className="grid-2 inline-style-10" >
        {/* Recent Journal Reflection */}
        <div className="glass-card inline-style-11" >
          <div className="inline-style-16">
            <div className="inline-style-9">
              <BookOpen size={18} color="var(--accent-primary)" />
              <h3 className="inline-style-53">Recent Journal Reflection</h3>
            </div>
            {journal.length > 0 && (
              <button
                onClick={() => setActiveTab('journal')}
                className="btn btn-sm inline-style-78"
                
              >
                <span>View All</span> <ArrowRight size={14} />
              </button>
            )}
          </div>

          {recentEntry ? (
            <div className="inline-style-79">
              <div className="inline-style-80">
                <span className="inline-style-51">
                  <Calendar size={13} /> {recentEntry.date}
                </span>
                <div className="inline-style-81">
                  <span className="badge badge-amber">{recentEntry.mood}</span>
                  {getPrivacyBadge(recentEntry.privacy)}
                </div>
              </div>

              <h4 className="inline-style-82">{recentEntry.title}</h4>
              <p className="inline-style-83">
                {recentEntry.content}
              </p>

              {recentEntry.skills && recentEntry.skills.length > 0 && (
                <div className="inline-style-84">
                  {recentEntry.skills.map((s, idx) => (
                    <span key={idx} className="badge badge-muted inline-style-18" >
                      #{s}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="inline-style-85">
              <div className="inline-style-86"></div>
              <div>
                <h4 className="inline-style-87">No journal reflections yet</h4>
                <p className="inline-style-88">Document what you learned, challenges you solved, and solutions.</p>
              </div>
              <button
                onClick={() => setActiveTab('journal')}
                className="btn btn-primary btn-sm inline-style-89"
                
              >
                <PlusCircle size={15} />
                <span>Write First Reflection</span>
              </button>
            </div>
          )}
        </div>

        {/* Skills Tracked Preview */}
        <div className="glass-card inline-style-11" >
          <div className="inline-style-16">
            <div className="inline-style-9">
              <Code2 size={18} color="var(--accent-indigo)" />
              <h3 className="inline-style-53">Skills in Progress</h3>
            </div>
            {skills.length > 0 && (
              <button
                onClick={() => setActiveTab('skills')}
                className="btn btn-sm inline-style-90"
                
              >
                <span>Manage Skills</span> <ArrowRight size={14} />
              </button>
            )}
          </div>

          {skills && skills.length > 0 ? (
            <div className="inline-style-49">
              {skills.slice(0, 4).map((skill) => (
                <div key={skill.id} className="inline-style-91">
                  <div className="inline-style-92">
                    <span className="inline-style-93">{skill.name}</span>
                    <span className="badge badge-emerald inline-style-18" >{skill.level} ({skill.percent}%)</span>
                  </div>
                  <div className="progress-container">
                    <div className="progress-fill" style={{ width: `${skill.percent}%` }} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="inline-style-85">
              <div className="inline-style-86"></div>
              <div>
                <h4 className="inline-style-87">No skills tracked yet</h4>
                <p className="inline-style-88">Add technologies, tools, and languages you are learning.</p>
              </div>
              <button
                onClick={() => setActiveTab('skills')}
                className="btn btn-secondary btn-sm inline-style-89"
                
              >
                <PlusCircle size={15} />
                <span>Add Your First Skill</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
