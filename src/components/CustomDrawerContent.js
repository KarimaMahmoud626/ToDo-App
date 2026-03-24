import { View, ScrollView, StyleSheet, ActivityIndicator } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useCallback } from "react";
import UserProfileHeader from "./UserProfileHeader";
import { COLORS } from "../constants/colors";
import DrawerItem from "./DarwerItem";
import CustomTextInput from "./CustomTextInput";
import { addList, getLists } from "../redux/store/todos/taskList.slice";

const FIXED_ITEMS = [
  { id: "my-day", title: "My Day", icon: "sun" },
  { id: "important", title: "Important", icon: "star" },
  { id: "planned", title: "Planned", icon: "calendar" },
  { id: "assigned", title: "Assigned to me", icon: "user" },
  { id: "flagged", title: "Flagged email", icon: "flag" },
  { id: "tasks", title: "Tasks", icon: "check" },
];

export default function CustomDrawerContent({ onSelectList, selectedList }) {
  const lists = useSelector((state) => state.taskList.lists);
  const loading = useSelector((state) => state.taskList.loading);
  const [listTitle, setListTitle] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLists())
      .unwrap()
      .then((data) => console.log("Success:", data))
      .catch((err) => console.error("Error:", err));
  }, []);

  useEffect(() => {
    console.log("fetched lists", lists);
  }, [lists]);

  const handleAddList = async () => {
    if (!listTitle.trim()) return;
    try {
      await dispatch(
        addList({ title: listTitle.trim(), description: "" }),
      ).unwrap();
      setListTitle("");
    } catch (error) {
      console.error("Error adding list:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.sizedBox}></View>
      <UserProfileHeader />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {FIXED_ITEMS.map((item) => (
          <DrawerItem
            key={item.id}
            item={item}
            isSelected={selectedList?.id === item.id}
            onPress={() => onSelectList(item)}
          />
        ))}

        <View style={styles.separator} />

        {loading ? (
          <ActivityIndicator color={COLORS.PRIMARY} style={styles.loader} />
        ) : (
          lists.map((list) => (
            <DrawerItem
              key={list.id}
              item={list}
              iconName={"bars"}
              isSelected={selectedList?.id === list.id}
              onPress={() => onSelectList(list)}
            />
          ))
        )}
      </ScrollView>
      <View style={{ padding: 8, flexDirection: "column-reverse" }}>
        <CustomTextInput
          iconName="plus"
          placeholder="Add List"
          value={listTitle}
          keyboardType="default"
          onChangeText={(val) => setListTitle(val)}
          postIcon="send"
          postIconPress={handleAddList}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
  },
  sizedBox: {
    height: 16,
  },
  scrollContent: {
    paddingVertical: 8,
  },
  separator: {
    height: 1,
    backgroundColor: COLORS.SURFACE,
    marginHorizontal: 16,
    marginVertical: 8,
  },
  loader: {
    marginTop: 16,
  },
});
