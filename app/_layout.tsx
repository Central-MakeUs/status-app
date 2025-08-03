import { AnimatedSplashScreen } from '@/components/AnimatedSplashScreen';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaProvider } from 'react-native-safe-area-context';

SplashScreen.preventAutoHideAsync();

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
