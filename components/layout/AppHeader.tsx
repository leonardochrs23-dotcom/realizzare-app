import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import { Typography } from '../../constants/Typography';
import { Image } from 'react-native';

interface AppHeaderProps {
  title: string;
  showCart?: boolean;
  showBell?: boolean;
  cartCount?: number;
  onMenuPress: () => void;
  onCartPress?: () => void;
  onBellPress?: () => void;
  showLogo?: boolean;
}

export default function AppHeader({
  title,
  showCart = true,
  showBell = true,
  cartCount = 0,
  onMenuPress,
  onCartPress,
  onBellPress,
  showLogo = false,
}: AppHeaderProps) {
  return (
    <View style={styles.container}>
      {/* Left: hamburger */}
      <TouchableOpacity
        style={styles.sideButton}
        onPress={onMenuPress}
        activeOpacity={0.7}
        accessibilityRole="button"
        accessibilityLabel="Abrir menu"
      >
        <Ionicons name="menu-outline" size={24} color={Colors.white} />
      </TouchableOpacity>

      {/* Center: Brand or Title */}
      <View style={StyleSheet.absoluteFillObject} pointerEvents="none">
        <View style={styles.titleContainer}>
          {showLogo ? (
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
          ) : (
            <Text style={styles.title} numberOfLines={1}>
              {title}
            </Text>
          )}
        </View>
      </View>

      {/* Right: bell + cart */}
      <View style={styles.rightGroup}>
        {showBell && (
          <TouchableOpacity
            style={styles.iconButton}
            onPress={onBellPress}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel="Notificações"
          >
            <Ionicons name="notifications-outline" size={22} color={Colors.white} />
          </TouchableOpacity>
        )}
        {showCart && (
          <TouchableOpacity
            style={styles.iconButton}
            onPress={onCartPress}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel="Carrinho de compras"
          >
            <Ionicons name="cart-outline" size={22} color={Colors.white} />
            {cartCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>
                  {cartCount > 9 ? '9+' : cartCount}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 62, // Increased height
    backgroundColor: Colors.darkNavy, // Restored blue header
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Platform.OS === 'web' ? 0 : 0,
  },
  sideButton: {
    width: 54,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 16,
  },
  titleContainer: {
    flex: 1,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 0,
  },
  logoRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 8,
  },
  logoImg: { 
    width: 26, // Decreased logo size
    height: 26, 
    borderRadius: 6 
  },
  logoTexts: { 
    gap: 0,
    justifyContent: 'center'
  },
  logoTitle: { 
    color: Colors.white, 
    fontSize: 14, 
    fontWeight: '700',
    lineHeight: 16,
  },
  logoSub: { 
    color: '#A9B8C6', 
    fontSize: 8, 
    letterSpacing: 1.5, 
    textTransform: 'uppercase',
    lineHeight: 10,
  },
  title: {
    color: Colors.white,
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'center',
  },
  rightGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 16,
    gap: 8,
  },
  iconButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: Colors.primaryGreen,
    borderRadius: 10,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  badgeText: {
    color: Colors.white,
    fontSize: Typography.size.xs,
    fontWeight: '700',
    lineHeight: 16,
  },
});
