import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import colors from "@/constants/colors";

const PetSubInfoCard: React.FC<{
  icon: ImageSourcePropType;
  title: string;
  value: string;
}> = ({ icon, title, value }) => {
  return (
    <View style={styles.container}>
      <Image style={styles.styleImage} source={icon} />
      <View style={{ flex: 1 }}>
        <Text style={styles.text}>{title}</Text>
        <Text style={styles.numb}>{value} </Text>
      </View>
    </View>
  );
};

export default PetSubInfoCard;

const styles = StyleSheet.create({
  styleImage: {
    width: 40,
    height: 40,
  },
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.WHITE,
    padding: 10,
    margin: 5,
    borderRadius: 8,
    gap: 10,
    flex: 1,
  },
  text: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    color: colors.GRAY,
  },
  numb: {
    fontFamily: "Poppins-Medium",
    fontSize: 18,
  },
});
