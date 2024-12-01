import {
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "expo-router";
import {
  collection,
  deleteDoc,
  doc,
  DocumentData,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/config/Firebaseconfig";
import { useUser } from "@clerk/clerk-expo";
import PetListItem from "@/components/Home/PetListItem";
import colors from "@/constants/colors";

const UserPost = () => {
  const navigation = useNavigation();
  const { user } = useUser();
  const [userPostList, setUserPostList] = useState<DocumentData[]>([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    navigation.setOptions({ headerTitle: " User Post" });
    user && GetUserPost();
  }, [user]);

  const GetUserPost = async () => {
    setLoader(true);
    setUserPostList([]);
    const q = query(
      collection(db, "Pets"),
      where("userEmail", "==", user?.primaryEmailAddress?.emailAddress)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setUserPostList((prevPostList) => [...prevPostList, doc.data()]);
    });
    setLoader(false);
  };

  const OnDeletePost = (docId: string) => {
    Alert.alert(
      "Do you want to delete?",
      "Do you really want to delete this post?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Click"),
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => deletePost(docId),
        },
      ]
    );
  };

  const deletePost = async (docId: string) => {
    await deleteDoc(doc(db, "Pets", docId));
    GetUserPost();
  };

  return (
    <View style={styles.userPostContainer}>
      <Text style={styles.userPostText}>User Post</Text>
      <FlatList
        data={userPostList}
        refreshing={loader}
        onRefresh={GetUserPost}
        numColumns={2}
        renderItem={({ item, index }) => (
          <View>
            <PetListItem pet={item} key={index} />
            <Pressable
              onPress={() => OnDeletePost(item?.id)}
              style={styles.deleteButton}
            >
              <Text style={styles.deleteText}>Delete</Text>
            </Pressable>
          </View>
        )}
      />
      {userPostList?.length == 0 && (
        <Text style={styles.noPostFoundText}>No Post Found</Text>
      )}
    </View>
  );
};

export default UserPost;

const styles = StyleSheet.create({
  userPostContainer: {
    padding: 20,
    marginTop: 20,
  },
  userPostText: {
    fontFamily: "Poppins-Medium",
    fontSize: 30,
  },
  deleteButton: {
    backgroundColor: colors.LIGHT_PRIMARY,
    padding: 5,
    marginTop: 5,
    borderRadius: 7,
  },
  deleteText: {
    fontFamily: "Poppins-Regular",
    textAlign: "center",
  },
  noPostFoundText: {
    fontFamily: "Poppins-Regular",
    textAlign: "center",
    fontSize: 15,
  },
});
