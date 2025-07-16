import { StyleSheet, View, Pressable, Text, Dimensions, Keyboard, TouchableOpacity } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

type Props = {
  label?: string;
  theme?: string;
  onPress? : (id?:number) => void;
  id?:number,
  background?:string
};

const {width} = Dimensions.get('window')

const  screen = width > 700 ? true : false


export default function ButtonMain({ label, theme,onPress,id ,background}: Props) {

  const router = useRouter()

  if (theme === 'primary') {
    return (
      <View
        style={[
          styles.buttonContainer,
          {width:screen ? 100:'100%', justifyContent: 'center', alignItems: 'center' },
        ]}>
        <Pressable
          style={{width:'100%'}}
          onPress={()=> onPress && onPress(id)}>
          {/* <FontAwesome name="picture-o" size={18} color="#25292e" style={styles.buttonIcon} /> */}

          <LinearGradient colors={['#6366f1', '#4f46e5']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.button, 
            {
              // borderRadius: 8,borderWidth:2,borderColor:'#fff'  ,
                width: '100%',
                backgroundColor:'#0f172a',
    height: '100%',
            }]}
          >

          <Text style={[styles.buttonLabel, { color: '#fff' }]}>{label}</Text>
          </LinearGradient>
        </Pressable>
      </View>
    );
  }

  if(theme === 'deleteButton') { 
    return (
    <View style={[styles.buttonContainer]}>
      <Pressable style={[styles.button,{backgroundColor:background}]} onPress={()=> {
        console.log(id)
        Keyboard.dismiss()
        onPress && onPress(id)}}>

    <Text  style={[styles.buttonLabel,{color:'#fff'}]}>{label}</Text>

             {
              
             background === '#ef4444' && <FontAwesome name="trash" size={14} color="#fff" style={styles.buttonIcon} />
             }
      </Pressable>
    </View>
  )
}

  return (
    <View style={styles.buttonContainer}>

       {
    // id && <Link href={{pathname:'/(Home)/calender/[id]',params:{id:id.toString()}}} >



      <TouchableOpacity style={styles.button}
      onPress={()=> router.push(`/calender/${id}`)}
      >
          <Text style={styles.buttonLabel}>{label}</Text>
                            <FontAwesome name="archive" size={12} color="#fff" style={styles.buttonIcon} />

      </TouchableOpacity>
      // {/* </Link> */}
    }
    
    </View>
  );

  
}

const styles = StyleSheet.create({
  buttonContainer: {
    display:'flex',
    // width: 130,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    
    
 alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius:10,

padding:7,
    backgroundColor:'#0f172a',


  },
  buttonIcon: {
    paddingLeft: 10,
  },
  buttonLabel: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
    
  },
});
