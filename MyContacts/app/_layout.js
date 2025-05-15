import { Stack } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { IconButton } from 'react-native-paper';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <Stack>
          <Stack.Screen 
            name="index" 
            options={({ navigation }) => ({ 
              title: 'Meus Contatos',
              headerRight: () => (
                <IconButton
                  icon="cog"
                  size={24}
                  onPress={() => navigation.navigate('settings')}
                  style={{ marginRight: 10 }}
                />
              )
            })} 
          />
          <Stack.Screen name="settings" options={{ title: 'Configurações' }} />
        </Stack>
      </PaperProvider>
    </SafeAreaProvider>
  );
}