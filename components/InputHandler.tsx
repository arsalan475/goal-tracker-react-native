import React from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import ButtonMain from './Button'
import { addTaskProps } from '@/Types/task'
import { addTask } from '@/utils'

export function InputHandler({inputValue,setInputValue,setData,data,isEnabled}:addTaskProps) {
  return (

     <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputValue}
          onChangeText={setInputValue}
          placeholder="Add a task"
        />
        <ButtonMain label="Add Task" theme='primary' onPress={()=> addTask({inputValue,setInputValue,setData,data,isEnabled})} />
      </View>
  )
}


const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'column',
    gap: 10,
    marginBottom: 20,
  },
 
       input: {
    borderWidth: 1,
    borderColor: '#888',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
 
});



