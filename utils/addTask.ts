import { addTaskProps } from "@/Types/task";
import { storeData } from "./storeData";
import { Alert } from "react-native";





export const addTask = ({inputValue,setInputValue,setData,data,isEnabled}:addTaskProps) => {
        // alert(`Set streak for task ID`);

    if (!inputValue.trim()) return;

let newTask;

if(!isEnabled){
  
      newTask  = {
        id: Date.now(),
        inputValue: inputValue,
      };

}else{

  
        newTask  = {
          id: Date.now(),
          inputValue: inputValue,
          isCompleted:false,
          importance:'Medium',
          power:10
        };


}




  
   
    
    const updatedData = [...data, newTask];
  

    setData(updatedData)
    storeData(isEnabled? 'todos' : 'data',updatedData);
    setInputValue('');
  };
