import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { View } from 'react-native-animatable'

function PrviousAndNextBtn({type,setMonth}:{type:string,setMonth:React.Dispatch<React.SetStateAction<number>>}) {
  return (
            <TouchableOpacity style={styles.calendarButton} onPress={type === 'Previous' ? ()=> {
              setMonth((prv)=> prv - 1)
              }
            :

             () => {
              setMonth((prv)=> prv + 1)
              }

            }>
              <Text style={styles.calendarButtonText}>{type === 'Previous' ? 'Previous' : 'Next'}</Text>
            </TouchableOpacity>
            
           

            
          
  )
}



const styles = StyleSheet.create({
     calendarButton: {
      backgroundColor: '#4f46e5',
      borderRadius: 8,
      paddingVertical: 5,
      paddingHorizontal: 20,
      marginHorizontal: 8,
    },
    calendarButtonText: {
      color: 'white',
      textAlign: 'center',
      fontWeight: '600',
    },
})
export default PrviousAndNextBtn
