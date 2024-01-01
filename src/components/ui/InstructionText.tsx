import { StyleSheet, Text } from "react-native";
import Colors from "../../lib/constants";

const InstructionText = ({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: object;
}) => {
  return <Text style={[styles.instructionText, style]}>{children}</Text>;
};

const styles = StyleSheet.create({
  instructionText: {
    fontFamily: "open-sans",
    color: Colors.accent500,
    fontSize: 24,
  },
});

export default InstructionText;
