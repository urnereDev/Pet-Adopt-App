import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import {
  collection,
  DocumentData,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/config/Firebaseconfig";
import { useUser } from "@clerk/clerk-expo";
import UserItem from "@/components/Inbox/UserItem";

const Inbox = () => {
  const { user } = useUser();
  const [userList, setUserList] = useState<DocumentData[]>([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    user && GetUserList();

    return () => {};
  }, [user]);

  const GetUserList = async () => {
    setLoader(true);
    setUserList([]);
    const q = query(
      collection(db, "Chat"),
      where(
        "userIds",
        "array-contains",
        user?.primaryEmailAddress?.emailAddress
      )
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setUserList((prevList) => [...prevList, doc.data()]);
    });
    setLoader(false);
  };

  const MapOtherUserList = () => {
    const list: { docId: string; email: string }[] = [];
    userList.forEach((record) => {
      const otherUser = record.users.filter(
        (user: {
          email: string;
          primaryEmailAddress?: { emailAddress: string };
        }) => user.email != user?.primaryEmailAddress?.emailAddress
      );
      const result = {
        docId: record.id,
        ...otherUser[1],
      };
      list.push(result);
    });
    return list;
  };

  return (
    <View style={styles.inboxContainer}>
      <Text style={styles.inboxText}>Inbox</Text>
      <FlatList
        style={styles.flatList}
        refreshing={loader}
        onRefresh={GetUserList}
        data={MapOtherUserList()}
        renderItem={({ item, index }) => (
          <UserItem userInfo={item} key={index} />
        )}
      />
    </View>
  );
};

export default Inbox;

const styles = StyleSheet.create({
  inboxContainer: {
    padding: 20,
    marginTop: 20,
  },
  inboxText: {
    fontFamily: "Poppins-Medium",
    fontSize: 30,
  },
  flatList: {
    marginTop: 20,
  },
});
