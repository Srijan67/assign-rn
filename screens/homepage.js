import { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import myList from "../AdminUI_JSON.json";
const windowHeight = Dimensions.get("screen").height / 100;

const HomePage = ({ navigation }) => {
  const [isLoad, setIsLoad] = useState(false);
  const [List, setList] = useState(myList);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    List.filter((item) => {
      let { name } = item;
      if (name.toUpperCase().includes(filter.toUpperCase())) {
        return item;
      } else if (filter === "") {
        return item;
      }
    });
  }, [filter]);
  const renderItem = ({ item }) => {
    return (
      <View style={style.headArea}>
        <Text style={[style.entryStyle, { flex: 1 }]}>{item.name}</Text>
        <Text style={[style.entryStyle, { flex: 1.5 }]}>{item.email}</Text>
        <Text style={[style.entryStyle, { flex: 0.5 }]}>{item.role}</Text>
      </View>
    );
  };
  return (
    <SafeAreaView style={style.container}>
      <TextInput
        placeholder="search by name/email/role"
        style={style.textInput}
        value={filter}
        onChangeText={(e) => setFilter(e)}
      />
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          paddingLeft: 5,
        }}
      >
        <Text style={[style.colHead, { flex: 1 }]}>Name</Text>
        <Text style={[style.colHead, { flex: 1.5 }]}>Email</Text>
        <Text style={[style.colHead, { flex: 0.5 }]}>Role</Text>
      </View>
      <FlatList
        style={{ width: "100%", height: "100%", paddingLeft: 5 }}
        data={List}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl
            refreshing={isLoad}
            // onRefresh={() => {
            //   allListData();
            // }}
            title="Pull to refresh"
            tintColor="#fff"
            titleColor="#fff"
          />
        }
        // onEndReachedThreshold={32.5}
      />
    </SafeAreaView>
  );
};
export default HomePage;
const style = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    paddingBottom: 25,
  },
  textCol: {
    color: "#000",
  },
  headArea: {
    display: "flex",
    flexDirection: "row",
  },
  colHead: {
    fontSize: 15,
    fontWeight: "700",
  },
  entryStyle: {
    fontSize: 12,
    fontWeight: "400",
  },
  textInput: {
    paddingHorizontal: 11,
    marginTop: 5,
    paddingVertical: 3,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#000",
  },
});
