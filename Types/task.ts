import { Priority } from '../Types/priority';

export type  Task = {
      id: number;
      inputValue:string 
      isCompleted?:boolean
   importance?:Priority,
   power:number
    };


export type addTaskProps = {
  id?:number;
  setData:React.Dispatch<React.SetStateAction<Task[]>>;
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  data:Task[],
  isEnabled?:boolean
   
}    