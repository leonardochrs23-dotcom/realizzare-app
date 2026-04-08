import { Redirect } from 'expo-router';

// Redireciona a rota raiz "/" para a tela de splash do grupo (auth)
export default function Index() {
  return <Redirect href="/(auth)" />;
}
