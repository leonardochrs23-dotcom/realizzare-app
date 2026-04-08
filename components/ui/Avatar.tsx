import React from 'react';
import { View, Text, Image, StyleSheet, ViewStyle } from 'react-native';
import { Colors } from '../../constants/Colors';
import { Typography } from '../../constants/Typography';

type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

interface AvatarProps {
  name?: string;
  uri?: string;
  size?: AvatarSize;
  style?: ViewStyle;
}

const SIZE_MAP: Record<AvatarSize, { dimension: number; fontSize: number }> = {
  sm: { dimension: 32, fontSize: Typography.size.sm },
  md: { dimension: 44, fontSize: Typography.size.lg },
  lg: { dimension: 56, fontSize: Typography.size.xl },
  xl: { dimension: 72, fontSize: Typography.size.xxl },
};

function getInitials(name: string): string {
  return name
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase();
}

export default function Avatar({ name = '', uri, size = 'md', style }: AvatarProps) {
  const { dimension, fontSize } = SIZE_MAP[size];
  const initials = getInitials(name);

  return (
    <View
      style={[
        styles.container,
        {
          width: dimension,
          height: dimension,
          borderRadius: dimension / 2,
        },
        style,
      ]}
    >
      {uri ? (
        <Image
          source={{ uri }}
          style={[
            styles.image,
            { width: dimension, height: dimension, borderRadius: dimension / 2 },
          ]}
          resizeMode="cover"
          accessibilityLabel={name}
        />
      ) : (
        <Text style={[styles.initials, { fontSize }]}>{initials}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primaryGreen,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  image: {
    position: 'absolute',
  },
  initials: {
    color: Colors.white,
    fontWeight: '700',
  },
});
