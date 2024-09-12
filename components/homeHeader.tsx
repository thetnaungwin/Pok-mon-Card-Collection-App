import { View, Text, Platform, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useRouter } from "expo-router";
import { useAuthContext } from "./authContext";

const ios = Platform.OS == "ios";
export const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

export default function HomeHeader() {
  const router = useRouter();
  const { data, setAuthenticated } = useAuthContext();
  const { top } = useSafeAreaInsets();

  const handleLogOut = () => {
    setAuthenticated(false);
    router.push({ pathname: "/signIn" });
  };

  return (
    <View
      style={{ paddingTop: ios ? top : top + 10 }}
      className="flex-row justify-between px-4 bg-indigo-400 pb-6 shadow"
    >
      <View className="flex-row gap-3">
        <Image
          style={{ height: hp(4.3), aspectRatio: 1, borderRadius: 100 }}
          source={require("../assets/images/defaultProfile.png")}
          placeholder={{ blurhash }}
          transition={500}
        />
        <Text style={{ fontSize: hp(3) }} className="font-medium text-white">
          {data.username}
        </Text>
      </View>
      <View className="border-2 flex justify-center items-center p-2 border-blue-500 rounded-lg bg-blue-500">
        <TouchableOpacity onPress={handleLogOut}>
          <Text className="text-white font-thin">LogOut</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const Divider = () => {
  return <View className="p-[1px] w-full bg-neutral-200" />;
};
