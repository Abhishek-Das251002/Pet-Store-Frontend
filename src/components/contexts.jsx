import { createContext, useState } from "react";

export const MyWishlist = createContext();

export const MyCartItems = createContext();

export const CartItemQuantity = createContext()

export const SaveAddresses = createContext()

export function MyWishlistProvider({children}){
    // localStorage.removeItem("wishlist")
    const [wishlist, setWishlist] = useState(() => {
        if(localStorage.getItem("wishlist") != null && localStorage.getItem("wishlist")){
            return JSON.parse(localStorage.getItem("wishlist"))
        }else{
            return []
        }
    }
    )

    return (
        <MyWishlist.Provider value={{wishlist, setWishlist}}>
            {children}
        </MyWishlist.Provider>
    )
}

export function MyCartProvider({children}){
    // localStorage.removeItem("cart")
    const [cartItems, setCartItems] = useState(() => {
        if(localStorage.getItem("cart") != null && localStorage.getItem("cart")){
            return JSON.parse(localStorage.getItem("cart"))
        }else{
            return []
        }
    })

    return (
        <MyCartItems.Provider value={{cartItems, setCartItems}}>
            {children}
        </MyCartItems.Provider>
    )
}

export function CartItemQuantityProvider({children}){
    const [itemQuantity, setItemQuantity] = useState(() => {
        if(localStorage.getItem("itemQuantity") != null && localStorage.getItem("itemQuantity")){
            return JSON.parse(localStorage.getItem("itemQuantity"))
        }else{
            return {}
        }
    })


    return (
        <CartItemQuantity.Provider value={{itemQuantity, setItemQuantity}}>
            {children}
        </CartItemQuantity.Provider>
    )
}


export function SaveAddressProvider({children}){
    // localStorage.removeItem("addresses")
    const [address, setAddress] = useState(() => {
        if(localStorage.getItem("addresses") != null && localStorage.getItem("addresses")){
            return JSON.parse(localStorage.getItem("addresses"))
        }else{
            return []
        }
    })


    return (
        <SaveAddresses.Provider value={{address, setAddress}}>
            {children}
        </SaveAddresses.Provider>
    )
}