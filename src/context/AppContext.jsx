import { createContext, useContext, useEffect, useState } from 'react';

const AppContext = createContext(null);
const read = (key, fallback) => { try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch { return fallback; } };
const initial = {
  user: read('progressly_active_user', null),
  theme: read('progressly_core_theme', 'dark'),
  journal: [], skills: [], privacySettings: {defaultVisibility:'public',profileVisibility:'public',showStreak:true,searchable:true},
  goals: read('progressly_goals', []), projects: read('progressly_projects', []),
  connections: read('progressly_connections', []), notifications: read('progressly_notifications', []),
  achievements: read('progressly_achievements', [
    {id:'first-entry',name:'First Step',description:'Write your first journal entry',unlocked:false},
    {id:'builder',name:'Builder',description:'Add your first project',unlocked:false},
    {id:'go-getter',name:'Go-Getter',description:'Complete five goals',unlocked:false},
    {id:'consistent',name:'Consistency',description:'Reach a seven-day learning streak',unlocked:false}
  ]), achievementActivity: read('progressly_achievement_activity', [])
};
function reducer(state, action) {
  switch(action.type) {
    case 'LOGIN': return {...state,user:action.user,journal:read('progressly_journal_'+key(action.user),[]),skills:read('progressly_skills_'+key(action.user),[]),privacySettings:read('progressly_privacy_'+key(action.user),state.privacySettings)};
    case 'LOGOUT': return {...state,user:null,journal:[],skills:[]};
    case 'HYDRATE': return {...state,...action.data};
    case 'PATCH': return {...state,...action.data};
    case 'JOURNAL_ADD': return {...state,journal:[action.entry,...state.journal],user:{...state.user,streakDays:(state.user?.streakDays||0)+1}};
    case 'JOURNAL_EDIT': return {...state,journal:state.journal.map(x=>x.id===action.entry.id?action.entry:x)};
    case 'JOURNAL_DELETE': return {...state,journal:state.journal.filter(x=>x.id!==action.id)};
    case 'SKILL_ADD': return {...state,skills:[...state.skills,action.skill]};
    case 'SKILL_DELETE': return {...state,skills:state.skills.filter(x=>x.id!==action.id)};
    case 'UNLOCK_ACHIEVEMENT': {
      const item = state.achievements.find(a => a.id === action.id);
      if (!item || item.unlocked) return state;
      return {
        ...state,
        achievements: state.achievements.map(a => a.id === action.id ? {...a, unlocked:true} : a),
        achievementActivity: [{id:Date.now(), text:`Achievement unlocked: ${item.name}`, date:new Date().toISOString()}, ...state.achievementActivity]
      };
    }
    case 'RESET': return {...state,journal:[],skills:[],goals:[],projects:[],privacySettings:initial.privacySettings};
    default: return state;
  }
}
const key = user => (user?.email||'guest').toLowerCase().replace(/[^a-z0-9]/g,'_');
export function AppProvider({children}) {
  const [state,setState]=useState(initial);
  const dispatch = action => setState(previous => reducer(previous, action));
  useEffect(()=>{ document.documentElement.setAttribute('data-theme',state.theme); localStorage.setItem('progressly_core_theme',JSON.stringify(state.theme)); },[state.theme]);
  useEffect(()=>{ if(!state.user) {localStorage.removeItem('progressly_active_user');return;} localStorage.setItem('progressly_active_user',JSON.stringify(state.user)); localStorage.setItem('progressly_profile_'+key(state.user),JSON.stringify(state.user)); },[state.user]);
  useEffect(()=>{if(state.user){localStorage.setItem('progressly_journal_'+key(state.user),JSON.stringify(state.journal));localStorage.setItem('progressly_skills_'+key(state.user),JSON.stringify(state.skills));localStorage.setItem('progressly_privacy_'+key(state.user),JSON.stringify(state.privacySettings));}},[state.journal,state.skills,state.privacySettings,state.user]);
  useEffect(()=>{localStorage.setItem('progressly_goals',JSON.stringify(state.goals));localStorage.setItem('progressly_projects',JSON.stringify(state.projects));localStorage.setItem('progressly_connections',JSON.stringify(state.connections));localStorage.setItem('progressly_notifications',JSON.stringify(state.notifications));},[state.goals,state.projects,state.connections,state.notifications]);
  useEffect(()=>{localStorage.setItem('progressly_achievements',JSON.stringify(state.achievements));localStorage.setItem('progressly_achievement_activity',JSON.stringify(state.achievementActivity));},[state.achievements,state.achievementActivity]);
  const value={state,dispatch};
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
export const useApp=()=>{const v=useContext(AppContext);if(!v)throw new Error('useApp must be used within AppProvider');return v;};
