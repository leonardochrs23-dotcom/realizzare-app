import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Colors } from '../../constants/Colors';

type CardVariant = 'default' | 'green' | 'navy';

interface CardProps {
  children: React.ReactNode;
  variant?: CardVariant;
  padding?: number;
  radius?: number;
  style?: ViewStyle;
}

const VARIANT_STYLES: Record<CardVariant, ViewStyle> = {
  default: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  green: {
    backgroundColor: Colors.lightGreen,
    borderWidth: 1,
    borderColor: '#D1FAD0',
  },
  navy: {
    backgroundColor: Colors.darkNavy,
    borderWidth: 0,
  },
};

export default function Card({
  children,
  variant = 'default',
  padding = 16,
  radius = 10,
  style,
}: CardProps) {
  return (
    <View
      style={[
        styles.base,
        VARIANT_STYLES[variant],
        { padding, borderRadius: radius },
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    overflow: 'hidden',
  },
});
