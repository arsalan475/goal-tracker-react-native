import { StyleSheet, View, Pressable, Text } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link } from 'expo-router';

type Props = {
  label: string;
  theme?: string;
  onPress? : (id?:number) => void;
  id?:number
  
};

export default function ButtonMain({ label, theme,onPress,id }: Props) {
  if (theme === 'primary') {
    return (
      <View
    //     style={[
    //       styles.buttonContainer,
    //       { borderWidth: 4, borderColor: '#ffd33d', borderRadius: 18 ,width: 200,
    // height: 50,},

     style={[
          styles.buttonContainer,
          {width:'100%', justifyContent: 'center', alignItems: 'center' },
        ]}>
        <Pressable
          // style={[styles.button, { backgroundColor: '#fff' }]}
          // onPress={()=> onPress && onPress(id)}>
          style={[styles.button, {borderRadius: 8,borderWidth:2,borderColor:'#f4f4f4'  }]}
          onPress={()=> onPress && onPress(id)}>
          <FontAwesome name="picture-o" size={18} color="#25292e" style={styles.buttonIcon} />
          {/* <Text style={[styles.buttonLabel, { color: '#25292e' }]}>{label}</Text> */}
          <Text style={[styles.buttonLabel, { color: '#f7f7f7' }]}>{label}</Text>
        </Pressable>
      </View>
    );
  }

  if(theme === 'deleteButton') { 
    return (
    // <View style={[styles.buttonContainer]}>
    //   <Pressable style={styles.button} onPress={()=> onPress && onPress(id)}>

    // <Text  style={styles.buttonLabel}>{label}</Text>

    //               <FontAwesome name="trash" size={18} color="#25292e" style={styles.buttonIcon} />
    //   </Pressable>
    // </View>
      <View style={[styles.buttonContainer]}>
          <Pressable style={[styles.button,{backgroundColor:'orangered'}]} onPress={()=> onPress && onPress(id)}>
    
        <Text  style={styles.buttonLabel}>{label}</Text>
    
                      <FontAwesome name="trash" size={18} color="#f7f7f7" style={styles.buttonIcon} />
          </Pressable>
        </View>
  )
}

  return (
    <View style={styles.buttonContainer}>
      <Pressable style={styles.button} onPress={()=> onPress && onPress(id)}>

    {
    id &&   <Link href={{pathname:'/(Home)/[id]',params:{id:id.toString()}}} style={styles.buttonLabel}>{label}</Link>

    }

    <FontAwesome name="archive" size={18} color="#333" style={styles.buttonIcon} />
      </Pressable>
    </View>
  );

  
}

const styles = StyleSheet.create({
  buttonContainer: {
    display:'flex',
    width: 130,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  button: {
    borderRadius: 10,
    borderWidth: 2,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    // padding:5,
    backgroundColor:'white'
  },
  buttonIcon: {
    paddingLeft: 10,
  },
  buttonLabel: {
    color: '#333',
    fontSize: 10,
    fontWeight: 'bold',
  },
});
