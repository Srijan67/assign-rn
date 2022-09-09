import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
  const pageNum = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNum.push(i);
  }
  return (
    <View style={style.pageCtrl}>
      <View
        style={{
          alignItems: "center",
          justifyContent: "space-around",
          flexDirection: "row",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            if (currentPage !== 1) paginate(1);
          }}
        >
          <Ionicons
            name="ios-play-back-circle"
            size={34}
            color={currentPage !== 1 ? "black" : "gray"}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (currentPage !== 1) paginate(currentPage - 1);
          }}
        >
          <Ionicons
            name="caret-back-circle-sharp"
            size={34}
            color={currentPage !== 1 ? "black" : "gray"}
          />
        </TouchableOpacity>
        {pageNum.map((num) => {
          console.log("num : ", num);
          return (
            <TouchableOpacity
              style={
                currentPage === num ? style.pagenateOutline : style.pagenateBg
              }
              key={num}
              onPress={() => paginate(num)}
            >
              <Text
                style={
                  currentPage === num
                    ? style.pagenateTextSelect
                    : style.pagenateText
                }
              >
                {num}
              </Text>
            </TouchableOpacity>
          );
        })}
        <TouchableOpacity
          onPress={() => {
            if (currentPage !== pageNum[pageNum.length - 1])
              paginate(currentPage + 1);
          }}
        >
          <Ionicons
            name="caret-forward-circle"
            size={34}
            color={
              currentPage !== pageNum[pageNum.length - 1] ? "black" : "gray"
            }
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (currentPage !== pageNum[pageNum.length - 1])
              paginate(pageNum.length);
          }}
        >
          <Ionicons
            name="ios-play-forward-circle"
            size={34}
            color={
              currentPage !== pageNum[pageNum.length - 1] ? "black" : "gray"
            }
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default Pagination;
const style = StyleSheet.create({
  pageCtrl: {
    marginTop: 10,
    width: "70%",
  },
  pagenateText: {
    color: "#fff",
    fontWeight: "500",
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 12,
  },
  pagenateTextSelect: {
    color: "#000",
    fontWeight: "500",
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 12,
  },
  pagenateBg: {
    backgroundColor: "#000",
    borderRadius: 20,
    marignRight: 10,
  },
  pagenateOutline: {
    backgroundColor: "#fff",
    borderRadius: 20,
    marignRight: 10,
    borderWidth: 2,
  },
});
