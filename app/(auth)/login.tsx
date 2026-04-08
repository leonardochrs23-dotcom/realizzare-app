import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/Colors';
import { Typography } from '../../constants/Typography';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { useAuth } from '../../hooks/useAuth';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function LoginScreen() {
  const router = useRouter();
  const { signIn } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [keepLoggedIn, setKeepLoggedIn] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      setError('Preencha todos os campos');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const result = await signIn(email, password);
      if (result.success) {
        router.replace('/(tabs)');
      }
    } catch {
      setError('Erro ao fazer login. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.root}>
      {/* Top dark section */}
      <View style={styles.topSection}>
        <SafeAreaView edges={['top']}>
          <View style={styles.topContent}>
            {/* Logo — favicon real da Realizzare */}
            <View style={styles.logoIconWrapper}>
              <Image
                source={require('../../assets/favicon.png')}
                style={styles.logoImage}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.appTitle}>Realizzare</Text>
            <Text style={styles.appSubtitle}>CURSOS ONLINE</Text>
            <Text style={styles.welcomeText}>Bem-vindo de volta!</Text>
          </View>
        </SafeAreaView>
      </View>

      {/* Bottom white card */}
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.card}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {/* Global error */}
            {error ? (
              <View style={styles.errorBanner}>
                <Text style={styles.errorBannerText}>{error}</Text>
              </View>
            ) : null}

            {/* Email */}
            <Input
              label="E-mail"
              placeholder="Digite seu e-mail"
              value={email}
              onChangeText={(t) => { setEmail(t); setError(''); }}
              keyboardType="email-address"
              autoCapitalize="none"
              leftIcon="mail-outline"
            />

            {/* Password */}
            <Input
              label="Senha"
              placeholder="Digite sua senha"
              value={password}
              onChangeText={(t) => { setPassword(t); setError(''); }}
              secureTextEntry={!showPassword}
              leftIcon="lock-closed-outline"
              rightIcon={showPassword ? 'eye-off-outline' : 'eye-outline'}
              onRightIconPress={() => setShowPassword((v) => !v)}
            />

            {/* Options Row: Remember Me & Forgot Password */}
            <View style={styles.optionsRow}>
              <TouchableOpacity
                style={styles.keepLoggedRow}
                onPress={() => setKeepLoggedIn(!keepLoggedIn)}
                activeOpacity={0.7}
              >
                <View style={[styles.checkbox, keepLoggedIn && styles.checkboxActive]}>
                  {keepLoggedIn && <Ionicons name="checkmark" size={14} color={Colors.white} />}
                </View>
                <Text style={styles.keepLoggedText}>Continuar logado</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => router.push('/(auth)/forgot-password')}
                activeOpacity={0.7}
              >
                <Text style={styles.forgotText}>Esqueci minha senha</Text>
              </TouchableOpacity>
            </View>

            {/* Login button */}
            <View style={styles.buttonWrapper}>
              <Button
                label="ENTRAR"
                onPress={handleLogin}
                variant="primary"
                size="lg"
                fullWidth
                loading={loading}
              />
            </View>

            {/* Divider */}
            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>ou</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Register button */}
            <Button
              label="Criar nova conta"
              onPress={() => router.push('/(auth)/register')}
              variant="outline"
              size="lg"
              fullWidth
            />

            {/* Terms */}
            <View style={styles.termsRow}>
              <Text style={styles.termsText}>
                Ao acessar você concorda com os{' '}
              </Text>
              <TouchableOpacity activeOpacity={0.7} accessibilityRole="link">
                <Text style={styles.termsLink}>Termos de Uso</Text>
              </TouchableOpacity>
              <Text style={styles.termsText}> e Políticas de Privacidade.</Text>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.darkNavy,
  },
  flex: {
    flex: 1,
  },

  // ── Top Section ──────────────────────────────────────────────────────────
  topSection: {
    backgroundColor: Colors.darkNavy,
    paddingBottom: 0,
  },
  topContent: {
    alignItems: 'center',
    paddingTop: 24,
    paddingBottom: 32,
    paddingHorizontal: 24,
  },
  logoIconWrapper: {
    marginBottom: 10,
  },
  logoImage: {
    width: 64,
    height: 64,
    borderRadius: 16,
    overflow: 'hidden',
  },
  appTitle: {
    color: Colors.white,
    fontSize: Typography.size.xxl,
    fontWeight: '700',
    marginBottom: 2,
  },
  appSubtitle: {
    color: '#A9B8C6',
    fontSize: Typography.size.xs,
    letterSpacing: 3,
    textTransform: 'uppercase',
    marginBottom: 16,
  },
  welcomeText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '600',
  },

  // ── Bottom Card ───────────────────────────────────────────────────────────
  card: {
    flex: 1,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: 'hidden',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 32,
  },

  // ── Error Banner ──────────────────────────────────────────────────────────
  errorBanner: {
    backgroundColor: '#FEE2E2',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginBottom: 16,
    borderLeftWidth: 3,
    borderLeftColor: Colors.error,
  },
  errorBannerText: {
    color: Colors.error,
    fontSize: Typography.size.base,
    fontWeight: '500',
  },

  // ── Options Row ──────────────────────────────────────────────────────────
  optionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  keepLoggedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: '#D1D5DB',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },
  checkboxActive: {
    backgroundColor: Colors.primaryGreen,
    borderColor: Colors.primaryGreen,
  },
  keepLoggedText: {
    color: Colors.gray,
    fontSize: 14,
    fontWeight: '500',
  },
  forgotText: {
    color: Colors.primaryBlue,
    fontSize: 14,
    fontWeight: '500',
  },

  // ── Buttons ───────────────────────────────────────────────────────────────
  buttonWrapper: {
    marginBottom: 20,
  },

  // ── Divider ───────────────────────────────────────────────────────────────
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 12,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.border,
  },
  dividerText: {
    color: Colors.gray,
    fontSize: Typography.size.base,
    fontWeight: '500',
  },

  // ── Terms ─────────────────────────────────────────────────────────────────
  termsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 24,
    gap: 0,
  },
  termsText: {
    color: Colors.gray,
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
  },
  termsLink: {
    color: Colors.primaryBlue,
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 18,
  },
});
