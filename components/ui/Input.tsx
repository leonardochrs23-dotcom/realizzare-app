import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardTypeOptions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import { Typography } from '../../constants/Typography';

interface InputProps {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  leftIcon?: keyof typeof Ionicons.glyphMap;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  onRightIconPress?: () => void;
  error?: string;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  autoComplete?: any;
  editable?: boolean;
}

export default function Input({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = 'default',
  leftIcon,
  rightIcon,
  onRightIconPress,
  error,
  autoCapitalize = 'sentences',
  autoComplete,
  editable = true,
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const borderColor = error
    ? Colors.error
    : isFocused
    ? Colors.primaryGreen
    : Colors.border;

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <View
        style={[
          styles.inputRow,
          { borderColor },
          !editable && styles.disabled,
        ]}
      >
        {leftIcon && (
          <Ionicons
            name={leftIcon}
            size={18}
            color={isFocused ? Colors.primaryGreen : Colors.gray}
            style={styles.leftIcon}
          />
        )}
        <TextInput
          style={[
            styles.input,
            leftIcon ? styles.inputWithLeft : null,
            // Remove browser focus ring on web (outline applied via JS by RN Web)
            { outlineStyle: 'none' } as any,
          ]}
          placeholder={placeholder}
          placeholderTextColor={Colors.gray}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          autoComplete={autoComplete}
          editable={editable}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {rightIcon && (
          <TouchableOpacity
            style={styles.rightIcon}
            onPress={onRightIconPress}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            accessibilityRole="button"
          >
            <Ionicons name={rightIcon} size={18} color={Colors.gray} />
          </TouchableOpacity>
        )}
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 16,
  },
  label: {
    color: Colors.darkNavy,
    fontSize: Typography.size.base,
    fontWeight: '600',
    marginBottom: 6,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderRadius: 8,
    minHeight: 44,
    paddingHorizontal: 12,
  },
  leftIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: Typography.size.md,
    color: Colors.darkNavy,
    paddingVertical: 10,
  },
  inputWithLeft: {
    marginLeft: 0,
  },
  rightIcon: {
    marginLeft: 8,
    padding: 2,
  },
  disabled: {
    backgroundColor: Colors.lightBg,
    opacity: 0.7,
  },
  errorText: {
    color: Colors.error,
    fontSize: Typography.size.xs,
    marginTop: 4,
    marginLeft: 2,
  },
});
