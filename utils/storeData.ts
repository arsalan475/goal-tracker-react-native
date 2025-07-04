import { Task } from "@/Types/task";
import AsyncStorage from "@react-native-async-storage/async-storage";



     type streakProp={  
      [key:string]:{
        completed:boolean;
        id:number;
      }
    }
export const storeData = async (key:string,tasks: Task[] | string | number | streakProp[]) => {

  // const checkType = (typeof tasks) === 'string

    try {
      const jsonValue = JSON.stringify(tasks);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      console.error('Error storing data:', e);
    }
  };

