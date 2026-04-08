import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Colors } from '../../constants/Colors';
import { Typography } from '../../constants/Typography';

// Placeholder — Course Overview screen (to be built)
export default function CourseDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Visão Geral do Curso #{id}</Text>
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
