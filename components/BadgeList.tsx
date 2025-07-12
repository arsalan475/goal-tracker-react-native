/**
 * Responsive and styled BadgeList component
 * - Works on both mobile and web
 * - Uses real-world badge icons and names
 * - Animations for newly unlocked badges
 * - Responsive sizing and layout
 */

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Pressable,
  Vibration,
  FlatList,
  StyleSheet,
  Platform,
  useWindowDimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import getLongestStreak, { Badge } from '@/utils/getLongestStreak';
import { getSeenBadgeIds, addSeenBadgeId } from '@/utils/badgeStorage';
import Badge3DModal from './Badge3dModel';

const badgeColors = {
  gold: ['#f9d976', '#f39c12', '#e67e22'],
  silver: ['#e0e0e0', '#c0c0c0', '#a9a9a9'],
  bronze: ['#cd7f32', '#b87333', '#8b5a2b'],
};

type Tier = keyof typeof badgeColors;

type Props = {
  streakArray: Record<string, { completed: boolean; id: number }>[];
  docId: string;
};

const allBadges: Badge[] = [
  { id: 1, icon: '🐣', name: 'Newbie' },
  { id: 2, icon: '🕷', name: 'Spider' },
  { id: 3, icon: '🦸‍♀️', name: 'Hero' },
  { id: 4, icon: '💪', name: 'Athlete' },
  { id: 5, icon: '🔥', name: 'Legend' },
  { id: 6, icon: '🌞', name: 'Unbeatable' },
];

function getTier(index: number): Tier {
  if (index >= 4) return 'gold';
  if (index >= 2) return 'silver';
  return 'bronze';
}

export default function BadgeList({ streakArray, docId }: Props) {
  const { width } = useWindowDimensions();
  const badgeSize = Math.min(width / 5.5, 110);

  const [earned, setEarned] = useState<Badge[]>([]);
  const [seen, setSeen] = useState<number[]>([]);
  const [queue, setQueue] = useState<Badge[]>([]);
  const [current, setCurrent] = useState<Badge | null>(null);

  useEffect(() => {
    const run = async () => {
      const result = getLongestStreak(streakArray, docId);
      const allEarned = result.achievements;
      const seenBadges = await getSeenBadgeIds(docId);
      setSeen(seenBadges);
      setEarned(allEarned);

      const newOnes = allEarned.filter((b) => !seenBadges.includes(b.id));
      if (newOnes.length > 0) {
        setQueue(newOnes);
        setCurrent(newOnes[0]);
        for (const b of newOnes) {
          await addSeenBadgeId(docId, b.id);
        }
        Vibration.vibrate(100);
      }
    };
    run();
  }, [streakArray, docId]);

  const closeModal = () => {
    const remaining = [...queue];
    remaining.shift();
    setQueue(remaining);
    setCurrent(remaining[0] || null);
  };

  const renderBadge = ({ item, index }: { item: Badge; index: number }) => {
    const unlocked = earned.some((b) => b.id === item.id);
    const isNew = current?.id === item.id;
    const colors = badgeColors[getTier(index)];
    const opacity = unlocked ? 1 : 0.2;

    return (
      <Pressable
        onPress={() => unlocked && setCurrent(item)}
        disabled={!unlocked}
        style={{ width: badgeSize + 10, alignItems: 'center' }}
      >
        <Animatable.View
          animation={isNew ? 'bounceIn' : 'zoomIn'}
          duration={700}
          useNativeDriver={false}
          style={[styles.badgeWrapper, { shadowRadius: badgeSize * 0.12 }]}
        >
          <LinearGradient
            colors={[colors[0],colors[1],colors[2]]}
            style={[styles.badge, { width: badgeSize, height: badgeSize, opacity }]}
          >
            <View style={styles.shine} />
            <Animatable.Text
              animation={unlocked ? 'pulse' : undefined}
              iterationCount="infinite"
              duration={2000}
              style={[styles.icon, { fontSize: badgeSize * 0.3 }]}
            >
              {item.icon}
            </Animatable.Text>
            <Text style={[styles.name, { fontSize: badgeSize * 0.11 }]}>{item.name}</Text>
          </LinearGradient>
        </Animatable.View>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🏅 Achievements</Text>

      <FlatList
        data={allBadges}
        numColumns={3}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderBadge}
        contentContainerStyle={styles.listContent}
      />

      {current && (
        <Badge3DModal
          visible={true}
          onClose={closeModal}
          icon={<Text style={{ fontSize: 60 }}>{current.icon}</Text>}
          title={`🎉 Unlocked: ${current.name}`}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  header: {
    fontSize: Platform.OS === 'android'?  18:26,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#ffffff',
    marginBottom: 20,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  listContent: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 40,
  },
  badgeWrapper: {
    margin: 10,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowOffset: { width: 10, height: 6 },
    elevation: Platform.OS === 'android' ? 10 : 0,
  },
  badge: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#fff',
    borderRadius: 999,
    overflow: 'hidden',
    position: 'relative',
  },
  icon: {
    color: '#fff',
  },
  name: {
    fontWeight: '600',
    color: '#fff',
    marginTop: 6,
    textAlign: 'center',
  },
  shine: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    height: 18,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.3)',
    transform: [{ rotate: '-25deg' }],
  },
});
