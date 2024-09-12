import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import AntDesign from "@expo/vector-icons/AntDesign";

const CollectionScreen = () => {
  const [collection, setCollection] = useState([]);

  useEffect(() => {
    const fetchCollection = async () => {
      try {
        const data = await AsyncStorage.getItem("pokemonCollection");
        if (data !== null) {
          setCollection(JSON.parse(data));
        }
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchCollection();
  }, []);

  const deleteItem = async (id: string) => {
    try {
      // Filter out the item to be deleted
      const updatedCollection = collection.filter(
        (item: any) => item.id !== id
      );

      // Update AsyncStorage
      await AsyncStorage.setItem(
        "pokemonCollection",
        JSON.stringify(updatedCollection)
      );

      // Update local state
      setCollection(updatedCollection);
    } catch (error) {
      console.log("Error deleting item:", error);
    }
  };

  const handleRemove = (id: string) => {
    Alert.alert(
      "Delete Item",
      "Are you sure you want to delete this item?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => deleteItem(id),
        },
      ],
      { cancelable: false }
    );
  };

  const renderItem = ({ item }: any) => (
    <View
      style={{
        padding: 10,
        borderBottomWidth: 1,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 30,
      }}
    >
      <View>
        <Image
          source={{ uri: item.image }}
          style={{ width: 100, height: 100 }}
        />
      </View>
      <View className="gap-4">
        <Text>Name: {item.name}</Text>
        <Text>Rarity: {item.rarity}</Text>
      </View>
      <View>
        <AntDesign
          name="closecircleo"
          size={hp(3)}
          color="black"
          onPress={() => handleRemove(item.id)}
        />
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <View className="flex w-full ml-6">
        <Ionicons
          name="arrow-back-sharp"
          size={hp(3)}
          color="black"
          onPress={() => router.push("/(home)")}
        />
      </View>
      {collection.length === 0 ? (
        <View className="flex justify-center items-center mt-52">
          <Text>No Pokémon cards in your collection.</Text>
        </View>
      ) : (
        <FlatList
          data={collection}
          renderItem={renderItem}
          keyExtractor={(item: any) => item.id}
        />
      )}
    </View>
  );
};

export default CollectionScreen;
