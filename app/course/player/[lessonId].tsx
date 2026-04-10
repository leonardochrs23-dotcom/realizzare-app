import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Colors } from '../../../constants/Colors';
import {
  MockCourses,
  MockModules as allModules,
} from '../../../constants/MockData';
import ModuleAccordion from '../../../components/course/ModuleAccordion';
import LessonRow from '../../../components/course/LessonRow';
import BottomNav from '../../../components/layout/BottomNav';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const PLAYER_HEIGHT = SCREEN_WIDTH * (9 / 16);

type PlayerTab = 'aula' | 'conteudo' | 'material';

const MOCK_MATERIALS = [
  { id: 'm1', name: 'Material de apoio - Módulo 1.pdf', type: 'pdf', size: '2.4 MB' },
  { id: 'm2', name: 'Resumo - Alta Performance.pdf', type: 'pdf', size: '1.1 MB' },
  { id: 'm3', name: 'Links e Recursos Extras.url', type: 'link', size: null as string | null },
];

// Flatten all lessons across all modules into a single ordered list
const ALL_LESSONS_FLAT = allModules.flatMap((mod) =>
  mod.lessons.map((lesson) => ({ ...lesson, moduleId: mod.id, moduleNumber: mod.moduleNumber, courseId: mod.courseId }))
);

export default function LessonPlayerScreen() {
  const { lessonId } = useLocalSearchParams<{ lessonId: string }>();
  const router = useRouter();

  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState<PlayerTab>('aula');
  const [expandedModuleId, setExpandedModuleId] = useState<string | null>('m1');

  // Find current lesson in the flat list
  const flatIndex = useMemo(
    () => ALL_LESSONS_FLAT.findIndex((l) => l.id === lessonId),
    [lessonId]
  );

  const currentFlatLesson = useMemo(
    () => ALL_LESSONS_FLAT[flatIndex] ?? ALL_LESSONS_FLAT[0],
    [flatIndex]
  );

  // Find the module this lesson belongs to
  const currentModule = useMemo(
    () => allModules.find((m) => m.id === currentFlatLesson.moduleId) ?? allModules[0],
    [currentFlatLesson]
  );

  const lessonIndexInModule = useMemo(
    () => currentModule.lessons.findIndex((l) => l.id === currentFlatLesson.id),
    [currentModule, currentFlatLesson]
  );

  const course = useMemo(
    () => MockCourses.find((c) => c.id === currentFlatLesson.courseId) ?? MockCourses[0],
    [currentFlatLesson]
  );

  const courseModules = useMemo(
    () => allModules.filter((m) => m.courseId === currentFlatLesson.courseId),
    [currentFlatLesson]
  );

  // Previous / next lesson navigation
  const prevLesson = flatIndex > 0 ? ALL_LESSONS_FLAT[flatIndex - 1] : null;
  const nextLesson = flatIndex < ALL_LESSONS_FLAT.length - 1 ? ALL_LESSONS_FLAT[flatIndex + 1] : null;

  const handlePrev = () => {
    if (prevLesson) router.replace(`/course/player/${prevLesson.id}` as any);
  };

  const handleNext = () => {
    if (nextLesson) router.replace(`/course/player/${nextLesson.id}` as any);
  };

  const handleToggleModule = (id: string) => {
    setExpandedModuleId((prev) => (prev === id ? null : id));
  };

  const tabRoutes: Record<string, string> = {
    home: '/(tabs)',
    explorar: '/(tabs)/explorar',
    certificados: '/(tabs)/certificados',
    pedidos: '/(tabs)/pedidos',
    perfil: '/(tabs)/perfil',
  };

  return (
    <SafeAreaView edges={['top', 'bottom']} style={styles.root}>

      {/* ══════════════════════════════════════════════════════════
          HEADER — fixed at top, always visible
      ══════════════════════════════════════════════════════════ */}
      <View style={styles.header}>
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

      {/* ══════════════════════════════════════════════════════════
          MAIN SCROLL — everything from player down scrolls together
      ══════════════════════════════════════════════════════════ */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[2]} // Tab bar (index 2 in our render children) stays sticky
      >
        {/* ── 0: Video Player Zone ── */}
        <View style={styles.playerZone}>
          <View style={[styles.thumbnail, { backgroundColor: course.thumbnailColor }]} />

          <TouchableOpacity
            style={styles.playCircle}
            onPress={() => setIsPlaying((v) => !v)}
            activeOpacity={0.85}
          >
            <Ionicons
              name={isPlaying ? 'pause' : 'play'}
              size={28}
              color={Colors.white}
              style={{ marginLeft: isPlaying ? 0 : 3 }}
            />
          </TouchableOpacity>

          <View style={styles.watermarkWrapper}>
            <Image
              source={require('../../../assets/logo-profile.png')}
              style={styles.watermarkLogo}
              resizeMode="contain"
            />
          </View>

          <View style={styles.youtubeBadge}>
            <View style={styles.ytDot} />
            <Text style={styles.ytText}>Watch on YouTube</Text>
          </View>
        </View>

        {/* ── 1: Controls + Info ── */}
        <View>
          {/* Mini progress bar */}
          <View style={styles.miniProgressTrack}>
            <View style={[styles.miniProgressFill, { width: '5%' }]} />
          </View>

          {/* Controls strip */}
          <View style={styles.controlsStrip}>
            <TouchableOpacity style={styles.ctrlBtn}>
              <Ionicons name="play-back" size={20} color={Colors.white} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.ctrlBtn} onPress={() => setIsPlaying((v) => !v)}>
              <Ionicons name={isPlaying ? 'pause' : 'play'} size={20} color={Colors.white} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.ctrlBtn}>
              <Ionicons name="play-forward" size={20} color={Colors.white} />
            </TouchableOpacity>
            <Text style={styles.timeLabel}>0:32 / 14:18</Text>
            <View style={styles.ctrlSpacer} />
            <TouchableOpacity style={styles.ctrlBtn}>
              <Text style={styles.speedLabel}>1x</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.ctrlBtn}>
              <Ionicons name="text-outline" size={18} color={Colors.white} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.ctrlBtn}>
              <Ionicons name="scan-outline" size={18} color={Colors.white} />
            </TouchableOpacity>
          </View>

          {/* Lesson info bar */}
          <View style={styles.lessonInfoBar}>
            <View style={styles.lessonInfoLeft}>
              <Text style={styles.lessonBreadcrumb}>
                Módulo {currentModule.moduleNumber} · Aula {lessonIndexInModule + 1} de {currentModule.lessons.length}
              </Text>
              <Text style={styles.lessonTitle} numberOfLines={2}>{currentFlatLesson.title}</Text>
            </View>
            <View style={styles.donutWrapper}>
              <View style={styles.donutOuter}>
                <View style={styles.donutInner}>
                  <Text style={styles.donutText}>{course.progress}%</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Chips row */}
          <View style={styles.chipsRow}>
            <View style={[styles.chip, { backgroundColor: '#E8F4FD' }]}>
              <Ionicons name="time-outline" size={11} color="#2980B9" />
              <Text style={[styles.chipText, { color: '#2980B9' }]}>14 MIN</Text>
            </View>
            <View style={[styles.chip, { backgroundColor: Colors.lightGreen }]}>
              <Ionicons name="albums-outline" size={11} color={Colors.primaryGreen} />
              <Text style={[styles.chipText, { color: Colors.primaryGreen }]}>MÓDULO {currentModule.moduleNumber}</Text>
            </View>
            <View style={[styles.chip, { backgroundColor: '#EEF5FF' }]}>
              <Ionicons name="play-circle-outline" size={11} color="#3498DB" />
              <Text style={[styles.chipText, { color: '#3498DB' }]}>EM ANDAMENTO</Text>
            </View>
          </View>
        </View>

        {/* ── 2: Tab Bar — THIS IS THE STICKY ITEM (index 2) ── */}
        <View style={styles.tabBar}>
          {([
            { key: 'aula', label: 'Aula' },
            { key: 'conteudo', label: 'Conteúdo' },
            { key: 'material', label: 'Material', badge: true },
          ] as const).map((tab) => (
            <TouchableOpacity
              key={tab.key}
              style={styles.tabItem}
              onPress={() => setActiveTab(tab.key)}
              activeOpacity={0.75}
            >
              <View style={styles.tabLabelRow}>
                <Text style={[styles.tabLabel, activeTab === tab.key && styles.tabLabelActive]}>
                  {tab.label}
                </Text>
                {tab.badge && <View style={styles.tabDot} />}
              </View>
              {activeTab === tab.key && <View style={styles.tabUnderline} />}
            </TouchableOpacity>
          ))}
        </View>

        {/* ── 3: Tab Content ── */}
        <View style={styles.tabContent}>
          {/* Tab: Aula */}
          {activeTab === 'aula' && (
            <View>
              <Text style={styles.sectionTitle}>INSTRUTORES</Text>
              {[
                { name: 'Karol Dias', role: 'ESPECIALISTA EM GESTÃO', bio: 'Mestra em educação com mais de 10 anos de experiência no mercado corporativo.', color: '#C47A6A' },
                { name: 'Rita Lima', role: 'PSICOPEDAGOGA', bio: 'Focada em metodologias ativas e desenvolvimento humano integral.', color: '#7A6AC4' },
              ].map((instructor, idx) => (
                <View key={idx} style={styles.instructorCard}>
                  <View style={[styles.instructorAvatar, { backgroundColor: instructor.color }]}>
                    <Ionicons name="person" size={22} color={Colors.white} />
                  </View>
                  <View style={styles.instructorInfo}>
                    <Text style={styles.instructorName}>{instructor.name}</Text>
                    <Text style={styles.instructorRole}>{instructor.role}</Text>
                    <Text style={styles.instructorBio}>{instructor.bio}</Text>
                  </View>
                </View>
              ))}

              <View style={styles.objectiveCard}>
                <View style={styles.objectiveHeader}>
                  <Ionicons name="rocket-outline" size={16} color={Colors.primaryGreen} />
                  <Text style={styles.objectiveTitle}>OBJETIVO DO CURSO</Text>
                </View>
                <Text style={styles.objectiveText}>
                  Nesta aula introdutória, apresentaremos a estrutura completa do treinamento, as ferramentas de suporte disponíveis e como você pode otimizar seu tempo de estudo para obter a certificação máxima.
                </Text>
              </View>
            </View>
          )}

          {/* Tab: Conteúdo */}
          {activeTab === 'conteudo' && (
            <View style={styles.accordionList}>
              {courseModules.map((mod) => (
                <ModuleAccordion
                  key={mod.id}
                  moduleNumber={mod.moduleNumber}
                  title={mod.title}
                  lessonCount={mod.lessons.length}
                  duration={mod.duration}
                  status={mod.status}
                  isExpanded={expandedModuleId === mod.id}
                  onToggle={() => handleToggleModule(mod.id)}
                >
                  {mod.lessons.map((lesson) => (
                    <LessonRow
                      key={lesson.id}
                      title={lesson.title}
                      type={lesson.type}
                      duration={lesson.duration}
                      status={lesson.status}
                      onPress={() => router.replace(`/course/player/${lesson.id}` as any)}
                    />
                  ))}
                </ModuleAccordion>
              ))}
            </View>
          )}

          {/* Tab: Material */}
          {activeTab === 'material' && (
            <View>
              {MOCK_MATERIALS.map((mat) => (
                <View key={mat.id} style={styles.materialCard}>
                  <View style={[styles.materialTypeIcon, { backgroundColor: mat.type === 'pdf' ? '#FFECEC' : '#EEF5FF' }]}>
                    <Ionicons
                      name={mat.type === 'pdf' ? 'document-text-outline' : 'link-outline'}
                      size={20}
                      color={mat.type === 'pdf' ? '#E74C3C' : '#3498DB'}
                    />
                  </View>
                  <View style={styles.materialInfo}>
                    <Text style={styles.materialName} numberOfLines={2}>{mat.name}</Text>
                    {mat.size && <Text style={styles.materialSize}>{mat.size}</Text>}
                  </View>
                  <TouchableOpacity style={styles.downloadBtn} activeOpacity={0.8}>
                    <Ionicons name="download-outline" size={18} color={Colors.primaryGreen} />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}

          <View style={{ height: 16 }} />
        </View>
      </ScrollView>

      {/* ══════════════════════════════════════════════════════════
          BOTTOM ACTION BAR — sticky above BottomNav
      ══════════════════════════════════════════════════════════ */}
      <View style={styles.actionBar}>
        <TouchableOpacity
          style={[styles.prevBtn, !prevLesson && styles.btnDisabled]}
          onPress={handlePrev}
          disabled={!prevLesson}
          activeOpacity={0.8}
        >
          <Ionicons name="arrow-back" size={13} color={prevLesson ? Colors.gray : Colors.border} />
          <Text style={[styles.prevBtnText, !prevLesson && styles.btnTextDisabled]}>Anterior</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.nextBtn, !nextLesson && styles.nextBtnDisabled]}
          onPress={handleNext}
          disabled={!nextLesson}
          activeOpacity={0.85}
        >
          <Text style={styles.nextBtnText}>
            {nextLesson ? 'CONCLUIR E AVANÇAR' : 'CURSO CONCLUÍDO'}
          </Text>
          <Ionicons name="arrow-forward" size={13} color={Colors.white} />
        </TouchableOpacity>
      </View>

      {/* ══════════════════════════════════════════════════════════
          BOTTOM NAV
      ══════════════════════════════════════════════════════════ */}
      <BottomNav
        activeTab="home"
        onTabPress={(tab) => router.push(tabRoutes[tab] as any)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F6F8FA' },

  // ── Header ──────────────────────────────────────────────────────────────────
  header: {
    height: 62,
    backgroundColor: Colors.darkNavy,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerBackBtn: { width: 48, height: 62, alignItems: 'center', justifyContent: 'center' },
  headerCenter: { flex: 1, alignItems: 'center' },
  headerTitle: { color: Colors.white, fontSize: 15, fontWeight: '700' },
  headerRight: { flexDirection: 'row', alignItems: 'center', paddingRight: 12, gap: 4 },
  headerIconBtn: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },

  // ── Scroll ──────────────────────────────────────────────────────────────────
  scroll: { flex: 1 },
  scrollContent: { paddingBottom: 0 },

  // ── Player ──────────────────────────────────────────────────────────────────
  playerZone: {
    width: SCREEN_WIDTH,
    height: PLAYER_HEIGHT,
    backgroundColor: Colors.black,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbnail: { ...StyleSheet.absoluteFillObject, opacity: 0.85 },
  playCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#E53935',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  watermarkWrapper: {
    position: 'absolute',
    bottom: 10,
    left: 12,
    zIndex: 3,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 4,
    padding: 3,
  },
  watermarkLogo: { height: 20, width: 80 },
  youtubeBadge: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    zIndex: 3,
    backgroundColor: 'rgba(0,0,0,0.55)',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  ytDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#E53935' },
  ytText: { color: Colors.white, fontSize: 10, fontWeight: '600' },

  // ── Controls ─────────────────────────────────────────────────────────────────
  miniProgressTrack: { height: 4, backgroundColor: '#2C2C2C' },
  miniProgressFill: { height: 4, backgroundColor: Colors.primaryGreen },
  controlsStrip: {
    height: 48,
    backgroundColor: '#1A1A1A',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    gap: 2,
  },
  ctrlBtn: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
  timeLabel: { color: 'rgba(255,255,255,0.75)', fontSize: 12, fontWeight: '500', marginLeft: 4, letterSpacing: 0.2 },
  ctrlSpacer: { flex: 1 },
  speedLabel: { color: Colors.white, fontSize: 12, fontWeight: '700' },

  // ── Lesson Info Bar ──────────────────────────────────────────────────────────
  lessonInfoBar: {
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  lessonInfoLeft: { flex: 1, paddingRight: 12 },
  lessonBreadcrumb: { color: Colors.gray, fontSize: 11, marginBottom: 2 },
  lessonTitle: { color: Colors.darkNavy, fontSize: 15, fontWeight: '800', lineHeight: 20 },
  donutWrapper: { alignItems: 'center', gap: 2 },
  donutOuter: { width: 44, height: 44, borderRadius: 22, backgroundColor: Colors.primaryGreen, alignItems: 'center', justifyContent: 'center' },
  donutInner: { width: 32, height: 32, borderRadius: 16, backgroundColor: Colors.white, alignItems: 'center', justifyContent: 'center' },
  donutText: { color: Colors.darkNavy, fontSize: 9, fontWeight: '800' },

  // ── Chips ─────────────────────────────────────────────────────────────────────
  chipsRow: { flexDirection: 'row', paddingHorizontal: 16, paddingVertical: 8, gap: 6, backgroundColor: Colors.white },
  chip: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  chipText: { fontSize: 10, fontWeight: '700', letterSpacing: 0.3 },

  // ── Tab Bar (becomes sticky via stickyHeaderIndices) ─────────────────────────
  tabBar: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  tabItem: { flex: 1, alignItems: 'center', paddingVertical: 10, position: 'relative' },
  tabLabelRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  tabLabel: { color: Colors.gray, fontSize: 13, fontWeight: '600' },
  tabLabelActive: { color: Colors.primaryGreen, fontWeight: '700' },
  tabUnderline: { position: 'absolute', bottom: 0, left: '15%', right: '15%', height: 2, backgroundColor: Colors.primaryGreen, borderRadius: 2 },
  tabDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: Colors.amber },

  // ── Tab Content ───────────────────────────────────────────────────────────────
  tabContent: { paddingHorizontal: 16, paddingTop: 16 },
  sectionTitle: { color: Colors.gray, fontSize: 11, fontWeight: '800', letterSpacing: 0.8, marginBottom: 12 },

  instructorCard: { flexDirection: 'row', alignItems: 'flex-start', gap: 12, marginBottom: 12, padding: 12, backgroundColor: Colors.white, borderRadius: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4, elevation: 2 },
  instructorAvatar: { width: 50, height: 50, borderRadius: 25, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  instructorInfo: { flex: 1 },
  instructorName: { color: Colors.darkNavy, fontSize: 14, fontWeight: '700', marginBottom: 2 },
  instructorRole: { color: Colors.primaryGreen, fontSize: 10, fontWeight: '700', letterSpacing: 0.5, marginBottom: 4 },
  instructorBio: { color: Colors.gray, fontSize: 12, lineHeight: 17 },

  objectiveCard: { backgroundColor: Colors.lightGreen, borderRadius: 12, padding: 16, borderLeftWidth: 3, borderLeftColor: Colors.primaryGreen, marginBottom: 8 },
  objectiveHeader: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 8 },
  objectiveTitle: { color: Colors.primaryGreen, fontSize: 11, fontWeight: '800', letterSpacing: 0.5 },
  objectiveText: { color: Colors.darkNavy, fontSize: 13, lineHeight: 19 },

  accordionList: { gap: 8 },

  materialCard: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: Colors.white, borderRadius: 10, padding: 12, marginBottom: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 3, elevation: 2 },
  materialTypeIcon: { width: 44, height: 44, borderRadius: 10, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  materialInfo: { flex: 1 },
  materialName: { color: Colors.darkNavy, fontSize: 13, fontWeight: '600', marginBottom: 2 },
  materialSize: { color: Colors.gray, fontSize: 11 },
  downloadBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: Colors.lightGreen, alignItems: 'center', justifyContent: 'center' },

  // ── Action Bar ────────────────────────────────────────────────────────────────
  actionBar: {
    height: 52, // Slightly smaller than before
    backgroundColor: Colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    gap: 10,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  prevBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingVertical: 9,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: Colors.border,
  },
  prevBtnText: { color: Colors.gray, fontSize: 12, fontWeight: '600' },
  nextBtn: {
    flex: 1.6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    paddingVertical: 9,
    borderRadius: 8,
    backgroundColor: Colors.primaryGreen,
  },
  nextBtnDisabled: { backgroundColor: Colors.gray },
  nextBtnText: { color: Colors.white, fontSize: 11, fontWeight: '800', letterSpacing: 0.3 },
  btnDisabled: { borderColor: Colors.border, opacity: 0.5 },
  btnTextDisabled: { color: Colors.border },
});
