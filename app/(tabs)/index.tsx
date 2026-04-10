import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/Colors';
import { Typography } from '../../constants/Typography';
import { MockCourses, MockUser } from '../../constants/MockData';
import AppHeader from '../../components/layout/AppHeader';
import CourseCard from '../../components/course/CourseCard';
import { useAppContext } from '../../context/AppContext';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function HomeScreen() {
  const router = useRouter();
  const { setDrawerOpen } = useAppContext();

  // In real app, you'd fetch courses from API
  const filtered = MockCourses;

  return (
    <SafeAreaView edges={['top']} style={styles.root}>
      {/* Header keeping the transparent style over the light bg */}
      <AppHeader
        title="" 
        showLogo={true} // Enabled Realizzare brand logo
        onMenuPress={() => setDrawerOpen(true)}
        showBell
        showCart
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Title Banner ── */}
        <View style={styles.titleSection}>
          <Text style={styles.subtitle}>ÁREA DO ALUNO</Text>
          <Text style={styles.mainTitle}>Acompanhe seu{'\n'}Progresso</Text>
          
          <View style={styles.creditsBadge}>
            <View style={styles.streakCircle}>
               <Ionicons name="flame" size={12} color={Colors.white} />
            </View>
            <Text style={styles.creditsText}>160 dias de ofensiva</Text>
          </View>
        </View>

        {/* ── Stats Grid System ── */}
        <View style={styles.gridContainer}>
          {/* Master Card: Ranking */}
          <View style={styles.masterCard}>
            <View style={styles.masterHeader}>
               <View style={styles.tropheyBox}>
                 <Ionicons name="trophy" size={20} color={Colors.amber} />
               </View>
               <View style={styles.topBadge}>
                  <Text style={styles.topBadgeText}>TOP 5%</Text>
               </View>
            </View>
            
            <View style={styles.masterContent}>
               <Text style={styles.masterLabel}>RANKING GLOBAL</Text>
               <Text style={styles.masterValue}>#{MockUser.position || 42}</Text>
               <Text style={styles.masterSub}>Subiu 4 posições esta semana</Text>
            </View>
            {/* Background Graphic Watermark */}
            <Ionicons name="star" size={140} color="rgba(255,255,255,0.03)" style={styles.watermark} />
          </View>

          {/* 2x2 Grid */}
          <View style={styles.row}>
            {/* Cursos */}
            <View style={[styles.gridCard, { backgroundColor: '#EAF5D4' }]}> {/* Light green */}
              <View style={[styles.iconBox, { backgroundColor: '#fff' }]}>
                <Ionicons name="school" size={18} color="#7D9955" />
              </View>
              <Text style={styles.cardLabel}>CURSOS</Text>
              <Text style={styles.cardValue}>{MockUser.totalCourses}</Text>
              <View style={styles.tinyProgressBar}>
                <View style={[styles.tinyProgressFill, { width: '60%' }]} />
              </View>
            </View>
            
            {/* Concluídos */}
            <View style={[styles.gridCard, { backgroundColor: '#D8ECFF' }]}> {/* Light blue */}
              <View style={[styles.iconBox, { backgroundColor: '#fff' }]}>
                <Ionicons name="checkmark-done" size={18} color="#5B8AC2" />
              </View>
              <Text style={styles.cardLabel}>CONCLUÍDOS</Text>
              <Text style={styles.cardValue}>{MockUser.completed}</Text>
              <Text style={[styles.cardSubText, { color: '#5B8AC2' }]}>Parabéns! 2 esta semana</Text>
            </View>
          </View>

          <View style={styles.row}>
            {/* Certificados */}
            <View style={[styles.gridCard, { backgroundColor: '#F0E5FF' }]}> {/* Light purple */}
              <View style={[styles.iconBox, { backgroundColor: '#fff' }]}>
                <Ionicons name="ribbon" size={18} color="#965EEB" />
              </View>
              <Text style={styles.cardLabel}>CERTIFICADOS</Text>
              <Text style={styles.cardValue}>{MockUser.certificates}</Text>
              <Text style={[styles.cardActionText, { color: '#965EEB' }]}>BAIXAR TODOS</Text>
            </View>

            {/* Créditos */}
            <View style={[styles.gridCard, { backgroundColor: '#FFF2DA' }]}> {/* Light orange */}
              <View style={[styles.iconBox, { backgroundColor: '#fff' }]}>
                <Ionicons name="cash" size={18} color="#CF9754" />
              </View>
              <Text style={styles.cardLabel}>CRÉDITOS</Text>
              <Text style={styles.cardValue}>5</Text>
              <Text style={styles.cardSubText}>Expira em 30 dias</Text>
            </View>
          </View>
        </View>

        {/* ── Section Header ── */}
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>Continuar Estudando</Text>
            <Text style={styles.sectionSubtitle}>{filtered.length} cursos em andamento</Text>
          </View>
          <TouchableOpacity activeOpacity={0.7} onPress={() => router.push('/meus-cursos' as any)}>
            <Text style={styles.sectionLink}>Ver todos</Text>
          </TouchableOpacity>
        </View>

        {/* ── Courses Horizontal Carousel ── */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalCourseList}
          snapToInterval={280 + 16} // card width + gap
          decelerationRate="fast"
          snapToAlignment="start"
        >
          {filtered.length === 0 ? (
             <Text style={styles.emptyText}>Nenhum curso encontrado</Text>
          ) : (
            filtered.map((course, idx) => (
              <View key={course.id} style={styles.horizontalCardWrapper}>
                <CourseCard
                  title={course.title}
                  workload={course.workload}
                  progress={course.progress}
                  status={course.status}
                  imageUrl={`https://picsum.photos/seed/${course.id}/400/200`} // Mock image placeholder
                  ctaVariant={idx % 2 === 0 ? 'dark' : 'light'} 
                  tag={idx % 2 === 0 ? 'DESIGN' : 'DADOS'}
                  onPress={() => router.push(`/course/${course.id}` as any)}
                />
              </View>
            ))
          )}
        </ScrollView>

        {/* ── Bottom Promotional Banner ── */}
        <View style={styles.promoBanner}>
          <Text style={styles.promoTitle}>Explorar Novos Rumos?</Text>
          <Text style={styles.promoSub}>
            Baseado no seu perfil, sugerimos a trilha de <Text style={{fontWeight: '700'}}>Marketing Estratégico.</Text>
          </Text>
          <TouchableOpacity style={styles.promoButton} activeOpacity={0.8}>
            <Text style={styles.promoButtonText}>Conhecer Trilha</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F6F8FA' },
  scroll: { flex: 1 },
  scrollContent: { paddingBottom: 40 },

  // ── Title Section ──
  titleSection: {
    paddingHorizontal: 20,
    paddingTop: 24, // Increased from 10 to 24 for more space below header
    marginBottom: 20,
  },
  subtitle: {
    color: '#3479A3', // Teal/Blueish
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  mainTitle: {
    color: Colors.darkNavy,
    fontSize: 26,
    fontWeight: '800',
    lineHeight: 32,
    marginBottom: 16,
  },
  creditsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 5,
    elevation: 2,
  },
  streakCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FF6B00', // Fiery orange for streak
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
  creditsText: {
    color: Colors.darkNavy,
    fontSize: 12,
    fontWeight: '700',
  },

  // ── Stats Grid ──
  gridContainer: {
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 28,
  },
  masterCard: {
    backgroundColor: '#27384E', // Dark desaturated navy
    borderRadius: 16,
    padding: 18,
    position: 'relative',
    overflow: 'hidden',
  },
  watermark: {
    position: 'absolute',
    right: -20,
    top: 10,
    zIndex: 0,
  },
  masterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
    zIndex: 1,
  },
  tropheyBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.06)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topBadge: {
    backgroundColor: '#6DB92D', // vibrant green
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  topBadgeText: {
    color: Colors.white,
    fontSize: 10,
    fontWeight: '800',
  },
  masterContent: {
    zIndex: 1,
  },
  masterLabel: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 4,
  },
  masterValue: {
    color: Colors.white,
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 4,
  },
  masterSub: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 11,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  gridCard: {
    flex: 1,
    borderRadius: 16,
    padding: 16,
    minHeight: 140,
    justifyContent: 'space-between',
  },
  iconBox: {
    width: 38,
    height: 38,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  cardLabel: {
    color: Colors.darkNavy, // they all have dark navy dense text
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  cardValue: {
    color: Colors.darkNavy,
    fontSize: 28,
    fontWeight: '800',
    marginTop: 2,
    marginBottom: 8,
  },
  cardSubText: {
    color: '#8C97A7',
    fontSize: 10,
    fontWeight: '500',
  },
  cardActionText: {
    fontSize: 10,
    fontWeight: '800',
    textDecorationLine: 'underline',
  },
  tinyProgressBar: {
    height: 4,
    backgroundColor: 'rgba(0,0,0,0.06)',
    borderRadius: 2,
    marginTop: 10,
  },
  tinyProgressFill: {
    height: 4,
    backgroundColor: '#7D9955',
    borderRadius: 2,
  },

  // ── Section Header ──
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    color: '#152433',
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 2,
  },
  sectionSubtitle: {
    color: '#8C97A7',
    fontSize: 12,
    fontWeight: '500',
  },
  sectionLink: {
    color: '#658C36', // Greenish
    fontSize: 12,
    fontWeight: '700',
    marginTop: 4,
  },

  // ── Course Carousel ──
  horizontalCourseList: {
    paddingHorizontal: 16,
    paddingBottom: 24, // room for shadows
    gap: 16,
  },
  horizontalCardWrapper: {
    width: 280, // Fixed width for horizontal carousel
  },
  emptyText: {
    color: Colors.gray,
    textAlign: 'center',
    padding: 40,
  },

  // ── Bottom Promo Banner ──
  promoBanner: {
    backgroundColor: '#7A9E35', // Solid green
    marginHorizontal: 16,
    borderRadius: 16,
    padding: 24,
  },
  promoTitle: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 8,
  },
  promoSub: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 20,
  },
  promoButton: {
    backgroundColor: Colors.white,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  promoButtonText: {
    color: '#7A9E35',
    fontSize: 12,
    fontWeight: '700',
  },
});
