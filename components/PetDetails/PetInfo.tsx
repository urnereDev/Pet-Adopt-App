import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "@/constants/colors";
import MarkFav from "./MarkFav";

const PetInfo: React.FC<{ pet: any }> = ({ pet }) => {
  return (
    <View>
      <Image style={styles.petImage} source={{ uri: pet.imageUrl }} />
      <View
        style={{
          padding: 20,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginRight: 2,
        }}
      >
        <View>
          <Text style={styles.petName}>{pet?.name}</Text>
          <Text style={styles.petAddress}>{pet.address}</Text>
        </View>
        <MarkFav pet={pet} />
      </View>
    </View>
  );
};

export default PetInfo;

const styles = StyleSheet.create({
  petImage: {
    width: "100%",
    height: 300,
    objectFit: "cover",
  },
  petName: {
    fontFamily: "Poppins-Bold",
    fontSize: 27,
  },
  petAddress: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    color: colors.GRAY,
  },
});
