import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  TextInput,
} from "react-native";
import { FontAwesomeFreeSolid } from "@react-native-vector-icons/fontawesome-free-solid";
import { COLORS } from "../constants/colors";
import { useSelector } from "react-redux";

export default function DrawerItem({
  item,
  isSelected,
  onPress,
  onLongPress,
  iconName,
}) {
  const taskCount = useSelector((state) => {
    const list = state.taskList.lists.find((l) => l.id === item.id);
    return list ? list.tasksCount : 0;
  });
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingRight: 8,
      }}
    >
      <TouchableOpacity
        style={[styles.item, isSelected && styles.itemSelected]}
        onPress={onPress}
        onLongPress={onLongPress}
      >
        {(item.icon || iconName) && (
          <FontAwesomeFreeSolid
            name={item.icon || iconName}
            size={16}
            color={isSelected ? COLORS.PRIMARY : COLORS.ON_SURFACE}
            style={styles.itemIcon}
          />
        )}

        <Text style={[styles.itemText, isSelected && styles.itemTextSelected]}>
          {item.title}
        </Text>
        <Text style={[styles.itemText, isSelected && styles.itemTextSelected]}>
          {taskCount > 0 ? ` ${taskCount}` : ""}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginHorizontal: 8,
    marginVertical: 2,
  },
  itemSelected: {
    backgroundColor: COLORS.SURFACE,
  },
  itemIcon: {
    marginRight: 12,
  },
  itemText: {
    color: COLORS.ON_SURFACE,
    fontSize: 16,
  },
  itemTextSelected: {
    color: COLORS.PRIMARY,
    fontWeight: "bold",
  },
});
