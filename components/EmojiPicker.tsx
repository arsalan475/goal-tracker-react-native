import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React, { PropsWithChildren } from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
  Dimensions,
  
} from 'react-native';

type prop = PropsWithChildren<{
  isVisible: boolean;
  onClose: () => void;
  touchPosition: { x: number; y: number,day:number };
  isLocked:boolean
}>;

function EmojiPicker({ children, isVisible, onClose, touchPosition,isLocked }: prop) {
  const screen = Dimensions.get('window');
  let modalMaxWidth = screen.width * 0.5 ;
  modalMaxWidth = screen.width > 1000 ? 500 : modalMaxWidth // 70% of screen width
  const modalMaxHeight = screen.height * 0.5 // 30% of screen height
  const modalPadding = 12;

  // Avoid overflow by checking screen bounds
  const adjustedX = Math.min(touchPosition.x, screen.width - modalMaxWidth - modalPadding);
  const adjustedY = Math.min(touchPosition.y, screen.height - modalMaxHeight - modalPadding);

  return (
    <Modal animationType="fade" visible={isVisible} transparent={true} >
      <View
        style={[
          styles.modalContent,
          {
            top: adjustedY,
            left: adjustedX,
            width:modalMaxWidth,
            maxHeight: modalMaxHeight,
          },
        ]}
      >
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            <Text style={{fontWeight:700 ,marginHorizontal:5}}>
              ({touchPosition.day })
            </Text>
            <Text style={{marginHorizontal:5,fontSize:modalMaxWidth > 200 ? 12 :8}}>
              Type a Comment 
              </Text>
            {isLocked ? 
            <MaterialIcons name="lock" size={15} color="orangered" />
            :
            <MaterialIcons name="lock-open" size={15} color="gold" />
            }
            </Text>
          <Pressable onPress={onClose}>
            <MaterialIcons name="close" size={20} color="#fff" />
            
          </Pressable>
        </View>
        <View style={styles.content}>
          {children}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    position: 'absolute',
    backgroundColor: '#1e1e2e',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
    paddingVertical: 10,
    paddingHorizontal: 12,
    zIndex: 1000,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2e2e3f',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  title: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    // marginHorizontal:10

  },
  content: {
    paddingHorizontal: 4,
  },
});

export default EmojiPicker;
