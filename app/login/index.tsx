import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "@/constants/colors";
import * as WebBrowser from "expo-web-browser";
import { useOAuth } from "@clerk/clerk-expo";
import * as Linking from "expo-linking";

export const useWarmUpBrowser = () => {
  React.useEffect(() => {
    // Warm up the android browser to improve UX
    // https://docs.expo.dev/guides/authentication/#improving-user-experience
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = () => {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow({
          redirectUrl: Linking.createURL("/dashboard", { scheme: "myapp" }),
        });

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

  return (
    <View style={styles.mainView}>
      <Image
        style={styles.loginImage}
        source={require("../../assets/images/login.png")}
      />
      <View style={styles.textView}>
        <Text style={styles.mainText}>Ready to make a new friend?</Text>
        <Text style={styles.subText}>
          Let's adopt the pet which you like and makethere life happy again
        </Text>
        <Pressable onPress={onPress} style={styles.button}>
          <Text style={styles.buttonText}>Get Started</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: colors.WHITE,
    height: "100%",
  },
  loginImage: {
    width: "100%",
    height: 500,
  },
  mainText: {
    fontFamily: "Poppins-Bold",
    fontSize: 30,
    textAlign: "center",
  },
  textView: {
    padding: 20,
    display: "flex",
    alignItems: "center",
  },
  subText: {
    fontFamily: "Poppins-Regular",
    fontSize: 18,
    textAlign: "center",
    color: colors.GRAY,
  },
  button: {
    padding: 14,
    marginTop: 50,
    width: "100%",
    backgroundColor: colors.PRIMARY,
    borderRadius: 14,
  },
  buttonText: {
    fontFamily: "Poppins-Medium",
    fontSize: 20,
    textAlign: "center",
  },
});
