import { useEffect } from 'react';
import { getData } from '@/utils';
import { Task } from '@/Types/task';

export const useLoadTasks = (key:string,setData: React.Dispatch<React.SetStateAction<Task[]>>) => {
  useEffect(() => {
    async function loadData() {
      const data = await getData(key);
      setData(() => data ?? [] );
      // console.log(data)
    }
    loadData();
  }, [setData,key]);
};
