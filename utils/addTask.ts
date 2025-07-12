import { addTaskProps } from "@/Types/task";
import { storeData } from "./storeData";
import { Alert } from "react-native";





export const addTask = ({inputValue,setInputValue,setData,data,isEnabled}:addTaskProps) => {
        // alert(`Set streak for task ID`);

    if (!inputValue.trim()) return;

let newTask  = {
        id: Date.now(),
        inputValue: inputValue,
      };

   
    
    const updatedData = [...data, newTask];
  

    setData(updatedData)
    storeData('data',updatedData);
    setInputValue('');
  };
