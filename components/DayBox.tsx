import { isCommented, isCompleted, isPast, isToday } from '@/utils/dayChecker'
import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { Dimensions, StyleSheet, Text } from 'react-native'
import { startMapper } from 'react-native-reanimated'


 type streakProp={  
        [key:string]:{
          completed:boolean;
          id:number;
          emoji?:string;
          comment?:string,
        }
      }


      type dayBoxProp = {
        streak:streakProp[],
        day:number,
        month:number,
        date:string,
        id:string | string[]
      }


function DayBox({streak,day,month,date,id}:dayBoxProp) {
  return (
   <LinearGradient colors={

                    
                       isToday(day,month )&& isCompleted(date,streak,id).ok ? ['blue','#129'] :
                       isToday(day,month) ? ['#facc15','yellow']:
   
                       isPast(day,month) && isCompleted(date,streak,id).ok ? ['cyan','skyblue'] :
                       
                       ['#4a5568', '#2d3748']
                       
                       }
                       start={{ x: 0, y: 0 }}
                       end={{ x: 1, y: 1 }}
                       
    style={[
       styles.dayBox,
       isCommented(date,streak,id) && {borderBottomWidth:1,borderColor:'white',padding:4,shadowOffset:{width:0,height:2},shadowColor: '#fff',
    shadowOpacity: 0.5,},
       // isToday(day,month) && styles.todayBox,
       // isCompleted(date,id) && styles.completedBox,
       isPast(day,month) && !isCompleted(date,streak,id).ok && styles.pastBox,
     ]}
                       >
   
                     <Text style={[
                       styles.day,
                       
                       isToday(day,month) && !isCompleted(date,streak,id).ok ? {color:'black'} : {color:'white'}
                       
                     ]}>
                       {day}{isCompleted(date,streak,id).ok && ` ${isCompleted(date,streak,id).emoji}`}
                       </Text>
                       </LinearGradient>
  )
}

const { width} = Dimensions.get('window');
 const boxSize = width / 7;
const boxWidth =  boxSize - 10
const styles = StyleSheet.create({
      dayBox:{
      width:boxWidth,
      color:'white',
      backgroundColor:'#124',
      margin:2,
      textAlign:'center',
      padding:5,
      borderRadius:4

    },

  day:{
      color:'#f7f7f7',
      textAlign:'center',
          fontWeight: "600",

fontSize:12
  },
  pastBox: {
    opacity: 0.55,
    backgroundColor: "#2d3748",
  },
})

export default DayBox
