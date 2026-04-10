import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors } from '../constants/Colors';
import { MockCourses, CourseStatus } from '../constants/MockData';
import CourseCard from '../components/course/CourseCard';
import BottomNav from '../components/layout/BottomNav';

type FilterTab = 'em andamento' | 'concluído';

export default function MeusCursosScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<FilterTab>('em andamento');

  const inProgressCount = useMemo(
    () => MockCourses.filter((c) => c.status === 'em andamento').length,
    []
  );

  const overallProgress = useMemo(() => {
    if (MockCourses.length === 0) return 0;
    const avg = MockCourses.reduce((acc, c) => acc + c.progress, 0) / MockCourses.length;
    return Math.round(avg);
  }, []);

  const filtered = useMemo(
    () => MockCourses.filter((c) => c.status === activeTab as CourseStatus),
    [activeTab]
  );

  return (
    <SafeAreaView edges={['top']} style={styles.root}>
      {/* ── Header ── */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-back" size={24} color={Colors.white} />
        </TouchableOpacity>

        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Meus Cursos</Text>
        </View>

        {/* Right icons — same as Home */}
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconBtn} activeOpacity={0.7}>
            <Ionicons name="notifications-outline" size={22} color={Colors.white} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn} activeOpacity={0.7}>
            <Ionicons name="cart-outline" size={22} color={Colors.white} />
          </TouchableOpacity>
        </View>
      </View>

      {/* ── Sticky Filter Tabs ── */}
      <View style={styles.filterRow}>
        {(['em andamento', 'concluído'] as FilterTab[]).map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.filterTab, activeTab === tab && styles.filterTabActive]}
            onPress={() => setActiveTab(tab)}
            activeOpacity={0.8}
          >
            <Text style={[styles.filterTabText, activeTab === tab && styles.filterTabTextActive]}>
              {tab === 'em andamento' ? 'Em andamento' : 'Concluídos'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* ── Progress Summary Banner ── */}
      <View style={styles.summaryBanner}>
        <View style={styles.summaryLeft}>
          <Text style={styles.summaryTitle}>
            Você tem <Text style={styles.summaryHighlight}>{inProgressCount}</Text>{' '}
            {inProgressCount === 1 ? 'curso' : 'cursos'} em andamento
          </Text>
          <Text style={styles.summarySubtext}>Continue avançando! 🚀</Text>
        </View>

        {/* Donut Progress */}
        <View style={styles.donutWrapper}>
          <View style={styles.donutOuter}>
            <View style={styles.donutInner}>
              <Text style={styles.donutValue}>{overallProgress}%</Text>
            </View>
          </View>
          <Text style={styles.donutLabel}>Progresso</Text>
        </View>
      </View>

      {/* ── Course List ── */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {filtered.length === 0 ? (
          // ── Empty State ──
          <View style={styles.emptyState}>
            <View style={styles.emptyIconCircle}>
              <Ionicons name="book-outline" size={36} color={Colors.primaryGreen} />
            </View>
            <Text style={styles.emptyTitle}>
              {activeTab === 'concluído'
                ? 'Nenhum curso concluído ainda'
                : 'Nenhum curso em andamento'}
            </Text>
            <Text style={styles.emptySubtext}>
              {activeTab === 'concluído'
                ? 'Continue estudando para ver seus cursos concluídos aqui.'
                : 'Explore novos cursos e comece sua jornada de aprendizado.'}
            </Text>
            <TouchableOpacity
              style={styles.exploreBtn}
              onPress={() => router.push('/(tabs)/explorar' as any)}
              activeOpacity={0.8}
            >
              <Text style={styles.exploreBtnText}>Explorar Cursos</Text>
            </TouchableOpacity>
          </View>
        ) : (
          filtered.map((course, idx) => (
            <View key={course.id} style={styles.cardWrapper}>
              <CourseCard
                title={course.title}
                workload={course.workload}
                progress={course.progress}
                status={course.status}
                imageUrl={`https://picsum.photos/seed/${course.id}/400/200`}
                ctaVariant="dark"
                tag={idx % 2 === 0 ? 'DESIGN' : 'DADOS'}
                onPress={() => router.push(`/course/${course.id}` as any)}
              />
            </View>
          ))
        )}
      </ScrollView>
      {/* ── BottomNav ── */}
      <BottomNav
        activeTab="home"
        onTabPress={(tab) => {
          const routes: Record<string, string> = {
            home: '/(tabs)',
            explorar: '/(tabs)/explorar',
            certificados: '/(tabs)/certificados',
            pedidos: '/(tabs)/pedidos',
            perfil: '/(tabs)/perfil',
          };
          router.push(routes[tab] as any);
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F6F8FA',
  },

  // ── Header ──────────────────────────────────────────────────────────────────
  header: {
    height: 62,
    backgroundColor: Colors.darkNavy,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
  backBtn: {
    width: 48,
    height: 62,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    color: Colors.white,
    fontSize: 15,
    fontWeight: '700',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 12,
    gap: 4,
  },
  iconBtn: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // ── Filter Tabs ─────────────────────────────────────────────────────────────
  filterRow: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    // Sticky shadow
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 4 },
      android: { elevation: 3 },
    }),
  },
  filterTab: {
    flex: 1,
    paddingVertical: 9,
    borderRadius: 20,
    alignItems: 'center',
    backgroundColor: '#F0F4F8',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  filterTabActive: {
    backgroundColor: Colors.primaryGreen,
    borderColor: Colors.primaryGreen,
  },
  filterTabText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.gray,
  },
  filterTabTextActive: {
    color: Colors.white,
    fontWeight: '700',
  },

  // ── Summary Banner ──────────────────────────────────────────────────────────
  summaryBanner: {
    backgroundColor: Colors.lightGreen,
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  summaryLeft: {
    flex: 1,
    paddingRight: 12,
  },
  summaryTitle: {
    color: Colors.darkNavy,
    fontSize: 13,
    fontWeight: '600',
    lineHeight: 19,
    marginBottom: 2,
  },
  summaryHighlight: {
    color: Colors.primaryGreen,
    fontWeight: '800',
    fontSize: 15,
  },
  summarySubtext: {
    color: '#7A9E35',
    fontSize: 11,
    fontWeight: '500',
  },

  // Donut
  donutWrapper: {
    alignItems: 'center',
    gap: 4,
  },
  donutOuter: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: Colors.primaryGreen,
    alignItems: 'center',
    justifyContent: 'center',
  },
  donutInner: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: Colors.lightGreen,
    alignItems: 'center',
    justifyContent: 'center',
  },
  donutValue: {
    color: Colors.darkNavy,
    fontSize: 11,
    fontWeight: '800',
  },
  donutLabel: {
    color: Colors.primaryGreen,
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.5,
  },

  // ── Scroll List ─────────────────────────────────────────────────────────────
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 32,
    gap: 12,
  },
  cardWrapper: {
    // gap fallback for older RN
    marginBottom: 0,
  },

  // ── Empty State ─────────────────────────────────────────────────────────────
  emptyState: {
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 32,
    gap: 12,
  },
  emptyIconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.lightGreen,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  emptyTitle: {
    color: Colors.darkNavy,
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
  emptySubtext: {
    color: Colors.gray,
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 19,
  },
  exploreBtn: {
    marginTop: 8,
    backgroundColor: Colors.primaryGreen,
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 24,
  },
  exploreBtnText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '700',
  },
});
