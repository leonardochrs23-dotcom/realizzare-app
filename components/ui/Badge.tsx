import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Colors } from '../../constants/Colors';
import { Typography } from '../../constants/Typography';

type BadgeVariant = 'green' | 'blue' | 'amber' | 'gray' | 'red';
type BadgeSize = 'sm' | 'md';

interface BadgeProps {
  label: string;
  variant: BadgeVariant;
  size?: BadgeSize;
  style?: ViewStyle;
}

interface VariantStyle {
  bg: string;
  text: string;
}

const VARIANT_MAP: Record<BadgeVariant, VariantStyle> = {
  green: { bg: Colors.lightGreen, text: Colors.success },
  blue: { bg: '#DBEAFE', text: Colors.primaryBlue },
  amber: { bg: '#FEF3C7', text: '#92400E' },
  gray: { bg: '#F3F4F6', text: Colors.gray },
  red: { bg: '#FEE2E2', text: Colors.error },
};

const SIZE_MAP: Record<BadgeSize, { height: number; paddingH: number; fontSize: number }> = {
  sm: { height: 20, paddingH: 8, fontSize: Typography.size.xs },
  md: { height: 26, paddingH: 10, fontSize: Typography.size.sm },
};

export default function Badge({
  label,
  variant,
  size = 'md',
  style,
}: BadgeProps) {
  const variantStyle = VARIANT_MAP[variant];
  const sizeStyle = SIZE_MAP[size];

  return (
    <View
      style={[
        styles.base,
        {
          backgroundColor: variantStyle.bg,
          height: sizeStyle.height,
          paddingHorizontal: sizeStyle.paddingH,
        },
        style,
      ]}
    >
      <Text
        style={[
          styles.label,
          {
            color: variantStyle.text,
            fontSize: sizeStyle.fontSize,
          },
        ]}
        numberOfLines={1}
      >
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
  },
  label: {
    fontWeight: '600',
    letterSpacing: 0.2,
  },
});
