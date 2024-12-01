import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Shared from "@/Shared/Shared";
import { useUser } from "@clerk/clerk-expo";
import {
  collection,
  DocumentData,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/config/Firebaseconfig";
import PetListItem from "@/components/Home/PetListItem";

const Favorite = () => {
  const { user } = useUser();
  const [favIds, setFavIds] = useState([]);
  const [favPetList, setFavPetList] = useState<DocumentData[]>([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    user && GetFavPetIds();

    return () => {};
  }, [user]);

  const GetFavPetIds = async () => {
    setLoader(true);
    const result = await Shared.GetFavList(user);
    setFavIds(result?.favorites);
    setLoader(false);
    GetFavPetList(result?.favorites);
  };
  const GetFavPetList = async (favId_: string[]) => {
    setLoader(true);
    setFavPetList([]);
    const q = query(collection(db, "Pets"), where("id", "in", favId_));
    const querSnapshot = await getDocs(q);
    querSnapshot.forEach((doc) => {
      setFavPetList((prev) => [...prev, doc.data()]);
    });
    setLoader(false);
  };

  return (
    <View style={styles.favoriteContainer}>
      <Text style={styles.favoriteText}>Favorite</Text>
      <FlatList
        data={favPetList}
        key={favIds.length}
        onRefresh={GetFavPetIds}
        refreshing={loader}
        numColumns={2}
        renderItem={({ item, index }) => (
          <View>
            <PetListItem pet={item} />
          </View>
        )}
      />
    </View>
  );
};

export default Favorite;

const styles = StyleSheet.create({
  favoriteContainer: {
    padding: 20,
    marginTop: 20,
  },
  favoriteText: {
    fontFamily: "Poppins-Medium",
    fontSize: 30,
  },
});
