import { useState, useEffect, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import { Drawer } from "react-native-drawer-layout";
import CustomDrawerContent from "../../components/CustomDrawerContent";
import TaskList from "../../components/TaskList";
import { COLORS } from "../../constants/colors";
import CustomTextInput from "../../components/CustomTextInput";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import { addNewTask } from "../../redux/store/todos/task.slice";
import { getList, getLists } from "../../redux/store/todos/taskList.slice";

export default function HomeScreen() {
  const lists = useSelector((state) => state.taskList.lists);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedList, setSelectedList] = useState(null);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const dispatch = useDispatch();

  const handleSelectList = async (list) => {
    const fullList = lists.find((l) => l.id === list.id);
    setSelectedList(fullList);
    setDrawerOpen(false);
  };

  const handleAddTask = async () => {
    if (!newTaskTitle.trim() || !selectedList) return;
    try {
      await dispatch(
        addNewTask({
          taskListId: selectedList.id,
          title: newTaskTitle.trim(),
          description: "",
          priority: "LOW",
          status: "OPEN",
        }),
      ).unwrap();
      setNewTaskTitle("");
      await dispatch(getLists()).unwrap();
      const updatedList = lists.find((l) => l.id === selectedList.id);
      if (updatedList) setSelectedList(updatedList);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <Drawer
      open={drawerOpen}
      onOpen={() => setDrawerOpen(true)}
      onClose={() => setDrawerOpen(false)}
      drawerWidth={300}
      drawerPosition="left"
      renderDrawerContent={() => (
        <CustomDrawerContent
          selectedList={selectedList}
          onSelectList={handleSelectList}
        />
      )}
    >
      <View style={styles.container}>
        <TaskList
          list={selectedList}
          tasks={selectedList?.tasks ?? []}
          onOpenDrawer={() => setDrawerOpen(true)}
        />
      </View>
      <View style={styles.newTask}>
        <CustomTextInput
          placeholder={"Add new task"}
          iconName={"plus"}
          value={newTaskTitle}
          onChangeText={(val) => setNewTaskTitle(val)}
          postIcon={"send"}
          postIconPress={handleAddTask}
        />
      </View>
    </Drawer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
    padding: 16,
  },
  newTask: {
    height: 80,
    backgroundColor: COLORS.BACKGROUND,
    padding: 16,
  },
});
