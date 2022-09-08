import { StyleSheet, Text, View } from "react-native";
const ViewPage = () => {
  return (
    <View style={style.container}>
      <Text style={style.textCol}>This is ViewPage</Text>
    </View>
  );
};
export default ViewPage;
const style = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  textCol: {
    color: "#000",
  },
});
