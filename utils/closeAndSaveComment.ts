import { setStreak } from './setStreak';
import { getDateByMonth, isToday } from "./dayChecker";
import { storeData } from "./storeData";
// import { StreakProp } from "./getLongestStreak";


 type streakProp={  
        [key:string]:{
          completed:boolean;
          id:number;
          emoji?:string;
          comment?:string,
        }
      }

type closeCommentProp = {
    day:number,
    month:number,
    restriction:boolean,
    streak:streakProp[],
    id:string|string[]
    setIsVisible:React.Dispatch<React.SetStateAction<boolean>>,
    setStreak:React.Dispatch<React.SetStateAction<streakProp[]>>,
    comment:string  
}

function closeAndSaveComment({day,month,restriction,streak,setIsVisible,id,comment,setStreak}:closeCommentProp) {

  
              
              setIsVisible(false)
              if(!isToday(month,day) && restriction) return
  const clickedDate = getDateByMonth(month,day).toLocaleDateString();

  const existingEntryIndex = streak.findIndex(
    (item) => item[clickedDate] && item[clickedDate].id === +id
  );

  

  let updatedStreak;

  if (existingEntryIndex !== -1) {
    updatedStreak = [...streak];


    if(!updatedStreak[existingEntryIndex][clickedDate].completed) return
    if(comment === '') return
    updatedStreak[existingEntryIndex][clickedDate].comment = comment



 setStreak(updatedStreak);
  storeData("streaks", updatedStreak);
  }
              
              
  
}

export default closeAndSaveComment
