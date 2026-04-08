import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import { Typography } from '../../constants/Typography';

export type TabName = 'home' | 'explorar' | 'certificados' | 'pedidos' | 'perfil';

interface TabItem {
  key: TabName;
  label: string;
  iconOutline: keyof typeof Ionicons.glyphMap;
  iconFilled: keyof typeof Ionicons.glyphMap;
}

const TABS: TabItem[] = [
  { key: 'home', label: 'Home', iconOutline: 'home-outline', iconFilled: 'home' },
  { key: 'explorar', label: 'Explorar', iconOutline: 'search-outline', iconFilled: 'search' },
  { key: 'certificados', label: 'Certificados', iconOutline: 'ribbon-outline', iconFilled: 'ribbon' },
  { key: 'pedidos', label: 'Pedidos', iconOutline: 'bag-outline', iconFilled: 'bag' },
  { key: 'perfil', label: 'Perfil', iconOutline: 'person-outline', iconFilled: 'person' },
];

interface BottomNavProps {
  activeTab: string;
  onTabPress: (tab: string) => void;
}

export default function BottomNav({ activeTab, onTabPress }: BottomNavProps) {
  return (
    <View style={styles.container}>
      {TABS.map((tab) => {
        const isActive = activeTab === tab.key;
        const color = isActive ? Colors.primaryGreen : Colors.gray;
        const iconName = isActive ? tab.iconFilled : tab.iconOutline;

        return (
          <TouchableOpacity
            key={tab.key}
            style={styles.tab}
            onPress={() => onTabPress(tab.key)}
            activeOpacity={0.75}
            accessibilityRole="tab"
            accessibilityLabel={tab.label}
            accessibilityState={{ selected: isActive }}
          >
            <Ionicons name={iconName} size={22} color={color} />
            <Text style={[styles.label, { color }]}>{tab.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 64,
    backgroundColor: Colors.darkNavy,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.15)',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  label: {
    fontSize: Typography.size.xs,
    fontWeight: '500',
    marginTop: 2,
  },
});
