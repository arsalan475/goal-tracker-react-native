import { getDateByMonth } from "./dayChecker";


 type streakProp={  
        [key:string]:{
          completed:boolean;
          id:number;
          emoji?:string;
          comment?:string,
        }
      }


      type commentsProp = {

        event:any,
        streak:streakProp[],
        month:number,
        day:number,
        id:string|string[],
        setComment:React.Dispatch<React.SetStateAction<string>>,
        setTouchPosition:React.Dispatch<React.SetStateAction<{x:number,y:number,day:number}>>,setIsVisible:React.Dispatch<React.SetStateAction<boolean>>
      }

export async function showComment({event,streak,month,day,id,setComment,setTouchPosition,setIsVisible}:commentsProp){
      const clickedDate =  getDateByMonth(month, day).toLocaleDateString();
const existingEntryIndex = streak.findIndex(
    (item) => item[clickedDate] && item[clickedDate].id === +id
  );

  if(existingEntryIndex === -1) return
  if(!streak[existingEntryIndex][clickedDate].completed) return
  if(streak[existingEntryIndex][clickedDate].comment){
    console.log(streak[existingEntryIndex][clickedDate].comment)
    setComment(streak[existingEntryIndex][clickedDate].comment)
  }else{
    setComment('')
  }
 const { pageX, pageY } = event.nativeEvent;
    setTouchPosition({ x: pageX, y: pageY,day });
setIsVisible(true)

              
    }