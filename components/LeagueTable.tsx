
import React from 'react';
import { StandingsRow, LeagueType } from '../types';
import { Trophy, ChevronUp, ChevronDown, Minus } from 'lucide-react';

interface LeagueTableProps {
  leagueType: LeagueType;
  standings: StandingsRow[];
}

const LeagueTable: React.FC<LeagueTableProps> = ({ leagueType, standings }) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">League Table - Team {leagueType}</h1>
          <p className="text-slate-500">St Paul's Catholic Seminary official standings</p>
        </div>
        <div className="flex items-center space-x-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full font-bold text-sm">
          <Trophy size={16} />
          <span>Competitive Season 2025/2026</span>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 text-sm font-semibold uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 text-center w-16">Pos</th>
                <th className="px-6 py-4">Team (Class)</th>
                <th className="px-4 py-4 text-center">P</th>
                <th className="px-4 py-4 text-center">W</th>
                <th className="px-4 py-4 text-center">D</th>
                <th className="px-4 py-4 text-center">L</th>
                <th className="px-4 py-4 text-center hidden sm:table-cell">GF</th>
                <th className="px-4 py-4 text-center hidden sm:table-cell">GA</th>
                <th className="px-4 py-4 text-center">GD</th>
                <th className="px-6 py-4 text-center font-bold text-indigo-900">Pts</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {standings.map((row, index) => (
                <tr key={row.teamId} className={`hover:bg-slate-50 transition-colors ${index === 0 ? 'bg-amber-50/30' : ''}`}>
                  <td className="px-6 py-5 text-center">
                    <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm ${
                      index === 0 ? 'bg-amber-500 text-white ring-4 ring-amber-100' : 
                      index === 1 ? 'bg-slate-400 text-white' : 
                      index === 2 ? 'bg-amber-700/50 text-white' : 
                      'bg-slate-100 text-slate-500'
                    }`}>
                      {index + 1}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="font-bold text-slate-900">{row.teamName}</div>
                    <div className="text-xs text-slate-400 font-medium">Sowtuomian Squad {leagueType}</div>
                  </td>
                  <td className="px-4 py-5 text-center font-medium text-slate-600">{row.played}</td>
                  <td className="px-4 py-5 text-center font-medium text-slate-600">{row.won}</td>
                  <td className="px-4 py-5 text-center font-medium text-slate-600">{row.drawn}</td>
                  <td className="px-4 py-5 text-center font-medium text-slate-600">{row.lost}</td>
                  <td className="px-4 py-5 text-center font-medium text-slate-400 hidden sm:table-cell">{row.gf}</td>
                  <td className="px-4 py-5 text-center font-medium text-slate-400 hidden sm:table-cell">{row.ga}</td>
                  <td className="px-4 py-5 text-center font-bold text-slate-700">
                    <span className={row.gd > 0 ? 'text-green-600' : row.gd < 0 ? 'text-red-600' : 'text-slate-400'}>
                      {row.gd > 0 ? `+${row.gd}` : row.gd}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span className="text-lg font-black text-indigo-900">{row.points}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LeagueTable;
