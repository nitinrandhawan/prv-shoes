import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const Cart = () => {
    const UserString = sessionStorage.getItem('user');
    const User = JSON.parse(UserString);
    const [cartItems, setCartItems] = useState([]);
    const [anyMessage, setAnyMessage] = useState('');

    const isMobile = window.innerWidth < 768; 
    const deleteFromCart = (index) => {
        const updatedCartItems = [...cartItems];
        updatedCartItems.splice(index, 1);
        setCartItems(updatedCartItems);
        sessionStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    };

    useEffect(() => {
        const storedCartItems = JSON.parse(sessionStorage.getItem('cartItems')) || [];
        setCartItems(storedCartItems);
    }, []);

    const postData = async () => {
        try {
            const userid = User._id;
            console.log(userid)
            if(userid === undefined){
                return toast.error("Please Login First");
            }
            const details = {
                userid: userid,
                cartItems: cartItems,
                AnyMessage:anyMessage
            };
            console.log("Request Payload", details);

            const token = localStorage.getItem('token');
            const res = await axios.post("http://localhost:9000/api/order", details, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            console.log("Response", res);

            if (res.status === 200) {
                toast.success("Order placed successfully");
                setCartItems([]); // Empty the cart
                sessionStorage.removeItem("cartItems"); // Remove items from session storage
            } else {
                toast.error("Failed to place order");
            }
        } catch (error) {
            console.error("Error while placing order:", error);
            toast.error("Error while placing order");
        }
    };

    return (

        <>
        <div className="container p-4">
            <h2 className='mb-3'>Cart Items <span className='float-end'><Link to="/singlepage" className='btn btn-success float-right'>Shop Now </Link></span></h2>
            {isMobile ? (
                <div className="row">
                    {cartItems.map((item, index) => (
                        <div key={index} className="col-md-6 mb-3">
                            <div className="card">
                                <img src={item.image} className="card-img-top" alt={item.name} />
                                <div className="card-body">
                                    <h5 className="card-title">{item.name}</h5>
                                    <p className="card-text">Category: {item.maincategory}</p>
                                    <p className="card-text">Subcategory: {item.subcategory}</p>
                                    <p className="card-text">Size: {item.sizename}</p>
                                    <p className="card-text">Quantity: {item.quantity}</p>
                                    <button className='btn btn-danger' onClick={() => deleteFromCart(index)}>Remove</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="table-responsive">
                    <table className='table table-bordered'>
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Product Name</th>
                                <th>Category</th>
                                <th>SubCategory</th>
                                <th>Size</th>
                                <th>Quantity</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map((item, index) => (
                                <tr key={index}>
                                    <td><img src={item.image} alt={item.name} style={{ height: "100px" }} /></td>
                                    <td>{item.name}</td>
                                    <td>{item.maincategory}</td>
                                    <td>{item.subcategory}</td>
                                    <td>{item.sizename}</td>
                                    <td>{item.quantity}</td>
                                    <td><button className='btn btn-danger' onClick={() => deleteFromCart(index)}>Remove</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            <div className="row mt-3">
                <div className="col-md-12 mb-2">
                    <textarea value={anyMessage} name='anyMessage' placeholder='Marka' onChange={(e)=>setAnyMessage(e.target.value)} className="form-control" rows="5"></textarea>
                </div>
                <div className="col-md-12 d-flex align-items-end justify-content-end text-right">
                    <button className='btn text-right btn-primary btn-lg btn-block' onClick={postData}>Place Order</button>
                </div>
            </div>
            <div className="mt-3">
                <Link to="/orders" className='btn btn-success float-end'>See Order Details</Link>
            </div>
        </div>
    </>
    );
}

export default Cart;
