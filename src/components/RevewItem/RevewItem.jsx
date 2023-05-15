import React from 'react';
import './RevewItem.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

const RevewItem = ({product,handleRemoveFromCart}) => {
    const {_id,name,img,price,quantity} = product
    return (
        <div className='review-item'>
           <img src={img} alt="" />
           <div className='review-details'>
            <p className='product-title'>{name}</p>
            <p>price:<span className='orange-text'>${price}</span></p>
            <p>Order Quantity: <span className='orange-text'>{quantity}</span></p>
           </div>
           <button onClick={()=>handleRemoveFromCart(_id)} className='btn-delete'>
            <FontAwesomeIcon className='delete-icon' icon={faTrashAlt}/></button>
        </div>
    );
};

export default RevewItem;