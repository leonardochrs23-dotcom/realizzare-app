import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Colors } from '../../../constants/Colors';
import { Typography } from '../../../constants/Typography';

// Placeholder — Lesson Player screen (to be built)
export default function LessonPlayerScreen() {
  const { lessonId } = useLocalSearchParams<{ lessonId: string }>();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Player — Aula #{lessonId}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: Colors.white,
    fontSize: Typography.size.xl,
    fontWeight: Typography.weight.bold,
  },
});
