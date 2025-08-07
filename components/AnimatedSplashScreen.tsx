import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Video } from 'react-native-video';

export const AnimatedSplashScreen = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isSplashVideoComplete, setSplashVideoComplete] = useState(false);
  const [isAppReady, setIsAppReady] = useState(false);
  const videoSource = require('@/assets/images/splash.mp4');

  const handleVideoLoad = () => {
    setIsAppReady(true);
  };

  const handleVideoEnd = async () => {
    setSplashVideoComplete(true);
  };

  return (
    <>
      {!isSplashVideoComplete && (
        <SafeAreaView style={styles.splashVideoContainer}>
          <Video
            source={videoSource}
            controls={false}
            style={styles.splashVideo}
            onLoad={handleVideoLoad}
            onEnd={handleVideoEnd}
            repeat={false}
            muted={true}
            ignoreSilentSwitch="ignore"
            hideShutterView={true}
          />
        </SafeAreaView>
      )}
      {isAppReady && children}
    </>
  );
};

const styles = StyleSheet.create({
  splashVideoContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 100,
    backgroundColor: '#161416',
  },
  splashVideo: {
    width: 277,
    height: 382,
    marginTop: 53,
    marginHorizontal: 'auto',
    backgroundColor: '#161416',
  },
});
