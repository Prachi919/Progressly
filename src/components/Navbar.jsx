import {
  LayoutDashboard,
  User,
  BookOpen,
  Code2,
  Shield,
  Flame,
  Sun,
  Moon,
  LogOut
} from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, user, onLogout, theme, onToggleTheme }) {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'journal', label: 'Journal', icon: BookOpen },
    { id: 'skills', label: 'Skills', icon: Code2 },
    { id: 'privacy', label: 'Privacy', icon: Shield }
  ];

  return (
    <header
      className="inline-style-112"
    >
      <div
        className="container inline-style-113"
        
      >
        {/* Brand */}
        <div
          onClick={() => setActiveTab('dashboard')}
          className="inline-style-114"
        >
          <div
            className="inline-style-115"
          >
            
          </div>
          <div>
            <span className="inline-style-116">
              Progressly
            </span>
          </div>
        </div>

        {/* Feature Navigation Tabs */}
        <nav className="inline-style-117">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`btn btn-sm nav-tab ${isActive ? 'active' : ''}`}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Controls */}
        <div className="inline-style-118">
          <div className="streak-flame">
            <Flame size={15} fill="#fbbf24" />
            <span>{user.streakDays} Days</span>
          </div>

          <button
            onClick={onToggleTheme}
            className="btn btn-secondary btn-sm inline-style-119"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            
          >
            {theme === 'dark' ? <Sun size={16} color="#f59e0b" /> : <Moon size={16} color="#6366f1" />}
          </button>

          <button
            onClick={onLogout}
            className="btn btn-secondary btn-sm inline-style-45"
            title="Sign Out"
            
          >
            <LogOut size={15} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}
