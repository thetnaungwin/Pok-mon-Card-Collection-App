import {
  View,
  ScrollView,
  Animated,
  Pressable,
  Image,
  Text,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { PokemonCards, useAuthContext } from "@/components/authContext";
import Autocomplete from "react-native-autocomplete-input";
import { useRouter } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";

const Index = () => {
  const [query, setQuery] = useState<string>("");
  const { pokemonCards } = useAuthContext();
  const [suggestions, setSuggestions] = useState<PokemonCards[]>([]);
  const router = useRouter();

  // Create animation scales for each card
  const cardScales = pokemonCards.map(() => useState(new Animated.Value(1))[0]);
  const onPressIn = (index: number) => {
    Animated.spring(cardScales[index], {
      toValue: 1.1,
      useNativeDriver: true,
    }).start();
  };
  const onPressOut = (index: number) => {
    Animated.spring(cardScales[index], {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const handleFilter = (text: string) => {
    const filteredCards = pokemonCards.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(text.toLowerCase())
    );
    setSuggestions(filteredCards);
    setQuery(text);
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ height: "11%", marginTop: 5 }}>
        <View
          style={{
            height: "80%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <Autocomplete
            data={suggestions.length === 0 && query ? [] : suggestions}
            defaultValue={query}
            onChangeText={(text) => handleFilter(text)}
            placeholder="Search Pokémon"
            flatListProps={{
              keyExtractor: (item) => item.id,
              renderItem: () => <></>,
            }}
            inputContainerStyle={styles.autocompleteInputContainer}
          />
          <AntDesign
            name="hearto"
            size={hp(4)}
            color="black"
            onPress={() => router.push("/(collection)")}
          />
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ height: "89%", marginTop: 10 }}
      >
        <View style={styles.container}>
          {(query && suggestions.length ? suggestions : pokemonCards).map(
            (item: any, index) => {
              const animatedStyle = {
                transform: [{ scale: cardScales[index] }],
              };
              return (
                <Animated.View
                  key={item.id}
                  style={[styles.card, animatedStyle]}
                >
                  <Pressable
                    onPress={() =>
                      router.push({ pathname: "/(card)", params: item })
                    }
                    onPressIn={() => onPressIn(index)}
                    onPressOut={() => onPressOut(index)}
                    style={{ width: "100%", height: "100%" }}
                  >
                    <View style={styles.imageContainer}>
                      <Image
                        style={styles.image}
                        source={{ uri: item.images.small }}
                      />
                    </View>
                    <View style={styles.textContainer}>
                      <Text style={styles.text}>{item.name}</Text>
                    </View>
                  </Pressable>
                </Animated.View>
              );
            }
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  autocompleteInputContainer: {
    borderWidth: 2,
    borderColor: "gray",
    borderRadius: 6,
    margin: 5,
    marginBottom: -2,
    width: 340,
  },
  suggestionText: {
    padding: 10,
    fontSize: hp(2),
    color: "#000",
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    gap: 5,
    justifyContent: "center",
  },
  card: {
    width: 80,
    height: 160,
    margin: 5,
    backgroundColor: "#E9D5FF",
    borderRadius: 10,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  imageContainer: {
    width: "100%",
    height: "80%",
  },
  image: {
    height: "100%",
    width: "100%",
  },
  textContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 10,
    fontWeight: "bold",
  },
});
