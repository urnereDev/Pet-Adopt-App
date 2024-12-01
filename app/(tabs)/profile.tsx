import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useAuth, useUser } from "@clerk/clerk-expo";
import colors from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const Profile = () => {
  const Menu = [
    {
      id: 1,
      name: "Add New Pet",
      icon: "add-circle",
      path: "/add-new-pet",
    },
    {
      id: 2,
      name: "Favorites",
      icon: "heart",
      path: "/(tabs)/favorite",
    },
    {
      id: 3,
      name: "Inbox",
      icon: "chatbubble",
      path: "/(tabs)/inbox",
    },
    {
      id: 4,
      name: "My Post",
      icon: "bookmark",
      path: "/user-post",
    },
    {
      id: 5,
      name: "Logout",
      icon: "exit",
      path: "logout",
    },
  ];
  const { user } = useUser();
  const router = useRouter();
  const { signOut } = useAuth();

  const onPressMenu = (menu: any) => {
    if (menu == "logout") {
      signOut();
      return;
    }
    router.push(menu.path);
  };

  return (
    <View style={styles.profileContainer}>
      <Text style={styles.profileText}>Profile</Text>
      <View style={styles.headerContainer}>
        <Image source={{ uri: user?.imageUrl }} style={styles.profileImage} />
        <Text style={styles.fullNameText}>{user?.fullName}</Text>
        <Text style={styles.emailText}>
          {user?.primaryEmailAddress?.emailAddress}
        </Text>
      </View>
      <FlatList
        data={Menu}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => onPressMenu(item)}
            style={styles.iconContainer}
            key={item.id}
          >
            <Ionicons
              name={item?.icon as any}
              size={30}
              color={colors.PRIMARY}
              style={styles.iconStyle}
            />
            <Text style={styles.nameText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  profileContainer: {
    padding: 20,
    marginTop: 20,
  },
  profileText: {
    fontFamily: "Poppins-Medium",
    fontSize: 30,
  },
  headerContainer: {
    display: "flex",
    alignItems: "center",
    marginVertical: 25,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 99,
  },
  fullNameText: {
    fontFamily: "Poppins-Medium",
    fontSize: 20,
    marginTop: 7,
  },
  emailText: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    color: colors.GRAY,
  },
  iconContainer: {
    marginVertical: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: colors.WHITE,
    borderRadius: 10,
    padding: 10,
  },
  iconStyle: {
    padding: 10,
    backgroundColor: colors.LIGHT_PRIMARY,
    borderRadius: 8,
  },
  nameText: {
    fontFamily: "Poppins-Regular",
    fontSize: 20,
  },
});
