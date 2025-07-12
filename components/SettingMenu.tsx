// components/SettingsMenu.tsx
import React, { useEffect, useState } from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  Switch,
  Text,
  View,
  Platform,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { Link } from 'expo-router';
import { getData, storeData } from '@/utils';

type Props = {
  showStats: boolean;
  setShowStats: (value: boolean) => void;
  restriction: boolean;
  setRestriction: (value: boolean) => void;
  id:string | string[]
};

const SettingsMenu: React.FC<Props> = ({
  showStats,
  setShowStats,
  restriction,
  setRestriction,
  id
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  




  useEffect(function(){
    async function loadData(){
 try {
      const saved = await getData('settings.json');  
      // const saved = await AsyncStorage.getItem('settings.json');  
      if (saved) {
        
setShowStats(saved?.showStats ?? true);
setRestriction(saved?.restriction ?? false);
      }
    } catch (e) {
      console.error('Error loading data:', e);
    }
    }

    loadData()
  },[])
  return (
    <View style={{ position: 'absolute', top: 20, right: 20 ,zIndex:1000}}>
      {/* ⚙️ Gear Icon */}
      <Pressable onPress={() => setModalVisible(true)}>
        <MaterialIcons name="settings" size={28} color="#fff" />
      </Pressable>

      {/* 🛠 Settings Modal */}
      <Modal
        transparent
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable style={styles.backdrop} onPress={() => setModalVisible(false)}>
          <View style={styles.card}>
            <Text style={styles.heading}>⚙️ Settings</Text>

            {/* 🔘 Toggle Stats */}
            <View style={styles.row}>
              <Text style={styles.label}>Show Stats</Text>
              <Switch
                value={showStats}
                onValueChange={async (value) => {
                    setShowStats(value)
                    try {
            
          //    const jsonValue = JSON.stringify({ showStats:value, restriction});
          // await AsyncStorage.setItem('settings.json', jsonValue);
            await storeData('settings.json', { showStats:value, restriction})
        } catch (error) {
            console.error('Error storing data:', error);
        }
                } }
                thumbColor={Platform.OS === 'android' ? '#fff' : undefined}
                trackColor={{ false: '#555', true: '#22c55e' }}
              />
            </View>

            {/* 🔘 Toggle Restriction */}
            <View style={styles.row}>
              <Text style={styles.label}>Restriction</Text>
              <Switch
                value={restriction}
                onValueChange={async (value) => {
                    setRestriction(value)
                    try {
            
          //    const jsonValue = JSON.stringify({ showStats, restriction : value});
          // await AsyncStorage.setItem('settings.json', jsonValue);


                      await storeData('settings.json', { showStats, restriction : value})

            
        } catch (error) {
            console.error('Error storing data:', error);
        }
                } }
                thumbColor={Platform.OS === 'android' ? '#fff' : undefined}
                trackColor={{ false: '#555', true: '#eab308' }}
              />
            </View>

            {/* 🧭 Navigate to Badges */}
            {id && <Link style={styles.badgeButton} href={{pathname:'/(Home)/calender/badges/[id]',params:{id:id.toString()}}}  asChild > 
            
            <Pressable
              
              onPress={() => {
               
                setModalVisible(false);
              }}
            >
          <Text style={styles.badgeText}>🎖 View Badges</Text>
            </Pressable>
    </Link>
}
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

export default SettingsMenu;

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  card: {
    backgroundColor: '#1f2937',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: -4 },
    elevation: 10,
  },
  heading: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    color: '#f3f4f6',
  },
  badgeButton: {
    marginTop: 20,
    backgroundColor: '#2563eb',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    textAlign:'center'
  },
  badgeText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
