
import { getDateByMonth, isToday } from "./dayChecker";
import { storeData } from "./storeData";
import getLongestStreak from './getLongestStreak';


 type streakProp={  
        [key:string]:{
          completed:boolean;
          id:number;
          emoji?:string;
          comment?:string,
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

        streak:streakProp[],
        month:number,
        day:number,
        id:string|string[],
        setStreak:React.Dispatch<React.SetStateAction<streakProp[]>>,
         setStreakStats:React.Dispatch<React.SetStateAction<StreakStats>>,
        //  setIsVisible:React.Dispatch<React.SetStateAction<boolean>>,
        restriction:boolean,
        tickStyle:string
      }

export async function markDate({streak,month,day,id,restriction,tickStyle,setStreak,setStreakStats}:markDateProp){
     
      
                        if(!isToday(day,month) && restriction) return
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
              emoji:tickStyle,
              
            },
          };
          updatedStreak = [...streak, newEntry];
        }
      
        setStreak(updatedStreak);
        storeData("streaks", updatedStreak);
      
        const { longestStreak,currentStreak ,lastLongest,achivements} = getLongestStreak(updatedStreak, id.toString());
        setStreakStats({ longestStreak,currentStreak,lastLongest,achivements })
      
              
    }