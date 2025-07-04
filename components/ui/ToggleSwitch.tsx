// import React, { useEffect, useRef } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  StyleProp,
  Text,
} from 'react-native';

interface ToggleSwitchProps {
  value: boolean;
  onToggle: () => void;
  size?: number;
  onColor?: string;
  offColor?: string;
  thumbColor?: string;
  animationDuration?: number;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  value,
  onToggle,
  size = 40,
  onColor = '#125',
  offColor = '#dcdde1',
  thumbColor = '#444',
  animationDuration = 200,
  style,
  accessibilityLabel = 'Toggle switch',
}) => {
  // const translateX = useRef(new Animated.Value(value ? size : 0)).current;

  const height = size * 0.6;
  const width = 200;
  const borderRadius = height / 2;
  const thumbSize = height - 4;
  

  // Sync translateX with toggle value
  // useEffect(() => {
  //   Animated.timing(translateX, {
  //     toValue: value ? maxTranslate : 0,
  //     duration: animationDuration,
  //     useNativeDriver: true,
  //   }).start();
  // }, [value, size, animationDuration]);

  // Reset on size change (rare case)
  // useEffect(() => {
  //   translateX.setValue(value ? maxTranslate : 0);
  // }, [size, value]);

  // const accessibilityState: AccessibilityState = {
  //   checked: value,
  // };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onToggle}
      style={[
        styles.switchBase,
        {
          width,
          height,
          borderRadius,
          // backgroundColor: value ? onColor : offColor
        },
        style,
      ]}
     
    >
      <Text

        style={[
          {
            color: '#fff',
            fontWeight: 700,
            textAlign:'center',
            fontSize:10
          }          
        ]}>
          {
          value ? 'Switch to Goal Tracker App' :'Switch To Todo App'
          }
        </Text>
      
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  switchBase: {
    justifyContent: 'center',
    padding: 2,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#f7f7f7',
  },

});

export default ToggleSwitch;
