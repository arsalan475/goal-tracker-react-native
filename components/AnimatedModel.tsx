import React, { useEffect, useState } from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  View,
  Text,
  Platform,
  Dimensions,
} from 'react-native';
import Animated, {
  FadeIn,
  FadeOut,
  SlideInDown,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

type QuoteModalProps = {
  quote: string;
};

const { width } = Dimensions.get('window');

const AnimatedModel: React.FC<QuoteModalProps> = ({ quote }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(id);
  }, []);

  const close = () => setVisible(false);

  return (
    <Modal
      transparent
      animationType="none"
      statusBarTranslucent
      visible={visible}
      onRequestClose={close}
    >
      <Pressable style={styles.backdrop} onPress={close}>
        <Animated.View
          entering={FadeIn.springify()}
          exiting={FadeOut.duration(150)}
          style={styles.cardWrapper}
        >
          <LinearGradient
            colors={['#1f2937', '#0f172a']}
            start={{ x: 0.2, y: 0.1 }}
            end={{ x: 1, y: 1 }}
            style={styles.card}
          >
            <View style={styles.glowShadow} />

            <Text style={styles.heading}>💡 Motivation</Text>

            <View style={styles.quoteBox}>
              <Text style={styles.quoteText}>“{quote}”</Text>
            </View>
          </LinearGradient>
        </Animated.View>
      </Pressable>
    </Modal>
  );
};

export default AnimatedModel;



const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  cardWrapper: {
    width: width * 0.9,
    maxWidth: 420,
    borderRadius: 20,
    overflow: 'hidden',
  },

  card: {
    padding: 20,
    borderRadius: 20,
    position: 'relative',
    backgroundColor: 'rgba(15,23,42,0.85)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 30,
    elevation: Platform.OS === 'android' ? 12 : 0,
  },

  glowShadow: {
    position: 'absolute',
    top: -20,
    left: -20,
    right: -20,
    bottom: -20,
    backgroundColor: '#38bdf8',
    opacity: 0.08,
    borderRadius: 30,
    shadowColor: '#38bdf8',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 60,
    zIndex: -1,
  },

  heading: {
    fontSize: 18,
    color: '#facc15',
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 12,
    letterSpacing: 0.5,
  },

  quoteBox: {
    padding: 16,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },

  quoteText: {
    color: '#f8fafc',
    fontStyle: 'italic',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
  },
});
