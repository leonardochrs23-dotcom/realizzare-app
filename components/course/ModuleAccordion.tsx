import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import { Typography } from '../../constants/Typography';
import Badge from '../ui/Badge';

type ModuleStatus = 'completed' | 'in-progress' | 'not-started';

interface ModuleAccordionProps {
  moduleNumber: number;
  title: string;
  lessonCount: number;
  duration: string;
  status: ModuleStatus;
  isExpanded: boolean;
  onToggle: () => void;
  children?: React.ReactNode;
}

const STATUS_BADGE: Record<ModuleStatus, { label: string; variant: 'green' | 'blue' | 'amber' | 'gray' | 'red' }> = {
  completed: { label: 'Concluído', variant: 'green' },
  'in-progress': { label: 'Em andamento', variant: 'blue' },
  'not-started': { label: 'Não iniciado', variant: 'gray' },
};

export default function ModuleAccordion({
  moduleNumber,
  title,
  lessonCount,
  duration,
  status,
  isExpanded,
  onToggle,
  children,
}: ModuleAccordionProps) {
  const statusInfo = STATUS_BADGE[status];

  return (
    <View style={[styles.container, isExpanded && styles.containerExpanded]}>
      {/* Header */}
      <TouchableOpacity
        style={[styles.header, isExpanded && styles.headerExpanded]}
        onPress={onToggle}
        activeOpacity={0.8}
        accessibilityRole="button"
        accessibilityLabel={`Módulo ${moduleNumber}: ${title}`}
        accessibilityState={{ expanded: isExpanded }}
      >
        {/* Number badge */}
        <View style={[styles.numberBadge, isExpanded && styles.numberBadgeExpanded]}>
          <Text style={[styles.numberText, isExpanded && styles.numberTextExpanded]}>
            {moduleNumber}
          </Text>
        </View>

        {/* Info */}
        <View style={styles.info}>
          <Text style={styles.title} numberOfLines={2}>{title}</Text>
          <Text style={styles.meta}>{lessonCount} aulas · {duration}</Text>
        </View>

        {/* Right: badge + chevron */}
        <View style={styles.rightGroup}>
          <Badge label={statusInfo.label} variant={statusInfo.variant} size="sm" />
          <Ionicons
            name={isExpanded ? 'chevron-down' : 'chevron-forward'}
            size={18}
            color={isExpanded ? Colors.primaryGreen : Colors.gray}
          />
        </View>
      </TouchableOpacity>

      {/* Expanded content */}
      {isExpanded && (
        <View style={styles.content}>
          {children}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    overflow: 'hidden',
  },
  containerExpanded: {
    borderLeftWidth: 4,
    borderLeftColor: Colors.primaryGreen,
    backgroundColor: Colors.lightGreen,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 56,
    paddingHorizontal: 14,
    paddingVertical: 10,
    gap: 10,
  },
  headerExpanded: {
    backgroundColor: Colors.lightGreen,
  },
  numberBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: Colors.gray,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  numberBadgeExpanded: {
    borderColor: Colors.primaryGreen,
    backgroundColor: Colors.primaryGreen,
  },
  numberText: {
    color: Colors.gray,
    fontSize: Typography.size.sm,
    fontWeight: '700',
  },
  numberTextExpanded: {
    color: Colors.white,
  },
  info: {
    flex: 1,
  },
  title: {
    color: Colors.darkNavy,
    fontSize: Typography.size.md,
    fontWeight: '600',
    lineHeight: 18,
    marginBottom: 2,
  },
  meta: {
    color: Colors.gray,
    fontSize: Typography.size.xs,
  },
  rightGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexShrink: 0,
  },
  content: {
    backgroundColor: Colors.white,
  },
});
