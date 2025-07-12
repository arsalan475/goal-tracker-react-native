// import AsyncStorage from '@react-native-async-storage/async-storage';

// export const getSeenBadgeIds = async (docId: string): Promise<number[]> => {
//   const key = `seen_badges_${docId}`;
//   const json = await AsyncStorage.getItem(key);
//   return json ? JSON.parse(json) : [];
// };

// export const addSeenBadgeId = async (docId: string, badgeId: number) => {
//   const existing = await getSeenBadgeIds(docId);
//   if (!existing.includes(badgeId)) {
//     const updated = [...existing, badgeId];
//     await AsyncStorage.setItem(`seen_badges_${docId}`, JSON.stringify(updated));
//   }
// };


// utils/badgeStorage.ts
import { Platform } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { get as idbGet, set as idbSet ,del} from 'idb-keyval';

const isWeb = Platform.OS === 'web';
const getFileUri = (key: string) => `${FileSystem.documentDirectory}${key}.json`;

export const getSeenBadgeIds = async (docId: string): Promise<number[]> => {
  const key = `seen_badges_${docId}`;

  try {
    if (isWeb) {
      const json = await idbGet(key);
      return json ? JSON.parse(json) : [];
    } else {
      const path = getFileUri(key);
      const file = await FileSystem.getInfoAsync(path);
      if (!file.exists) return [];

      const content = await FileSystem.readAsStringAsync(path);
      return content ? JSON.parse(content) : [];
    }
  } catch (err) {
    console.error('Error reading seen badges:', err);
    return [];
  }
};

export const addSeenBadgeId = async (docId: string, badgeId: number) => {
  const key = `seen_badges_${docId}`;
  const existing = await getSeenBadgeIds(docId);

  if (!existing.includes(badgeId)) {
    const updated = [...existing, badgeId];
    const json = JSON.stringify(updated);

    try {
      if (isWeb) {
        await idbSet(key, json);
      } else {
        await FileSystem.writeAsStringAsync(getFileUri(key), json);
      }
    } catch (err) {
      console.error('Error writing seen badge:', err);
    }
  }
};



export const delSeenBadgeId = async (docId: string) => {
  const key = `seen_badges_${docId}`;
  // if (!existing.includes(badgeId)) {
  //   const updated = [...existing, badgeId];
  //   const json = JSON.stringify(updated);

    try {
      if (isWeb) {
        await del(key);
      } else {
        await FileSystem.deleteAsync(getFileUri(key));
      }
    } catch (err) {
      console.error('Error writing seen badge:', err);
    }
  }

