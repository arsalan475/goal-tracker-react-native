import { Platform } from 'react-native';

export type StreakProp = {
  [key: string]: {
    completed: boolean;
    id: number;
  };
};

export type Badge = {
  id: number;
  icon: string;
  name: string;
};

export type AchievementResult = {
  currentStreak: number;
  longestStreak: number;
  lastLongest: number[];
  achivements: Badge[];
  nextBadge?: {
    name: string;
    icon: string;
    daysRemaining: number;
  } | null;
};

function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

export const badges: Badge[] = [
  { id: 1, icon: '🐣', name: 'Newbie' },
  { id: 2, icon: '🕷', name: 'Spider' },
  { id: 3, icon: '🦸‍♀️', name: 'Hero' },
  { id: 4, icon: '💪', name: 'Athlete' },
  { id: 5, icon: '🔥', name: 'Legend' },
  { id: 6, icon: '🌞', name: 'Unbeatable' },
];

const badgeThresholds = [7, 15, 30, 45, 60, 90];

export default function getLongestStreak(
  streakArray: StreakProp[],
  id: string
): AchievementResult {
  const userDates: Date[] = streakArray.flatMap((dateObj) =>
    Object.entries(dateObj)
      .filter(([_, value]) => value.completed && value.id === +id)
      .map(([dateKey]) => {
        let date: Date;
        if (dateKey.includes('/')) {
          const parts = dateKey.split('/').map(Number);
          date = Platform.OS === 'web'
            ? new Date(parts[2], parts[1] - 1, parts[0])
            : new Date(parts[2], parts[0] - 1, parts[1]);
        } else {
          date = new Date(dateKey);
        }
        date.setHours(0, 0, 0, 0);
        return date;
      })
  );

  const uniqueDates = Array.from(new Set(userDates.map(formatDate)))
    .map((str) => new Date(str))
    .sort((a, b) => a.getTime() - b.getTime());

  if (uniqueDates.length === 0) {
    return {
      longestStreak: 0,
      currentStreak: 0,
      lastLongest: [0],
      achivements: [],
      nextBadge: {
        name: badges[0].name,
        icon: badges[0].icon,
        daysRemaining: 7,
      },
    };
  }

  let longestStreak = 1;
  let currentStreak = 1;
  let lastLongest = [0];
  const achivements: Badge[] = [];
  const awardedBadges = new Set<number>();

  for (let i = 1; i < uniqueDates.length; i++) {
    const diff =
      (uniqueDates[i].getTime() - uniqueDates[i - 1].getTime()) /
      (1000 * 60 * 60 * 24);

    if (diff === 1) {
      currentStreak++;
      if (currentStreak > longestStreak) {
        longestStreak = currentStreak;
      }
    } else {
      if (lastLongest[lastLongest.length - 1] < longestStreak) {
        lastLongest.push(longestStreak);
      }
      currentStreak = 1;
    }

    badgeThresholds.forEach((threshold, index) => {
      if (longestStreak >= threshold && !awardedBadges.has(threshold)) {
        achivements.push(badges[index]);
        awardedBadges.add(threshold);
      }
    });
  }

  const nextThreshold = badgeThresholds.find((t) => t > longestStreak);
  const nextBadge = nextThreshold
    ? {
        name: badges[badgeThresholds.indexOf(nextThreshold)].name,
        icon: badges[badgeThresholds.indexOf(nextThreshold)].icon,
        daysRemaining: nextThreshold - longestStreak,
      }
    : null;

  return {
    currentStreak,
    longestStreak,
    lastLongest,
    achivements,
    nextBadge,
  };
}
