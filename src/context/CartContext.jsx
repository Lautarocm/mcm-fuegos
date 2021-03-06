import React, { useEffect, useState } from 'react';

const CartContext = React.createContext()
    
export const CartContextProvider = ({children}) => {

    const [addedProducts, setAddedProducts] = useState([])
    const [cartQuantity, setCartQuantity] = useState(0)

    useEffect(() => {
        
        let totalProducts = 0

        addedProducts.forEach(product => totalProducts += product.quantity)
        setCartQuantity(totalProducts)

    }, [addedProducts])

    const addItem = (item, quantity) => {

        if(!isInCart(item.id)){
            console.log("agregando al carrito")
            const newProduct = {...item, quantity: quantity}
            const products = [...addedProducts, newProduct]
            setAddedProducts(products)
        }
        else{
            console.log("actualizando carrito")
            updateProductInCart(item.id, quantity)
        }
    }

    const isInCart = id => addedProducts.some(prod => prod.id === id)

    const updateProductInCart = (id, quantity) => {
        const productsInCart = [...addedProducts]
        const productToUpdate = productsInCart.find(prod => prod.id === id)
        const productIndex = productsInCart.findIndex(prod => prod.id === id)
        productToUpdate.quantity = productToUpdate.quantity + quantity
        productsInCart.splice(productIndex, 1, productToUpdate)
        setAddedProducts(productsInCart)
    }

    const removeItem = (id) => {
        const productsInCart = [...addedProducts]
        const productIndex = productsInCart.findIndex(prod => prod.id === id)
        productsInCart.splice(productIndex, 1)
        setAddedProducts(productsInCart)
    }

    const clear = () => {
        setAddedProducts([])
    }

    return (
        <CartContext.Provider value={{ addedProducts, cartQuantity, addItem, removeItem, clear}}>
            {children}
        </CartContext.Provider>
    )
}
 
export default CartContext;