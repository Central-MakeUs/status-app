import { MESSAGE_TYPES, WEB_VIEW_URL } from '@/constants/auth';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Linking, SafeAreaView, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

export default function Index() {
  const webViewRef = useRef<WebView>(null);
  const params = useLocalSearchParams();
  const [webViewLoaded, setWebViewLoaded] = useState(false);

  useEffect(() => {
    if (!webViewRef.current || !webViewLoaded) {
      return;
    }

    if (params.code && params.provider) {
      webViewRef.current.postMessage(
        JSON.stringify({
          type: MESSAGE_TYPES.AUTH_SUCCESS,
          data: { code: params.code, provider: params.provider },
        })
      );
    }

    if (params.error) {
      webViewRef.current.postMessage(
        JSON.stringify({
          type: MESSAGE_TYPES.AUTH_ERROR,
          data: { error: params.error },
        })
      );
    }
  }, [webViewLoaded, params]);

  const handleWebViewLoad = () => {
    setWebViewLoaded(true);
  };

  const handleWebMessage = (event: { nativeEvent: { data: string } }) => {
    try {
      const message = JSON.parse(event.nativeEvent.data);

      switch (message.type) {
        case MESSAGE_TYPES.OPEN_EXTERNAL_BROWSER:
          Linking.openURL(message.url);
          break;
        default:
          break;
      }
    } catch (error) {
      console.error('Error parsing web message:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        ref={webViewRef}
        source={{ uri: WEB_VIEW_URL }}
        javaScriptEnabled={true}
        onMessage={handleWebMessage}
        onLoadEnd={handleWebViewLoad}
        startInLoadingState={true}
        allowsInlineMediaPlayback={true}
        mediaPlaybackRequiresUserAction={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
