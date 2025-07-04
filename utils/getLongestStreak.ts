type StreakProp = {
  [key: string]: {
    completed: boolean;
    id: number;
  };
};
function formatDate(date: Date): string {
  return date.toISOString().split("T")[0]; // YYYY-MM-DD
}

export default function getLongestStreak(streakArray: StreakProp[], id: string) {
  const userDates = streakArray.flatMap((dateObj) =>
    Object.entries(dateObj)
      .filter(([_, value]) => value.completed && value.id === +id)
      .map(([dateKey]) => {
        let date: Date;
        if (dateKey.includes("/")) {
          const [dd, mm, yyyy] = dateKey.split("/").map(Number);
          date = new Date(yyyy, mm - 1, dd);
        } else {
          date = new Date(dateKey); // handles ISO format (yyyy-mm-dd)
        }
        date.setHours(0, 0, 0, 0);
        return date;
      })
  );

  const uniqueDates = Array.from(new Set(userDates.map((d) => formatDate(d))))
    .map((str) => new Date(str))
    .sort((a, b) => a.getTime() - b.getTime());

  if (uniqueDates.length === 0) {
    return {
      longestStreak: 0,
      currentStreak: 0,
      lastLongest: [0],
    };
  }

  let longestStreak = 1;
  let currentStreak = 1;
  let lastLongest = [0];

  for (let i = 1; i < uniqueDates.length; i++) {
    const diff =
      (uniqueDates[i].getTime() - uniqueDates[i - 1].getTime()) /
      (1000 * 60 * 60 * 24);

    if (diff === 1) {
      currentStreak++;
      if (currentStreak > longestStreak) {
        longestStreak = currentStreak;
      } else if (lastLongest[lastLongest.length - 1] < longestStreak) {
        lastLongest.push(longestStreak);
      }
    } else {
      currentStreak = 1;
    }
  }

  return {
    currentStreak,
    longestStreak,
    lastLongest,
  };
}
