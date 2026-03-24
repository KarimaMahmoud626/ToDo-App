import { SafeAreaView } from "react-native-safe-area-context";
import AppNavigator from "./src/navigation/AppNavigator";
import { Provider } from "react-redux";
import { store } from "./src/redux/store/store";
import ErrorBoundary from "./src/components/ErrorBoundary";

export default function App() {
  return (
    <Provider store={store}>
      <ErrorBoundary>
        <SafeAreaView style={{ flex: 1 }}>
          <AppNavigator />
        </SafeAreaView>
      </ErrorBoundary>
    </Provider>
  );
}
