
import React, {useState, createContext, useEffect} from "react";
import {getUser} from "../api/login";
import {addItem, createCart, deleteItem, getCartByUserID} from "../api/Orders";
import {getBookByID} from "../api/books";

export const DefaultValue = {}

export const AppContext = createContext(DefaultValue);


export const AppProvider = (props) => {
    const [books, setBooks] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState(getUser())
    const [cartItemCount, setCartItemCount] = useState(0);
    const [cartItem, setCartItem] = useState({});
    const [cartId, setCartId] = useState();
    const [cartLineItems, setCartLineItems] = useState([])

    const addCartItem = async (bookData) => {
        // ✅  This works provided cartId is the right value
        console.log(cartId)
        setLoading(true)
        if (user && cartId) {
            console.log("Adding 📙", bookData, " to cartId: ", cartId)
            await addItem(bookData.id, bookData.quantity, cartId)
            await syncCartItems()
        }
        setLoading(false)

    }

    const deleteItemFromCart=async (id)=>
    {
        setLoading(true)
        await deleteItem(id)
        await syncCartItems()
        setLoading(false)

    }

    const getTransformedLineItems = () => {
        setLoading(true)
        const res = Promise.all((cartItem?.lineItems || []).map(async i => {
            const bookInfo = await getBookByID(i.bookID)
            return {...i, ...bookInfo}
        })).finally(() => setLoading(false))
        return res
    }

    useEffect(async () => {
        if (cartItem) {
            setCartItemCount(cartItem?.lineItems?.length || 0)
            setCartId(cartItem?.id)
            const updatedRows = await getTransformedLineItems()
            setCartLineItems(updatedRows)
        }
    }, [cartItem])

    const syncCartItems = async () => {
        // if the user exists
        // try fetch their cart
        // if they do not have a cart, create their cart and fetch it again
        // if no user, do nothing about it.
        if(user)
        {
            const userId = user.userInfo.id;
            console.log(userId)
            const userCartData = await getCartByUserID(userId)
            console.log(userCartData)
            const userHasACart  = userCartData.length > 0
            if (!userHasACart) {
                await createCart(userId)
            }
            // Now we definitely know user has to have a cart
            // As we've created it if it does not exist

            const cartData = await getCartByUserID(user.userInfo.id)
            console.log("🛒 cart data is ", cartData)
            if (cartData.length > 0){
                cartData.sort((k,a) => a.id-k.id)
            }
                setCartItem(cartData[0])
        } else {
            console.log("No cart for a user as they are not logged in.")
        }
    }

    useEffect(() => {
        //sync cart items
        console.log("✨".repeat(100))
        syncCartItems().then()
    }, [])


    return <AppContext.Provider value={{
        books,
        setBooks,
        searchTerm,
        setSearchTerm,
        loading,
        setLoading,
        user,
        setUser,
        cartItemCount,
        cartItem,
        addCartItem,
        cartId,
        setCartId,
        setCartItem,
        setCartItemCount,
        cartLineItems,
        deleteItemFromCart
    }}>
        {props.children}
    </AppContext.Provider>

}

