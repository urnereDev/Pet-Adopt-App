import { StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "@/config/Firebaseconfig";
import { useUser } from "@clerk/clerk-expo";
import { GiftedChat, IMessage } from "react-native-gifted-chat";

const ChatScreen = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const params = useLocalSearchParams();
  const navigation = useNavigation();
  const { user } = useUser();
  const userId = Array.isArray(params?.id) ? params.id[0] : params?.id;

  useEffect(() => {
    GetUserDetails();
    const unsubscribe = onSnapshot(
      collection(db, "Chat", userId, "Message"),
      (snapshot) => {
        const messageData = snapshot.docs.map((doc) => ({
          _id: doc.id,
          ...doc.data(),
          text: doc.data().text || "",
          createdAt: doc.data().createdAt.toDate(),
          user: {
            // user özelliğini ekle
            _id: user?.primaryEmailAddress?.emailAddress || "",
            name: user?.fullName || "",
            avatar: user?.imageUrl || "",
          },
        }));
        setMessages(messageData);
      }
    );
    return () => unsubscribe();
  }, []);

  const GetUserDetails = async () => {
    const docRef = doc(db, "Chat", userId);
    const docSnap = await getDoc(docRef);
    const result = docSnap.data();
    const otherUser = result?.users.filter(
      (item: { email: string }) =>
        item.email != user?.primaryEmailAddress?.emailAddress
    );
    navigation.setOptions({ headerTitle: otherUser[0].name });
  };
  const onSend = useCallback(async (messages: IMessage[] = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );

    await addDoc(collection(db, "Chat", userId, "Message"), messages[0]);
  }, []);

  return (
    <GiftedChat
      messages={messages}
      showUserAvatar={true}
      showAvatarForEveryMessage={true}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: user?.primaryEmailAddress?.emailAddress || "",
        name: user?.fullName || "",
        avatar: user?.imageUrl || "",
      }}
    />
  );
};

export default ChatScreen;

const styles = StyleSheet.create({});
