import { View, StyleSheet, Text } from "react-native";
import { useState, useEffect, useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomTextInput from "../../components/CustomTextInput";
import CustomButton from "../../components/CustomButton";
import {
  validateRepeatPassword,
  validateEmail,
  validatePassword,
} from "../../utils/validation";
import {
  loginStart,
  loginFailure,
  loginSuccess,
} from "../../redux/store/auth/auth.slice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../constants/colors";

export default function SignUpScreen() {
  const navigation = useNavigation();
  const [isHide, setIsHide] = useState(true);
  const [email, setEmail] = useState("");
  const [emailValidation, setEmailValidation] = useState(false);
  const [emailValidationMessage, setEmailValidationMessage] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordValidation, setPasswordValidation] = useState(false);
  const [passwordValidationMessage, setPasswordValidationMessage] =
    useState("");
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [rPassword, setRPassword] = useState("");
  const [rpasswordValidation, setRPasswordValidation] = useState(false);
  const [rpasswordValidationMessage, setRPasswordValidationMessage] =
    useState("");
  const [rpasswordTouched, setRPasswordTouched] = useState(false);
  const dispatch = useDispatch();
  const loginIsSuccess = useSelector((state) => state.user.isLoggedIn);
  const loginIsLoading = useSelector((state) => state.user.isLoading);

  const onSignUp = useCallback(() => {
    if (!emailValidation || !passwordValidation || !rpasswordValidation) return;
    dispatch(loginStart());
    try {
      dispatch(loginSuccess({ email }));
    } catch (error) {
      dispatch(loginFailure(error?.message ?? "Sign up failed"));
    }
  }, [
    emailValidation,
    passwordValidation,
    rpasswordValidation,
    email,
    dispatch,
  ]);

  useEffect(() => {
    const result = validateEmail(email);
    setEmailValidation(result === null);
    setEmailValidationMessage(result ?? "");
  }, [email]);

  useEffect(() => {
    const result = validatePassword(password);
    setPasswordValidation(result === null);
    setPasswordValidationMessage(result ?? "");
  }, [password]);

  useEffect(() => {
    const result = validateRepeatPassword(password, rPassword);
    setRPasswordValidation(result === null);
    setRPasswordValidationMessage(result ?? "");
  }, [rPassword, password]);

  useEffect(() => {
    if (loginIsSuccess) {
      navigation.navigate("MainApp");
    }
  }, [loginIsSuccess, navigation]);

  return (
    // Fixed: removed incorrectly nested SafeAreaProvider (provider lives in App.js)
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>Sign Up</Text>

      <CustomTextInput
        title={"Email"}
        placeholder="Enter Email"
        keyboardType="email-address"
        onChangeText={(val) => {
          setEmail(val);
          setEmailTouched(true);
        }}
        value={email}
        iconName={"envelope"}
        onError={emailTouched && !emailValidation}
        validationMessage={emailValidationMessage}
      />

      <CustomTextInput
        title={"Password"}
        placeholder="Enter Password"
        secureTextEntry={isHide}
        onChangeText={(val) => {
          setPassword(val);
          setPasswordTouched(true);
        }}
        value={password}
        iconName={"lock"}
        postIconPress={() => setIsHide(!isHide)}
        postIcon={isHide ? "eye-off" : "eye"}
        onError={passwordTouched && !passwordValidation}
        validationMessage={passwordValidationMessage}
      />

      <CustomTextInput
        title={"Confirm Password"}
        placeholder="Repeat password"
        secureTextEntry={isHide}
        onChangeText={(val) => {
          setRPassword(val);
          setRPasswordTouched(true);
        }}
        value={rPassword}
        iconName={"lock"}
        postIconPress={() => setIsHide(!isHide)}
        postIcon={isHide ? "eye-off" : "eye"}
        onError={rpasswordTouched && !rpasswordValidation}
        validationMessage={rpasswordValidationMessage}
      />

      <CustomButton
        title="Sign Up"
        onPress={onSignUp}
        isLoading={loginIsLoading}
      />

      <Text style={styles.text}>Read User License Agreement</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "flex-start",
    backgroundColor: COLORS.BACKGROUND,
  },
  headerText: {
    alignSelf: "center",
    fontSize: 54,
    color: COLORS.PRIMARY,
    fontWeight: "bold",
    marginVertical: 60,
  },
  sizedBox: { flex: 1 },
  text: {
    marginTop: 20,
    color: COLORS.PRIMARY,
    alignSelf: "center",
    fontSize: 18,
    fontWeight: "600",
  },
});
