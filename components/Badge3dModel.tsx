import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

type Props = {
  visible: boolean;
  onClose: () => void;
  icon:string | React.ReactNode;
  title: string;
};

const { width } = Dimensions.get('window');

const Badge3DModal: React.FC<Props> = ({ visible, onClose, icon, title }) => {
  const spinAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      spinAnim.setValue(0);
      scaleAnim.setValue(0);

      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 6,
          tension: 80,
          useNativeDriver:false,
        }),
        Animated.timing(spinAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver:false,
        }),
      ]).start();
    }
  }, [visible]);

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Modal transparent visible={visible} animationType="fade">
      <Pressable style={styles.overlay} onPress={onClose}>
        <LinearGradient
          colors={['#0f172a', '#1e293b']}
          style={styles.modalBackground}
        >
          <Animated.View
            style={[
              styles.iconWrapper,
              {
                transform: [
                  { perspective: 1000 },
                  { rotateY: spin },
                  { scale: scaleAnim },
                ],
              },
            ]}
          >
            <LinearGradient
              colors={['#facc15', '#f59e0b']}
              style={styles.glowCircle}
            >
              {icon}
              <View style={styles.shine} />
            </LinearGradient>
          </Animated.View>

          <Text style={styles.title}>{title}</Text>
          <Text style={styles.hint}>Tap anywhere to continue</Text>
        </LinearGradient>
      </Pressable>
    </Modal>
  );
};

export default Badge3DModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBackground: {
    width: width * 0.85,
    padding: 24,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: Platform.OS === 'android' ? 10 : 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
  },
  iconWrapper: {
    marginBottom: 20,
  },
  glowCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#facc15',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#facc15',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.7,
    shadowRadius: 20,
    position: 'relative',
  },
  shine: {
    position: 'absolute',
    top: 8,
    left: 15,
    right: 15,
    height: 15,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    transform: [{ rotate: '-20deg' }],
  },
  title: {
    fontSize: 20,
    color: '#f1f5f9',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 6,
  },
  hint: {
    fontSize: 14,
    color: '#94a3b8',
    textAlign: 'center',
    marginTop: 6,
  },
});
