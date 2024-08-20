import { createContext, useState } from "react";
import { CartType } from "../types/CartType/CartType";

type CartContextType = {
    cartItems: CartType;
    setCartItems: React.Dispatch<React.SetStateAction<CartType>>;
};

type CartContextProviderProps = {
  children: React.ReactNode;
};

export const CartContext = createContext({} as CartContextType);

export const CartContextProvider = ({ children }: CartContextProviderProps) => {
  const [cartItems, setCartItems] = useState<CartType>(() => {
    const dataLocalStorage = localStorage.getItem("userDataCart");
    const userDataCart = dataLocalStorage ? JSON.parse(dataLocalStorage) : {
      listProduct: [],
      listCombo: []
    };
    return userDataCart;
  });

  return (
    <CartContext.Provider value={{ cartItems, setCartItems }}>
      {children}
    </CartContext.Provider>
  );
};
