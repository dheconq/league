
import { Team, ClassName } from './types';

export const CLASSES: ClassName[] = [
  'Philosophy One',
  'Philosophy Two',
  'Philosophy Three',
  'Spiritual Year'
];

export const INITIAL_TEAMS: Team[] = CLASSES.flatMap((className) => [
  { id: `${className}-A`, name: className, league: 'A' },
  { id: `${className}-B`, name: className, league: 'B' }
]);

export const COLORS = {
  primary: '#1e3a8a', // Deep Blue
  accent: '#fbbf24',  // Amber/Gold
  philosophyOne: '#3b82f6',
  philosophyTwo: '#10b981',
  philosophyThree: '#8b5cf6',
  spiritualYear: '#f59e0b'
};
