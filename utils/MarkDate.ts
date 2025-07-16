import { getDateByMonth, isToday } from "./dayChecker";
import { storeData } from "./storeData";
import getLongestStreak from './getLongestStreak';
import { addSeenBadgeId, getSeenBadgeIds } from './badgeStorage';
import { Vibration } from "react-native";


type streakProp = {
  [key: string]: {
    completed: boolean;
    id: number;
    emoji?: string;
    comment?: string,
  }
}

type Badge = {
  id: number;
  icon: string | React.ReactNode;
  name: string;
};

type StreakStats = {
  longestStreak: number;
  currentStreak: number;
  lastLongest: number[];
  achivements: Badge[];
};

type markDateProp = {
  streak: streakProp[],
  month: number,
  day: number,
  id: string | string[],
  setStreak: React.Dispatch<React.SetStateAction<streakProp[]>>,
  setStreakStats: React.Dispatch<React.SetStateAction<StreakStats>>,
  restriction: boolean,
  tickStyle: string,
  setCurrentBadge?: React.Dispatch<React.SetStateAction<Badge | null>>,
}

export async function markDate({
  streak,
  month,
  day,
  id,
  restriction,
  tickStyle,
  setStreak,
  setStreakStats,
  setCurrentBadge
}: markDateProp) {

  if (!isToday(day, month) && restriction) return;

  const clickedDate = getDateByMonth(month, day).toLocaleDateString();

  const existingEntryIndex = streak.findIndex(
    (item) => item[clickedDate] && item[clickedDate].id === +id
  );

  let updatedStreak;

  if (existingEntryIndex !== -1) {
    updatedStreak = [...streak];
    updatedStreak[existingEntryIndex][clickedDate].completed =
      !updatedStreak[existingEntryIndex][clickedDate].completed;
  } else {
    const newEntry: streakProp = {
      [clickedDate]: {
        completed: true,
        id: +id,
        emoji: tickStyle,
      },
    };
    updatedStreak = [...streak, newEntry];
  }

  setStreak(updatedStreak);
  // storeData("streaks", updatedStreak);
  // Delay storing streak data slightly to avoid blocking UI
setTimeout(() => storeData("streaks", updatedStreak), 100);


  const result = getLongestStreak(updatedStreak, id.toString());

  const longestStreak = result?.longestStreak || 0;
  const currentStreak = result?.currentStreak || 0;
  const lastLongest = result?.lastLongest || [];
  const achivements = result?.achivements || [];

  setStreakStats({ longestStreak, currentStreak, lastLongest, achivements });

  if (setCurrentBadge && Array.isArray(achivements)) {
    try {
      const seen = await getSeenBadgeIds(id.toString());
      const newBadge = achivements.find((b) => !seen.includes(b.id));
      if (newBadge) {
        await addSeenBadgeId(id.toString(), newBadge.id);
        setCurrentBadge(newBadge);
        Vibration.vibrate(100);
      }
    } catch (e) {
      console.error('Error showing badge modal:', e);
    }
  }
}
