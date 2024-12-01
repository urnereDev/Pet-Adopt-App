import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import PetInfo from "@/components/PetDetails/PetInfo";
import PetSubInfo from "@/components/PetDetails/PetSubInfo";
import AboutPet from "@/components/PetDetails/AboutPet";
import OwnerDetails from "@/components/PetDetails/OwnerDetails";
import colors from "@/constants/colors";
import { useUser } from "@clerk/clerk-expo";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "@/config/Firebaseconfig";

const PetDetails = () => {
  const pet = useLocalSearchParams();
  const navigation = useNavigation();
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      headerTitle: "",
    });

    return () => {};
  }, []);

  const InitiateChate = async () => {
    const docId1 =
      user?.primaryEmailAddress?.emailAddress + "_" + pet?.userEmail;
    const docId2 =
      pet?.userEmail + "_" + user?.primaryEmailAddress?.emailAddress;
    const q = query(
      collection(db, "Chat"),
      where("id", "in", [docId1, docId2])
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      router.push({
        pathname: "/chat" as const,
        params: { id: doc.id },
      } as any);
    });
    if (querySnapshot.docs?.length == 0) {
      await setDoc(doc(db, "Chat", docId1), {
        id: docId1,

        users: [
          {
            email: user?.primaryEmailAddress?.emailAddress,
            imageUrl: user?.imageUrl,
            name: user?.fullName,
          },
          {
            email: pet?.userEmail,
            imageUrl: pet?.userImage,
            name: pet?.userName,
          },
        ],
        userIds: [user?.primaryEmailAddress?.emailAddress, pet?.userEmail],
      });
      router.push({
        pathname: "/chat" as const,
        params: { id: docId1 },
      } as any);
    }
  };

  return (
    <View>
      <ScrollView>
        <PetInfo pet={pet} />
        <PetSubInfo pet={pet} />
        <AboutPet pet={pet} />
        <OwnerDetails pet={pet} />
      </ScrollView>
      <View style={styles.adoptMeContainer}>
        <TouchableOpacity onPress={InitiateChate} style={styles.adoptMeButton}>
          <Text style={styles.adoptMeText}>Adopt Me</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PetDetails;

const styles = StyleSheet.create({
  adoptMeContainer: {
    position: "absolute",
    width: "100%",
    bottom: 0,
  },
  adoptMeButton: {
    padding: 15,
    backgroundColor: colors.PRIMARY,
  },
  adoptMeText: {
    fontFamily: "Poppins-Medium",
    textAlign: "center",
    fontSize: 20,
  },
});
