import React, { useEffect } from "react";
import { View, Animated, Image, Text, TouchableOpacity } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { useAuthContext } from "./authContext";

interface Props {
  onFinish: () => void;
}

export default function SplashScreenComponent({ onFinish }: Props) {
  const { getPokemonCards } = useAuthContext();
  const fadeAnim = new Animated.Value(0); // Initial opacity value for animation
  const translateXPokemon = new Animated.Value(0); // Pokemon moves right (positive X)
  const translateXGodzilla = new Animated.Value(0); // Godzilla moves left (negative X)

  useEffect(() => {
    SplashScreen.preventAutoHideAsync(); // Prevents splash screen from auto-hiding

    // Parallel animation: Fade in + Move X for Pokemon and Godzilla
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 2500,
        useNativeDriver: true, // Enable native driver for performance
      }),
      Animated.timing(translateXPokemon, {
        toValue: -250, // Moves to the right (positive X)
        duration: 3500,
        useNativeDriver: true,
      }),
      Animated.timing(translateXGodzilla, {
        toValue: 250, // Moves to the left (negative X)
        duration: 3500,
        useNativeDriver: true,
      }),
    ]).start();
    getPokemonCards();
  }, []);

  const handleStarted = () => {
    SplashScreen.hideAsync(); // Hide splash screen
    onFinish();
  };

  return (
    <View className="h-full flex justify-center items-center">
      <Animated.View style={{ opacity: fadeAnim, gap: 20 }}>
        <Animated.View
          style={{
            transform: [{ translateX: translateXPokemon }],
            alignItems: "flex-end",
          }}
        >
          <Image
            source={require("../assets/images/pokemonyellow.jpg")}
            className="w-16 h-16"
          />
        </Animated.View>
        <Image
          source={require("../assets/images/pokemon.jpg")}
          className="w-80 h-52"
        />
        <Animated.View
          style={{
            transform: [{ translateX: translateXGodzilla }],
          }}
        >
          <Image
            source={require("../assets/images/gozila.jpg")}
            className="w-16 h-16"
          />
        </Animated.View>
      </Animated.View>
      <Animated.View style={{ opacity: fadeAnim }} className="w-full p-4 mt-24">
        <TouchableOpacity onPress={handleStarted}>
          <View
            style={{
              backgroundColor: "#007FFF",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 20,
            }}
          >
            <Text
              style={{
                color: "#ffffff",
                fontStyle: "italic",
                fontSize: 20,
                padding: 10,
              }}
            >
              Get Started
            </Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}
