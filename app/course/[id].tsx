import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../../constants/Colors';
import { MockCourses, MockModules } from '../../constants/MockData';
import ModuleAccordion from '../../components/course/ModuleAccordion';
import LessonRow from '../../components/course/LessonRow';
import BottomNav from '../../components/layout/BottomNav';

const TAGS: Record<string, string> = {
  '1': 'GESTÃO',
  '2': 'LIDERANÇA',
  '3': 'MARKETING',
  '4': 'FINANÇAS',
  '5': 'COMUNICAÇÃO',
};

export default function CourseDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const course = useMemo(
    () => MockCourses.find((c) => c.id === id) ?? MockCourses[0],
    [id]
  );

  const modules = useMemo(
    () => MockModules.filter((m) => m.courseId === id),
    [id]
  );

  // Default first module open if course is in progress
  const defaultExpanded = course.status === 'em andamento' && modules.length > 0
    ? modules[0].id
    : null;

  const [expandedModuleId, setExpandedModuleId] = useState<string | null>(defaultExpanded);

  const handleToggle = (moduleId: string) => {
    setExpandedModuleId((prev) => (prev === moduleId ? null : moduleId));
  };

  const tag = TAGS[id] ?? 'DESIGN';

  // Find the last active or available lesson to resume from
  const resumeLesson = useMemo(() => {
    for (const mod of modules) {
      // check active first
      const active = mod.lessons.find((l) => l.status === 'active');
      if (active) return active;
    }
    for (const mod of modules) {
      // fallback to first available
      const available = mod.lessons.find((l) => l.status === 'available');
      if (available) return available;
    }
    // Ultimate fallback: first lesson
    return modules[0]?.lessons[0] ?? null;
  }, [modules]);

  return (
    <SafeAreaView edges={['top', 'bottom']} style={styles.root}>
      {/* ── Sticky Header ── */}
      <View style={styles.stickyHeader}>
        <TouchableOpacity style={styles.headerBackBtn} onPress={() => router.back()} activeOpacity={0.7}>
          <Ionicons name="chevron-back" size={24} color={Colors.white} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle} numberOfLines={1}>Meus Cursos</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerIconBtn} activeOpacity={0.7}>
            <Ionicons name="notifications-outline" size={22} color={Colors.white} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIconBtn} activeOpacity={0.7}>
            <Ionicons name="cart-outline" size={22} color={Colors.white} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Hero Banner ── */}
        <View style={styles.hero}>
          {/* Background image via Picsum */}
          <View style={[styles.heroBg, { backgroundColor: course.thumbnailColor }]}>
            {/* Gradient overlay */}
            <LinearGradient
              colors={['transparent', `${Colors.darkNavy}E6`]}
              style={StyleSheet.absoluteFillObject}
              start={{ x: 0, y: 0.3 }}
              end={{ x: 0, y: 1 }}
            />
          </View>

          {/* No back button in hero — header handles navigation */}

          {/* Hero content at bottom */}
          <View style={styles.heroContent}>
            {/* Category badge */}
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryBadgeText}>{tag}</Text>
            </View>

            {/* Title */}
            <Text style={styles.heroTitle}>{course.title}</Text>

            {/* Metadata row */}
            <View style={styles.heroMeta}>
              <View style={styles.heroMetaItem}>
                <Ionicons name="albums-outline" size={12} color="rgba(255,255,255,0.7)" />
                <Text style={styles.heroMetaText}>{modules.length > 0 ? modules.length : 6} módulos</Text>
              </View>
              <View style={styles.heroMetaDot} />
              <View style={styles.heroMetaItem}>
                <Ionicons name="play-circle-outline" size={12} color="rgba(255,255,255,0.7)" />
                <Text style={styles.heroMetaText}>{course.totalLessons} aulas</Text>
              </View>
              <View style={styles.heroMetaDot} />
              <View style={styles.heroMetaItem}>
                <Ionicons name="time-outline" size={12} color="rgba(255,255,255,0.7)" />
                <Text style={styles.heroMetaText}>{course.workload} de conteúdo</Text>
              </View>
            </View>
          </View>
        </View>

        {/* ── Progress Zone ── */}
        <View style={styles.progressZone}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressLabel}>SEU PROGRESSO</Text>
            <Text style={styles.progressPercent}>{course.progress}% Concluído</Text>

            {/* Donut right */}
            <View style={styles.donutOuter}>
              <View style={styles.donutInner}>
                <Text style={styles.donutText}>{course.progress}%</Text>
              </View>
            </View>
          </View>

          {/* Bar */}
          <View style={styles.progressBarTrack}>
            <View style={[styles.progressBarFill, { width: `${course.progress}%` as any }]} />
          </View>

          <Text style={styles.progressSub}>
            {course.completedLessons} de {course.totalLessons} aulas concluídas
          </Text>
        </View>

        {/* ── Action Buttons Row ── */}
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.detailsBtn} activeOpacity={0.8}>
            <Ionicons name="list-outline" size={16} color={Colors.primaryGreen} />
            <Text style={styles.detailsBtnText}>Ver Detalhes</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.continueBtn}
            onPress={() => {
              if (resumeLesson) {
                router.push(`/course/player/${resumeLesson.id}` as any);
              }
            }}
            activeOpacity={0.85}
          >
            <Ionicons name="play" size={14} color={Colors.white} />
            <Text style={styles.continueBtnText}>CONTINUAR CURSO</Text>
          </TouchableOpacity>
        </View>

        {/* ── Module Accordion List ── */}
        <View style={styles.accordionSection}>
          {modules.map((module) => (
            <ModuleAccordion
              key={module.id}
              moduleNumber={module.moduleNumber}
              title={module.title}
              lessonCount={module.lessons.length}
              duration={module.duration}
              status={module.status}
              isExpanded={expandedModuleId === module.id}
              onToggle={() => handleToggle(module.id)}
            >
              {module.lessons.map((lesson) => (
                <LessonRow
                  key={lesson.id}
                  title={lesson.title}
                  type={lesson.type}
                  duration={lesson.duration}
                  status={lesson.status}
                  onPress={() => router.push(`/course/player/${lesson.id}` as any)}
                />
              ))}
            </ModuleAccordion>
          ))}

          {/* Locked modules indicator (if no mock modules for this course) */}
          {modules.length === 0 && (
            <View style={styles.lockedBanner}>
              <Ionicons name="lock-closed-outline" size={14} color={Colors.gray} />
              <Text style={styles.lockedBannerText}>+ 3 MÓDULOS BLOQUEADOS</Text>
            </View>
          )}
        </View>

        {/* ── Assessment Card ── */}
        <View style={styles.assessmentCard}>
          <View style={styles.assessmentLeft}>
            <View style={styles.assessmentIconBox}>
              <Ionicons name="clipboard-outline" size={22} color={Colors.amber} />
            </View>
            <View style={styles.assessmentInfo}>
              <Text style={styles.assessmentTitle}>Avaliação Final</Text>
              <Text style={styles.assessmentSub}>
                Complete todos os módulos anteriores para desbloquear sua prova e certificar-se.
              </Text>
            </View>
          </View>
          <View style={styles.lockCircle}>
            <Ionicons name="lock-closed" size={20} color={Colors.gray} />
          </View>
        </View>

        {/* ── Certificate CTA Card ── */}
        <View style={styles.certCard}>
          {/* Icon top */}
          <View style={styles.certIconCircle}>
            <Ionicons name="ribbon" size={28} color={Colors.primaryGreen} />
          </View>

          <Text style={styles.certTitle}>Certificado de Especialista</Text>
          <Text style={styles.certSub}>
            Ao concluir este curso, você receberá seu certificado digital reconhecido em todo território nacional.
          </Text>

          <TouchableOpacity
            style={styles.certBtn}
            onPress={() => router.push('/(tabs)/certificados' as any)}
            activeOpacity={0.8}
          >
            <Text style={styles.certBtnText}>VER OPÇÕES</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom spacer */}
        <View style={{ height: 24 }} />
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

  // ── Sticky Header ──────────────────────────────────────────────
  stickyHeader: {
    height: 62,
    backgroundColor: Colors.darkNavy,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerBackBtn: {
    width: 48,
    height: 62,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCenter: {
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
  headerIconBtn: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },

  scroll: { flex: 1 },
  scrollContent: { paddingBottom: 0 },

  // ── Hero ─────────────────────────────────────────────────────────────────────
  hero: {
    height: 260,
    position: 'relative',
    overflow: 'hidden',
  },
  heroBg: {
    ...StyleSheet.absoluteFillObject,
  },
  heroSafeArea: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    paddingTop: 0,
  },
  backBtn: {
    margin: 12,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingBottom: 20,
    zIndex: 5,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.primaryGreen,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 8,
  },
  categoryBadgeText: {
    color: Colors.white,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  heroTitle: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: '800',
    lineHeight: 26,
    marginBottom: 10,
  },
  heroMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  heroMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  heroMetaText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
  },
  heroMetaDot: {
    width: 3,
    height: 3,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.4)',
  },

  // ── Progress Zone ─────────────────────────────────────────────────────────────
  progressZone: {
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  progressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressLabel: {
    color: Colors.gray,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.8,
    flex: 1,
  },
  progressPercent: {
    color: Colors.darkNavy,
    fontSize: 12,
    fontWeight: '700',
    marginRight: 10,
  },
  // Donut
  donutOuter: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.primaryGreen,
    alignItems: 'center',
    justifyContent: 'center',
  },
  donutInner: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  donutText: {
    color: Colors.darkNavy,
    fontSize: 9,
    fontWeight: '800',
  },
  // Bar
  progressBarTrack: {
    height: 8,
    backgroundColor: '#E8F0D8',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 6,
  },
  progressBarFill: {
    height: 8,
    backgroundColor: Colors.primaryGreen,
    borderRadius: 4,
  },
  progressSub: {
    color: Colors.gray,
    fontSize: 11,
  },

  // ── Action Buttons ────────────────────────────────────────────────────────────
  actionRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 10,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  detailsBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 11,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: Colors.primaryGreen,
    backgroundColor: Colors.white,
  },
  detailsBtnText: {
    color: Colors.primaryGreen,
    fontSize: 13,
    fontWeight: '700',
  },
  continueBtn: {
    flex: 1.4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 11,
    borderRadius: 10,
    backgroundColor: Colors.primaryGreen,
  },
  continueBtnText: {
    color: Colors.white,
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0.3,
  },

  // ── Accordion Section ──────────────────────────────────────────────
  accordionSection: {
    marginTop: 12,
    paddingHorizontal: 12,
    gap: 8,
  },
  lockedBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 14,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  lockedBannerText: {
    color: Colors.gray,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
  },

  // ── Assessment Card ───────────────────────────────────────────────────────────
  assessmentCard: {
    marginHorizontal: 16,
    marginTop: 16,
    backgroundColor: '#FFFBEB',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FDE68A',
    gap: 12,
  },
  assessmentLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  assessmentIconBox: {
    width: 42,
    height: 42,
    borderRadius: 10,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  assessmentInfo: {
    flex: 1,
  },
  assessmentTitle: {
    color: Colors.darkNavy,
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 4,
  },
  assessmentSub: {
    color: Colors.gray,
    fontSize: 11,
    lineHeight: 16,
  },
  lockCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },

  // ── Certificate Card ──────────────────────────────────────────────────────────
  certCard: {
    marginHorizontal: 16,
    marginTop: 16,
    backgroundColor: Colors.darkNavy,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
  },
  certIconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(141,179,54,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  certTitle: {
    color: Colors.white,
    fontSize: 17,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 8,
  },
  certSub: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 20,
  },
  certBtn: {
    borderWidth: 1.5,
    borderColor: Colors.primaryGreen,
    paddingVertical: 10,
    paddingHorizontal: 28,
    borderRadius: 24,
  },
  certBtnText: {
    color: Colors.primaryGreen,
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
});
