import SplashScreenComponent from "@/components/splashScreen";
import React, { useState } from "react";
import SignIn from "./signIn";

export default function App() {
  const [isSplashVisible, setSplashVisible] = useState(true);

  const handleFinishSplash = () => {
    setSplashVisible(false);
  };

  return (
    <>
      {isSplashVisible ? (
        <SplashScreenComponent onFinish={handleFinishSplash} />
      ) : (
        <SignIn />
      )}
    </>
  );
}
