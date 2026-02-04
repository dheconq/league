
import React, { useState, useEffect } from 'react';
import { Trophy, TrendingUp, Users, Calendar, Sparkles } from 'lucide-react';
import { Match, StandingsRow } from '../types';
import { getLeagueAnalysis } from '../services/geminiService';

interface DashboardProps {
  matches: Match[];
  standingsA: StandingsRow[];
  standingsB: StandingsRow[];
}

const Dashboard: React.FC<DashboardProps> = ({ matches, standingsA, standingsB }) => {
  const [analysisA, setAnalysisA] = useState<string>('');
  const [analysisB, setAnalysisB] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalysis = async () => {
      setLoading(true);
      const [resA, resB] = await Promise.all([
        getLeagueAnalysis(standingsA, 'A'),
        getLeagueAnalysis(standingsB, 'B')
      ]);
      setAnalysisA(resA || '');
      setAnalysisB(resB || '');
      setLoading(false);
    };
    fetchAnalysis();
  }, [standingsA, standingsB]);

  const leaderA = standingsA[0];
  const leaderB = standingsB[0];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Seminary League Overview</h1>
        <p className="text-slate-500">Welcome to the official portal for St Paul's Seminary sporting activities.</p>
      </div>

      {/* Highlights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center space-x-4">
          <div className="bg-amber-100 p-3 rounded-xl text-amber-600">
            <Trophy size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">League A Leader</p>
            <p className="text-xl font-bold">{leaderA?.teamName || 'N/A'}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center space-x-4">
          <div className="bg-blue-100 p-3 rounded-xl text-blue-600">
            <Trophy size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">League B Leader</p>
            <p className="text-xl font-bold">{leaderB?.teamName || 'N/A'}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center space-x-4">
          <div className="bg-green-100 p-3 rounded-xl text-green-600">
            <Calendar size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Matches Played</p>
            <p className="text-xl font-bold">{matches.length}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center space-x-4">
          <div className="bg-purple-100 p-3 rounded-xl text-purple-600">
            <Users size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Active Teams</p>
            <p className="text-xl font-bold">8 Teams</p>
          </div>
        </div>
      </div>

      {/* AI Insights Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-8 rounded-3xl border border-blue-100 relative overflow-hidden group">
          <Sparkles className="absolute top-4 right-4 text-indigo-400 opacity-20 group-hover:opacity-100 transition-opacity" size={48} />
          <h2 className="text-2xl font-bold text-indigo-900 mb-4 flex items-center gap-2">
            <TrendingUp size={24} className="text-indigo-600" />
            League A Insights
          </h2>
          {loading ? (
            <div className="animate-pulse space-y-2">
              <div className="h-4 bg-indigo-200 rounded w-full"></div>
              <div className="h-4 bg-indigo-200 rounded w-3/4"></div>
            </div>
          ) : (
            <p className="text-indigo-800 leading-relaxed italic">"{analysisA}"</p>
          )}
        </div>

        <div className="bg-gradient-to-br from-amber-50 to-yellow-50 p-8 rounded-3xl border border-amber-100 relative overflow-hidden group">
          <Sparkles className="absolute top-4 right-4 text-amber-400 opacity-20 group-hover:opacity-100 transition-opacity" size={48} />
          <h2 className="text-2xl font-bold text-amber-900 mb-4 flex items-center gap-2">
            <TrendingUp size={24} className="text-amber-600" />
            League B Insights
          </h2>
          {loading ? (
            <div className="animate-pulse space-y-2">
              <div className="h-4 bg-amber-200 rounded w-full"></div>
              <div className="h-4 bg-amber-200 rounded w-3/4"></div>
            </div>
          ) : (
            <p className="text-amber-800 leading-relaxed italic">"{analysisB}"</p>
          )}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Calendar size={20} className="text-slate-500" /> Recent Results
        </h3>
        <div className="space-y-3">
          {matches.length === 0 ? (
            <p className="text-slate-400 text-center py-8">No matches recorded yet.</p>
          ) : (
            matches.slice(-5).reverse().map(match => (
              <div key={match.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors border border-slate-100">
                <div className="flex-1 text-right font-medium pr-4">{match.homeTeamId.split('-')[0]}</div>
                <div className="flex items-center space-x-3">
                  <span className="bg-slate-900 text-white px-3 py-1 rounded-md font-mono text-lg font-bold">
                    {match.homeScore} - {match.awayScore}
                  </span>
                </div>
                <div className="flex-1 text-left font-medium pl-4">{match.awayTeamId.split('-')[0]}</div>
                <div className="ml-4 text-xs font-bold text-slate-400 uppercase tracking-widest bg-slate-200 px-2 py-1 rounded">
                  Team {match.league}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
