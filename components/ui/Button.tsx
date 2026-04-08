import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  View,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import { Typography } from '../../constants/Typography';

type Variant = 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: Variant;
  size?: Size;
  disabled?: boolean;
  loading?: boolean;
  icon?: keyof typeof Ionicons.glyphMap;
  fullWidth?: boolean;
}

const HEIGHTS: Record<Size, number> = { sm: 36, md: 44, lg: 52 };
const FONT_SIZES: Record<Size, number> = { sm: Typography.size.sm, md: Typography.size.md, lg: Typography.size.lg };
const H_PADDING: Record<Size, number> = { sm: 12, md: 16, lg: 20 };

const VARIANT_STYLES: Record<Variant, { container: ViewStyle; text: TextStyle }> = {
  primary: {
    container: { backgroundColor: Colors.primaryGreen, borderWidth: 0 },
    text: { color: Colors.white },
  },
  secondary: {
    container: { backgroundColor: Colors.primaryBlue, borderWidth: 0 },
    text: { color: Colors.white },
  },
  outline: {
    container: {
      backgroundColor: Colors.white,
      borderWidth: 1,
      borderColor: Colors.primaryGreen,
    },
    text: { color: Colors.primaryGreen },
  },
  danger: {
    container: {
      backgroundColor: Colors.white,
      borderWidth: 1,
      borderColor: Colors.error,
    },
    text: { color: Colors.error },
  },
  ghost: {
    container: { backgroundColor: 'transparent', borderWidth: 0 },
    text: { color: Colors.gray },
  },
};

export default function Button({
  label,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  icon,
  fullWidth = false,
}: ButtonProps) {
  const variantStyle = VARIANT_STYLES[variant];
  const height = HEIGHTS[size];
  const fontSize = FONT_SIZES[size];
  const paddingH = H_PADDING[size];

  const iconColor =
    variant === 'primary' || variant === 'secondary'
      ? Colors.white
      : variant === 'danger'
      ? Colors.error
      : variant === 'outline'
      ? Colors.primaryGreen
      : Colors.gray;

  return (
    <TouchableOpacity
      style={[
        styles.base,
        variantStyle.container,
        { height, paddingHorizontal: paddingH },
        fullWidth && styles.fullWidth,
        disabled && styles.disabled,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.75}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled }}
    >
      {loading ? (
        <ActivityIndicator size="small" color={iconColor} />
      ) : (
        <View style={styles.inner}>
          {icon && (
            <Ionicons name={icon} size={size === 'sm' ? 16 : size === 'lg' ? 20 : 18} color={iconColor} />
          )}
          <Text style={[styles.label, variantStyle.text, { fontSize }, disabled && styles.disabledText]}>
            {label}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  label: {
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  fullWidth: {
    alignSelf: 'stretch',
  },
  disabled: {
    opacity: 0.5,
  },
  disabledText: {
    opacity: 0.8,
  },
});
