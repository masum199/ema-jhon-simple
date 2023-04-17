import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { addToDb, deleteShoppingCart, getShoppingCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'
const Shop = () => {
    const [products, setProducts] = useState([])
    const [cart, setCart] = useState([])
    
    useEffect(() => {
        fetch('products.json')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])
    useEffect(()=>{
        const savedCard =[]
        const storedCart = getShoppingCart()
        // get id of added product
        for(const id in storedCart){
            // get product from products state by using id
           const addedProduct=products.find(product=>product.id === id)
           if(addedProduct){
            // add quantity
            const quantity = storedCart[id]
            addedProduct.quantity = quantity
            // add the added product to save card
            savedCard.push(addedProduct)
           }
        //    console.log('mori',addedProduct) 
        }
        setCart(savedCard)
    },[products])

    const handleAddToCart = (product) => {
        let newCart
        // if product dosent exist in the cart then set quantity = 1
        // if exist update quantity by 1
        const exists = cart.find(pd=>pd.id === product.id);
        if(!exists){
            product.quantity = 1
            newCart = [...cart,product]
        }
        else{
            exists.quantity = exists.quantity + 1;
            const remaining = cart.filter(pd => pd.id !== product.id);
            newCart = [...remaining,exists]

        }
    setCart(newCart)
    addToDb(product.id)
    }

    const handleClearCart = () =>{
        setCart([])
        deleteShoppingCart()
    }

    return (
        <div className='shop-container'>
            <div className="product-container">
                {
                    products.map(product => <Product
                        key={product.id}
                        product={product} 
                        handleAddToCart={handleAddToCart}></Product>)
                }
                
            </div>
            <div className="cart-container">
                <Cart cart={cart} 
                handleClearCart={handleClearCart}>
                    <Link className='proceed-link' to="/orders">
                    <button className='btn-proceed'>Review Order</button>
                    </Link>
                </Cart>
            </div>
        </div>
        
    );
};

export default Shop;