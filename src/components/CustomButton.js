import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import * as Progress from "react-native-progress";
import { COLORS } from "../constants/colors";
import { FontAwesomeFreeSolid } from "@react-native-vector-icons/fontawesome-free-solid";

export default function CustomButton({
  title,
  onPress,
  icon,
  isLoading,
  style,
}) {
  return (
    <TouchableOpacity
      style={style ? [styles.button, style] : styles.button}
      onPress={onPress}
      disabled={isLoading}
    >
      <View style={styles.container}>
        {isLoading ? (
          <Progress.Circle size={24} indeterminate={true} color="#fff" />
        ) : icon ? (
          <View style={{ flexDirection: "row" }}>
            <FontAwesomeFreeSolid
              name={icon}
              size={18}
              color={COLORS.ON_SURFACE}
            />
            <Text style={styles.buttonText}>{title}</Text>
          </View>
        ) : (
          <Text style={styles.buttonText}>{title}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 6,
    borderRadius: 4,
    alignItems: "center",
    elevation: 15,
    backgroundColor: COLORS.PRIMARY,
    marginBottom: 15,
  },
  buttonText: { color: COLORS.ON_SURFACE, fontWeight: "bold", fontSize: 22 },
  container: { flexDirection: "row", alignItems: "center" },
  icon: { width: 20, height: 20, marginRight: 10 },
});
