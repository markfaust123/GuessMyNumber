import { Alert, Button, StyleSheet, Text, View } from "react-native";
import Title from "../components/ui/Title";
import { useEffect, useState } from "react";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";

let minBoundary: number = 1;
let maxBoundary: number = 100;

const GameScreen = ({ userNumber, onGameOver }: { userNumber: number, onGameOver: Function }) => {
  const initialGuess: number = generateRandomBetween(
    1,
    100,
    userNumber
  );

  const [currentGuess, setCurrentGuess] = useState<number>(initialGuess);

  // Generate number between min inclusive and max exclusive.
  // Can specify one specific number to exclude.
  function generateRandomBetween(min: number, max: number, exclude: number) {
    const rndNum: number = Math.floor(Math.random() * (max - min)) + min;
    if (rndNum === exclude) {
      return generateRandomBetween(min, max, exclude);
    } else {
      return rndNum;
    }
  }

  function handleNextGuess(direction: string) {
    // direction => "lower" or "higher"

    if (
      (direction === "higher" && currentGuess > userNumber) ||
      (direction === "lower" && currentGuess < userNumber)
    ) {
      Alert.alert("Don't lie!", "You know that this is wrong...", [
        { text: "Sorry!", style: "cancel" },
      ]);
      return;
    }

    if (direction === "higher") {
      minBoundary = currentGuess + 1;
    } /* don't need "lower" because never called with diff string */ else {
      maxBoundary = currentGuess;
    }
    const newRndNumber: number = generateRandomBetween(
      minBoundary,
      maxBoundary,
      userNumber
    );
    setCurrentGuess(newRndNumber);
  }

  useEffect(() => {
    if (currentGuess === userNumber) {
      onGameOver();
    }
  }, [currentGuess])

  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      <NumberContainer>{currentGuess.toString()}</NumberContainer>
      <View>
        <Text>Higher or Lower?</Text>
        <View>
          <PrimaryButton onPress={handleNextGuess.bind(this, "higher")}>
            +
          </PrimaryButton>
          <PrimaryButton onPress={handleNextGuess.bind(this, "lower")}>
            -
          </PrimaryButton>
        </View>
      </View>
      <View>
        <Text>LOG ROUNDS</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
  },
});

export default GameScreen;
