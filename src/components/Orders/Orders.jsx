import React from 'react';
import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { removeFromDb } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import RevewItem from '../RevewItem/RevewItem';
import './Order.css'

const Orders = () => {
    const savedCart = useLoaderData()
    const [cart,setCart] = useState(savedCart)
    
    const handleRemoveFromCart = (id) =>{
        const remaining = cart.filter(product=>product.id !== id)
        setCart(remaining)
        removeFromDb(id)
    }
    return (
        <div className='shop-container'>
        <div className="review-container">
         {
            cart.map(product=><RevewItem key={product.id}
            product={product}
            handleRemoveFromCart={handleRemoveFromCart}></RevewItem>)
         }
        </div>
        <div className="cart-container">
            <Cart cart={cart}></Cart>
        </div>
    </div>
    );
};

export default Orders;