import { createStaticNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignUpScreen from "../screens/Auth/SignUpScreen";
import HomeScreen from "../screens/Home/HomeScreen";
import LoginScreen from "../screens/Auth/LoginScreen";

const Stack = createNativeStackNavigator({
  screens: {
    Login: {
      screen: LoginScreen,
      options: { headerShown: false },
    },
    SignUp: {
      screen: SignUpScreen,
      options: { headerShown: false },
    },
    MainApp: {
      screen: HomeScreen,
      options: { headerShown: false },
    },
  },
});

const AppNavigator = createStaticNavigation(Stack);

export default AppNavigator;
