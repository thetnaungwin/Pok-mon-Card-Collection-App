// When that component is run, our UI will go to SignIn page

import { createContext, useState, ReactNode, useRef } from "react";
import { useContext, useEffect } from "react";

interface Pros {
  children: ReactNode;
}
export interface AuthContextData {
  authenticated: boolean;
  setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  data: User;
  postingUserData: (payload: User) => void;
  getPokemonCards: () => void;
  pokemonCards: PokemonCards[];
}
export interface User {
  username: string;
  password: string;
}
export interface PokemonCards {
  id: string;
  name: string;
  rarity: string;
  images: { small: string; large: string };
}

//////Context
export const AuthContext = createContext<AuthContextData | undefined>(
  undefined
);

export const AppProvider = ({ children }: Pros) => {
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [data, setData] = useState<User>({ username: "", password: "" });
  const [pokemonCards, setPokemonCards] = useState<PokemonCards[]>([]);

  useEffect(() => {
    setTimeout(() => {
      setAuthenticated(false);
    }, 3000);
  }, []);

  const postingUserData = (payload: User) => {
    try {
      setData(payload);
      setAuthenticated(true);
    } catch (error) {
      console.error("Error : ", error);
    }
  };
  const getPokemonCards = async () => {
    try {
      const response = await fetch("https://api.pokemontcg.io/v2/cards");
      const { data } = await response.json();
      setPokemonCards(data);
    } catch (error) {
      console.error("Error : ", error);
    }
  };

  const contextValue: AuthContextData = {
    authenticated,
    setAuthenticated,
    data,
    postingUserData,
    getPokemonCards,
    pokemonCards,
  };
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useMyContext must be used within a MyProvider");
  }
  return context;
};
