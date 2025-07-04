import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import ButtonMain from './Button'
import { deleteTask } from '@/utils/deleteTask'

import { Task } from '@/Types/task';
import { LinearGradient } from 'expo-linear-gradient';
import { updateTodo } from '@/utils/updateTods';
// import PrioritySelector from "@/components/PriorityComponent";

import { Priority } from '../Types/priority'
import PrioritySelector from './PriorityComponent';

export type renderTaskProps = {
  id:number;
  setData:React.Dispatch<React.SetStateAction<Task[]>>;
  data:Task[]
  setId:React.Dispatch<React.SetStateAction<string>>;
  isEnabled:boolean,
  index:number
  priority:Priority,
  setPriority:React.Dispatch<React.SetStateAction<Priority>>;
}    


function RenderItem({index,id,data,setData,isEnabled,priority,setPriority}:renderTaskProps) {
  return (
    // ,priority,setPriority
    <LinearGradient colors={['#4a5568', '#2d3748']}
           start={{ x: 0, y: 0 }}
           end={{ x: 1, y: 1 }}
style={styles.taskItem}  
           >
      
    

          <Text style={
            [data[index].isCompleted && {textDecorationLine:'line-through'},{
              color:'#fff',borderBottomWidth:1,borderBottomColor:'#fff',padding:5
              }]}>
            {data[index].inputValue} {data[index].isCompleted && ' ✔'}
            </Text>
          <View style={styles.buttonRow}>
          {isEnabled ?
          <>
                            <PrioritySelector 
                            selected={priority} onChange={setPriority} id={id}
                            data={data} setData={setData} 
                            />

           <ButtonMain label='Completed'  background='#0f172a'  theme='deleteButton' id={id} onPress={()=> updateTodo({id,data,setData,isEnabled})}/>
          </>
          :

            <ButtonMain label='Set Streak'  id={id} />
          }
           <ButtonMain label={isEnabled?'Delete':'Delete Task'} background='#ef4444' theme='deleteButton' id={id} isEnabled={isEnabled} onPress={()=> deleteTask({id,data,setData,isEnabled})}/>


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
