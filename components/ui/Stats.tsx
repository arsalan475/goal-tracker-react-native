import { Text, View } from "react-native"

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

function Stats({streakStats}:{streakStats:StreakStats}) {
  return (
    <View style={{ marginVertical: 20, padding: 10, backgroundColor: "#1e293b", borderRadius: 10 }}>
      <Text style={{ color: "#60a5fa", fontWeight: "bold", fontSize: 14 }}>
        🏆 Longest Streak: <Text style={{ color: "white" }}>{streakStats.longestStreak} days</Text>
      </Text>
      <Text style={{ color: "#60a5fa", fontWeight: "bold", fontSize: 14 }}>
        🔥 Current Streak: <Text style={{ color: "white" }}>{streakStats.currentStreak} days</Text>
      </Text>
      <Text style={{ color: "#60a5fa", fontWeight: "bold", fontSize: 14 }}>
        💀 Last Longest Streak: <Text style={{ color: "white" }}>{streakStats.lastLongest[streakStats.lastLongest.length -2]} days</Text>
      </Text>
    </View>
  )
}

export default Stats
