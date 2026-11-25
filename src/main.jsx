import {useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter,Routes,Route,NavLink,Outlet,useNavigate,useOutletContext} from 'react-router-dom';
import {AppProvider,useApp} from './context/AppContext';
import {LayoutDashboard,User,BookOpen,Code2,Shield,Target,FolderKanban,Compass,Users,Bell,Search,Settings as SettingsIcon,Award,Sun,Moon,LogOut,Menu} from 'lucide-react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import Journal from './components/Journal';
import Skills from './components/Skills';
import Privacy from './components/Privacy';
import {GoalsPage,ProjectsPage,AchievementsPage,ConnectionsPage,NotificationsPage,ExplorePage,SearchPage,SettingsPage} from './pages/WorkspacePages';
import './index.css';

const navItems=[
['/','Dashboard',LayoutDashboard],['/journal','Journal',BookOpen],['/goals','Goals',Target],['/progress','My Progress',Code2],['/projects','Project Showcase',FolderKanban],['/explore','Explore',Compass],['/connections','Connections',Users],['/achievements','Achievements',Award],['/notifications','Notifications',Bell],['/search','Search',Search],['/profile','Profile',User],['/skills','Skills',Code2],['/settings','Settings',SettingsIcon],['/privacy','Privacy',Shield]
];
function Layout(){
 const {state,dispatch}=useApp();const navigate=useNavigate();
 const toggle=()=>dispatch({type:'PATCH',data:{theme:state.theme==='dark'?'light':'dark'}});
 const logout=()=>{dispatch({type:'LOGOUT'});navigate('/');};
 return <div className="app-shell"><header className="app-topbar"><button className="brand-mark" onClick={()=>navigate('/')}><span className="brand-dot">✦</span><span>Progressly<small>YOUR GROWTH SPACE</small></span></button><div className="topbar-actions"><span className="user-greeting">{state.user?.name||'Learner'}</span><button className="btn btn-secondary btn-sm" title="Toggle theme" onClick={toggle}>{state.theme==='dark'?<Sun size={16}/>:<Moon size={16}/>}</button><button className="btn btn-secondary btn-sm" onClick={logout}><LogOut size={15}/> Logout</button></div></header>
 <aside className="app-sidebar"><div className="sidebar-label">WORKSPACE</div>{navItems.map(([to,label,Icon])=><NavLink key={to} to={to} end={to==='/'} className={({isActive})=>`side-link ${isActive?'active':''}`}><Icon size={17}/><span>{label}</span>{label==='Notifications'&&state.notifications.some(n=>!n.read)&&<i className="notification-dot"/>}</NavLink>)}<div className="sidebar-foot"><span className="sidebar-avatar">{(state.user?.name||'P').slice(0,1).toUpperCase()}</span><div><strong>{state.user?.name||'Learner'}</strong><small>{state.user?.role||'Growth journey'}</small></div></div></aside>
 <main className="app-main"><Outlet context={{state,dispatch,navigate}}/></main>
 </div>;
}
function DashboardRoute(){const {state,dispatch,navigate}=useOutletContext();return <Dashboard user={state.user} journal={state.journal} skills={state.skills} privacySettings={state.privacySettings} setActiveTab={tab=>navigate(tab==='dashboard'?'/':`/${tab}`)}/>}
function JournalRoute(){const {state,dispatch}=useOutletContext();const add=entry=>{dispatch({type:'JOURNAL_ADD',entry});dispatch({type:'UNLOCK_ACHIEVEMENT',id:'first-entry'});};return <Journal journal={state.journal} onAddEntry={add} onDeleteEntry={id=>dispatch({type:'JOURNAL_DELETE',id})} defaultPrivacy={state.privacySettings.defaultVisibility}/>}
function SkillsRoute(){const {state,dispatch}=useOutletContext();return <Skills skills={state.skills} onAddSkill={skill=>dispatch({type:'SKILL_ADD',skill})} onDeleteSkill={id=>dispatch({type:'SKILL_DELETE',id})}/>}
function ProfileRoute(){const {state,dispatch}=useOutletContext();return <Profile user={state.user} onUpdateUser={user=>dispatch({type:'PATCH',data:{user}})} journal={state.journal} skills={state.skills} privacySettings={state.privacySettings}/>}
function PrivacyRoute(){const {state,dispatch}=useOutletContext();return <Privacy privacySettings={state.privacySettings} onUpdatePrivacy={privacySettings=>dispatch({type:'PATCH',data:{privacySettings}})} onResetData={()=>{if(confirm('Clear your journal, skills, goals and projects?'))dispatch({type:'RESET'});}}/>}
function ProgressPage(){const {state}=useOutletContext();const completed=state.goals.filter(g=>g.milestones?.length&&g.milestones.every(m=>m.completed)).length;return <section className="page-stack"><div className="glass-card page-heading"><div><span className="badge badge-emerald">Your journey at a glance</span><h1>My Progress</h1><p>Statistics calculated from your current Progressly data.</p></div></div><div className="grid-4"><div className="glass-card"><h2>{state.journal.length}</h2><p>Journal entries</p></div><div className="glass-card"><h2>{state.skills.length}</h2><p>Skills tracked</p></div><div className="glass-card"><h2>{state.projects.length}</h2><p>Projects</p></div><div className="glass-card"><h2>{completed}</h2><p>Goals completed</p></div></div><div className="glass-card"><h2>Recent learning</h2>{state.journal.slice(0,5).map(j=><p key={j.id}>• {j.title} — {j.date}</p>)}{!state.journal.length&&<p>Add a journal entry to begin building your progress history.</p>}</div></section>}
function App(){
 const {state,dispatch}=useApp();
 useEffect(()=>{if(state.user?.email){const key=state.user.email.toLowerCase().replace(/[^a-z0-9]/g,'_');const safe=(k,f)=>{try{return JSON.parse(localStorage.getItem(k))??f}catch{return f}};dispatch({type:'HYDRATE',data:{journal:safe(`progressly_journal_${key}`,[]),skills:safe(`progressly_skills_${key}`,[]),privacySettings:safe(`progressly_privacy_${key}`,state.privacySettings)}});}},[]);
 if(!state.user)return <Login onLogin={(user,isNew)=>{if(isNew){const key=user.email.toLowerCase().replace(/[^a-z0-9]/g,'_');['journal','skills'].forEach(x=>localStorage.removeItem(`progressly_${x}_${key}`));}dispatch({type:'LOGIN',user});}}/>;
 return <Routes><Route element={<Layout/>}><Route index element={<DashboardRoute/>}/><Route path="journal" element={<JournalRoute/>}/><Route path="goals" element={<GoalsPage/>}/><Route path="progress" element={<ProgressPage/>}/><Route path="projects" element={<ProjectsPage/>}/><Route path="explore" element={<ExplorePage/>}/><Route path="connections" element={<ConnectionsPage/>}/><Route path="achievements" element={<AchievementsPage/>}/><Route path="notifications" element={<NotificationsPage/>}/><Route path="search" element={<SearchPage/>}/><Route path="profile" element={<ProfileRoute/>}/><Route path="skills" element={<SkillsRoute/>}/><Route path="settings" element={<SettingsPage/>}/><Route path="privacy" element={<PrivacyRoute/>}/><Route path="*" element={<section className="glass-card not-found"><h1>404 — Page not found</h1><p>This page isn’t part of your Progressly workspace.</p><button className="btn btn-primary" onClick={()=>location.assign('/')}>Back to dashboard</button></section>}/></Route></Routes>;
}
ReactDOM.createRoot(document.getElementById('root')).render(<AppProvider><BrowserRouter><App/></BrowserRouter></AppProvider>);
