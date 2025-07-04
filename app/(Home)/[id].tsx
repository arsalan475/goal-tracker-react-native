  // import CopyBox from '@/components/CopyBox';
import { getData, storeData } from '@/utils';
import getLongestStreak from '@/utils/getLongestStreak';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Dimensions,StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { loadQuotes } from '@/utils/quotes'; // ✅ New



  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];


      type streakProp={  
        [key:string]:{
          completed:boolean;
          id:number;
        }
      }


      type dataProp = {id:number;inputValue:string}
      
  const Calendar = () => {
const { id} = useLocalSearchParams();
const [streak,setStreak] = useState<streakProp[]>([]);



const [streakStats, setStreakStats] = useState({
  longestStreak: 0,
  currentStreak:0,
  lastLongest:[0]
});

const [restriction,setRestriction] = useState<boolean>(false)

const [quote, setQuote] = useState<string>('');


const [month,setMonth] = useState<number>(new Date().getMonth());
  const [currentGoalData,setCurrentGoalData] = useState<dataProp[]>([])
  function getDateByMonth(month:number,day?:number){
    const year = new Date().getFullYear();

    if(day) return new Date(year,month,day)
    return new Date(year,month+1,0)
  }

useEffect(() => {
  (async () => {
    const quotes = await loadQuotes();
    const random = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(random);
  })();
}, []);


    useEffect(()=>{

      async function loadData(){
        const data = await getData('streaks')
        const goalData = await getData('data')
        setCurrentGoalData(goalData)
  
      setStreak(data||[])

          const { longestStreak , currentStreak ,lastLongest } = getLongestStreak(data || [], id.toString());
    setStreakStats({ longestStreak ,currentStreak,lastLongest });


      setCurrentGoalData((currentGoalData) => currentGoalData?.filter((item:dataProp) => item.id === +id))
      }

      loadData()
    },[id])


  




    const today = new Date()
    const totalDays = getDateByMonth(month).getDate()
    const currentMonthName = monthNames[getDateByMonth(month).getMonth()]


    const isToday = (day: number) => {
    const date = getDateByMonth(month, day);
    return date.toDateString() === today.toDateString();
  };
      function isCompleted(date: string) {
    const entry = streak?.find((item) => item[date] && item[date].id === +id);
    return entry && entry[date]?.completed;
  }
    ;
 const isPast = (day: number) => {
    const targetDate = getDateByMonth(month, day);
    return targetDate < today && !isToday(day);
  };    

     const firstDayOfMonth = getDateByMonth(month, 1).getDay()
              

    return (
        <View 
        style={
           styles.body
        }
        >
          <View style={{
  padding: 12,
  marginVertical: 12,
  marginHorizontal: 4,
  backgroundColor: '#1e293b',
  borderRadius: 10
}}>
  <Text style={{ color: '#fef', fontStyle: 'italic', textAlign: 'center', fontSize: 16,fontWeight:'bold' }}>
    “{quote}”
  </Text>
</View>

          <Text style={[
            styles.heading,
            {
              fontSize: 18,
              color: '#fff',
              fontWeight: 'bold',
              backgroundColor: '#124',
              padding: 10 
            }
            ]}>{currentMonthName}</Text>
          <Text className='font-semibold' style={[styles.heading,{fontSize:10,color:'#124',fontWeight:'bold',backgroundColor:'#fff',padding:5,borderRadius:10}]}>{currentGoalData[0]?.inputValue}</Text>



          {/* Days of week */}
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
              <View 
                      style={styles.dayContainer}         
              
              >
                 {Array.from({ length: firstDayOfMonth }).map((_, index) => (
                          <View key={`empty-${index}`} style={[styles.dayBox,{opacity:0}]}></View>
                        ))}
            {/* Calendar days */}
            {[...Array(totalDays)].map((_, index) => {
              const day = index + 1;
          
              let date : string = getDateByMonth(month,day).toLocaleDateString()

           

              return (
                <TouchableOpacity 
 

  key={index}

    
                 onPress={async () => {

                  if(!isToday(day) && restriction) return
  const clickedDate = getDateByMonth(month, day).toLocaleDateString();

  const existingEntryIndex = streak.findIndex(
    (item) => item[clickedDate] && item[clickedDate].id === +id
  );

  let updatedStreak;

  if (existingEntryIndex !== -1) {
    updatedStreak = [...streak];
    updatedStreak[existingEntryIndex][clickedDate].completed =
      !updatedStreak[existingEntryIndex][clickedDate].completed;
  } else {
    const newEntry: streakProp = {
      [clickedDate]: {
        completed: true,
        id: +id,
      },
    };
    updatedStreak = [...streak, newEntry];
  }

  setStreak(updatedStreak);
  storeData("streaks", updatedStreak);

  const { longestStreak,currentStreak ,lastLongest} = getLongestStreak(updatedStreak, id.toString());
  setStreakStats({ longestStreak,currentStreak,lastLongest });
}}
>
                    <LinearGradient colors={
                    
                    isToday(day)&& isCompleted(date) ? ['blue','#129'] :
                    isToday(day) ? ['#facc15','yellow']:

                    isPast(day) && isCompleted(date) ? ['cyan','skyblue'] :
                    
                    ['#4a5568', '#2d3748']
                    
                    }
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    
 style={[
    styles.dayBox,
    // isToday(day) && styles.todayBox,
    // isCompleted(date) && styles.completedBox,
    isPast(day) && !isCompleted(date) && styles.pastBox,
  ]}
                    >

                  <Text style={[
                    styles.day,
                    isToday(day) && !isCompleted(date) ? {color:'black'} : {color:'white'}
                    
                  ]}>
                    {day}{isCompleted(date) && ' ✔'}
                    </Text>
                    </LinearGradient>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Buttons */}
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 24 }}>
            <TouchableOpacity style={styles.calendarButton} onPress={()=> {
              setMonth((prv)=> prv - 1)
              }}>
              <Text style={styles.calendarButtonText}>Previous</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.calendarButton} 
              onPress={()=> {
        
              setMonth((prv)=> prv + 1)
              }}
            >
              <Text style={styles.calendarButtonText}>Next</Text>
            </TouchableOpacity>

            
          
          </View>
{/* 
          <View>
            <CopyBox content={JSON.stringify(streak)}/>
          </View> */}
          
<View style={{ marginVertical: 10, padding: 10, backgroundColor: "#1e293b", borderRadius: 10 }}>
  <Text style={{ color: "#60a5fa", fontWeight: "bold", fontSize: 14 }}>
    🏆 Longest Streak: <Text style={{ color: "white" }}>{streakStats.longestStreak} days</Text>
  </Text>
  <Text style={{ color: "#60a5fa", fontWeight: "bold", fontSize: 14 }}>
    🔥 Current Streak: <Text style={{ color: "white" }}>{streakStats.currentStreak} days</Text>
  </Text>
  <Text style={{ color: "#60a5fa", fontWeight: "bold", fontSize: 14 }}>
    💀 Last Longest Streak: <Text style={{ color: "white" }}>{streakStats.lastLongest[streakStats.lastLongest.length -2]} days</Text>
  </Text>
</View>

   <TouchableOpacity style={styles.calendarButton} 
              onPress={()=> {
        
              setRestriction((prv) => !prv)
              }}
            >
              <Text style={styles.calendarButtonText}>{restriction ? 'Restriction Off' : 'Restriction On'}</Text>
            </TouchableOpacity>
        </View>
    );
  };

  const { width} = Dimensions.get('window');
  const boxSize = width / 7;
  
  const boxWidth =  boxSize - 10
  const styles = StyleSheet.create({
    body: {
      flexGrow: 1,
      paddingVertical: 12,
      paddingHorizontal: 0, 
      width: '100%',
      
      padding:10,
    
        },
  
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
  
  dayContainer:{
    flexDirection:'row',
    flexWrap:'wrap',
    alignItems:'center',
    width:'100%',
      backgroundColor:'#0f172e',
      borderRadius:5,
      borderWidth:1,
      borderColor:'#f7f7f7',
      },
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

  dayText:{
      color:'black'
  },

   todayBox: {
    backgroundColor: "#facc15",
  },
  completedBox: {
    backgroundColor: "#10b981",
    
  },
  pastBox: {
    opacity: 0.55,
    backgroundColor:'#2d3748'
  },
    heading: {
      fontSize: 28,
      textAlign: 'center',
      marginBottom: 20,
      color: '#60a5fa',
    },
    gridRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 8,
      color:'red'
    },
    
  
   
    buttonRow: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 20,
    },
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
  });
  

  export default Calendar;
