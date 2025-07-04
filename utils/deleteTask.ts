
import { Task } from "@/Types/task";
import { storeData } from "./storeData";
import { getData } from "./getData";



type deletTaskProp ={
    id: number;
    data:Task[];
    setData: React.Dispatch<React.SetStateAction<Task[]>>,
    isEnabled?:boolean
}

    type streakProp={  
        [key:string]:{
          completed:boolean;
          id:number;
        }
      }
export const deleteTask = async ({id,data,setData,isEnabled}:deletTaskProp) => {
   
  if(isEnabled){
const updatedData = data.filter(task => task.id !== id);
    setData(updatedData);
    storeData('todos',updatedData);
return
  }
  const streaks = await getData('streaks')
    const streaksKeys = streaks.map((streak:streakProp) => Object.keys(streak)).flat();
    const updatedStreaks = streaks.filter((streak:streakProp,i:string) => streak[streaksKeys[i]].id !== id);
    const updatedData = data.filter(task => task.id !== id);
    setData(updatedData);
    storeData('data',updatedData);
    storeData('streaks',updatedStreaks  )
    
  };