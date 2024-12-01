import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import colors from "@/constants/colors";

const AboutPet: React.FC<{ pet: any }> = ({ pet }) => {
  const [readMore, setReadMore] = useState(true);
  return (
    <View style={{ padding: 20 }}>
      <Text style={styles.aboutHeader}>About {pet.name}</Text>
      <Text numberOfLines={readMore ? 3 : 20} style={styles.aboutText}>
        {pet.about}
      </Text>
      {readMore && (
        <Pressable onPress={() => setReadMore(false)}>
          <Text style={styles.readMoreText}>Read More</Text>
        </Pressable>
      )}
    </View>
  );
};

export default AboutPet;

const styles = StyleSheet.create({
  aboutHeader: {
    fontFamily: "Poppins-Medium",
    fontSize: 18,
  },
  aboutText: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
  },
  readMoreText: {
    fontFamily: "Poppins-Medium",
    fontSize: 14,
    color: colors.SECONDERY,
  },
});
