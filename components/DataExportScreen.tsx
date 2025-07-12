// import React, { useState } from 'react';
// import { View, Text, Button, Platform, StyleSheet, Alert, ScrollView } from 'react-native';
// import * as FileSystem from 'expo-file-system';
// import * as DocumentPicker from 'expo-document-picker';
// import * as Sharing from 'expo-sharing';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { encode as btoa, decode as atob } from 'base-64';

// const isWeb = Platform.OS === 'web';

// async function getAllStoredKeys(): Promise<string[]> {
//   if (isWeb) {
//     return await AsyncStorage.getAllKeys();
//   } else {
//     const files = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory!);
//     return files.map(file => file.replace('.json', ''));
//   }
// }

// async function getStoredData(key: string): Promise<any> {
//   if (isWeb) {
//     const json = await AsyncStorage.getItem(key);
//     return json ? JSON.parse(json) : null;
//   } else {
//     const filePath = `${FileSystem.documentDirectory}${key}.json`;
//     const file = await FileSystem.getInfoAsync(filePath);
//     if (!file.exists) return null;
//     const content = await FileSystem.readAsStringAsync(filePath);
//     return JSON.parse(content);
//   }
// }

// async function exportAllData() {
//   const keys = await getAllStoredKeys();
//   const data: Record<string, any> = {};

//   for (const key of keys) {
//     const value = await getStoredData(key);
//     data[key] = value;
//   }

//   const json = JSON.stringify(data, null, 2);

//   if (isWeb) {
//     const blob = new Blob([json], { type: 'application/json' });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = 'backup.json';
//     a.click();
//     URL.revokeObjectURL(url);
//   } else {
//     const path = `${FileSystem.documentDirectory}backup.json`;
//     await FileSystem.writeAsStringAsync(path, json);
//     Sharing.shareAsync(path);
//   }
// }

// async function importData() {
//   const result = await DocumentPicker.getDocumentAsync({ type: 'application/json' });
//   if (result.canceled) return;

//   const fileUri = result.assets?.[0].uri;
//   if (!fileUri) return;

//   const content = await FileSystem.readAsStringAsync(fileUri);
//   const parsed = JSON.parse(content);

//   for (const key in parsed) {
//     const value = JSON.stringify(parsed[key]);
//     if (isWeb) {
//       await AsyncStorage.setItem(key, value);
//     } else {
//       await FileSystem.writeAsStringAsync(`${FileSystem.documentDirectory}${key}.json`, value);
//     }
//   }
//   Alert.alert('✅ Success', 'Data imported successfully.');
// }

// export default function ImportExportScreen() {
//   const [loading, setLoading] = useState(false);

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.header}>📁 Backup & Restore</Text>

//       <View style={styles.card}>
//         <Text style={styles.title}>Export All Data</Text>
//         <Button title="Export" onPress={exportAllData} color="#16a34a" />
//       </View>

//       <View style={styles.card}>
//         <Text style={styles.title}>Import Data</Text>
//         <Button title="Import" onPress={importData} color="#3b82f6" />
//       </View>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//     alignItems: 'center',
//     gap: 20,
//     backgroundColor: '#0f172a',
//     flexGrow: 1,
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#fff',
//     marginBottom: 20,
//   },
//   card: {
//     backgroundColor: '#1e293b',
//     borderRadius: 16,
//     padding: 20,
//     width: '100%',
//     maxWidth: 400,
//     shadowColor: '#000',
//     shadowOpacity: 0.3,
//     shadowOffset: { width: 0, height: 6 },
//     shadowRadius: 10,
//     elevation: 6,
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 18,
//     color: '#fff',
//     marginBottom: 12,
//     fontWeight: '600',
//   },
// });
