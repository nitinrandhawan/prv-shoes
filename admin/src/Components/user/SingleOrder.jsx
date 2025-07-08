import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const SingleOrder = () => {
    const { _id } = useParams();
    const UserString = sessionStorage.getItem('user');
    const User = JSON.parse(UserString);
    const [store, setStore] = useState([]);

    const getApiData = async () => {
        try {
            let res = await axios.get("http://localhost:9000/api/order");
            setStore(res.data.data);
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getApiData();
    }, []);

    let productId = _id;
    let data = store.filter(order => order.product.some(product => product._id === productId));
    data = data.slice().reverse(); 

    return (
        <>
            <div className="blue_bg mt-5">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="titlepage">
                                <h2 className='text-center mb-5'>SingleOrder Details</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row table-responsive">
                    <table className='table table-bordered'>
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Product Name</th>
                                <th>Product Category</th>
                                <th>Product Subcategory</th>
                                <th>Size</th>
                                <th>Quantity</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((order) => (
                                order.product.map((product, index) => (
                                    <tr key={index}>
                                        <td><img src={product.image} alt={product.name} style={{ height: '150px' }} /></td>
                                        <td>{product.name}</td>
                                        <td>{product.maincategory}</td>
                                        <td>{product.subcategory}</td>
                                        <td>{product.sizename}</td>
                                        <td>{product.quantity}</td>
                                        <td>{new Date(product.updatedAt).toLocaleDateString()}</td>
                                    </tr>
                                ))
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default SingleOrder;
