import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import Shared from "../../Shared/Shared";
import { useUser } from "@clerk/clerk-expo";

const MarkFav: React.FC<{ pet: any; color?: string }> = ({
  pet,
  color = "black",
}) => {
  const { user } = useUser();
  const [favList, setFavList] = useState<number[]>();
  useEffect(() => {
    user && GetFav();
  }, [user]);
  const GetFav = async () => {
    const result = await Shared.GetFavList(user);
    setFavList(result?.favorites ? result?.favorites : []);
  };

  const AddToFav = async () => {
    const favResult = [...(favList || [])];
    favResult.push(pet?.id);
    console.log(pet.id);

    await Shared.UpdateFav(favResult, user as object);
    GetFav();
  };
  const removeFromFav = async () => {
    const favResult = [...(favList || [])].filter((item) => item != pet.id);
    await Shared.UpdateFav(favResult, user as object);
    GetFav();
  };

  return (
    <View>
      {favList?.includes(pet.id) ? (
        <Pressable
          onPress={() => {
            removeFromFav();
          }}
        >
          <Ionicons name="heart" size={30} color="red" />
        </Pressable>
      ) : (
        <Pressable
          onPress={() => {
            AddToFav();
          }}
        >
          <Ionicons name="heart-outline" size={30} color={color} />
        </Pressable>
      )}
    </View>
  );
};

export default MarkFav;
