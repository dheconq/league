
export type ClassName = 'Philosophy One' | 'Philosophy Two' | 'Philosophy Three' | 'Spiritual Year';
export type LeagueType = 'A' | 'B';

export interface Team {
  id: string;
  name: ClassName;
  league: LeagueType;
}

export interface Match {
  id: string;
  homeTeamId: string;
  awayTeamId: string;
  homeScore: number;
  awayScore: number;
  date: string;
  league: LeagueType;
}

export interface StandingsRow {
  teamId: string;
  teamName: ClassName;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  gf: number;
  ga: number;
  gd: number;
  points: number;
}

export interface User {
  username: string;
  isAdmin: boolean;
}
