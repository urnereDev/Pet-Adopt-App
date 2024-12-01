import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/config/Firebaseconfig";
import Index from "@/app";

const Slider = () => {
  const [sliderList, setSliderList] = useState<any>([]);
  useEffect(() => {
    GetSliders();

    return () => {};
  }, []);

  const GetSliders = async () => {
    setSliderList([]);
    const snapshot = await getDocs(collection(db, "Sliders"));
    snapshot.forEach((doc) => {
      setSliderList((prevSliderList: any[]) => [...prevSliderList, doc.data()]);
    });
  };
  return (
    <View>
      <FlatList
        data={sliderList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <Image source={{ uri: item?.imageUrl }} style={styles.sliderImage} />
        )}
      />
    </View>
  );
};

export default Slider;

const styles = StyleSheet.create({
  sliderImage: {
    width: Dimensions.get("screen").width * 0.85,
    height: 160,
    borderRadius: 15,
    marginRight: 15,
    objectFit: "cover",
  },
});
