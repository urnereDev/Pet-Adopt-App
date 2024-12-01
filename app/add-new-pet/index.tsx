import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router, useNavigation } from "expo-router";
import colors from "@/constants/colors";
import { Picker } from "@react-native-picker/picker";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { db, storage } from "@/config/Firebaseconfig";
import * as ImagePicker from "expo-image-picker";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useUser } from "@clerk/clerk-expo";

const AddNewPet = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState<{ [key: string]: string }>({
    category: "Dog",
    sex: "Male",
  });
  const [gender, setGender] = useState<string | undefined>();
  const [categoryList, setCategoryList] = useState<any>([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const [image, setImage] = useState<string | null>(null);
  const { user } = useUser();
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    navigation.setOptions({ headerTitle: "Add New Pet" });
    GetCategory();
    return () => {};
  }, []);

  const handleInputChanges = (fieldName: string, fieldValue: string) => {
    setFormData((prev) => ({ ...prev, [fieldName]: fieldValue }));
  };
  const GetCategory = async () => {
    setCategoryList([]);
    const snapshot = await getDocs(collection(db, "Category"));
    snapshot.forEach((doc) => {
      setCategoryList((prevCategoryList: any[]) => [
        ...prevCategoryList,
        doc.data(),
      ]);
    });
  };

  const onSubmit = () => {
    if (Object.keys(formData).length != 8) {
      ToastAndroid.show("Enter All Deatails", ToastAndroid.BOTTOM);
      return;
    }
    UploadImage();
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const UploadImage = async () => {
    setLoader(true);
    if (!image) return;
    const resp = await fetch(image);
    const blobImage = await resp.blob();
    const storageRef = ref(storage, "/PetAdopt/" + Date.now() + ".jpg");
    uploadBytes(storageRef, blobImage)
      .then((snapshot) => {
        console.log("File upload");
      })
      .then((resp) => {
        getDownloadURL(storageRef).then(async (downloadUrl) => {
          console.log(downloadUrl);
          SaveFormData(downloadUrl);
        });
        setLoader(false);
        router.replace("/(tabs)/home");
      });
  };
  const SaveFormData = async (imageUrl: string) => {
    const docId = Date.now().toString();
    await setDoc(doc(db, "Pets", docId), {
      ...formData,
      imageUrl: imageUrl,
      username: user?.fullName,
      email: user?.primaryEmailAddress?.emailAddress,
      userImage: user?.imageUrl,
      id: docId,
    });
  };

  return (
    <ScrollView style={styles.addNewPetContainer}>
      <Text style={styles.addNewPetText}>AddNewPet for adoption</Text>
      <Pressable onPress={pickImage}>
        {!image ? (
          <View style={styles.placeholderView}>
            <Image
              style={styles.placeholderImage}
              source={require("../../assets/images/placeholder.png")}
            />
          </View>
        ) : (
          <Image style={styles.uploadImage} source={{ uri: image }} />
        )}
      </Pressable>
      <View style={styles.textInputView}>
        <Text style={styles.inputText}>Category*</Text>
        <Picker
          style={styles.pickerInput}
          selectedValue={selectedCategory}
          onValueChange={(itemValue: string | undefined, itemIndex) => {
            setSelectedCategory(itemValue as undefined);
            handleInputChanges("category", itemValue as string);
          }}
        >
          {categoryList.map((category: { name: string }, index: number) => (
            <Picker.Item
              key={index}
              label={category.name}
              value={category.name}
            />
          ))}
        </Picker>
      </View>
      <View style={styles.textInputView}>
        <Text style={styles.inputText}>Pet Name*</Text>
        <TextInput
          style={styles.input}
          onChangeText={(value) => handleInputChanges("name", value)}
        />
      </View>
      <View style={styles.textInputView}>
        <Text style={styles.inputText}>Breed*</Text>
        <TextInput
          style={styles.input}
          onChangeText={(value) => handleInputChanges("breed", value)}
        />
      </View>
      <View style={styles.textInputView}>
        <Text style={styles.inputText}>Age*</Text>
        <TextInput
          style={styles.input}
          onChangeText={(value) => handleInputChanges("age", value)}
        />
      </View>
      <View style={styles.textInputView}>
        <Text style={styles.inputText}>Gender*</Text>
        <Picker
          style={styles.pickerInput}
          selectedValue={gender}
          onValueChange={(itemValue, itemIndex) => {
            setGender(itemValue);
            handleInputChanges("sex", itemValue);
          }}
        >
          <Picker.Item label="Male" value="Male" />
          <Picker.Item label="Female" value="Female" />
        </Picker>
      </View>
      <View style={styles.textInputView}>
        <Text style={styles.inputText}>Weight*</Text>
        <TextInput
          keyboardType="number-pad"
          style={styles.input}
          onChangeText={(value) => handleInputChanges("weight", value)}
        />
      </View>
      <View style={styles.textInputView}>
        <Text style={styles.inputText}>Address*</Text>
        <TextInput
          style={styles.input}
          onChangeText={(value) => handleInputChanges("address", value)}
        />
      </View>
      <View style={styles.textInputView}>
        <Text style={styles.inputText}>About*</Text>
        <TextInput
          style={styles.input}
          numberOfLines={5}
          multiline={true}
          onChangeText={(value) => handleInputChanges("about", value)}
        />
      </View>
      <TouchableOpacity
        style={styles.submitButton}
        disabled={loader}
        onPress={onSubmit}
      >
        {loader ? (
          <ActivityIndicator size={"large"} />
        ) : (
          <Text style={styles.buttonText}>Submit</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AddNewPet;

const styles = StyleSheet.create({
  addNewPetContainer: {
    padding: 20,
  },
  addNewPetText: {
    fontFamily: "Poppins-Medium",
    fontSize: 20,
  },
  placeholderView: {
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colors.GRAY,
  },
  placeholderImage: {
    width: 50,
    height: 50,
  },
  textInputView: {
    marginVertical: 5,
  },
  input: {
    padding: 15,
    backgroundColor: colors.WHITE,
    borderRadius: 7,
  },
  inputText: {
    fontFamily: "Poppins-Regular",
    marginVertical: 5,
  },
  submitButton: {
    padding: 15,
    backgroundColor: colors.PRIMARY,
    borderRadius: 7,
    marginVertical: 10,
    marginBottom: 50,
  },
  buttonText: {
    fontFamily: "Poppins-Medium",
    textAlign: "center",
  },
  pickerInput: {
    backgroundColor: colors.WHITE,
    borderRadius: 7,
  },
  uploadImage: {
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colors.GRAY,
  },
});
