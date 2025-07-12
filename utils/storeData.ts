// import { Task } from "@/Types/task";
// import AsyncStorage from "@react-native-async-storage/async-storage";



//      type streakProp={  
//       [key:string]:{
//         completed:boolean;
//         id:number;
//       }
//     }
// export const storeData = async (key:string,tasks: Task[] | string | number | streakProp[]) => {

//   // const checkType = (typeof tasks) === 'string

//     try {
//       const jsonValue = JSON.stringify(tasks);
//       await AsyncStorage.setItem(key, jsonValue);
//     } catch (e) {
//       console.error('Error storing data:', e);
//     }
//   };

// utils/fileStore.ts
// utils/storeData.ts
// import { Platform } from 'react-native';
// import * as FileSystem from 'expo-file-system';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Task } from '@/Types/task';

// type StreakProp = {
//   [key: string]: {
//     completed: boolean;
//     id: number;
//   };
// };

// const isWeb = Platform.OS === 'web';
// const getFileUri = (key: string) => `${FileSystem.documentDirectory}${key}.json`;

// export const storeData = async (
//   key: string,
//   data: Task[] | string | number | StreakProp[]
// ) => {
//   try {
//     const jsonValue = JSON.stringify(data);

//     if (isWeb) {
//       await AsyncStorage.setItem(key, jsonValue);
//     } else {
//       await FileSystem.writeAsStringAsync(getFileUri(key), jsonValue);
//     }
//   } catch (e) {
//     console.error('Error storing data:', e);
//   }
// };


import * as FileSystem from 'expo-file-system';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

let idb: typeof import('idb-keyval') | null = null;

// Lazy load only on web
if (Platform.OS === 'web') {
  import('idb-keyval').then((mod) => {
    idb = mod;
  });
}

export const storeData = async (key: string, value: any) => {
  const json = JSON.stringify(value);

  if (Platform.OS === 'web' && idb) {
    await idb.set(key, json);
  } else {
    const path = `${FileSystem.documentDirectory}${key}.json`;
    await FileSystem.writeAsStringAsync(path, json);
  }
};