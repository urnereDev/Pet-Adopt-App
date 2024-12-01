import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import colors from "@/constants/colors";
import { useRouter } from "expo-router";
import MarkFav from "../PetDetails/MarkFav";

const PetListItem: React.FC<{ pet: any }> = ({ pet }) => {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => router.push({ pathname: "/pet-details", params: pet })}
      style={styles.petBorder}
    >
      <View style={styles.markFavView}>
        <MarkFav pet={pet} color="white" />
      </View>
      <Image style={styles.petImage} source={{ uri: pet.imageUrl }} />
      <Text style={styles.petName}>{pet.name}</Text>
      <View style={styles.petAbout}>
        <Text style={styles.petBreed}>{pet.breed}</Text>
        <Text style={styles.petAge}>{pet.age} YRS</Text>
      </View>
    </TouchableOpacity>
  );
};

export default PetListItem;

const styles = StyleSheet.create({
  markFavView: {
    position: "absolute",
    zIndex: 10,
    right: 10,
    top: 10,
  },
  petImage: {
    width: 150,
    height: 135,
    borderRadius: 10,
  },
  petBorder: {
    padding: 10,
    marginTop: 15,
    backgroundColor: colors.WHITE,
    borderRadius: 15,
    objectFit: "cover",
  },
  petName: {
    fontFamily: "Poppins-Medium",
    fontSize: 17,
  },
  petBreed: {
    color: colors.GRAY,
    fontSize: 11,
    fontFamily: "Poppins-Regular",
  },
  petAge: {
    fontFamily: "Poppins-Regular",
    color: colors.PRIMARY,
    paddingHorizontal: 7,
    borderRadius: 10,
    backgroundColor: colors.LIGHT_PRIMARY,
    textAlign: "center",
    fontSize: 10,
  },
  petAbout: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
