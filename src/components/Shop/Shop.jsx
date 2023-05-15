import React, { useEffect, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { addToDb, deleteShoppingCart, getShoppingCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'
const Shop = () => {
    const [products, setProducts] = useState([])
    const [currentPage, setCurrentPage] = useState(0)
    const [itemsPerPage, setItemsPerPage] = useState(10)
    const [cart, setCart] = useState([])
    const { totalProducts } = useLoaderData()


    const totalPages = Math.ceil(totalProducts / itemsPerPage)

    const pageNumbers = [...Array(totalPages).keys()]

    /**
     * done.1 :determine total number of items
     * TODO: 2. decide the number of products per page
     * Done: 3.calculate the total number of pages
     * Done: 4.determine the current page
     * 
     * */

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`http://localhost:5000/products?page=${currentPage}&limit=${itemsPerPage}`);
            const data = await response.json();
            setProducts(data)
        }
        fetchData()
    }, [currentPage, itemsPerPage])

    useEffect(() => {
        const savedCard = []
        const storedCart = getShoppingCart()
        const ids = Object.keys(storedCart)

        fetch(`http://localhost:5000/productsByIds`, {
            method: 'POST',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(ids)
        })
        .then(res=>res.json())
        .then(cartProducts =>{
            for (const id in storedCart) {
                // get product from products state by using id
                const addedProduct = cartProducts.find(product => product._id === id)
                if (addedProduct) {
                    // add quantity
                    const quantity = storedCart[id]
                    addedProduct.quantity = quantity
                    // add the added product to save card
                    savedCard.push(addedProduct)
                }
                //    console.log('mori',addedProduct) 
            }
            setCart(savedCard)
        })



        // get id of added product
       
    }, [])

    const handleAddToCart = (product) => {
        let newCart
        // if product dosent exist in the cart then set quantity = 1
        // if exist update quantity by 1
        const exists = cart.find(pd => pd._id === product._id);
        if (!exists) {
            product.quantity = 1
            newCart = [...cart, product]
        }
        else {
            exists.quantity = exists.quantity + 1;
            const remaining = cart.filter(pd => pd._id !== product._id);
            newCart = [...remaining, exists]

        }
        setCart(newCart)
        addToDb(product._id)
    }

    const handleClearCart = () => {
        setCart([])
        deleteShoppingCart()
    }
    const options = [5, 10, 20]

    const handleSelectChange = event => {
        setItemsPerPage(parseInt(event.target.value))
        setCurrentPage(0)
    }


    return (
        <>
            <div className='shop-container'>
                <div className="product-container">
                    {
                        products.map(product => <Product
                            key={product._id}
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
            {/* pagination */}
            <div className="pagination">
                <p>current page: {currentPage + 1} per Page: {itemsPerPage}</p>
                {
                    pageNumbers.map(number => <button
                        key={number}
                        className={currentPage === number ? 'selected' : ''}
                        onClick={() => setCurrentPage(number)}
                    >{number + 1}</button>)
                }
                <select value={itemsPerPage} onChange={handleSelectChange}>
                    {
                        options.map(option => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))
                    }
                </select>
            </div>
        </>

    );
};

export default Shop;