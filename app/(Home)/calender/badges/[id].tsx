import BadgeList from '@/components/BadgeList';
// import ImportExportScreen from '@/components/DataExportScreen';
import { getData } from '@/utils';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react'
import { View } from 'react-native'



type streakProp={  
        [key:string]:{
          completed:boolean;
          id:number;
          emoji?:string;
          comment?:string,
        }
      }
function Badges() {

const { id} = useLocalSearchParams();

const [streak,setStreak] = useState<streakProp[]>([]);

    useEffect(()=>{

      async function loadData(){
        const data = await getData('streaks')
    
        
  
      setStreak(data||[])

      }

      loadData()
    },[id])






  return (
    <View>
      <BadgeList streakArray={streak} docId={String(id)}/>
      {/* <ImportExportScreen/> */}
    </View>
  )
}

export default Badges
