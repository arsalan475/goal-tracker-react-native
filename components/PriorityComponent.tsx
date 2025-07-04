// components/PrioritySelector.tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from 'react-native';
import { Priority } from '../Types/priority';
import { Task } from '@/Types/task';
import { storeData } from '@/utils';
import { LinearGradient } from 'expo-linear-gradient';

interface PrioritySelectorProps {
  selected: Priority;
  onChange: (priority: Priority) => void;
  id: number;
  setData: React.Dispatch<React.SetStateAction<Task[]>>;
  data: Task[];
}

const PrioritySelector: React.FC<PrioritySelectorProps> = ({
  selected,
  onChange,
  id,
  data,
  setData,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleSelect = (priority: Priority) => {
    onChange(priority);
    setModalVisible(false);

    const index = data.findIndex(task => task.id === id);
    if (index === -1) return;

    const updatedData = [...data];
    const updatedTask = { ...updatedData[index] };

    if (priority === 'High') updatedTask.power = 20;
    if (priority === 'Medium') updatedTask.power = 10;
    if (priority === 'Low') updatedTask.power = 5;

    updatedTask.importance = priority;
    updatedData[index] = updatedTask;

    updatedData.sort((a, b) => b.power - a.power);
    setData(updatedData);
    storeData('todos', updatedData);
  };

  const selectedTask = data.find(task => task.id === id);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#4a5568', '#2d3748']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.button}
      >
        <Pressable onPress={() => setModalVisible(true)}>
          <Text style={styles.buttonText}>
            Priority: {selectedTask?.importance ?? 'N/A'}
          </Text>
        </Pressable>
      </LinearGradient>

      <Modal transparent visible={modalVisible} animationType="fade">
        <Pressable style={styles.modalOverlay} onPress={() => setModalVisible(false)}>
          <View style={styles.modalContent}>
            {Object.values(Priority).map(priority => (
              <TouchableOpacity
                key={priority}
                style={[styles.option, selected === priority && styles.selectedOption]}
                onPress={() => handleSelect(priority)}
              >
                <Text style={styles.optionText}>{priority}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

export default PrioritySelector;

const styles = StyleSheet.create({
  container: {},
  button: {
    padding: 3,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#f2f2f2',
    // backgroundColor:'#333'
  },
  buttonText: {
    fontSize: 12,
    color: '#f7f7f7',
    fontWeight: '700',
    paddingHorizontal: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#00000055',
  },
  modalContent: {
    margin: 40,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    elevation: 5,
  },
  option: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  selectedOption: {
    backgroundColor: '#e0f7fa',
  },
  optionText: {
    fontSize: 16,
  },
});
