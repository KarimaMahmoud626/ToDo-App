import { View, StyleSheet, Image, Text } from "react-native";
import { COLORS } from "../constants/colors";
import { useSelector } from "react-redux";

export default function UserProfileHeader() {
  const userName = useSelector(
    (state) => state.user.currentUser?.name ?? "User",
  );
  const userEmail = useSelector((state) => state.user.currentUser?.email);

  return (
    <View style={styles.container}>
      <View style={{ padding: 10 }}>
        <Image
          source={require("../../assets/default_avatar.jpeg")}
          style={styles.avatar}
        />
      </View>
      <View style={{ padding: 10, justifyContent: "center" }}>
        <Text style={styles.text}>{userName}</Text>
        <Text style={styles.text}>{userEmail}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  avatar: {
    height: 60,
    width: 60,
    borderRadius: 35,
    resizeMode: "contain",
  },
  text: {
    color: COLORS.ON_SURFACE,
    fontSize: 18,
  },
});
