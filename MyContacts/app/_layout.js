import { Stack } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <Stack>
          <Stack.Screen name="index" options={{ title: 'Meus Contatos' }} />
          <Stack.Screen name="settings" options={{ title: 'Configurações' }} />
        </Stack>
      </PaperProvider>
    </SafeAreaProvider>
  );
}