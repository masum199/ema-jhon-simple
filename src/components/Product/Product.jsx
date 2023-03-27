import React from 'react';
import './Product.css'
const Product = (props) => {
    const {img, name, seller,ratings, quantity, price} = props.product
    return (
        <div className='product'>
           <img src={img} alt="" />
           <div className='product-info'>
           <h6 className='product-name'>{name}</h6>
           <p>Price:${price}</p>
           <p>Manufecturer: {seller}</p>
           <p>Ratings: {ratings}</p>
           </div>
           <button className='btn-cart'>Add To Cart</button>
        </div>
    );
};

export default Product;