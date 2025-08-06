import { useEvent, useEventListener } from 'expo';
import * as SplashScreen from 'expo-splash-screen';
import { VideoSource, VideoView, useVideoPlayer } from 'expo-video';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const AnimatedSplashScreen = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isSplashVideoComplete, setSplashVideoComplete] = useState(false);
  const [isAppReady, setIsAppReady] = useState(false);

  const videoSource: VideoSource = {
    uri: 'splash',
    metadata: {
      title: 'Splash Screen',
    },
  };

  const player = useVideoPlayer(videoSource, (player) => {
    if (!videoSource) {
      return;
    }

    try {
      player.play();
    } catch (error) {
      console.error('Failed to play video:', error);
      setSplashVideoComplete(true);
    }
  });

  const { isPlaying } = useEvent(player, 'playingChange', {
    isPlaying: player.playing,
  });

  useEventListener(player, 'playToEnd', () => {
    SplashScreen.hideAsync();
    setSplashVideoComplete(true);
  });

  useEffect(() => {
    if (isPlaying) {
      setIsAppReady(true);
    }
  }, [isPlaying]);

  return (
    <>
      {!isSplashVideoComplete && (
        <SafeAreaView style={styles.splashVideoContainer}>
          <VideoView
            player={player}
            nativeControls={false}
            style={styles.splashVideo}
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
  },
});
