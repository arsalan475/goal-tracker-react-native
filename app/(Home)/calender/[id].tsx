// import CopyBox from '@/components/CopyBox';
import { FlashList } from '@shopify/flash-list';
import { getData } from "@/utils";
import getLongestStreak from "@/utils/getLongestStreak";
import { useLocalSearchParams } from "expo-router";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { loadQuotes } from "@/utils/quotes"; // ✅ New
import EmojiPicker from "@/components/EmojiPicker";
import AnimatedModel from "@/components/AnimatedModel";
import SettingsMenu from "@/components/SettingMenu";
import { getDateByMonth, isToday } from "@/utils/dayChecker";
import CalenderHeading from "@/components/ui/CalenderHeading";
import CalenderSubHeading from "@/components/ui/CalenderSubHeading";
import { showComment } from "@/utils/showComment";
import { markDate } from "@/utils/MarkDate";
import DayBox from "@/components/DayBox";
import closeAndSaveComment from "@/utils/closeAndSaveComment";
import Stats from "@/components/ui/Stats";
import PrviousAndNextBtn from "@/components/ui/PrviousAndNextBtn";
import SelectMark from "@/components/SelectMark";
import WeeksBox from "@/components/ui/WeeksBox";
import BadgeList from "@/components/BadgeList";
import { useSessionStore } from "@/app/store/useSessionStore";
import { addSeenBadgeId, getSeenBadgeIds } from "@/utils/badgeStorage";
import Badge3DModal from "@/components/Badge3dModel";
import { FlatList } from 'react-native';
// make sure this is imported

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

type streakProp = {
  [key: string]: {
    completed: boolean;
    id: number;
    emoji?: string;
    comment?: string;
  };
};

type dataProp = { id: number; inputValue: string };
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

const Calendar = () => {
  const { id } = useLocalSearchParams();
  const [streak, setStreak] = useState<streakProp[]>([]);
  const [visible, setIsVisible] = useState<boolean>(false);
  const [touchPosition, setTouchPosition] = useState({ x: 0, y: 0, day: 0 });

  const [showStats, setShowStats] = useState(true);
  const [streakStats, setStreakStats] = useState<StreakStats>({
    longestStreak: 0,
    currentStreak: 0,
    lastLongest: [0],
    achivements: [],
  });

  const [comment, setComment] = useState<string>("");
  const [quote, setQuote] = useState<string>("");
  const [tickStyle, setTickStyle] = useState<string>("✔");

  const [restriction, setRestriction] = useState(false);

  const [month, setMonth] = useState<number>(new Date().getMonth());
  const [currentGoalData, setCurrentGoalData] = useState<dataProp[]>([]);

const totalDays = useMemo(() => getDateByMonth(month).getDate(), [month]);
const currentMonthName = useMemo(() => monthNames[getDateByMonth(month).getMonth()], [month]);

const firstDayOfMonth = useMemo(() => getDateByMonth(month, 1).getDay(), [month]);




const [currentBadge, setCurrentBadge] = useState<any>(null);
  const hasShownQuote = useSessionStore((state) => state.hasShownQuote);
  const setHasShownQuote = useSessionStore((state) => state.setHasShownQuote);

  const [showQuote, setShowQuote] = useState(false);
  
  

// Add inside Calendar component:
const handleMarkDate = useCallback(
  (day: number) => {
    markDate({
      streak,
      month,
      day,
      id,
      restriction,
      tickStyle,
      setStreak,
      setStreakStats,
      setCurrentBadge,
    });
  },
  [streak, month, id, restriction, tickStyle]
);

  
  
  useEffect(() => {
    if (!hasShownQuote) {
      setShowQuote(true);
      setHasShownQuote(true); // ✅ Mark quote as shown for session
    }
  }, []);





  useEffect(() => {
    (async () => {
      const quotes = await loadQuotes();
      const random = quotes[Math.floor(Math.random() * quotes.length)];
      setQuote(random);
    })();
  }, []);

  useEffect(() => {
    async function loadData() {
      const data = await getData("streaks");
      const goalData = await getData("data");
      setCurrentGoalData(goalData);

      setStreak(data || []);

      const { longestStreak, currentStreak, lastLongest, achivements } =
        getLongestStreak(data || [], id.toString());
      setStreakStats({
        longestStreak,
        currentStreak,
        lastLongest,
        achivements,
      });

      setCurrentGoalData((currentGoalData) =>
        currentGoalData?.filter((item: dataProp) => item.id === +id)
      );
    }

    loadData();
  }, [id]);

  // const totalDays = getDateByMonth(month).getDate();
  // const currentMonthName = monthNames[getDateByMonth(month).getMonth()];

  // const firstDayOfMonth = getDateByMonth(month, 1).getDay();


  // useEffect(() => {
  //   (async () => {
  //     const { achivements } = getLongestStreak(streak, id.toString());
  //     const seen = await getSeenBadgeIds(id.toString());

  //     const newBadge = achivements?.find((b) => !seen.includes(b.id));
  //     if (newBadge) {
  //       setCurrentBadge(newBadge);
  //       await addSeenBadgeId(id.toString(), newBadge.id);
  //     }
  //   })();
  //   console.log(currentBadge);
  // }, [streak]);

  const closeModal = () => {
    setCurrentBadge(null);
  };

  return (
    <View style={styles.body}>
      {currentBadge && (
        <Badge3DModal
          visible
          onClose={closeModal}
          icon={<Text style={{ fontSize: 60 }}>{currentBadge.icon}</Text>}
          title={`🎉 New Badge: ${currentBadge.name}`}
        />
      )}

      <View
        style={{
          flex: 1,
          backgroundColor: "#0f172a",
          position: "absolute",
          top: 0,
          right: 0,
          zIndex: 1000,
        }}
      >
        <SettingsMenu
          showStats={showStats}
          setShowStats={setShowStats}
          restriction={restriction}
          setRestriction={setRestriction}
          id={id}
        />
      </View>

      {showQuote && <AnimatedModel quote={quote} />}
      
      <CalenderHeading>{currentMonthName}</CalenderHeading>
      <CalenderSubHeading>{currentGoalData[0]?.inputValue}</CalenderSubHeading>


      <WeeksBox />




  <View 
                      style={styles.dayContainer}         
              
              >
                 {Array.from({ length: firstDayOfMonth }).map((_, index) => (
                          <View key={`empty-${index}`} style={[styles.dayBox,{opacity:0}]}></View>
                        ))}
            {/* Calendar days */}
            {[...Array(totalDays)].map((_, index) => {
              const day = index + 1;
          
              let date : string = getDateByMonth(month,day).toLocaleDateString()

           

              return (
                 <TouchableOpacity key={index}
      onLongPress={(event) =>
        showComment({
          event,
          streak,
          month,
          day,
          id,
          setComment,
          setTouchPosition,
          setIsVisible,
        })
      }
      onPress={() => handleMarkDate(day)}
      
      >
        <DayBox
          streak={streak}
          day={day}
          month={month}
          date={date}
          id={id}
          />
      </TouchableOpacity>
              );
            })}
          </View>


  
          

      <SelectMark setTickStyle={setTickStyle} tickStyle={tickStyle} />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 24,
        }}
      >
        <PrviousAndNextBtn type={"Previous"} setMonth={setMonth} />
        <PrviousAndNextBtn type={"Next"} setMonth={setMonth} />
      </View>

      {showStats && <Stats streakStats={streakStats} />}

      <EmojiPicker
        isLocked={
          !isToday(touchPosition.day, month) && restriction ? true : false
        }
        onClose={() =>
          closeAndSaveComment({
            streak,
            day: touchPosition.day,
            restriction,
            setIsVisible,
            month,
            id,
            comment,
            setStreak,
          })
        }
        isVisible={visible}
        touchPosition={touchPosition}
      >
        <TextInput
          multiline={true}
          numberOfLines={6}
          textAlignVertical="top"
          editable={
            !isToday(month, touchPosition.day) && restriction ? false : true
          }
        
          value={comment}
          onChangeText={setComment}
          style={styles.inputTextArea}
        />
      </EmojiPicker>
    </View>
  );
};

const { width } = Dimensions.get("window");
const boxSize = width / 7;

const boxWidth = boxSize - 10;
const styles = StyleSheet.create({
  body: {
    flexGrow: 1,
    paddingVertical: 12,
    paddingHorizontal: 0,
    width: "100%",

    padding: 10,
  },

  inputTextArea: {
    borderWidth: 1,
    borderColor: "#888",
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
    backgroundColor: "#fff",
    width: "100%",
    height: "100%",
  },

  dayContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#0f172e",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#f7f7f7",
  },

  dayBox: {
    width: boxWidth,
    color: "white",
    backgroundColor: "#124",
    margin: 2,
    textAlign: "center",
    padding: 5,
    borderRadius: 4,
  },
  dayText: {
    color: "black",
  },

  todayBox: {
    backgroundColor: "#facc15",
  },
  completedBox: {
    backgroundColor: "#10b981",
  },
  pastBox: {
    opacity: 0.55,
    backgroundColor: "#2d3748",
  },

  gridRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
    color: "red",
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
});

export default Calendar;
