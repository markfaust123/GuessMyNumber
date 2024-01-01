import { ImageBackground, SafeAreaView, StyleSheet } from "react-native";
import StartGameScreen from "./src/screens/StartGameScreen";
import { LinearGradient } from "expo-linear-gradient";
import { useCallback, useEffect, useState } from "react";
import GameScreen from "./src/screens/GameScreen";
import Colors from "./src/lib/constants";
import GameOverScreen from "./src/screens/GameOverScreen";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [userNumber, setUserNumber] = useState<number>();
  const [gameIsOver, setGameIsOver] = useState<boolean>(true);

  const [fontsLoaded, fontError] = useFonts({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });

  // useEffect(() => {
  //   async function hideSplashScreen() {
  //     await SplashScreen.hideAsync();
  //   }
  //   if (fontsLoaded || fontError) {
  //     hideSplashScreen();
  //   }
  // }, [fontsLoaded, fontError]);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError])

  if (!fontsLoaded && !fontError) {
    return null;
  }

  function handlePickedNumber(pickedNumber: number) {
    setUserNumber(pickedNumber);
    setGameIsOver(false);
  }

  function handleGameOver() {
    setGameIsOver(true);
  }

  let screen = <StartGameScreen onPickNumber={handlePickedNumber} />;

  if (userNumber) {
    screen = <GameScreen userNumber={userNumber} onGameOver={handleGameOver} />;
  }

  if (gameIsOver && userNumber) {
    screen = <GameOverScreen />
  }

  return (
    <LinearGradient onLayout={onLayoutRootView} colors={[Colors.primary700, Colors.accent500]} style={styles.rootScreen}>
      <ImageBackground
        source={require("./assets/images/background.png")}
        resizeMode="cover"
        style={styles.rootScreen}
        imageStyle={styles.backgroundImage}
      >
        <SafeAreaView style={styles.rootScreen}>
          {screen}
        </SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.15,
  },
});
