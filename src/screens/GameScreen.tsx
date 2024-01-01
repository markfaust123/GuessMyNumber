import { Alert, FlatList, StyleSheet, Text, View } from "react-native";
import Title from "../components/ui/Title";
import { useEffect, useState } from "react";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";
import { Ionicons } from "@expo/vector-icons";
import GuessLogItem from "../components/game/GuessLogItem";

// Generate number between min inclusive and max exclusive.
// Can specify one specific number to exclude.
const generateRandomBetween = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

let minBoundary: number = 1;
let maxBoundary: number = 100;

const GameScreen = ({
  userNumber,
  onGameOver,
}: {
  userNumber: number;
  onGameOver: Function;
}) => {
  const initialGuess = generateRandomBetween(minBoundary, maxBoundary);
  const [currentGuess, setCurrentGuess] = useState<number>(() => initialGuess);
  const [guessRounds, setGuessRounds] = useState<number[]>([initialGuess]);

  useEffect(() => {
    minBoundary = 1;
    maxBoundary = 100;
  }, []);

  useEffect(() => {
    if (currentGuess === userNumber) {
      onGameOver(guessRounds.length);
    } 
  }, [currentGuess, userNumber, onGameOver]);

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

    if (direction === "lower") {
      maxBoundary = currentGuess;
    } /* don't need "higher" because never called with diff string */ else {
      minBoundary = currentGuess + 1;
    }
    const newRndNumber: number = generateRandomBetween(
      minBoundary,
      maxBoundary
    );
    setCurrentGuess(newRndNumber);
    setGuessRounds((prevGuessRounds) => [newRndNumber, ...prevGuessRounds]);
  }

  const guessRoundsListLength = guessRounds.length;

  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      <NumberContainer>{currentGuess.toString()}</NumberContainer>
      <Card>
        <InstructionText style={styles.instructionText}>
          Lower or Higher?
        </InstructionText>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={handleNextGuess.bind(this, "lower")}>
              <Ionicons name="md-remove" size={24} color="white" />
            </PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={handleNextGuess.bind(this, "higher")}>
              <Ionicons name="md-add" size={24} color="white" />
            </PrimaryButton>
          </View>
        </View>
      </Card>
      <View style={styles.listContainer}>
        <FlatList
          data={guessRounds}
          renderItem={(itemData) => {
            return (
              <GuessLogItem
                roundNumber={guessRoundsListLength - itemData.index}
                guess={itemData.item}
              />
            );
          }}
          keyExtractor={(item, index) => {
            return item.toString();
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
  },
  instructionText: {
    marginBottom: 12,
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
    padding: 16, 
  }
});

export default GameScreen;
