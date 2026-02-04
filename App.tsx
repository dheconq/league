
import React, { useState, useEffect, useMemo } from 'react';
import { HashRouter, Routes, Route, Navigate, Link, useNavigate } from 'react-router-dom';
import { Layout, LogIn, Trophy, Table as TableIcon, ClipboardList, ShieldCheck, User as UserIcon, LogOut, Sparkles } from 'lucide-react';
import { INITIAL_TEAMS, CLASSES } from './constants';
import { Match, StandingsRow, LeagueType, User, Team } from './types';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import LeagueTable from './components/LeagueTable';
import AdminPanel from './components/AdminPanel';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('sowtuomian_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [matches, setMatches] = useState<Match[]>(() => {
    const saved = localStorage.getItem('sowtuomian_matches');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('sowtuomian_matches', JSON.stringify(matches));
  }, [matches]);

  const handleLogin = (userData: User) => {
    setUser(userData);
    localStorage.setItem('sowtuomian_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('sowtuomian_user');
  };

  const addMatch = (match: Omit<Match, 'id'>) => {
    const newMatch = { ...match, id: crypto.randomUUID() };
    setMatches([...matches, newMatch]);
  };

  const deleteMatch = (id: string) => {
    setMatches(matches.filter(m => m.id !== id));
  };

  const calculateStandings = (leagueType: LeagueType): StandingsRow[] => {
    const teamsInLeague = INITIAL_TEAMS.filter(t => t.league === leagueType);
    const leagueMatches = matches.filter(m => m.league === leagueType);

    const standingsMap = new Map<string, StandingsRow>();

    teamsInLeague.forEach(team => {
      standingsMap.set(team.id, {
        teamId: team.id,
        teamName: team.name,
        played: 0,
        won: 0,
        drawn: 0,
        lost: 0,
        gf: 0,
        ga: 0,
        gd: 0,
        points: 0
      });
    });

    leagueMatches.forEach(match => {
      const home = standingsMap.get(match.homeTeamId);
      const away = standingsMap.get(match.awayTeamId);

      if (home && away) {
        home.played += 1;
        away.played += 1;
        home.gf += match.homeScore;
        home.ga += match.awayScore;
        away.gf += match.awayScore;
        away.ga += match.homeScore;

        if (match.homeScore > match.awayScore) {
          home.won += 1;
          home.points += 3;
          away.lost += 1;
        } else if (match.homeScore < match.awayScore) {
          away.won += 1;
          away.points += 3;
          home.lost += 1;
        } else {
          home.drawn += 1;
          away.drawn += 1;
          home.points += 1;
          away.points += 1;
        }
      }
    });

    return Array.from(standingsMap.values())
      .map(row => ({ ...row, gd: row.gf - row.ga }))
      .sort((a, b) => b.points - a.points || b.gd - a.gd || b.gf - a.gf);
  };

  const standingsA = useMemo(() => calculateStandings('A'), [matches]);
  const standingsB = useMemo(() => calculateStandings('B'), [matches]);

  return (
    <HashRouter>
      <div className="min-h-screen bg-slate-50 flex flex-col">
        {/* Navigation */}
        <nav className="sticky top-0 z-50 bg-indigo-900 text-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link to="/" className="flex items-center space-x-2">
                <Trophy className="text-amber-400" size={28} />
                <span className="font-bold text-lg hidden md:block">St. Paul's Sowtuomian League</span>
                <span className="font-bold text-lg md:hidden">Sowtuomian League</span>
              </Link>
              
              <div className="hidden md:flex items-center space-x-6">
                <Link to="/table-a" className="hover:text-amber-400 transition-colors flex items-center gap-1">
                  <TableIcon size={18} /> League A
                </Link>
                <Link to="/table-b" className="hover:text-amber-400 transition-colors flex items-center gap-1">
                  <TableIcon size={18} /> League B
                </Link>
                {user?.isAdmin && (
                  <Link to="/admin" className="hover:text-amber-400 transition-colors flex items-center gap-1 text-amber-200">
                    <ShieldCheck size={18} /> Admin
                  </Link>
                )}
              </div>

              <div className="flex items-center space-x-4">
                {user ? (
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium bg-indigo-800 px-3 py-1 rounded-full flex items-center gap-2">
                      <UserIcon size={14} /> {user.username}
                    </span>
                    <button 
                      onClick={handleLogout}
                      className="text-white hover:text-red-300 transition-colors"
                    >
                      <LogOut size={20} />
                    </button>
                  </div>
                ) : (
                  <Link to="/login" className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 px-4 py-2 rounded-lg font-semibold transition-colors">
                    <LogIn size={18} /> Login
                  </Link>
                )}
              </div>
            </div>
          </div>
        </nav>

        {/* Mobile Nav Links */}
        <div className="md:hidden bg-indigo-800 text-white flex justify-around py-2 border-t border-indigo-700">
          <Link to="/table-a" className="text-xs flex flex-col items-center">
            <TableIcon size={16} /> A
          </Link>
          <Link to="/table-b" className="text-xs flex flex-col items-center">
            <TableIcon size={16} /> B
          </Link>
          {user?.isAdmin && (
            <Link to="/admin" className="text-xs flex flex-col items-center text-amber-200">
              <ShieldCheck size={16} /> Admin
            </Link>
          )}
        </div>

        <main className="flex-grow max-w-7xl mx-auto w-full p-4 sm:p-6 lg:p-8">
          <Routes>
            <Route path="/" element={<Dashboard matches={matches} standingsA={standingsA} standingsB={standingsB} />} />
            <Route path="/table-a" element={<LeagueTable leagueType="A" standings={standingsA} />} />
            <Route path="/table-b" element={<LeagueTable leagueType="B" standings={standingsB} />} />
            <Route path="/login" element={user ? <Navigate to="/" /> : <Login onLogin={handleLogin} />} />
            <Route path="/admin" element={user?.isAdmin ? <AdminPanel teams={INITIAL_TEAMS} matches={matches} onAddMatch={addMatch} onDeleteMatch={deleteMatch} /> : <Navigate to="/login" />} />
          </Routes>
        </main>

        <footer className="bg-slate-100 border-t border-slate-200 py-6 mt-auto">
          <div className="max-w-7xl mx-auto px-4 text-center text-slate-500 text-sm">
            <p>&copy; {new Date().getFullYear()} St Paul's Catholic Seminary. All Rights Reserved.</p>
            <p className="mt-1">Building disciples, building athletes.</p>
          </div>
        </footer>
      </div>
    </HashRouter>
  );
};

export default App;
