import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getTasks } from "../redux/store/todos/task.slice";
import { COLORS } from "../constants/colors";
import { FontAwesomeFreeSolid } from "@react-native-vector-icons/fontawesome-free-solid";
import TaskItem from "./TaskItem";
import DropdownMenu from "./DropdownMenu";
import {
  editList,
  deleteList,
  getLists,
} from "../redux/store/todos/taskList.slice";

function EmptyState({ listName }) {
  return (
    <View style={styles.emptyContainer}>
      <FontAwesomeFreeSolid
        name="check-circle"
        size={48}
        color={COLORS.OUTLINE}
      />
      <Text style={styles.emptyTitle}>No tasks yet</Text>
      <Text style={styles.emptySubtitle}>
        {listName
          ? `Add a task to "${listName}"`
          : "Select a list to get started"}
      </Text>
    </View>
  );
}

export default function TaskList({ list, onOpenDrawer }) {
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector((state) => state.task);
  const [newName, setNewName] = useState(list?.title || "");
  const [isRenaming, setIsRenaming] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const handleRename = () => {
    setIsRenaming(false);
    dispatch(
      editList({ id: list.id, title: newName, description: list.description }),
    );
    dispatch(getLists());
  };

  const handleDelete = async () => {
    setIsRenaming(false);
    await dispatch(deleteList(list.id));
    dispatch(getLists());
    setIsDeleted(true);
  };

  useEffect(() => {
    if (list?.id) {
      dispatch(getTasks(list.id));
    }
  }, [list?.id, dispatch]);

  useEffect(() => {
    setIsDeleted(false);
  }, [handleDelete]);

  if (!list) {
    return (
      <View style={styles.containerFull}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onOpenDrawer} style={styles.menuButton}>
            <FontAwesomeFreeSolid
              name="bars"
              size={20}
              color={COLORS.ON_SURFACE}
            />
          </TouchableOpacity>
        </View>
        <EmptyState />
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={COLORS.PRIMARY} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <FontAwesomeFreeSolid
          name="triangle-exclamation"
          size={32}
          color={COLORS.ON_ERROR_OUTLINE}
        />
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={() => dispatch(getTasks(list.id))}
        >
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {isDeleted ? (
        <EmptyState />
      ) : (
        <>
          <View style={styles.header}>
            <View
              style={{ flexDirection: "row", alignItems: "center", flex: 1 }}
            >
              <TouchableOpacity
                onPress={onOpenDrawer}
                style={styles.menuButton}
              >
                <FontAwesomeFreeSolid
                  name="bars"
                  size={20}
                  color={COLORS.ON_SURFACE}
                />
              </TouchableOpacity>
              {isRenaming ? (
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <TextInput
                    style={styles.input}
                    value={newName}
                    onChangeText={setNewName}
                    onBlur={handleRename}
                    onKeyPress={(e) => e.key === "Enter" && handleRename()}
                  />
                </View>
              ) : (
                <Text style={styles.listHeader}>{list.title}</Text>
              )}
            </View>

            <DropdownMenu
              options={[
                {
                  label: "Rename",
                  icon: "pen",
                  onPress: () => {
                    setIsRenaming(true);
                  },
                },
                {
                  label: "Delete",
                  icon: "trash",
                  danger: true,
                  onPress: () => handleDelete(),
                },
              ]}
            />
          </View>
          <FlatList
            data={tasks}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TaskItem task={item} taskListId={list.id} />
            )}
            ListEmptyComponent={<EmptyState listName={list.title} />}
            contentContainerStyle={
              tasks.length === 0 ? styles.emptyFlatList : styles.flatListContent
            }
            showsVerticalScrollIndicator={false}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
  },
  containerFull: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    // gap: 12,
  },
  menuButton: {
    padding: 4,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  listHeader: {
    color: COLORS.ON_SURFACE,
    fontSize: 26,
    fontWeight: "bold",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  flatListContent: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  emptyFlatList: {
    flex: 1,
    justifyContent: "center",
  },

  emptyContainer: {
    alignItems: "center",
    gap: 10,
    padding: 40,
  },
  emptyTitle: {
    color: COLORS.ON_SURFACE,
    fontSize: 20,
    fontWeight: "bold",
  },
  emptySubtitle: {
    color: COLORS.OUTLINE,
    fontSize: 14,
    textAlign: "center",
  },
  errorText: {
    color: COLORS.ON_ERROR_OUTLINE,
    fontSize: 15,
    textAlign: "center",
    paddingHorizontal: 30,
  },
  retryButton: {
    backgroundColor: COLORS.PRIMARY,
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryText: {
    color: COLORS.ON_SURFACE,
    fontWeight: "bold",
    fontSize: 15,
  },
  input: { flex: 1, padding: 10, color: COLORS.ON_SURFACE },
});
