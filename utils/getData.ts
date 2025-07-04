import AsyncStorage from "@react-native-async-storage/async-storage";

   export const getData = async (key:string) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      if (jsonValue) {
        return JSON.parse(jsonValue)

      }
    } catch (e) {
      console.error('Error loading data:', e);
    }
  };