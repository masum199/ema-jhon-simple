import React from 'react';
import { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { deleteShoppingCart, removeFromDb } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import RevewItem from '../RevewItem/RevewItem';
import './Order.css'

const Orders = () => {
    const savedCart = useLoaderData()
    const [cart,setCart] = useState(savedCart)
    
    const handleRemoveFromCart = (id) =>{
        const remaining = cart.filter(product=>product._id !== id)
        setCart(remaining)
        removeFromDb(id)
       
    }

    const handleClearCart = () =>{
        setCart([])
        deleteShoppingCart()
    }
    return (
        <div className='shop-container'>
        <div className="review-container">
         {
            cart.map(product=><RevewItem key={product._id}
            product={product}
            handleRemoveFromCart={handleRemoveFromCart}></RevewItem>)
         }
        </div>
        <div className="cart-container">
            <Cart cart={cart} 
            handleClearCart={handleClearCart}>
                <Link className='proceed-link' to="/checkout"><button className='btn-proceed'>Proceed To Checkout</button></Link>
            </Cart>
        </div>
    </div>
    );
};

export default Orders;