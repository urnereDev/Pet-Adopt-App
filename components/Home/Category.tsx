import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/config/Firebaseconfig";
import colors from "@/constants/colors";

const Category: React.FC<{ category: object }> = ({ category }) => {
  const [categoryList, setCategoryList] = useState<any>([]);
  const [selectedCategory, setSelectedCategory] = useState("Dog");
  useEffect(() => {
    GetCategory();

    return () => {};
  }, []);

  const GetCategory = async () => {
    setCategoryList([]);
    const snapshot = await getDocs(collection(db, "Category"));
    snapshot.forEach((doc) => {
      setCategoryList((prevCategoryList: any[]) => [
        ...prevCategoryList,
        doc.data(),
      ]);
    });
  };
  return (
    <View style={styles.categoryView}>
      <Text style={styles.titleText}>Category</Text>
      <FlatList
        data={categoryList}
        numColumns={4}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => {
              setSelectedCategory(item.name),
                (category as (name: string) => void)(item.name);
            }}
            style={styles.container}
          >
            <View
              style={[
                styles.imageView,
                selectedCategory == item.name && styles.selectedCategory,
              ]}
            >
              <Image
                resizeMode="contain"
                source={{ uri: item?.imageUrl }}
                style={styles.categoryImage}
              />
            </View>
            <Text style={styles.categoryName}>{item?.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Category;

const styles = StyleSheet.create({
  categoryView: {
    marginTop: 20,
  },
  titleText: {
    fontFamily: "Poppins-Medium",
    fontSize: 20,
  },
  categoryImage: {
    width: 40,
    height: 40,
  },
  imageView: {
    backgroundColor: colors.LIGHT_PRIMARY,
    padding: 15,
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 15,
    borderColor: colors.PRIMARY,
    margin: 5,
  },
  container: {
    flex: 1,
  },
  categoryName: {
    textAlign: "center",
    fontFamily: "Poppins-Regular",
  },
  selectedCategory: {
    backgroundColor: colors.SECONDERY,
    borderColor: colors.SECONDERY,
  },
});
