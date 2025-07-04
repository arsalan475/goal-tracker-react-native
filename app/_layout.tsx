import { LinearGradient } from 'expo-linear-gradient'
import { Slot } from 'expo-router'
import React from 'react'
import {  StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'


function RootLayout() {
  return (
    <SafeAreaView style={styles.container}>
      
<LinearGradient 
colors={['#0f172a', '#1e293b']}
start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
style={styles.contentContainer}
>

   
      
        <Slot />
      
</LinearGradient>
    </SafeAreaView>
  )
}

// const {height} = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:'100%',
    backgroundColor:'#0f172a',
    // justifyContent:'center',
    alignItems:'center'
  },
 
  
  contentContainer: {
    flex: 1,
    width:'100%',
    alignItems:'center',
    height:'100%',
    padding:20
    // padding: 20,
  },
})

export default RootLayout
