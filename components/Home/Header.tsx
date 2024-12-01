import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";

const Header = () => {
  const { user } = useUser();
  return (
    <View style={styles.headerView}>
      <View>
        <Text style={styles.welcomeText}>Welcome,</Text>
        <Text style={styles.userNameText}>{user?.fullName}</Text>
      </View>
      <Image source={{ uri: user?.imageUrl }} style={styles.profilePicture} />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerView: {
    paddingRight: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  welcomeText: {
    fontFamily: "Poppins-Regular",
    fontSize: 17,
  },
  userNameText: {
    fontFamily: "Poppins-Medium",
    fontSize: 25,
  },
  profilePicture: {
    width: 40,
    height: 40,
    borderRadius: 99,
  },
});
