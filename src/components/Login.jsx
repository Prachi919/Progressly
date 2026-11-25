import { useState } from 'react';
import { Lock, Mail, User, ArrowRight } from 'lucide-react';

export default function Login({ onLogin }) {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError('Please enter both email and password.');
      return;
    }

    if (isRegister && !name.trim()) {
      setError('Please enter your name.');
      return;
    }

    const userName = isRegister
      ? name.trim()
      : (name.trim() || email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()));

    onLogin({
      name: userName,
      email: email.trim().toLowerCase(),
      role: 'Learner & Developer',
      college: '',
      location: '',
      bio: '',
      streakDays: 1
    }, isRegister);
  };

  return (
    <div className="inline-style-30">
      <div className="glass-card inline-style-31" >
        {/* Brand Header */}
        <div className="inline-style-32">
          <div
            className="inline-style-33"
          >
            
          </div>
          <h1 className="inline-style-34">
            Progressly
          </h1>
          <p className="inline-style-35">
            Track your journey. Showcase your growth.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="inline-style-36">
          <button
            type="button"
            onClick={() => { setIsRegister(false); setError(''); }}
            className={`btn btn-sm login-tab ${!isRegister ? 'active' : ''}`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setIsRegister(true); setError(''); }}
            className={`btn btn-sm login-tab ${isRegister ? 'active' : ''}`}
          >
            Create Account
          </button>
        </div>

        {error && (
          <div className="inline-style-37">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="inline-style-14">
          {isRegister && (
            <div className="form-group inline-style-24" >
              <label className="form-label">Full Name</label>
              <div className="inline-style-38">
                <User size={16} className="inline-style-39" />
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input inline-style-40"
                  
                  required
                />
              </div>
            </div>
          )}

          <div className="form-group inline-style-24" >
            <label className="form-label">Email Address</label>
            <div className="inline-style-38">
              <Mail size={16} className="inline-style-39" />
              <input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input inline-style-40"
                
                required
              />
            </div>
          </div>

          <div className="form-group inline-style-24" >
            <label className="form-label">Password</label>
            <div className="inline-style-38">
              <Lock size={16} className="inline-style-39" />
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input inline-style-40"
                
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary inline-style-41"
            
          >
            <span>{isRegister ? 'Create Fresh Account' : 'Sign In'}</span>
            <ArrowRight size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}
