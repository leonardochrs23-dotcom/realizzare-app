import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import { Typography } from '../../constants/Typography';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { useAuth } from '../../hooks/useAuth';

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const { signIn } = useAuth(); // mock — forgotPassword not yet in hook

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSend = async () => {
    if (!email.trim()) {
      setError('Informe seu e-mail cadastrado');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Digite um e-mail válido');
      return;
    }
    setError('');
    setLoading(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setSent(true);
  };

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
          <Text style={styles.headerTitle}>Recuperar Senha</Text>
          <View style={styles.headerRight} />
        </View>
      </SafeAreaView>

      {/* ── Body ── */}
      <ScrollView
        contentContainerStyle={styles.body}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Lock icon */}
        <View style={styles.iconWrapper}>
          <View style={styles.iconCircle}>
            <Ionicons name="lock-open" size={32} color={Colors.primaryGreen} />
          </View>
        </View>

        {/* Title */}
        <Text style={styles.title}>Esqueceu sua senha?</Text>

        {/* Description */}
        <Text style={styles.description}>
          Digite seu e-mail cadastrado e{'\n'}enviaremos um link para redefinir sua senha.
        </Text>

        {/* Success message */}
        {sent ? (
          <View style={styles.successBanner}>
            <Text style={styles.successText}>
              ✉️ Link enviado! Verifique sua caixa de entrada.
            </Text>
          </View>
        ) : null}

        {/* Input */}
        <View style={styles.inputWrapper}>
          <Input
            label="E-MAIL CADASTRADO"
            placeholder="seu@email.com"
            value={email}
            onChangeText={(t) => { setEmail(t); setError(''); }}
            keyboardType="email-address"
            autoCapitalize="none"
            leftIcon="mail-outline"
            error={error}
            editable={!sent}
          />
        </View>

        {/* Send button */}
        {!sent && (
          <View style={styles.buttonWrapper}>
            <Button
              label="ENVIAR LINK DE RECUPERAÇÃO ▷"
              onPress={handleSend}
              variant="primary"
              size="lg"
              fullWidth
              loading={loading}
            />
          </View>
        )}

        {/* Back to login */}
        <TouchableOpacity
          style={styles.backLink}
          onPress={() => router.back()}
          activeOpacity={0.7}
          accessibilityRole="link"
          accessibilityLabel="Voltar para o login"
        >
          <Ionicons name="arrow-back" size={14} color={Colors.primaryBlue} />
          <Text style={styles.backLinkText}> Voltar para o login</Text>
        </TouchableOpacity>
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
  headerRight: { width: 36 },

  // ── Body ──────────────────────────────────────────────────────────────────
  body: {
    paddingHorizontal: 28,
    paddingTop: 40,
    paddingBottom: 40,
    alignItems: 'center',
  },

  // ── Lock icon ─────────────────────────────────────────────────────────────
  iconWrapper: { marginBottom: 28 },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.lightGreen,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#C3E88D',
  },

  // ── Text ──────────────────────────────────────────────────────────────────
  title: {
    color: Colors.darkNavy,
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 12,
  },
  description: {
    color: Colors.gray,
    fontSize: Typography.size.md,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 32,
  },

  // ── Success banner ────────────────────────────────────────────────────────
  successBanner: {
    width: '100%',
    backgroundColor: '#ECFDF5',
    borderRadius: 10,
    padding: 14,
    marginBottom: 16,
    borderLeftWidth: 3,
    borderLeftColor: Colors.success,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  successText: {
    color: Colors.success,
    fontSize: Typography.size.base,
    fontWeight: '600',
    textAlign: 'center',
  },

  // ── Input ─────────────────────────────────────────────────────────────────
  inputWrapper: {
    width: '100%',
    marginBottom: 4,
  },

  // ── Button ────────────────────────────────────────────────────────────────
  buttonWrapper: {
    width: '100%',
    marginTop: 12,
    marginBottom: 24,
  },

  // ── Back link ─────────────────────────────────────────────────────────────
  backLink: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    paddingVertical: 8,
  },
  backLinkText: {
    color: Colors.primaryBlue,
    fontSize: Typography.size.base,
    fontWeight: '500',
  },
});
