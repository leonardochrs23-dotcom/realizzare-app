import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/Colors';
import { Typography } from '../../constants/Typography';

export default function SplashScreen() {
  const router = useRouter();
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: false,
    }).start(() => {
      setTimeout(() => {
        router.replace('/(auth)/login');
      }, 500);
    });
  }, []);

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.center}>
        {/* Logo — favicon real com bordas arredondadas */}
        <Image
          source={require('../../assets/favicon.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        {/* Title */}
        <Text style={styles.title}>Realizzare</Text>

        {/* Subtitle */}
        <Text style={styles.subtitle}>CURSOS ONLINE</Text>

        {/* 48px spacer */}
        <View style={{ height: 48 }} />

        {/* Progress bar */}
        <View style={styles.progressTrack}>
          <Animated.View style={[styles.progressFill, { width: progressWidth }]} />
        </View>
      </View>

      {/* Bottom tagline */}
      <Text style={styles.tagline}>Democratizando a educação</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.darkNavy,
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 18,
    marginBottom: 12,
    overflow: 'hidden',
  },
  title: {
    color: Colors.white,
    fontSize: Typography.size.display,
    fontWeight: '700',
    marginBottom: 4,
  },
  subtitle: {
    color: '#A9B8C6',
    fontSize: Typography.size.sm,
    letterSpacing: 3,
    textTransform: 'uppercase',
  },
  progressTrack: {
    width: 200,
    height: 4,
    backgroundColor: '#2D4A6A',
    borderRadius: 99,
    overflow: 'hidden',
  },
  progressFill: {
    height: 4,
    backgroundColor: Colors.primaryGreen,
    borderRadius: 99,
  },
  tagline: {
    color: Colors.white,
    fontSize: Typography.size.base,
    fontStyle: 'italic',
    paddingBottom: 24,
  },
});
