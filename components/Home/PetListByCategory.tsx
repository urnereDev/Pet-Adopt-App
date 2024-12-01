import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Category from "./Category";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/config/Firebaseconfig";
import PetListItem from "./PetListItem";

const PetListByCategory = () => {
  const [petList, setPetList] = useState<any>([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    GetPetList("Dog");

    return () => {};
  }, []);

  /**
   * @param {*} category
   */

  const GetPetList = async (category: string) => {
    setLoader(true);
    setPetList([]);
    const q = query(collection(db, "Pets"), where("category", "==", category));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setPetList((prevPetList: any[]) => [...prevPetList, doc.data()]);
    });
    setLoader(false);
  };
  return (
    <View>
      <Category category={(value: string) => GetPetList(value)} />
      <FlatList
        style={{ marginTop: 10 }}
        refreshing={loader}
        onRefresh={() => GetPetList("Dog")}
        data={petList}
        horizontal={true}
        renderItem={({ item, index }) => <PetListItem pet={item} />}
      />
    </View>
  );
};

export default PetListByCategory;

const styles = StyleSheet.create({});
