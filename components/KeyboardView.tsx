import { KeyboardAvoidingView, ScrollView, Platform } from "react-native";
import React, { ReactNode } from "react";

interface Pros {
  children: ReactNode;
  inChat: boolean;
}
const ios = Platform.OS == "ios";
const KeyboardView = ({ children, inChat }: Pros) => {
  let kabConfig = {};
  let srollViewConfig = {};
  if (inChat) {
    kabConfig = { keyboardVerticalOffset: 90 };
    srollViewConfig = { contentContainerStyle: { flex: 1 } };
  }

  return (
    <KeyboardAvoidingView
      behavior={ios ? "padding" : "height"}
      style={{ flex: 1 }}
      {...kabConfig}
    >
      <ScrollView
        style={{ flex: 1 }}
        bounces={false}
        showsVerticalScrollIndicator={false}
        {...srollViewConfig}
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default KeyboardView;
