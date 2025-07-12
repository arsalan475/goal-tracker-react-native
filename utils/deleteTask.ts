
// import { Task } from "@/Types/task";
// import { storeData } from "./storeData";
// import { getData } from "./getData";



// type deletTaskProp ={
//     id: number;
//     data:Task[];
//     setData: React.Dispatch<React.SetStateAction<Task[]>>,
    
// }

//     type streakProp={  
//         [key:string]:{
//           completed:boolean;
//           id:number;
//         }
//       }
// export const deleteTask = async ({id,data,setData}:deletTaskProp) => {
   
  
//   const streaks = await getData('streaks')
//     const streaksKeys = streaks.map((streak:streakProp) => Object.keys(streak)).flat();
//     const updatedStreaks = streaks.filter((streak:streakProp,i:string) => streak[streaksKeys[i]].id !== id);
//     const updatedData = data.filter(task => task.id !== id);
//     setData(updatedData);
//     storeData('data',updatedData);
//     storeData('streaks',updatedStreaks  )
    
//   };



import { Task } from "@/Types/task";
import { storeData } from "./storeData";
import { getData } from "./getData";
import { delSeenBadgeId } from "./badgeStorage";

type DeleteTaskProps = {
  id: number;
  data: Task[];
  setData: React.Dispatch<React.SetStateAction<Task[]>>;
};

type StreakProp = {
  [date: string]: {
    completed: boolean;
    id: number;
  };
};

export const deleteTask = async ({ id, data, setData }: DeleteTaskProps) => {
  try {
    await delSeenBadgeId(id.toString())
    const streaks: StreakProp[] = (await getData('streaks')) || [];

    // Flatten and find keys that belong to the streaks
    const updatedStreaks = streaks.filter((streak) => {
      const [dateKey] = Object.keys(streak);
      return streak[dateKey].id !== id;
    });

    // Remove task from task list
    const updatedTasks = data.filter((task) => task.id !== id);

    // Update local state
    setData(updatedTasks);

    // Save updated data to storage
    await storeData('data', updatedTasks);
    await storeData('streaks', updatedStreaks);
  } catch (error) {
    console.error("Error deleting task:", error);
  }
};
