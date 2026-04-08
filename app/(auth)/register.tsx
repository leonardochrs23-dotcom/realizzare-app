import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import { Typography } from '../../constants/Typography';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { useAuth } from '../../hooks/useAuth';

// ── CPF mask: 000.000.000-00 ────────────────────────────────────────────────
const formatCPF = (value: string): string => {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 3)}.${digits.slice(3)}`;
  if (digits.length <= 9) return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
  return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`;
};

// ── Date mask: DD/MM/AAAA ────────────────────────────────────────────────────
const formatDate = (value: string): string => {
  const digits = value.replace(/\D/g, '').slice(0, 8);
  if (digits.length <= 2) return digits;
  if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
};

export default function RegisterScreen() {
  const router = useRouter();
  const { signUp } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = 'Informe seu nome completo';
    if (!email.trim()) newErrors.email = 'Informe seu e-mail';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'E-mail inválido';
    if (!cpf.trim()) newErrors.cpf = 'Informe seu CPF';
    if (!birthDate.trim()) newErrors.birthDate = 'Informe sua data de nascimento';
    else if (birthDate.replace(/\D/g, '').length < 8) newErrors.birthDate = 'Data incompleta (DD/MM/AAAA)';
    if (!phone.trim()) newErrors.phone = 'Informe seu telefone';
    if (!password) newErrors.password = 'Crie uma senha';
    else if (password.length < 6) newErrors.password = 'Mínimo 6 caracteres';
    if (!confirmPassword) newErrors.confirmPassword = 'Confirme sua senha';
    else if (password !== confirmPassword) newErrors.confirmPassword = 'As senhas não coincidem';
    if (!agreeTerms) newErrors.terms = 'Você precisa aceitar os termos';
    return newErrors;
  };

  const handleRegister = async () => {
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    setLoading(true);
    try {
      const result = await signUp({ name, email, password, cpf, phone });
      if (result.success) {
        router.replace('/(tabs)');
      }
    } catch {
      setErrors({ general: 'Erro ao criar conta. Tente novamente.' });
    } finally {
      setLoading(false);
    }
  };

  const clearError = (field: string) =>
    setErrors((prev) => { const e = { ...prev }; delete e[field]; return e; });

  return (
    <View style={styles.root}>
      {/* ── Header ── */}
      <SafeAreaView edges={['top']} style={styles.header}>
        <View style={styles.headerInner}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => router.back()}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel="Voltar"
          >
            <Ionicons name="arrow-back" size={22} color={Colors.white} />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Criar Conta</Text>

          {/* Logo */}
          <View style={styles.headerRight}>
            <Image
              source={require('../../assets/favicon.png')}
              style={styles.headerLogo}
              resizeMode="contain"
            />
          </View>
        </View>
      </SafeAreaView>

      {/* ── Body ── */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Intro */}
        <Text style={styles.pageTitle}>Preencha seus dados</Text>
        <Text style={styles.pageSubtitle}>É rápido e gratuito!</Text>

        {/* General error */}
        {errors.general ? (
          <View style={styles.errorBanner}>
            <Text style={styles.errorBannerText}>{errors.general}</Text>
          </View>
        ) : null}

        {/* Fields */}
        <Input
          label="Nome completo"
          placeholder="Seu nome completo"
          value={name}
          onChangeText={(t) => { setName(t); clearError('name'); }}
          leftIcon="person-outline"
          error={errors.name}
          autoCapitalize="words"
        />
        <Input
          label="E-mail"
          placeholder="exemplo@email.com"
          value={email}
          onChangeText={(t) => { setEmail(t); clearError('email'); }}
          keyboardType="email-address"
          autoCapitalize="none"
          leftIcon="mail-outline"
          error={errors.email}
        />
        <Input
          label="CPF"
          placeholder="000.000.000-00"
          value={cpf}
          onChangeText={(t) => { setCpf(formatCPF(t)); clearError('cpf'); }}
          keyboardType="numeric"
          leftIcon="card-outline"
          error={errors.cpf}
        />
        <Input
          label="Data de Nascimento"
          placeholder="DD/MM/AAAA"
          value={birthDate}
          onChangeText={(t) => { setBirthDate(formatDate(t)); clearError('birthDate'); }}
          keyboardType="numeric"
          leftIcon="calendar-outline"
          error={errors.birthDate}
        />
        <Input
          label="Telefone / WhatsApp"
          placeholder="(00) 00000-0000"
          value={phone}
          onChangeText={(t) => { setPhone(t); clearError('phone'); }}
          keyboardType="phone-pad"
          leftIcon="phone-portrait-outline"
          error={errors.phone}
        />
        <Input
          label="Senha"
          placeholder="••••••••"
          value={password}
          onChangeText={(t) => { setPassword(t); clearError('password'); }}
          secureTextEntry={!showPassword}
          leftIcon="lock-closed-outline"
          rightIcon={showPassword ? 'eye-off-outline' : 'eye-outline'}
          onRightIconPress={() => setShowPassword((v) => !v)}
          error={errors.password}
        />
        <Input
          label="Confirmar Senha"
          placeholder="••••••••"
          value={confirmPassword}
          onChangeText={(t) => { setConfirmPassword(t); clearError('confirmPassword'); }}
          secureTextEntry={!showConfirm}
          leftIcon="lock-closed-outline"
          rightIcon={showConfirm ? 'eye-off-outline' : 'eye-outline'}
          onRightIconPress={() => setShowConfirm((v) => !v)}
          error={errors.confirmPassword}
        />

        {/* Terms checkbox */}
        <TouchableOpacity
          style={styles.checkboxRow}
          onPress={() => { setAgreeTerms((v) => !v); clearError('terms'); }}
          activeOpacity={0.7}
          accessibilityRole="checkbox"
          accessibilityState={{ checked: agreeTerms }}
        >
          <Ionicons
            name={agreeTerms ? 'checkbox' : 'square-outline'}
            size={22}
            color={agreeTerms ? Colors.primaryGreen : Colors.gray}
          />
          <View style={styles.checkboxLabel}>
            <Text style={styles.checkboxText}>Concordo com os </Text>
            <Text style={styles.checkboxLink}>Termos de Uso</Text>
            <Text style={styles.checkboxText}> e </Text>
            <Text style={styles.checkboxLink}>Política de Privacidade</Text>
          </View>
        </TouchableOpacity>
        {errors.terms ? (
          <Text style={styles.fieldError}>{errors.terms}</Text>
        ) : null}

        {/* CTA */}
        <View style={styles.ctaRow}>
          <Button
            label="CRIAR MINHA CONTA"
            onPress={handleRegister}
            variant="primary"
            size="lg"
            fullWidth
            loading={loading}
          />
        </View>

        {/* Already have account */}
        <View style={styles.loginRow}>
          <Text style={styles.loginRowText}>Já tenho uma conta? </Text>
          <TouchableOpacity
            onPress={() => router.back()}
            activeOpacity={0.7}
            accessibilityRole="link"
          >
            <Text style={styles.loginRowLink}>Fazer login</Text>
          </TouchableOpacity>
        </View>

        {/* Why study with us */}
        <View style={styles.whyCard}>
          <View style={styles.whyCardHeader}>
            <Text style={styles.whyCardTitle}>Por que estudar conosco?</Text>
          </View>
          <Text style={styles.whyCardText}>
            Acesse centenas de cursos com certificação válida em todo o Brasil.
            Comece sua jornada agora mesmo.
          </Text>
          <Ionicons
            name="school-outline"
            size={40}
            color={Colors.primaryGreen}
            style={styles.whyCardIcon}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.white },

  // ── Header ────────────────────────────────────────────────────────────────
  header: { backgroundColor: Colors.darkNavy },
  headerInner: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  backBtn: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    flex: 1,
    color: Colors.white,
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  headerRight: {
    width: 36,
    alignItems: 'flex-end',
  },
  headerLogo: {
    width: 32,
    height: 32,
    borderRadius: 8,
  },

  // ── Body ──────────────────────────────────────────────────────────────────
  scroll: { flex: 1, backgroundColor: Colors.white },
  scrollContent: { paddingHorizontal: 24, paddingTop: 24, paddingBottom: 40 },

  pageTitle: {
    color: Colors.darkNavy,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  pageSubtitle: {
    color: Colors.primaryGreen,
    fontSize: Typography.size.md,
    marginBottom: 20,
  },

  errorBanner: {
    backgroundColor: '#FEE2E2',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    borderLeftWidth: 3,
    borderLeftColor: Colors.error,
  },
  errorBannerText: {
    color: Colors.error,
    fontSize: Typography.size.base,
    fontWeight: '500',
  },

  // ── Checkbox ──────────────────────────────────────────────────────────────
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginTop: 4,
    marginBottom: 4,
  },
  checkboxLabel: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 2,
  },
  checkboxText: {
    color: Colors.gray,
    fontSize: Typography.size.base,
    lineHeight: 20,
  },
  checkboxLink: {
    color: Colors.primaryBlue,
    fontSize: Typography.size.base,
    fontWeight: '600',
    lineHeight: 20,
  },
  fieldError: {
    color: Colors.error,
    fontSize: Typography.size.xs,
    marginTop: 2,
    marginBottom: 8,
    marginLeft: 2,
  },

  // ── CTA ───────────────────────────────────────────────────────────────────
  ctaRow: { marginTop: 20, marginBottom: 16 },

  // ── Already have account ──────────────────────────────────────────────────
  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  loginRowText: { color: Colors.gray, fontSize: Typography.size.base },
  loginRowLink: {
    color: Colors.primaryBlue,
    fontSize: Typography.size.base,
    fontWeight: '700',
  },

  // ── Why card ──────────────────────────────────────────────────────────────
  whyCard: {
    backgroundColor: Colors.lightGreen,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#D1FAD0',
    overflow: 'hidden',
    position: 'relative',
  },
  whyCardHeader: { marginBottom: 6 },
  whyCardTitle: {
    color: Colors.primaryGreen,
    fontSize: Typography.size.md,
    fontWeight: '700',
  },
  whyCardText: {
    color: Colors.darkNavy,
    fontSize: Typography.size.base,
    lineHeight: 20,
    maxWidth: '80%',
  },
  whyCardIcon: {
    position: 'absolute',
    bottom: 12,
    right: 16,
    opacity: 0.25,
  },
});
