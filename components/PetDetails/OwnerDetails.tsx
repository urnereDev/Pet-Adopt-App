import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "@/constants/colors";
import Ionicons from "@expo/vector-icons/Ionicons";

const OwnerDetails: React.FC<{ pet: any }> = ({ pet }) => {
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Image style={styles.ownerUserImage} source={{ uri: pet.userImage }} />
        <View>
          <Text style={styles.userName}>{pet.userName}</Text>
          <Text style={styles.petOwner}>Pet Owner</Text>
        </View>
      </View>
      <Ionicons name="send-sharp" size={24} color={colors.PRIMARY} />
    </View>
  );
};

export default OwnerDetails;

const styles = StyleSheet.create({
  container: {
    marginBottom: 70,
    marginHorizontal: 20,
    paddingHorizontal: 20,
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 15,
    padding: 20,
    backgroundColor: colors.WHITE,
    justifyContent: "space-between",
    borderColor: colors.PRIMARY,
  },
  subContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
  },
  ownerUserImage: {
    height: 40,
    width: 40,
    borderRadius: 99,
  },
  userName: {
    fontFamily: "Poppins-Bold",
  },
  petOwner: {
    fontFamily: "Poppins-Regular",
    color: colors.GRAY,
  },
});
