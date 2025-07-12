
const today = new Date()

type streakProp={  
        [key:string]:{
          completed:boolean;
          id:number;
          emoji?:string;
          comment?:string,
        }
      }


  export function getDateByMonth(month:number,day?:number){
    const year = new Date().getFullYear();

    if(day) return new Date(year,month,day)
    return new Date(year,month+1,0)
  }

export const isToday = (day: number,month:number) => {
    const date = getDateByMonth(month, day);
    return date.toDateString() === today.toDateString();
  };
      
  
  
  export function isCompleted(date: string,streak:streakProp[],id:string[] | string) {
    const entry = streak?.find((item) => item[date] && item[date].id === +id);
    return {
    ok:  entry && entry[date]?.completed,
    emoji:entry && entry[date]?.emoji
    }
  }


    export function isCommented(date: string,streak:streakProp[],id:string[] | string) {
    const entry = streak?.find((item) => item[date] && item[date].id === +id);

    if(entry && entry[date].hasOwnProperty('comment')){
      return true
    }else{
     return false
    }
    
  }
    ;
 export const isPast = (day: number,month:number) => {
    const targetDate = getDateByMonth(month, day);
    return targetDate < today && !isToday(day,month);
  };    
