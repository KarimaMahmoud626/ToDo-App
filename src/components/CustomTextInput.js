import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { FontAwesomeFreeSolid } from "@react-native-vector-icons/fontawesome-free-solid";
import { Ionicons } from "@react-native-vector-icons/ionicons";
import { COLORS } from "../constants/colors";

export default function CustomTextInput({
  placeholder,
  secureTextEntry,
  keyboardType,
  onChangeText,
  onSubmitEditing,
  value,
  iconName,
  postIcon,
  postIconPress,
  onError,
  title,
  validationMessage,
}) {
  return (
    <View style={{ flexDirection: "column", marginBottom: 25 }}>
      {title && <Text style={styles.title}>{title}</Text>}
      <View
        style={
          onError && validationMessage
            ? [styles.container, { borderColor: "red" }]
            : styles.container
        }
      >
        <FontAwesomeFreeSolid
          name={iconName}
          size={styles.icon.size}
          color={styles.icon.color}
        />

        <TextInput
          style={styles.input}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          onChangeText={onChangeText}
          value={value}
          placeholderTextColor={"gray"}
          onSubmitEditing={onSubmitEditing}
        />
        {postIcon && (
          <TouchableOpacity onPress={postIconPress}>
            <Ionicons
              name={postIcon}
              size={styles.icon.size}
              color={styles.icon.color}
            />
          </TouchableOpacity>
        )}
      </View>
      {onError && validationMessage && (
        <Text style={{ color: "red" }}>{validationMessage}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 4,
    elevation: 15,
    backgroundColor: COLORS.SURFACE,
    height: 50,
    paddingHorizontal: 10,
    borderWidth: 2,
    borderColor: COLORS.OUTLINE,
  },

  icon: { size: 18, color: COLORS.ON_SURFACE },
  input: { flex: 1, padding: 10, color: COLORS.ON_SURFACE },
  title: { color: COLORS.ON_SURFACE, fontSize: 18, marginBottom: 5 },
});
