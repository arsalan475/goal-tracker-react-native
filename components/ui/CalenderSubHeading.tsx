import React, { ReactNode } from 'react'
import { StyleSheet, Text } from 'react-native'

function CalenderSubHeading({children}:{children:ReactNode}) {
  return (
     <Text className='font-semibold' style={[styles.heading,{fontSize:10,color:'#124',fontWeight:'bold',backgroundColor:'#fff',padding:5,borderRadius:10}]}>{children}</Text>
  )
}


const styles = StyleSheet.create({
heading: {
      fontSize: 28,
      textAlign: 'center',
      marginBottom: 20,
      color: '#60a5fa',
    },
})
export default CalenderSubHeading