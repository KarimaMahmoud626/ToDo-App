import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet } from "react-native";
import { useEffect, useState, useCallback } from "react";
import CustomTextInput from "../../components/CustomTextInput";
import CustomButton from "../../components/CustomButton";
import { VerticalSpace } from "../../components/VerticalSpace";
import { useDispatch, useSelector } from "react-redux";
import {
  loginFailure,
  loginStart,
  loginSuccess,
} from "../../redux/store/auth/auth.slice";
import { validateEmail, validatePassword } from "../../utils/validation";
import { COLORS } from "../../constants/colors";

export default function LoginScreen() {
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
  const dispatch = useDispatch();
  const loginIsLoading = useSelector((state) => state.user.isLoading);
  const loginIsSuccess = useSelector((state) => state.user.isLoggedIn);

  const onSignIn = useCallback(() => {
    if (!emailValidation || !passwordValidation) return;
    dispatch(loginStart());
    try {
      dispatch(loginSuccess({ email }));
    } catch (error) {
      dispatch(loginFailure(error?.message ?? "Login failed"));
    }
  }, [emailValidation, passwordValidation, email, dispatch]);

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
    if (loginIsSuccess) {
      navigation.navigate("MainApp");
    }
  }, [loginIsSuccess, navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <VerticalSpace flex={2} />

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

      <VerticalSpace flex={1} />

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

      <VerticalSpace flex={1} />

      <CustomButton
        isLoading={loginIsLoading}
        title="Sign In"
        onPress={onSignIn}
      />

      <VerticalSpace flex={1} />
      <Text style={styles.text}>
        If you do not have an account,{" "}
        <Text style={styles.link} onPress={() => navigation.navigate("SignUp")}>
          Sign Up
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: COLORS.BACKGROUND,
  },
  title: {
    fontSize: 38,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
    color: COLORS.ON_SURFACE,
  },
  text: { marginVertical: 10, textAlign: "center", color: COLORS.ON_SURFACE },
  link: { color: COLORS.PRIMARY, fontWeight: "bold" },
});
