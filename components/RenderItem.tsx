// import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import ButtonMain from './Button'
import { deleteTask } from '@/utils/deleteTask'

import { Task } from '@/Types/task';
import { LinearGradient } from 'expo-linear-gradient';
export type renderTaskProps = {
  id:number;
  setData:React.Dispatch<React.SetStateAction<Task[]>>;
  data:Task[]
  setId:React.Dispatch<React.SetStateAction<string>>;
  index:number
}    


function RenderItem({index,id,data,setData}:renderTaskProps) {
  return (
    // ,priority,setPriority
    <LinearGradient colors={['#4a5568', '#2d3748']}
           start={{ x: 0, y: 0 }}
           end={{ x: 1, y: 1 }}
style={styles.taskItem}  
           >
      
    

          <Text style={
            [{
              color:'#fff',borderBottomWidth:1,borderBottomColor:'#fff',padding:5
              }]}
              >
            {data[index].inputValue} {data[index].isCompleted && ' ✔'}
            </Text>
          <View style={styles.buttonRow}>
        
          

            <ButtonMain label='Set Streak'  id={id} />
          
           <ButtonMain label={'Delete Task'} background='#ef4444' theme='deleteButton' id={id} onPress={()=> deleteTask({id,data,setData})}/>


          </View>
    </LinearGradient>
        // </View>
      
  )
}


const styles = StyleSheet.create({

  taskItem: {
    // backgroundColor: '#eee',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    // borderWidth:1,
    // borderColor:'#126'
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems:'center',
    gap: 5,
    marginTop: 10,
  },
})
export default RenderItem
