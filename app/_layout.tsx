import { AnimatedSplashScreen } from '@/components/AnimatedSplashScreen';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar
        style="light"
        backgroundColor="#161416"
        translucent={false}
        hidden={false}
      />
      <AnimatedSplashScreen>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: '#161416' },
          }}
        />
      </AnimatedSplashScreen>
    </SafeAreaProvider>
  );
}
