import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "@/constants/colors";
import { Link } from "expo-router";

const UserItem: React.FC<{ userInfo: any }> = ({ userInfo }) => {
  return (
    <Link href={`/chat?id=${userInfo.docId}`}>
      <View style={styles.container}>
        <Image source={{ uri: userInfo.imageUrl }} style={styles.image} />
        <Text style={styles.nameText}>{userInfo.name}</Text>
      </View>
      <View
        style={{
          borderWidth: 0.2,
          marginVertical: 7,
          borderColor: colors.GRAY,
        }}
      ></View>
    </Link>
  );
};

export default UserItem;

const styles = StyleSheet.create({
  container: {
    marginVertical: 7,
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 99,
  },
  nameText: {
    fontFamily: "Poppins-Regular",
    fontSize: 20,
  },
});
