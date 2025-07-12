// import { useEffect } from 'react';
// import { getData } from '@/utils';
// import { Task } from '@/Types/task';

// export const useLoadTasks = (key:string,setData: React.Dispatch<React.SetStateAction<Task[]>>) => {
//   useEffect(() => {
//     async function loadData() {
//       const data = await getData(key);
//       setData(() => data ?? [] );
//       // console.log(data)
//     }
//     loadData();
//   }, [setData,key]);
// };


import { useEffect, useState } from 'react';
import { getData } from '@/utils';
import { Task } from '@/Types/task';

type UseLoadTasksResult = {
  loading: boolean;
};

export const useLoadTasks = (
  key: string,
  setData: React.Dispatch<React.SetStateAction<Task[]>>
): UseLoadTasksResult => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        const data = await getData(key);
        if (isMounted) {
          setData(() => data ?? []);
          setLoading(false);
        }
      } catch (err) {
        console.error(`Error loading data from key "${key}":`, err);
        if (isMounted) {
          setData([]);
          setLoading(false);
        }
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, [key, setData]);

  return { loading };
};
