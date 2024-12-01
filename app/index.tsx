import { useUser } from "@clerk/clerk-expo";
import { Link, Redirect, useRootNavigationState } from "expo-router";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  const { user } = useUser();
  const rootNavigationState = useRootNavigationState();

  useEffect(() => {
    CheckNavLoaded();
    return () => {};
  }, []);

  const CheckNavLoaded = () => {
    if (!rootNavigationState.key) {
      return null;
    }
  };

  return (
    user && (
      <View>
        {user ? <Redirect href={"/home"} /> : <Redirect href={"/login"} />}
      </View>
    )
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: "Poppins-Bold",
  },
});
