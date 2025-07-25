import { Task } from '@/Types/task'
import React, { useState } from 'react'
import RenderItem from './RenderItem'
import {FlatList } from 'react-native';
import { Priority } from '@/Types/priority';



type props = {
    data: Task[];
    setData: React.Dispatch<React.SetStateAction<Task[]>>
    setId: React.Dispatch<React.SetStateAction<string>>
  
}
export function FlatListComponent({data,setData,setId}:props) {

   

  return (
   <FlatList
           data={data}
           
           keyExtractor={item => item.id.toString()}
          //  renderItem={({item,index}) => RenderItem({ ...item,index,data,setData,setId,isEnabled})}
           renderItem={({item,index}) => RenderItem({ ...item,index,data,setData,setId})}
          //  ListEmptyComponent={<Text style={{ textAlign: 'center',color:'#f7f7f7' }}>No tasks yet.</Text>}
         />
  )
}

