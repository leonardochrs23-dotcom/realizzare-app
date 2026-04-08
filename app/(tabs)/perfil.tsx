import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../constants/Colors';
import { Typography } from '../../constants/Typography';

// Placeholder — Perfil screen (to be built)
export default function PerfilScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Perfil</Text>
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
