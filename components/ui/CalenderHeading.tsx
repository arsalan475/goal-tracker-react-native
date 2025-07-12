import React, { ReactNode } from 'react'
import { StyleSheet, Text } from 'react-native'

function CalenderHeading({children}:{children:ReactNode}) {
  return (
   <Text style={[
               styles.heading,
               {
                 fontSize: 18,
                 color: '#fff',
                 fontWeight: 'bold',
                 backgroundColor: '#124',
                 padding: 10 
               }
               ]}>{children}</Text>
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
export default CalenderHeading
