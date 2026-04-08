import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import { Typography } from '../../constants/Typography';

type LessonType = 'video' | 'pdf' | 'link';
type LessonStatus = 'active' | 'completed' | 'available' | 'locked';

interface LessonRowProps {
  title: string;
  type: LessonType;
  duration: string;
  status: LessonStatus;
  onPress: () => void;
}

const TYPE_ICON: Record<LessonType, keyof typeof Ionicons.glyphMap> = {
  video: 'play-circle-outline',
  pdf: 'document-text-outline',
  link: 'link-outline',
};

const STATUS_ICON: Record<LessonStatus, keyof typeof Ionicons.glyphMap> = {
  active: 'play-circle',
  completed: 'checkmark-circle',
  available: 'play-circle-outline',
  locked: 'lock-closed-outline',
};

const STATUS_ICON_COLOR: Record<LessonStatus, string> = {
  active: Colors.primaryGreen,
  completed: Colors.success,
  available: Colors.gray,
  locked: Colors.gray,
};

export default function LessonRow({
  title,
  type,
  duration,
  status,
  onPress,
}: LessonRowProps) {
  const isLocked = status === 'locked';
  const isActive = status === 'active';

  return (
    <TouchableOpacity
      style={[
        styles.row,
        isActive && styles.rowActive,
        isLocked && styles.rowLocked,
      ]}
      onPress={onPress}
      disabled={isLocked}
      activeOpacity={0.75}
      accessibilityRole="button"
      accessibilityLabel={title}
      accessibilityState={{ disabled: isLocked }}
    >
      {/* Active accent bar */}
      {isActive && <View style={styles.accentBar} />}

      {/* Content */}
      <View style={styles.inner}>
        {/* Type icon */}
        <Ionicons
          name={TYPE_ICON[type]}
          size={18}
          color={isLocked ? Colors.gray : isActive ? Colors.primaryGreen : Colors.gray}
          style={styles.typeIcon}
        />

        {/* Title */}
        <Text
          style={[
            styles.title,
            isLocked && styles.titleLocked,
            isActive && styles.titleActive,
          ]}
          numberOfLines={2}
        >
          {title}
        </Text>

        {/* Right side: duration + status icon */}
        <View style={styles.rightGroup}>
          {duration !== '-' && (
            <Text style={[styles.duration, isLocked && styles.durationLocked]}>
              {duration}
            </Text>
          )}
          <Ionicons
            name={STATUS_ICON[status]}
            size={18}
            color={STATUS_ICON_COLOR[status]}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: {
    height: 56,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  rowActive: {
    backgroundColor: `${Colors.lightGreen}`,
  },
  rowLocked: {
    opacity: 0.55,
  },
  accentBar: {
    width: 3,
    alignSelf: 'stretch',
    backgroundColor: Colors.primaryGreen,
  },
  inner: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    gap: 10,
  },
  typeIcon: {
    flexShrink: 0,
  },
  title: {
    flex: 1,
    color: Colors.darkNavy,
    fontSize: Typography.size.base,
    fontWeight: '500',
    lineHeight: 18,
  },
  titleActive: {
    color: Colors.darkNavy,
    fontWeight: '600',
  },
  titleLocked: {
    color: Colors.gray,
  },
  rightGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flexShrink: 0,
  },
  duration: {
    color: Colors.gray,
    fontSize: Typography.size.xs,
  },
  durationLocked: {
    color: Colors.gray,
    opacity: 0.7,
  },
});
