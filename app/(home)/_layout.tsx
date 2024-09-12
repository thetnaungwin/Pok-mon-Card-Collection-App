import React from "react";
import { Stack } from "expo-router";
import HomeHeader from "@/components/homeHeader";

const HomeLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ header: () => <HomeHeader /> }} />
    </Stack>
  );
};

export default HomeLayout;
