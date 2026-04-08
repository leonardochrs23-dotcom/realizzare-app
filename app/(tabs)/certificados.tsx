import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../constants/Colors';
import { Typography } from '../../constants/Typography';

// Placeholder — Certificados screen (to be built)
export default function CertificadosScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Certificados</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: Colors.darkNavy,
    fontSize: Typography.size.xl,
    fontWeight: Typography.weight.bold,
  },
});
