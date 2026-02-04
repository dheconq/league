
import React, { useState } from 'react';
import { User } from '../types';
import { LogIn, ShieldCheck, User as UserIcon } from 'lucide-react';

interface LoginProps {
  onLogin: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate a secret admin check updated for the new season
    if (username === 'admin' && password === 'stpauls2025') {
      onLogin({ username: 'Admin', isAdmin: true });
    } else if (username && !password) {
      onLogin({ username, isAdmin: false });
    } else {
      setError('Invalid credentials. Use any username to browse, or admin credentials for access.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 animate-slideUp">
      <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-200">
        <div className="text-center mb-8">
          <div className="inline-flex bg-indigo-100 p-4 rounded-full text-indigo-600 mb-4">
            <LogIn size={32} />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Welcome Back</h1>
          <p className="text-slate-500 mt-1 text-sm">Sign in to manage the Sowtuomian League.</p>
        </div>

        <form onSubmit={handleAdminLogin} className="space-y-6">
          {error && (
            <div className="bg-red-50 text-red-600 text-xs p-3 rounded-lg font-medium">
              {error}
            </div>
          )}
          
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Username</label>
            <div className="relative">
              <UserIcon className="absolute left-3 top-3 text-slate-400" size={18} />
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                className="w-full bg-slate-50 border border-slate-200 pl-10 pr-4 py-2.5 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Password (Admins Only)</label>
            <div className="relative">
              <ShieldCheck className="absolute left-3 top-3 text-slate-400" size={18} />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Leave blank for regular user"
                className="w-full bg-slate-50 border border-slate-200 pl-10 pr-4 py-2.5 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-indigo-500/20 transition-all"
          >
            Sign In
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-100">
          <p className="text-xs text-slate-400 text-center uppercase font-bold tracking-widest mb-4">Admin Credentials</p>
          <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-500 bg-slate-50 p-3 rounded-xl">
            <div>Username: <span className="font-mono font-bold">admin</span></div>
            <div>Password: <span className="font-mono font-bold">stpauls2025</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
