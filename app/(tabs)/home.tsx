import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Header from "@/components/Home/Header";
import Slider from "@/components/Home/Slider";
import PetListByCategory from "@/components/Home/PetListByCategory";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import colors from "@/constants/colors";
import { Link } from "expo-router";

const Home = () => {
  return (
    <View style={styles.mainHomeView}>
      <Header />
      <Slider />
      <PetListByCategory />
      <Link href={"/add-new-pet"} style={styles.addNewPet}>
        <MaterialIcons name="pets" size={24} color={colors.PRIMARY} />
        <Text style={styles.addNewPetText}>Add New Pet</Text>
      </Link>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  mainHomeView: {
    padding: 25,
  },
  addNewPet: {
    textAlign: "center",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 20,
    marginTop: 20,
    backgroundColor: colors.LIGHT_PRIMARY,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colors.PRIMARY,
    borderStyle: "dashed",
    justifyContent: "center",
  },
  addNewPetText: {
    fontFamily: "Poppins-Medium",
    color: colors.PRIMARY,
    fontSize: 18,
  },
});
