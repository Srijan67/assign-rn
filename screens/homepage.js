import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Dimensions,
  FlatList,
  Modal,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import myList from "../AdminUI_JSON.json";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FontAwesome5 } from "@expo/vector-icons";
const windowHeight = Dimensions.get("screen").height / 100;

const HomePage = ({ navigation }) => {
  const [isLoad, setIsLoad] = useState(false);
  const [List, setList] = useState(myList);
  const [filter, setFilter] = useState(null);
  const [edit, setEdit] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    let listFilter = myList;
    if (filter === null || filter === "") {
      setList(myList);
    }
    if (filter) {
      listFilter = listFilter.filter((item) => {
        let { name, email, role } = item;
        if (
          name.toUpperCase().includes(filter.toUpperCase()) ||
          role.toUpperCase().includes(filter.toUpperCase()) ||
          email.toUpperCase().includes(filter.toUpperCase())
        ) {
          return item;
        }
      });
      setList(listFilter);
    }
  }, [filter]);
  const deleteData = (id) => {
    let temp = List.filter((item) => {
      if (id === item.id) {
        return null;
      } else {
        return item;
      }
    });
    setList(temp);
  };
  const editData = (id) => {
    let temp = List.filter((item) => {
      if (id === item.id) {
        return item;
      } else {
        return null;
      }
    });
    setEdit(temp[0]);
    setModalVisible(true);
  };
  const saveEdit = (id) => {
    let temp = List.filter((item) => {
      if (id === item.id) {
        item.name = edit.name;
        item.email = edit.email;
        item.role = edit.role;
        return item;
      } else {
        return item;
      }
    });
    setList(temp);
    setModalVisible(false);
  };
  const renderItem = ({ item }) => {
    return (
      <View style={style.headArea}>
        <Text style={[style.entryStyle, { flex: 1 }]}>{item.name}</Text>
        <Text style={[style.entryStyle, { flex: 1.5 }]}>{item.email}</Text>

        <Text style={[style.entryStyle, { flex: 0.5 }]}>{item.role}</Text>
        <View
          style={{
            flex: 0.5,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            style={{ paddingRight: 5 }}
            onPress={() => editData(item.id)}
          >
            <FontAwesome5 name="edit" size={15} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ paddingRight: 5 }}
            onPress={() => deleteData(item.id)}
          >
            <FontAwesome5 name="trash" size={15} color="black" />
          </TouchableOpacity>
        </View>
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
        <Text style={[style.colHead, { flex: 0.5 }]}>Action</Text>
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <SafeAreaView style={style.outerBox}>
          <View style={style.innerBox}>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
              }}
              style={style.modalCross}
            >
              <Ionicons name="close-circle" size={24} color="gray" />
            </TouchableOpacity>
            <TextInput
              style={style.textInput}
              placeholder="Enter Name"
              value={edit.name}
              onChangeText={(e) => setEdit({ ...edit, name: e })}
              editable={true}
            />
            <TextInput
              style={style.textInput}
              placeholder="Enter Email"
              value={edit.email}
              onChangeText={(e) => setEdit({ ...edit, email: e })}
              editable={true}
            />
            <TextInput
              style={style.textInput}
              placeholder="Enter Role"
              value={edit.role}
              onChangeText={(e) => setEdit({ ...edit, role: e })}
              editable={true}
            />
            <Button
              onPress={() => {
                if (!edit.name || !edit.email || !edit.role) {
                  return Alert.alert("Enter all Inputs");
                }
                saveEdit(edit.id);
              }}
              title={"save"}
            />
          </View>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};
export default HomePage;
const style = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    paddingBottom: 45,
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
  outerBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  innerBox: {
    // height: windowHeight * 55,
    minHeight: windowHeight * 30,
    paddingBottom: 15,
    backgroundColor: "#fff",
    // backgroundColor: "#262626",
    width: "90%",
    borderColor: "lightgrey",
    borderWidth: 4,
  },
  modalCross: {
    marginHorizontal: 3,
    marginVertical: 6,
    padding: 5,
    alignItems: "flex-end",
  },
});
