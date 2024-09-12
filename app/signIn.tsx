import { useAuthContext, User } from "@/components/authContext";
import KeyboardView from "@/components/KeyboardView";
import { AntDesign, Feather } from "@expo/vector-icons";
import { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  Pressable,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

const SignIn = () => {
  const [hidePassword, setHidePassword] = useState(true);
  const [isPassword, setIsPassword] = useState(false);
  const [wrongPassword, SetWrongPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<User>({
    username: "",
    password: "",
  });
  const { postingUserData } = useAuthContext();

  const handleLogIn = () => {
    if (user.username.length < 6 || user.password.length < 6) {
      SetWrongPassword(true);
      Alert.alert("Error", "Fill Data, at least 6 characters!", [
        { text: "OK" },
      ]);
      return;
    } else {
      SetWrongPassword(false);
      setLoading(true);
      postingUserData(user);
      setTimeout(() => {
        setLoading(false);
      }, 700);
    }
  };

  return (
    <KeyboardView inChat={false}>
      <View className="flex-1">
        <View
          className="items-center"
          style={{
            paddingTop: hp(8),
          }}
        >
          <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
            accessible={false}
          >
            <Image
              resizeMode="contain"
              style={{
                height: hp(25),
                borderRadius: 300,
              }}
              source={require("../assets/images/LogIn.png")}
            />
          </TouchableWithoutFeedback>
        </View>
        <View className="gap-6">
          <View>
            <Text
              style={{ fontSize: hp(3) }}
              className="text-center text-yellow-700 font-extrabold tracking-wider mt-3"
            >
              Welcome to the world of POKEMON
            </Text>
          </View>
          <View className="gap-4 m-3">
            <View
              style={{
                height: hp(7),
                backgroundColor: `${wrongPassword ? "#fee2e2" : "#f5f5f5"}`,
              }}
              className="p-4 rounded-2xl items-center flex-row"
            >
              <AntDesign
                name="user"
                size={hp(3)}
                style={{ marginRight: 20, color: "gray" }}
              />
              <TextInput
                onChangeText={(e) => {
                  setUser({ ...user, username: e });
                }}
                style={{ fontSize: hp(2), width: "100%", height: "100%" }}
                className="font-semibold text-neutral-700"
                placeholder="Username"
                placeholderTextColor="gray"
                maxLength={30}
                autoCorrect={false}
              />
            </View>
            <View
              style={{
                height: hp(7),
                backgroundColor: `${wrongPassword ? "#fee2e2" : "#f5f5f5"}`,
              }}
              className="p-4 rounded-2xl items-center flex-row"
            >
              <Feather
                name="lock"
                size={hp(3)}
                style={{ marginRight: 20, color: "gray" }}
              />
              <TextInput
                onChangeText={(e) => {
                  setUser({ ...user, password: e });
                }}
                style={{
                  fontSize: hp(2),
                  width: "100%",
                  height: "100%",
                }}
                className="semibold text-neutral-700"
                placeholder="Password"
                secureTextEntry={hidePassword ? true : false}
                placeholderTextColor="gray"
                maxLength={25}
                autoCorrect={false}
              />
              {isPassword && (
                <Pressable
                  onPress={() => setHidePassword(!hidePassword)}
                  className="absolute right-4 top-4.5"
                >
                  {hidePassword ? (
                    <Feather name="eye" size={28} color={"black"} />
                  ) : (
                    <Feather name="eye-off" size={28} color={"black"} />
                  )}
                </Pressable>
              )}
            </View>
            <TouchableOpacity>
              <Text
                style={{ fontSize: hp(1.5) }}
                className="color-blue-800 text-lg font-semibold text-right"
              >
                Forgot password?
              </Text>
            </TouchableOpacity>
            {loading == false ? (
              <TouchableOpacity onPress={handleLogIn}>
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
                    Sign In
                  </Text>
                </View>
              </TouchableOpacity>
            ) : (
              <View>
                <ActivityIndicator size="large"></ActivityIndicator>
              </View>
            )}
          </View>
        </View>
      </View>
    </KeyboardView>
  );
};

export default SignIn;
