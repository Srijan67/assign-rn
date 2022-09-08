import { View } from "react-native";
import HomePage from "../screens/homepage";
import ViewPage from "../screens/viewpage";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();
const StackNav = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomePage} />
      <Stack.Screen name="View" component={ViewPage} />
    </Stack.Navigator>
  );
};
export default StackNav;
