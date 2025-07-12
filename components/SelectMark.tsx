import React from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native';




function SelectMark({setTickStyle,tickStyle}: {setTickStyle:React.Dispatch<React.SetStateAction<string>>,tickStyle:string}) {
  return (
    <View style={{alignItems:'center',marginVertical:10}}>
  <Text style={{marginVertical:10,fontSize:10,color:'white',textAlign:'center'}}>Select Mark Style</Text>
<TextInput
  style={styles.input}
  value={tickStyle}
  onChangeText={(text) => {
    if (text.length <= 2) {
      setTickStyle(text);
    }
  }}

  maxLength={2}
/>

                    </View>
  )
}


const styles = StyleSheet.create({
      input: {
    borderWidth: 1,
    borderColor: '#888',
    borderRadius: 8,
    padding: 5,
    fontSize: 14,
    backgroundColor: '#fff',
    width:'15%',
    textAlign:'center'
  },
})

export default SelectMark
