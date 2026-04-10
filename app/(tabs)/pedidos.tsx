import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/Colors';
import { MockOrders, OrderStatus } from '../../constants/MockData';
import AppHeader from '../../components/layout/AppHeader';
import { useAppContext } from '../../context/AppContext';

type FilterKey = 'todos' | 'aguardando' | 'pago' | 'cancelado';

const FILTER_TABS: { key: FilterKey; label: string }[] = [
  { key: 'todos', label: 'Todos' },
  { key: 'aguardando', label: 'Aguardando' },
  { key: 'pago', label: 'Pago' },
  { key: 'cancelado', label: 'Cancelado' },
];

const STATUS_MAP: Record<OrderStatus, { label: string; color: string; bg: string }> = {
  aprovado: { label: 'PAGO', color: Colors.white, bg: '#16A34A' },
  pendente: { label: 'SEM PAGAMENTO', color: Colors.white, bg: '#DC2626' },
  cancelado: { label: 'CANCELADO', color: Colors.white, bg: '#6B7280' },
  processando: { label: 'PROCESSANDO', color: Colors.white, bg: '#D97706' },
};

const FILTER_STATUS_MAP: Record<FilterKey, OrderStatus[]> = {
  todos: ['aprovado', 'pendente', 'cancelado', 'processando'],
  aguardando: ['pendente', 'processando'],
  pago: ['aprovado'],
  cancelado: ['cancelado'],
};

export default function PedidosScreen() {
  const router = useRouter();
  const { setDrawerOpen } = useAppContext();
  const [activeFilter, setActiveFilter] = useState<FilterKey>('todos');

  const filtered = useMemo(
    () => MockOrders.filter((o) => FILTER_STATUS_MAP[activeFilter].includes(o.status)),
    [activeFilter]
  );

  return (
    <SafeAreaView edges={['top']} style={styles.root}>
      {/* ── Header ── */}
      <AppHeader
        title="Pedidos"
        onMenuPress={() => setDrawerOpen(true)}
        showBell
        showCart
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Section Title ── */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Seus Pedidos</Text>
          <Text style={styles.sectionSub}>Acompanhe seus pedidos e certificados</Text>
        </View>

        {/* ── Filter Pills ── */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterRow}
          style={styles.filterScroll}
        >
          {FILTER_TABS.map((tab) => (
            <TouchableOpacity
              key={tab.key}
              style={[styles.filterPill, activeFilter === tab.key && styles.filterPillActive]}
              onPress={() => setActiveFilter(tab.key)}
              activeOpacity={0.8}
            >
              <Text style={[styles.filterPillText, activeFilter === tab.key && styles.filterPillTextActive]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* ── Promo Banner: Certificado Impresso ── */}
        <View style={styles.promoBanner}>
          <View style={styles.promoLeft}>
            <Text style={styles.promoTitle}>Compre agora o seu certificado impresso!</Text>
            <TouchableOpacity
              style={styles.promoBtn}
              onPress={() => router.push('/(tabs)/certificados' as any)}
              activeOpacity={0.85}
            >
              <Text style={styles.promoBtnText}>COMPRAR AGORA</Text>
            </TouchableOpacity>
          </View>

          {/* Decorative seal */}
          <View style={styles.promoSeal}>
            <View style={styles.sealOuter}>
              <Ionicons name="ribbon" size={22} color={Colors.primaryGreen} />
            </View>
          </View>
        </View>

        {/* ── Order Cards ── */}
        {filtered.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="receipt-outline" size={44} color={Colors.border} />
            <Text style={styles.emptyText}>Nenhum pedido encontrado</Text>
          </View>
        ) : (
          filtered.map((order) => {
            const statusInfo = STATUS_MAP[order.status];
            return (
              <View key={order.id} style={styles.orderCard}>
                {/* Top row: date + status badge */}
                <View style={styles.orderTopRow}>
                  <Text style={styles.orderDate}>{order.date}</Text>
                  <View style={[styles.statusBadge, { backgroundColor: statusInfo.bg }]}>
                    <Text style={[styles.statusText, { color: statusInfo.color }]}>
                      {statusInfo.label}
                    </Text>
                  </View>
                </View>

                {/* Main content row: thumbnail + info */}
                <View style={styles.orderMainRow}>
                  {/* Thumbnail */}
                  <View style={styles.orderThumbnail}>
                    <Ionicons name="document-text-outline" size={24} color={Colors.primaryGreen} />
                  </View>

                  {/* Info */}
                  <View style={styles.orderInfo}>
                    <Text style={styles.orderNumber}>{order.number}</Text>
                    <Text style={styles.orderType}>{order.type}</Text>
                    <Text style={styles.orderPrice}>
                      R$ {order.price.toFixed(2).replace('.', ',')}
                    </Text>
                  </View>
                </View>

                {/* Bottom: Ver detalhes link */}
                <TouchableOpacity
                  style={styles.detailsLink}
                  activeOpacity={0.7}
                  onPress={() => {}} // Navigate to order detail (future)
                >
                  <Text style={styles.detailsLinkText}>Ver detalhes do pedido</Text>
                  <Ionicons name="arrow-forward" size={13} color={Colors.primaryBlue} />
                </TouchableOpacity>
              </View>
            );
          })
        )}

        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F6F8FA' },
  scroll: { flex: 1 },
  scrollContent: { paddingBottom: 8 },

  // ── Section Header ─────────────────────────────────────────────────────────
  sectionHeader: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 14,
  },
  sectionTitle: {
    color: Colors.darkNavy,
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 2,
  },
  sectionSub: {
    color: Colors.gray,
    fontSize: 13,
  },

  // ── Filter Pills ───────────────────────────────────────────────────────────
  filterScroll: { flexGrow: 0 },
  filterRow: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 8,
  },
  filterPill: {
    paddingHorizontal: 18,
    paddingVertical: 9,
    borderRadius: 24,
    backgroundColor: '#E9EEF3',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  filterPillActive: {
    backgroundColor: Colors.primaryGreen,
    borderColor: Colors.primaryGreen,
  },
  filterPillText: {
    color: Colors.gray,
    fontSize: 13,
    fontWeight: '600',
  },
  filterPillTextActive: {
    color: Colors.white,
    fontWeight: '700',
  },

  // ── Promo Banner ───────────────────────────────────────────────────────────
  promoBanner: {
    backgroundColor: Colors.lightGreen,
    marginHorizontal: 16,
    marginBottom: 20,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  promoLeft: { flex: 1 },
  promoTitle: {
    color: Colors.darkNavy,
    fontSize: 14,
    fontWeight: '800',
    lineHeight: 19,
    marginBottom: 10,
  },
  promoBtn: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.primaryGreen,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  promoBtnText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.4,
  },
  promoSeal: {
    flexShrink: 0,
  },
  sealOuter: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: Colors.primaryGreen,
    borderStyle: 'dashed' as any,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // ── Order Card ─────────────────────────────────────────────────────────────
  orderCard: {
    backgroundColor: Colors.white,
    marginHorizontal: 16,
    marginBottom: 10,
    borderRadius: 12,
    padding: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  orderTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  orderDate: {
    color: Colors.gray,
    fontSize: 12,
    fontWeight: '500',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.4,
  },
  orderMainRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  orderThumbnail: {
    width: 52,
    height: 52,
    borderRadius: 10,
    backgroundColor: Colors.lightGreen,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  orderInfo: { flex: 1 },
  orderNumber: {
    color: Colors.darkNavy,
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 2,
  },
  orderType: {
    color: Colors.primaryBlue,
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 4,
  },
  orderPrice: {
    color: Colors.darkNavy,
    fontSize: 16,
    fontWeight: '800',
  },
  detailsLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  detailsLinkText: {
    color: Colors.primaryBlue,
    fontSize: 13,
    fontWeight: '600',
  },

  // ── Empty State ───────────────────────────────────────────────────────────
  emptyState: {
    alignItems: 'center',
    paddingTop: 48,
    gap: 12,
  },
  emptyText: {
    color: Colors.gray,
    fontSize: 14,
    fontWeight: '500',
  },
});
