import { SafeAreaView, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const WEB_VIEW_URL = 'https://status-front-rho.vercel.app';

export default function Index() {
  return (
    <SafeAreaView style={styles.container}>
      <WebView
        source={{ uri: WEB_VIEW_URL }}
        javaScriptEnabled={true}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
