import React, { useState } from "react";
import { StyleSheet, KeyboardAvoidingView, Platform, View,Text, Dimensions } from "react-native";
import '../global.css'


import { useLoadTasks } from "@/hooks/loadTask";
import { FlatListComponent, InputHandler } from "@/components";
import { Task } from "@/Types/task";
import ToggleSwitch from "@/components/ui/ToggleSwitch";






export default function HomeRoot() {
  const [inputValue, setInputValue] = useState("");
  const [data,setData] = useState<Task[]>([]);
  const [documentId,setDocumentId] = useState<string>('')
  const [isEnabled, setIsEnabled] = useState<boolean>(false);

  useLoadTasks(isEnabled?'todos':'data',setData);

const keyboardBehavior = Platform.OS === 'ios' ? 'padding' : undefined;

  return (
    
    <KeyboardAvoidingView
      behavior={keyboardBehavior}
      style={styles.container}
    >
       <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>{isEnabled ? 'Todo App' :'Goal Tracker'}</Text>
          </View>


      <InputHandler
        inputValue={inputValue}
        setInputValue={setInputValue}
        setData={setData}
        data={data}
        isEnabled={isEnabled}
      />

    
    
      <FlatListComponent data={data} setData={setData} setId={setDocumentId} isEnabled={isEnabled}/>
    
      <View style={styles.container1}>
     
      <ToggleSwitch
        value={isEnabled}
        onToggle={() => setIsEnabled(prev => !prev)}
        size={30}
        onColor="#fff"
        offColor="#333"
        thumbColor="#fff"
      />
    </View>
    
    </KeyboardAvoidingView>
    
  )
}

const {width} = Dimensions.get('window')

const  screen = width > 800 ? '50%' : '100%'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    width:screen,
    
    // backgroundColor:'black'
  },
   headerContainer: {
    
    height: 50,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width:'100%'
  },



  
  container1: {
  padding:10,
    backgroundColor: '#0f172a',
    borderRadius:10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    marginBottom: 10,
    fontWeight:700,
    color: '#f7f7f7',
  },
  headerTitle: {
    color: '#fff',
    fontWeight:'bold',
    fontSize: 24,
    letterSpacing: 2,
  },
});
