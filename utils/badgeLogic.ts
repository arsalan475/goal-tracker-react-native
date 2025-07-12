type Badge = {
  id: string;
  name: string;
  icon: string;
  type: 'bronze' | 'silver' | 'gold';
};

const allBadges: Badge[] = [
  { id: '7_day_streak', name: 'Newbie', icon: '🐣', type: 'bronze' },
  { id: '15_day_streak', name: 'Spider', icon: '🕷', type: 'bronze' },
  { id: '30_day_streak', name: 'Hero', icon: '🦸‍♀️', type: 'silver' },
  { id: '45_day_streak', name: 'Athlete', icon: '💪', type: 'silver' },
  { id: '60_day_streak', name: 'Legend', icon: '🔥', type: 'gold' },
  { id: '90_day_streak', name: 'Unbeatable', icon: '🌞', type: 'gold' },
];

export function evaluateBadges(streak: number): Badge[] {
  return allBadges.filter((badge) => {
    const days = parseInt(badge.id.split('_')[0]);
    return streak >= days;
  });
}

export { allBadges, Badge };
