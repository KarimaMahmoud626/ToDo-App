import { Ionicons } from "@react-native-vector-icons/ionicons";
import { TouchableOpacity, StyleSheet } from "react-native";
import { COLORS } from "../constants/colors";

const styles = StyleSheet.create({
  button: {
    padding: 8,
  },
});

export default function IconButton({
  iconName,
  onPress,
  size = 20,
  color = COLORS.ON_SURFACE,
  isClicked = false,
}) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button]}>
      <Ionicons
        name={isClicked ? `${iconName}` : `${iconName}-outline`}
        size={size}
        color={isClicked ? color : COLORS.ON_SURFACE}
      />
    </TouchableOpacity>
  );
}
