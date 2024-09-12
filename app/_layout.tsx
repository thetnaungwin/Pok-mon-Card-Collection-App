import { Slot, useRouter, useSegments } from "expo-router";
import React, { useEffect } from "react";
import { AppProvider, useAuthContext } from "@/components/authContext";
import { MenuProvider } from "react-native-popup-menu";
//Import your global CSS file
import "../global.css";

const MainLayout = () => {
  const { authenticated } = useAuthContext();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (typeof authenticated == "undefined") return;
    const inApp = segments[0] == "(home)";
    if (authenticated && !inApp) {
      router.push("/(home)");
    } else if (authenticated == false) {
      router.push("/");
    }
  }, [authenticated]);

  return <Slot />;
};

export default function _layout() {
  return (
    <MenuProvider>
      <AppProvider>
        <MainLayout />
      </AppProvider>
    </MenuProvider>
  );
}
