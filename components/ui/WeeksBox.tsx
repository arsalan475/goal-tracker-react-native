import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { Dimensions, StyleSheet, Text } from 'react-native';


 const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function WeeksBox() {
  return (
   <LinearGradient
  
            colors={['white','#999']}
            style={
              styles.headerContainer
            }
            >
              {daysOfWeek.map((day, index) => (
            
                <Text  key={index} style={[styles.header,{color:'white',textAlign:'center'}]}>
                  {day}
                </Text>
              ))}
  
                </LinearGradient>
  )
}


const { width} = Dimensions.get('window');
  const boxSize = width / 7;
  
  const boxWidth =  boxSize - 10


const styles = StyleSheet.create({

 headerContainer:{
    // backgroundColor:'#f7f7f7',++
    borderRadius:5,
    flexDirection:'row',
    marginBottom:3
  },

       header: {
      color: '#fff',
      backgroundColor:'#0f172e',
      borderRadius:10,
      fontWeight: 'bold',
      fontSize: 12,
      textAlign: 'center',
      width: boxWidth,
      margin:2,
      padding:5
    },
})

export default WeeksBox
