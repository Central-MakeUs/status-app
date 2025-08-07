import { AnimatedSplashScreen } from '@/components/AnimatedSplashScreen';
import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
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
