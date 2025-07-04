import { useLoadTasks } from './../hooks/loadTask';

import { Task } from "@/Types/task";
import { storeData } from "./storeData";
import { getData } from "./getData";



type updateProp ={
    id: number;
    data:Task[];
    setData: React.Dispatch<React.SetStateAction<Task[]>>,
    isEnabled?:boolean
}

    
export const updateTodo = ({id,data,setData}:updateProp) => {
   
  
const index = data?.findIndex(task => task.id === id);


if(index === -1) return
    data[index].isCompleted = !data[index].isCompleted
    
    setData((data)=>[...data])
     storeData('todos',data)
     

    
  };