import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../constants/colors";
import { Checkbox } from "expo-checkbox";
import {
  editATask,
  deleteATask,
  getTasks,
} from "../redux/store/todos/task.slice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import IconButton from "./IconButton";
import { getLists, getList } from "../redux/store/todos/taskList.slice";

export default function TaskItem({ task, taskListId }) {
  const [isChecked, setChecked] = useState(task.status === "CLOSED");
  const [isImportant, setImportant] = useState(task.priority === "HIGH");
  const [newPriority, setNewPriority] = useState(task.priority);
  const [priorityColor, setPriorityColor] = useState(null);

  const dispatch = useDispatch();

  const toggleTaskStatus = async (newValue) => {
    setChecked(newValue);
    dispatch(
      editATask({
        id: task.id,
        taskListId: taskListId,
        title: task.title,
        description: task.description,
        priority: task.priority,
        dueDate: task.dueDate,
        status: newValue ? "CLOSED" : "OPEN",
      }),
    );
  };

  const updateTaskPriority = async () => {
    let updatedPriority = task.priority;
    let updatedColor = null;

    if (task.priority === "LOW") {
      updatedPriority = "MEDIUM";
      updatedColor = "gold";
      setImportant(false);
    } else if (task.priority === "MEDIUM") {
      updatedPriority = "HIGH";
      updatedColor = "orange";
      setImportant(true);
    } else {
      updatedPriority = "LOW";
      setPriorityColor(null);
      setImportant(false);
    }

    setNewPriority(updatedPriority);
    setPriorityColor(updatedColor);

    dispatch(
      editATask({
        id: task.id,
        taskListId: taskListId,
        title: task.title,
        description: task.description,
        priority: updatedPriority,
        dueDate: task.dueDate,
        status: task.status,
      }),
    );
  };

  const deleteTask = async () => {
    try {
      await dispatch(deleteATask(task.id)).unwrap();
      dispatch(getTasks(taskListId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <View style={[styles.taskItem, isChecked && styles.taskItemCompleted]}>
      <Checkbox
        value={isChecked}
        color={isChecked ? "green" : undefined}
        onValueChange={(newValue) => {
          toggleTaskStatus(newValue);
        }}
        style={[styles.checkbox]}
      />
      <View style={styles.taskContent}>
        <Text
          style={[styles.taskTitle, isChecked && styles.taskTitleCompleted]}
        >
          {task.title}
        </Text>
      </View>
      <IconButton
        iconName="star"
        onPress={() => updateTaskPriority()}
        isClicked={isImportant}
        color={priorityColor ?? "gold"}
      />
      <IconButton
        iconName="trash"
        onPress={() => {
          deleteTask();
        }}
        color={COLORS.ERROR}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 15,
    marginVertical: 6,
    backgroundColor: COLORS.SURFACE,
  },
  taskItemCompleted: {
    opacity: 0.5,
  },
  checkbox: {
    height: "60%",
    width: "8%",
    borderRadius: 60,
    marginRight: 12,
    borderColor: COLORS.OUTLINE,
    borderWidth: 2,
    backgroundColor: COLORS.SURFACE,
  },
  taskContent: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
    color: COLORS.ON_SURFACE,
  },
  taskTitleCompleted: {
    textDecorationLine: "line-through",
  },
});
