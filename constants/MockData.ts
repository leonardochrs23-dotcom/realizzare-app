// ─── User ───────────────────────────────────────────────────────────────────

export const MockUser = {
  id: '1',
  name: 'Leonardo Christian',
  email: 'leonardo@email.com',
  position: 343,
  totalCourses: 5,
  completed: 0,
  certificates: 0,
  avatar: null,
  plan: 'Básico',
  joinedAt: '2024-01-15',
};

// ─── Courses ─────────────────────────────────────────────────────────────────

export type CourseStatus = 'em andamento' | 'concluído';

export interface Course {
  id: string;
  title: string;
  description: string;
  workload: string;
  progress: number;
  thumbnailColor: string;
  status: CourseStatus;
  instructor: string;
  totalLessons: number;
  completedLessons: number;
}

export const MockCourses: Course[] = [
  {
    id: '1',
    title: 'Gestão de Resultados com Foco em Alta Performance',
    description: 'Aprenda a gerir equipes e resultados com foco em desempenho máximo.',
    workload: '16h',
    progress: 35,
    thumbnailColor: '#0065A4',
    status: 'em andamento',
    instructor: 'Dr. Carlos Mendes',
    totalLessons: 24,
    completedLessons: 8,
  },
  {
    id: '2',
    title: 'Liderança Transformacional e Inteligência Emocional',
    description: 'Desenvolva habilidades de liderança com base em inteligência emocional.',
    workload: '12h',
    progress: 60,
    thumbnailColor: '#8DB336',
    status: 'em andamento',
    instructor: 'Profa. Ana Paula Sousa',
    totalLessons: 18,
    completedLessons: 11,
  },
  {
    id: '3',
    title: 'Marketing Digital Estratégico para Negócios',
    description: 'Estratégias de marketing digital para alavancar seus negócios.',
    workload: '20h',
    progress: 10,
    thumbnailColor: '#FBB03B',
    status: 'em andamento',
    instructor: 'Rafael Torres',
    totalLessons: 30,
    completedLessons: 3,
  },
  {
    id: '4',
    title: 'Finanças Pessoais e Investimentos Inteligentes',
    description: 'Controle suas finanças e aprenda a investir com sabedoria.',
    workload: '10h',
    progress: 45,
    thumbnailColor: '#253953',
    status: 'em andamento',
    instructor: 'Marcos Oliveira',
    totalLessons: 15,
    completedLessons: 7,
  },
  {
    id: '5',
    title: 'Comunicação Assertiva e Oratória Profissional',
    description: 'Domine a arte da comunicação eficaz e se torne um orador poderoso.',
    workload: '8h',
    progress: 0,
    thumbnailColor: '#646E7C',
    status: 'em andamento',
    instructor: 'Beatriz Almeida',
    totalLessons: 12,
    completedLessons: 0,
  },
];

// ─── Modules & Lessons ───────────────────────────────────────────────────────

export type LessonStatus = 'active' | 'completed' | 'available' | 'locked';
export type LessonType = 'video' | 'pdf' | 'link';
export type ModuleStatus = 'completed' | 'in-progress' | 'not-started';

export interface Lesson {
  id: string;
  title: string;
  type: LessonType;
  duration: string;
  status: LessonStatus;
}

export interface Module {
  id: string;
  courseId: string;
  moduleNumber: number;
  title: string;
  duration: string;
  status: ModuleStatus;
  lessons: Lesson[];
}

export const MockModules: Module[] = [
  {
    id: 'm1',
    courseId: '1',
    moduleNumber: 1,
    title: 'Introdução à Alta Performance',
    duration: '1h 20min',
    status: 'completed',
    lessons: [
      { id: 'l1', title: 'Boas-vindas ao curso', type: 'video', duration: '5min', status: 'completed' },
      { id: 'l2', title: 'O que é alta performance?', type: 'video', duration: '18min', status: 'completed' },
      { id: 'l3', title: 'Mentalidade vencedora', type: 'video', duration: '22min', status: 'completed' },
      { id: 'l4', title: 'Material de apoio - Módulo 1', type: 'pdf', duration: '-', status: 'completed' },
    ],
  },
  {
    id: 'm2',
    courseId: '1',
    moduleNumber: 2,
    title: 'Gestão de Tempo e Produtividade',
    duration: '2h 10min',
    status: 'in-progress',
    lessons: [
      { id: 'l5', title: 'Matriz de Eisenhower', type: 'video', duration: '24min', status: 'completed' },
      { id: 'l6', title: 'Método Pomodoro na prática', type: 'video', duration: '20min', status: 'active' },
      { id: 'l7', title: 'Ferramentas de gestão de tarefas', type: 'video', duration: '18min', status: 'available' },
      { id: 'l8', title: 'Deep Work - Resumo', type: 'pdf', duration: '-', status: 'locked' },
      { id: 'l9', title: 'Recursos extras - Produtividade', type: 'link', duration: '-', status: 'locked' },
    ],
  },
  {
    id: 'm3',
    courseId: '1',
    moduleNumber: 3,
    title: 'Liderança de Equipes de Alta Performance',
    duration: '1h 50min',
    status: 'not-started',
    lessons: [
      { id: 'l10', title: 'Perfis de liderança', type: 'video', duration: '28min', status: 'locked' },
      { id: 'l11', title: 'Feedback eficaz', type: 'video', duration: '21min', status: 'locked' },
      { id: 'l12', title: 'Conflito e mediação', type: 'video', duration: '19min', status: 'locked' },
    ],
  },
  {
    id: 'm4',
    courseId: '1',
    moduleNumber: 4,
    title: 'Metas, OKRs e KPIs',
    duration: '1h 30min',
    status: 'not-started',
    lessons: [
      { id: 'l13', title: 'Introdução a OKRs', type: 'video', duration: '22min', status: 'locked' },
      { id: 'l14', title: 'Definindo KPIs relevantes', type: 'video', duration: '20min', status: 'locked' },
      { id: 'l15', title: 'Exemplos reais de OKRs', type: 'pdf', duration: '-', status: 'locked' },
    ],
  },
  {
    id: 'm5',
    courseId: '1',
    moduleNumber: 5,
    title: 'Tomada de Decisão Estratégica',
    duration: '1h 15min',
    status: 'not-started',
    lessons: [
      { id: 'l16', title: 'Decisões sob pressão', type: 'video', duration: '25min', status: 'locked' },
      { id: 'l17', title: 'Análise de cenários', type: 'video', duration: '22min', status: 'locked' },
      { id: 'l18', title: 'Case study final', type: 'video', duration: '18min', status: 'locked' },
    ],
  },
  {
    id: 'm6',
    courseId: '1',
    moduleNumber: 6,
    title: 'Encerramento e Próximos Passos',
    duration: '45min',
    status: 'not-started',
    lessons: [
      { id: 'l19', title: 'Revisão geral do curso', type: 'video', duration: '20min', status: 'locked' },
      { id: 'l20', title: 'Plano de ação pessoal', type: 'pdf', duration: '-', status: 'locked' },
      { id: 'l21', title: 'Avaliação final', type: 'link', duration: '25min', status: 'locked' },
    ],
  },
];

// ─── Orders ──────────────────────────────────────────────────────────────────

export type OrderStatus = 'aprovado' | 'pendente' | 'cancelado' | 'processando';

export interface Order {
  id: string;
  number: string;
  date: string;
  type: string;
  price: number;
  status: OrderStatus;
  items: string[];
}

export const MockOrders: Order[] = [
  {
    id: 'o1',
    number: '#RZ-20240115-001',
    date: '15 Jan 2024',
    type: 'Pacote de Cursos',
    price: 297.0,
    status: 'aprovado',
    items: ['Gestão de Resultados', 'Liderança Transformacional'],
  },
  {
    id: 'o2',
    number: '#RZ-20240210-002',
    date: '10 Fev 2024',
    type: 'Curso Avulso',
    price: 97.0,
    status: 'aprovado',
    items: ['Marketing Digital Estratégico'],
  },
  {
    id: 'o3',
    number: '#RZ-20240318-003',
    date: '18 Mar 2024',
    type: 'Créditos Educacionais',
    price: 150.0,
    status: 'processando',
    items: ['100 créditos educacionais'],
  },
  {
    id: 'o4',
    number: '#RZ-20240401-004',
    date: '01 Abr 2024',
    type: 'Curso Avulso',
    price: 127.0,
    status: 'pendente',
    items: ['Comunicação Assertiva e Oratória'],
  },
];

// ─── Certificate Pricing ─────────────────────────────────────────────────────

export interface CertificateTier {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  isPopular?: boolean;
}

export const MockCertificateTiers: CertificateTier[] = [
  {
    id: 'ct1',
    name: 'Básico',
    price: 29.9,
    description: 'Certificado digital com validação QR Code',
    features: [
      'Certificado em PDF',
      'Validação por QR Code',
      'Compartilhamento em redes sociais',
      'Validade permanente',
    ],
  },
  {
    id: 'ct2',
    name: 'Profissional',
    price: 59.9,
    description: 'Certificado físico + digital com autenticidade garantida',
    features: [
      'Tudo do plano Básico',
      'Certificado físico impresso',
      'Entrega em até 7 dias úteis',
      'Selo holográfico de autenticidade',
      'Embalagem premium',
    ],
    isPopular: true,
  },
  {
    id: 'ct3',
    name: 'Executive',
    price: 99.9,
    description: 'Certificado premium com moldura e apostilamento',
    features: [
      'Tudo do plano Profissional',
      'Moldura executiva inclusa',
      'Apostilamento de Haia (opcional)',
      'Entrega expressa em 3 dias úteis',
      'Suporte prioritário',
      'Diploma em papel moeda premium',
    ],
  },
];
