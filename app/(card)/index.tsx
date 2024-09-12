import {
  View,
  Text,
  Image,
  Button,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { router, useLocalSearchParams } from "expo-router";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useAuthContext } from "@/components/authContext";
import { Audio } from "expo-av";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Index = () => {
  const { id, name, rarity } = useLocalSearchParams();
  const [loading, setLOading] = React.useState<boolean>(true);
  const [sound, setSound] = React.useState();
  const { pokemonCards } = useAuthContext();
  const ios = Platform.OS == "ios";

  async function playSound() {
    const { sound }: any = await Audio.Sound.createAsync(
      require("../../assets/clicksong.mp3")
    );
    setSound(sound);
    await sound.playAsync();
  }
  React.useEffect(() => {
    return sound
      ? () => {
          //@ts-ignore
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const [ReImage] = pokemonCards
    .filter((one) => one.id === id)
    .map((two) => two.images.large);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLOading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleFavorite = async () => {
    const pokemonCard = { id, name, rarity, image: ReImage };
    try {
      // Retrieve existing collection from AsyncStorage
      const existingCollection = await AsyncStorage.getItem(
        "pokemonCollection"
      );
      let updatedCollection = [];

      if (existingCollection !== null) {
        updatedCollection = JSON.parse(existingCollection);
      }

      // Add the new card to the collection
      updatedCollection.push(pokemonCard);

      // Save updated collection back to AsyncStorage
      await AsyncStorage.setItem(
        "pokemonCollection",
        JSON.stringify(updatedCollection)
      );

      // Show success alert
      Alert.alert("Done!", "Added it to your collection.", [
        {
          text: "OK",
          onPress: () => {
            router.push("/(home)");
          },
        },
      ]);
      playSound();
    } catch (error) {
      console.log("Error saving data:", error);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" className="flex-1"></ActivityIndicator>
      </View>
    );
  }

  return (
    <View className="bg-yellow-50 h-full justify-around items-center">
      <View className="flex w-full ml-6">
        <Ionicons
          name="arrow-back-sharp"
          size={hp(3)}
          color="black"
          onPress={() => router.push("/(home)")}
        />
      </View>
      <View className="h-96 w-80">
        <Image
          source={{ uri: ReImage }}
          style={{ width: "100%", height: "100%", borderRadius: 10 }}
        />
      </View>
      <View className="flex w-72 gap-3 items-center">
        <View className="flex flex-row gap-4 items-center">
          <Text className="font-extrabold text-xl">Name:</Text>
          <Text className="font-extrabold text-xl text-indigo-400">{name}</Text>
        </View>
        <View className="flex flex-row gap-4 items-center">
          <Text className="font-extrabold text-xl">Rarity:</Text>
          <Text className="font-extrabold text-xl text-indigo-400">
            {rarity}
          </Text>
        </View>
      </View>

      <View className="border-blue-600 bg-blue-500">
        <Button
          title="Add collection"
          color={`${ios ? "white" : "#3163CE"}`}
          onPress={handleFavorite}
        />
      </View>
    </View>
  );
};

export default Index;
