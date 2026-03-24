import { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Pressable,
} from "react-native";
import { FontAwesomeFreeSolid } from "@react-native-vector-icons/fontawesome-free-solid";
import { COLORS } from "../constants/colors";

export default function DropdownMenu({ options }) {
  const [visible, setVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef(null);

  const openMenu = () => {
    buttonRef.current.measure((fx, fy, width, height, px, py) => {
      setMenuPosition({ x: px - width * 5, y: py - height });
      setVisible(true);
    });
  };

  return (
    <View>
      <TouchableOpacity
        ref={buttonRef}
        onPress={openMenu}
        style={styles.button}
      >
        <FontAwesomeFreeSolid
          name="ellipsis-vertical"
          size={18}
          color={COLORS.ON_SURFACE}
        />
      </TouchableOpacity>

      <Modal transparent visible={visible} animationType="fade">
        <Pressable style={styles.overlay} onPress={() => setVisible(false)} />

        <View
          style={[styles.menu, { top: menuPosition.y, left: menuPosition.x }]}
        >
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.option, option.danger && styles.dangerOption]}
              onPress={() => {
                setVisible(false);
                option.onPress();
              }}
            >
              {option.icon && (
                <FontAwesomeFreeSolid
                  name={option.icon}
                  size={14}
                  color={option.danger ? COLORS.ERROR : COLORS.ON_SURFACE}
                  style={styles.optionIcon}
                />
              )}
              <Text
                style={[styles.optionText, option.danger && styles.dangerText]}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 8,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  menu: {
    position: "absolute",
    backgroundColor: COLORS.SURFACE,
    borderRadius: 10,
    paddingVertical: 6,
    minWidth: 160,
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  dangerOption: {
    borderTopWidth: 1,
    borderTopColor: COLORS.OUTLINE,
  },
  optionIcon: {
    marginRight: 10,
  },
  optionText: {
    fontSize: 14,
    color: COLORS.ON_SURFACE,
  },
  dangerText: {
    color: COLORS.ERROR ?? "#E57373",
  },
});
