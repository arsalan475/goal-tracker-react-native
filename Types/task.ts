

export type  Task = {
      id: number;
      inputValue:string 
     
    };


export type addTaskProps = {
  id?:number;
  setData:React.Dispatch<React.SetStateAction<Task[]>>;
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  data:Task[],
 
   
}    