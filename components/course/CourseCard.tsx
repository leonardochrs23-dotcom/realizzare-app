import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';

interface CourseCardProps {
  title: string;
  workload: string;
  progress: number; // 0–100
  status: string;
  onPress: () => void;
  thumbnailColor?: string;
  imageUrl?: string;
  tag?: string;
  ctaVariant?: 'dark' | 'light';
}

export default function CourseCard({
  title,
  progress,
  onPress,
  thumbnailColor = '#161C24', // default dark slate fallback
  imageUrl,
  tag = 'DESIGN',
  ctaVariant = 'dark',
}: CourseCardProps) {
  const clampedProgress = Math.min(100, Math.max(0, progress));
  const animatedProgress = useRef(new Animated.Value(0)).current;

  // Animated loading effect for progress bar
  useEffect(() => {
    Animated.timing(animatedProgress, {
      toValue: clampedProgress,
      duration: 1200,
      useNativeDriver: false, // width animation doesn't support native driver
    }).start();
  }, [clampedProgress, animatedProgress]);

  const widthInterpolated = animatedProgress.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.9}
      accessibilityRole="button"
      accessibilityLabel={`Curso: ${title}`}
    >
      {/* ── Top Cover Image ── */}
      <View style={[styles.cover, { backgroundColor: thumbnailColor }]}>
        {imageUrl ? (
          <Image 
            source={{ uri: imageUrl }} 
            style={StyleSheet.absoluteFillObject} 
            resizeMode="cover" 
          />
        ) : (
          <View style={styles.placeholderGraphic}>
            {/* Fallback graphic if no image is passed */}
            <View style={styles.dotLeft} />
            <View style={styles.lines}>
              <View style={styles.line1} />
              <View style={styles.line2} />
            </View>
          </View>
        )}

        {/* Tag Overlay */}
        {tag && (
          <View style={[
            styles.tagBadge, 
            { backgroundColor: tag === 'DESIGN' ? '#92B929' : '#017ACB' }
          ]}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        )}
      </View>

      {/* ── Content Area ── */}
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>

        {/* Progress System */}
        <View style={styles.progressRow}>
          <View style={styles.progressTrack}>
            <Animated.View style={[styles.progressFill, { width: widthInterpolated }]} />
          </View>
          <Text style={styles.progressLabel}>{clampedProgress}%</Text>
        </View>

        {/* Full-width CTA */}
        <View style={[
          styles.ctaButton, 
          ctaVariant === 'dark' ? styles.ctaDark : styles.ctaLight
        ]}>
          <Ionicons 
            name="play-circle" 
            size={16} 
            color={ctaVariant === 'dark' ? Colors.white : '#2A3C53'} 
          />
          <Text style={[
            styles.ctaText,
            ctaVariant === 'dark' ? styles.ctaTextDark : styles.ctaTextLight
          ]}>
            {ctaVariant === 'dark' ? 'Retomar Aula' : 'Continuar'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 6 }, // Increased shadow depth
    shadowOpacity: 0.1, // Increased shadow opacity
    shadowRadius: 15,
    elevation: 4,
    overflow: 'hidden',
    width: '100%',
  },
  cover: {
    height: 140,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderGraphic: {
    flexDirection: 'row',
    alignItems: 'center',
    opacity: 0.5,
  },
  dotLeft: {
    flexDirection: 'column',
    gap: 6,
    marginRight: 10,
  },
  lines: {
    flexDirection: 'column',
    gap: 6,
  },
  line1: {
    width: 40,
    height: 4,
    backgroundColor: '#92B929',
    borderRadius: 2,
  },
  line2: {
    width: 20,
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 2,
  },
  tagBadge: {
    position: 'absolute',
    bottom: 12,
    left: 16,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  tagText: {
    color: Colors.white,
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  content: {
    padding: 16,
  },
  title: {
    color: '#0D274A', // Dark Navy
    fontSize: 16,
    fontWeight: '800',
    lineHeight: 20,
    marginBottom: 12,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  progressTrack: {
    flex: 1,
    height: 6,
    backgroundColor: '#EAEFF4',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: 6,
    backgroundColor: Colors.primaryGreen, // Realizzare light green
    borderRadius: 3,
  },
  progressLabel: {
    color: Colors.darkNavy,
    fontSize: 10,
    fontWeight: '800',
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    width: '100%',
    paddingVertical: 12,
    borderRadius: 8,
  },
  ctaDark: {
    backgroundColor: Colors.primaryGreen, // Realizzare green instead of slate
  },
  ctaLight: {
    backgroundColor: '#F0F4F8', // Light blueish gray button
  },
  ctaText: {
    fontSize: 12,
    fontWeight: '700',
  },
  ctaTextDark: {
    color: Colors.white,
  },
  ctaTextLight: {
    color: '#27384E',
  },
});
