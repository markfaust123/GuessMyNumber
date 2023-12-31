import { Button, StyleSheet, Text, View } from "react-native";
import Title from "../components/Title";

const GameScreen = () => {
  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      <Text>GUESS</Text>
      <View>
        <Text>Higher or Lower?</Text>
        <Button title="+" />
        <Button title="-" />
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
