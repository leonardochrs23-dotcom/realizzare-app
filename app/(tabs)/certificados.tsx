import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/Colors';
import AppHeader from '../../components/layout/AppHeader';
import { useAppContext } from '../../context/AppContext';

export default function CertificadosScreen() {
  const router = useRouter();
  const { setDrawerOpen } = useAppContext();

  return (
    <SafeAreaView edges={['top']} style={styles.root}>
      {/* ── Header ── */}
      <AppHeader
        title="Certificados"
        onMenuPress={() => setDrawerOpen(true)}
        showBell
        showCart
      />

      {/* ── Body ── */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Promo Banner ── */}
        <View style={styles.promoBanner}>
          <View style={styles.promoLeft}>
            <Text style={styles.promoTitle}>
              Seu certificado pode ter ainda mais valor!
            </Text>
            <Text style={styles.promoSub}>
              Emitido por instituição credenciada ao MEC.
            </Text>
            <TouchableOpacity
              style={styles.promoBtn}
              onPress={() => router.push('/(tabs)/pedidos' as any)}
              activeOpacity={0.85}
            >
              <Text style={styles.promoBtnText}>COMPRAR CRÉDITO</Text>
              <Ionicons name="cart-outline" size={14} color={Colors.white} />
            </TouchableOpacity>
          </View>

          {/* Decorative certificate illustration */}
          <View style={styles.promoIllustration}>
            <View style={styles.certMiniCard}>
              <Ionicons name="ribbon" size={20} color={Colors.primaryGreen} />
              <View style={styles.certMiniLines}>
                <View style={styles.certMiniLine1} />
                <View style={styles.certMiniLine2} />
                <View style={styles.certMiniLine3} />
              </View>
            </View>
          </View>
        </View>

        {/* ── Section Header ── */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Seus Certificados</Text>
          <Text style={styles.sectionSub}>Baixe ou compartilhe seus certificados.</Text>
        </View>

        {/* ── Empty State Card ── */}
        <View style={styles.emptyCard}>
          {/* Graduation icon */}
          <View style={styles.emptyIconCircle}>
            <Ionicons name="school-outline" size={48} color={Colors.gray} />
          </View>

          <Text style={styles.emptyTitle}>
            Você ainda não emitiu nenhum certificado.
          </Text>
          <Text style={styles.emptyDesc}>
            Compre um crédito para emitir seu{'\n'}certificado de conclusão.
          </Text>

          <TouchableOpacity
            style={styles.emptyBtn}
            onPress={() => router.push('/(tabs)/pedidos' as any)}
            activeOpacity={0.85}
          >
            <Text style={styles.emptyBtnText}>COMPRAR CRÉDITO</Text>
            <Ionicons name="cart-outline" size={15} color={Colors.white} />
          </TouchableOpacity>
        </View>

        {/* ── Info Banner ── */}
        <View style={styles.infoBanner}>
          <Ionicons name="information-circle-outline" size={20} color="#2980B9" style={styles.infoIcon} />
          <Text style={styles.infoText}>
            Sabia que nossos certificados são válidos em{' '}
            <Text style={styles.infoHighlight}>
              todo o território nacional para provas de títulos, horas complementares e progressão de carreira?
            </Text>
          </Text>
        </View>

        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F6F8FA',
  },
  scroll: { flex: 1 },
  scrollContent: { paddingBottom: 8 },

  // ── Promo Banner ─────────────────────────────────────────────────────────────
  promoBanner: {
    backgroundColor: Colors.lightGreen,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 12,
  },
  promoLeft: { flex: 1 },
  promoTitle: {
    color: Colors.darkNavy,
    fontSize: 14,
    fontWeight: '800',
    lineHeight: 19,
    marginBottom: 4,
  },
  promoSub: {
    color: Colors.gray,
    fontSize: 12,
    marginBottom: 12,
  },
  promoBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-start',
    backgroundColor: Colors.primaryGreen,
    paddingVertical: 9,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  promoBtnText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.3,
  },

  // Decorative cert mini card
  promoIllustration: {
    flexShrink: 0,
  },
  certMiniCard: {
    width: 72,
    height: 88,
    backgroundColor: Colors.darkNavy,
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  certMiniLines: { gap: 5, width: '100%' },
  certMiniLine1: { height: 3, backgroundColor: 'rgba(255,255,255,0.5)', borderRadius: 2 },
  certMiniLine2: { height: 3, backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: 2, width: '80%' },
  certMiniLine3: { height: 3, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 2, width: '60%' },

  // ── Section Header ────────────────────────────────────────────────────────────
  sectionHeader: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 12,
  },
  sectionTitle: {
    color: Colors.darkNavy,
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 2,
  },
  sectionSub: {
    color: Colors.gray,
    fontSize: 13,
  },

  // ── Empty State Card ──────────────────────────────────────────────────────────
  emptyCard: {
    backgroundColor: Colors.white,
    marginHorizontal: 16,
    borderRadius: 16,
    paddingVertical: 36,
    paddingHorizontal: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
    gap: 12,
  },
  emptyIconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  emptyTitle: {
    color: Colors.darkNavy,
    fontSize: 16,
    fontWeight: '800',
    textAlign: 'center',
    lineHeight: 22,
  },
  emptyDesc: {
    color: Colors.gray,
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 19,
  },
  emptyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
    backgroundColor: Colors.primaryGreen,
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 10,
  },
  emptyBtnText: {
    color: Colors.white,
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0.4,
  },

  // ── Info Banner ───────────────────────────────────────────────────────────────
  infoBanner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#EFF6FF',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    padding: 14,
    gap: 10,
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  infoIcon: { flexShrink: 0, marginTop: 1 },
  infoText: {
    flex: 1,
    color: Colors.gray,
    fontSize: 12,
    lineHeight: 18,
  },
  infoHighlight: {
    color: '#2980B9',
    fontWeight: '600',
  },
});
