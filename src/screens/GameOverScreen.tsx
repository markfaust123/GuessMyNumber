import { Image, View } from "react-native";
import Title from "../components/ui/Title";

const GameOverScreen = () => {
    return (
        <View>
            <Title>GAME OVER!</Title>
            <Image source={require("../../assets/images/success.png")}/>
        </View>
    )
}

export default GameOverScreen;