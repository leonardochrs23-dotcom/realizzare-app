import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  ScrollView,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/Colors';
import { Typography } from '../../constants/Typography';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const DRAWER_WIDTH = Math.min(SCREEN_WIDTH * 0.82, 320);

interface Badge {
  label: string;
  variant: 'amber' | 'green' | 'blue';
}

interface NavItem {
  key: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  route?: string;
  badge?: Badge;
  danger?: boolean;
  dividerBefore?: boolean;
  onPress?: () => void;
}

interface DrawerMenuProps {
  isOpen: boolean;
  onClose: () => void;
  activeItem: string;
  userName: string;
  userEmail: string;
}

const BADGE_COLORS: Record<string, string> = {
  amber: Colors.amber,
  green: Colors.primaryGreen,
  blue: Colors.primaryBlue,
};

export default function DrawerMenu({
  isOpen,
  onClose,
  activeItem,
  userName,
  userEmail,
}: DrawerMenuProps) {
  const router = useRouter();

  const translateX = useRef(new Animated.Value(-DRAWER_WIDTH)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isOpen) {
      Animated.parallel([
        Animated.spring(translateX, { toValue: 0, useNativeDriver: true, damping: 20, stiffness: 200 }),
        Animated.timing(overlayOpacity, { toValue: 1, duration: 250, useNativeDriver: true }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.spring(translateX, { toValue: -DRAWER_WIDTH, useNativeDriver: true, damping: 25, stiffness: 200 }),
        Animated.timing(overlayOpacity, { toValue: 0, duration: 200, useNativeDriver: true }),
      ]).start();
    }
  }, [isOpen]);

  const navigate = (route: string) => {
    onClose();
    setTimeout(() => router.navigate(route as any), 250);
  };

  const NAV_ITEMS: NavItem[] = [
    { key: 'home', label: 'Meus Cursos', icon: 'school-outline', route: '/(tabs)' },
    { key: 'explorar', label: 'Explorar Cursos', icon: 'book-outline', route: '/(tabs)/explorar' },
    { key: 'creditos', label: 'Comprar Créditos', icon: 'cash-outline' },
    {
      key: 'certificados',
      label: 'Certificados Emitidos',
      icon: 'trophy-outline',
      route: '/(tabs)/certificados',
      badge: { label: '0', variant: 'amber' },
    },
    { key: 'pedidos', label: 'Pedidos', icon: 'bag-outline', route: '/(tabs)/pedidos' },
    {
      key: 'indicar',
      label: 'Indique e Ganhe',
      icon: 'share-social-outline',
      dividerBefore: true,
      badge: { label: 'NOVO', variant: 'green' },
    },
    { key: 'dados', label: 'Meus Dados', icon: 'person-circle-outline', route: '/(tabs)/perfil' },
    { key: 'ajuda', label: 'Ajuda', icon: 'help-circle-outline' },
    {
      key: 'sair',
      label: 'Sair',
      icon: 'log-out-outline',
      danger: true,
      dividerBefore: true,
      onPress: () => { onClose(); setTimeout(() => router.replace('/(auth)/login'), 250); },
    },
  ];

  if (!isOpen) return null;

  return (
    <View style={StyleSheet.absoluteFillObject} pointerEvents="box-none">
      {/* Backdrop */}
      <Animated.View style={[styles.overlay, { opacity: overlayOpacity }]}>
        <TouchableOpacity style={StyleSheet.absoluteFillObject} onPress={onClose} activeOpacity={1} />
      </Animated.View>

      {/* Drawer panel */}
      <Animated.View style={[styles.drawer, { transform: [{ translateX }] }]}>
        <SafeAreaView edges={['top', 'bottom']} style={styles.drawerInner}>
          {/* ── Drawer Header ── */}
          <View style={styles.drawerHeader}>
            <View style={styles.logoRow}>
              <Image
                source={require('../../assets/favicon.png')}
                style={styles.logoImg}
                resizeMode="contain"
              />
              <View style={styles.logoTexts}>
                <Text style={styles.logoTitle}>Realizzare</Text>
                <Text style={styles.logoSub}>CURSOS ONLINE</Text>
              </View>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn} accessibilityRole="button" accessibilityLabel="Fechar menu">
              <Ionicons name="close" size={22} color={Colors.white} />
            </TouchableOpacity>
          </View>

          {/* ── User Info ── */}
          <View style={styles.userSection}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {userName.split(' ').map((n) => n[0]).slice(0, 2).join('')}
              </Text>
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{userName}</Text>
              <Text style={styles.userEmail} numberOfLines={1}>{userEmail}</Text>
              <View style={styles.activeBadge}>
                <Text style={styles.activeBadgeText}>ALUNO ATIVO</Text>
              </View>
            </View>
          </View>

          {/* ── Nav Items ── */}
          <ScrollView style={styles.navList} showsVerticalScrollIndicator={false}>
            {NAV_ITEMS.map((item) => {
              const isActive = activeItem === item.key;
              return (
                <View key={item.key}>
                  {item.dividerBefore && <View style={styles.divider} />}
                  <TouchableOpacity
                    style={[styles.navItem, isActive && styles.navItemActive]}
                    onPress={item.onPress ?? (item.route ? () => navigate(item.route!) : undefined)}
                    activeOpacity={0.7}
                    accessibilityRole="button"
                    accessibilityLabel={item.label}
                  >
                    <Ionicons
                      name={item.icon}
                      size={20}
                      color={item.danger ? Colors.error : isActive ? Colors.primaryGreen : Colors.white}
                    />
                    <Text
                      style={[
                        styles.navLabel,
                        isActive && styles.navLabelActive,
                        item.danger && styles.navLabelDanger,
                      ]}
                    >
                      {item.label}
                    </Text>
                    {item.badge && (
                      <View style={[styles.badge, { backgroundColor: BADGE_COLORS[item.badge.variant] }]}>
                        <Text style={styles.badgeText}>{item.badge.label}</Text>
                      </View>
                    )}
                  </TouchableOpacity>
                </View>
              );
            })}
          </ScrollView>

          {/* ── Footer ── */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Realizzare Cursos © 2026</Text>
            <Text style={styles.footerVersion}>v1.0.0</Text>
          </View>
        </SafeAreaView>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.55)',
  },
  drawer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: DRAWER_WIDTH,
    backgroundColor: Colors.darkNavy,
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 16,
  },
  drawerInner: { flex: 1 },

  // ── Header ──────────────────────────────────────────────────────────────
  drawerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.08)',
  },
  logoRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  logoImg: { width: 36, height: 36, borderRadius: 8 },
  logoTexts: { gap: 1 },
  logoTitle: { color: Colors.white, fontSize: 16, fontWeight: '700' },
  logoSub: { color: '#A9B8C6', fontSize: 9, letterSpacing: 2, textTransform: 'uppercase' },
  closeBtn: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },

  // ── User ────────────────────────────────────────────────────────────────
  userSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.08)',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primaryGreen,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  avatarText: { color: Colors.white, fontSize: 16, fontWeight: '700' },
  userInfo: { flex: 1 },
  userName: { color: Colors.white, fontSize: Typography.size.md, fontWeight: '700', marginBottom: 2 },
  userEmail: { color: '#A9B8C6', fontSize: 11, marginBottom: 6 },
  activeBadge: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.primaryGreen,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  activeBadgeText: { color: Colors.white, fontSize: 9, fontWeight: '700', letterSpacing: 0.5 },

  // ── Nav ─────────────────────────────────────────────────────────────────
  navList: { flex: 1, paddingTop: 8 },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 13,
    gap: 14,
  },
  navItemActive: {
    backgroundColor: Colors.lightGreen,
    borderRadius: 0,
  },
  navLabel: {
    flex: 1,
    color: Colors.white,
    fontSize: Typography.size.md,
    fontWeight: '500',
  },
  navLabelActive: { color: Colors.primaryGreen, fontWeight: '700' },
  navLabelDanger: { color: Colors.error },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.08)',
    marginVertical: 8,
    marginHorizontal: 16,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    minWidth: 22,
    alignItems: 'center',
  },
  badgeText: { color: Colors.white, fontSize: 10, fontWeight: '700' },

  // ── Footer ──────────────────────────────────────────────────────────────
  footer: {
    paddingVertical: 14,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.08)',
    gap: 2,
  },
  footerText: { color: '#A9B8C6', fontSize: 11 },
  footerVersion: { color: 'rgba(255,255,255,0.3)', fontSize: 10 },
});
