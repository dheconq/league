
import React, { useState } from 'react';
import { Match, Team, LeagueType } from '../types';
import { PlusCircle, Trash2, ShieldAlert, CheckCircle2 } from 'lucide-react';

interface AdminPanelProps {
  teams: Team[];
  matches: Match[];
  onAddMatch: (match: Omit<Match, 'id'>) => void;
  onDeleteMatch: (id: string) => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ teams, matches, onAddMatch, onDeleteMatch }) => {
  const [league, setLeague] = useState<LeagueType>('A');
  const [homeTeam, setHomeTeam] = useState('');
  const [awayTeam, setAwayTeam] = useState('');
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const filteredTeams = teams.filter(t => t.league === league);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!homeTeam || !awayTeam || homeTeam === awayTeam) {
      alert("Please select two different teams");
      return;
    }
    onAddMatch({
      homeTeamId: homeTeam,
      awayTeamId: awayTeam,
      homeScore,
      awayScore,
      date,
      league
    });
    // Reset
    setHomeTeam('');
    setAwayTeam('');
    setHomeScore(0);
    setAwayScore(0);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="bg-indigo-900 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
        <ShieldAlert className="absolute -bottom-4 -right-4 text-white/10" size={120} />
        <h1 className="text-3xl font-bold mb-2">Administrator Panel</h1>
        <p className="text-indigo-200">Record match scores and manage the league standings.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <PlusCircle size={20} className="text-indigo-600" /> Add New Result
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-1">League Type</label>
                <div className="flex bg-slate-100 p-1 rounded-xl">
                  <button
                    type="button"
                    onClick={() => setLeague('A')}
                    className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${league === 'A' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:bg-slate-200'}`}
                  >
                    Team A
                  </button>
                  <button
                    type="button"
                    onClick={() => setLeague('B')}
                    className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${league === 'B' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:bg-slate-200'}`}
                  >
                    Team B
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Home Team</label>
                <select 
                  value={homeTeam} 
                  onChange={(e) => setHomeTeam(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                >
                  <option value="">Select Team</option>
                  {filteredTeams.map(t => (
                    <option key={t.id} value={t.id}>{t.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Away Team</label>
                <select 
                  value={awayTeam} 
                  onChange={(e) => setAwayTeam(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                >
                  <option value="">Select Team</option>
                  {filteredTeams.map(t => (
                    <option key={t.id} value={t.id}>{t.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Home Score</label>
                <input 
                  type="number" 
                  min="0"
                  value={homeScore}
                  onChange={(e) => setHomeScore(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Away Score</label>
                <input 
                  type="number" 
                  min="0"
                  value={awayScore}
                  onChange={(e) => setAwayScore(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-1">Date</label>
                <input 
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <CheckCircle2 size={18} /> Publish Result
            </button>
          </form>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 overflow-hidden h-fit">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Manage Matches</h2>
          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
            {matches.length === 0 ? (
              <p className="text-slate-400 text-sm text-center py-4">No match records.</p>
            ) : (
              matches.slice().reverse().map(match => (
                <div key={match.id} className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex justify-between items-center group">
                  <div className="text-xs">
                    <div className="font-bold text-slate-800">
                      {match.homeTeamId.split('-')[0]} vs {match.awayTeamId.split('-')[0]}
                    </div>
                    <div className="text-slate-500 mt-0.5">
                      {match.homeScore} - {match.awayScore} | Team {match.league}
                    </div>
                  </div>
                  <button 
                    onClick={() => onDeleteMatch(match.id)}
                    className="p-2 text-slate-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
