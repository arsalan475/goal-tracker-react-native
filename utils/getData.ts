// import AsyncStorage from "@react-native-async-storage/async-storage";

//    export const getData = async (key:string) => {
//     try {
//       const jsonValue = await AsyncStorage.getItem(key);
//       if (jsonValue) {
//         return JSON.parse(jsonValue)

//       }
//     } catch (e) {
//       console.error('Error loading data:', e);
//     }
//   };


// utils/getData.ts
// import { Platform } from 'react-native';
// import * as FileSystem from 'expo-file-system';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const isWeb = Platform.OS === 'web';
// const getFileUri = (key: string) => `${FileSystem.documentDirectory}${key}.json`;

// export const getData = async <T = any>(key: string): Promise<T | null> => {
//   try {
//     if (isWeb) {
//       const jsonValue = await AsyncStorage.getItem(key);
//       return jsonValue ? JSON.parse(jsonValue) : null;
//     } else {
//       const fileInfo = await FileSystem.getInfoAsync(getFileUri(key));
//       if (!fileInfo.exists) return null;

//       const content = await FileSystem.readAsStringAsync(getFileUri(key));
//       return JSON.parse(content);
//     }
//   } catch (e) {
//     console.error('Error loading data:', e);
//     return null;
//   }
// };




// utils/hybridStorage.ts
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


export const getData = async (key: string) => {
  if (Platform.OS === 'web' && idb) {
    const json = await idb.get<string>(key);
    return json ? JSON.parse(json) : null;
  } else {
    const path = `${FileSystem.documentDirectory}${key}.json`;
    const fileInfo = await FileSystem.getInfoAsync(path);

    if (!fileInfo.exists) return null;

    const json = await FileSystem.readAsStringAsync(path);
    return json ? JSON.parse(json) : null;
  }
};
