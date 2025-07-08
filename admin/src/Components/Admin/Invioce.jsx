import React, { useEffect, useState } from 'react';
import './Invoice.css'; // Import your custom CSS file for additional styling
import axios from 'axios';

const Invoice = () => {
    const [order, setOrder] = useState(null); // Change from [] to null

    const location = window.location.search;
    const searchParams = new URLSearchParams(location);
    const orderId = searchParams.get('orderId');
    console.log(orderId);

    const getApiData = async () => {
        try {
            const res = await axios.get("http://localhost:9000/api/order");
            const filteredOrder = res.data.data.find(order => order.orderId === orderId);
            console.log(filteredOrder);
            setOrder(filteredOrder);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getApiData();
    }, []);

    return (
        <div className="container mt-5">
            {order && ( // Conditionally render if order is not null
                <div className="invoice">
                    <h2 className="mb-4">Order Details</h2>
                    <div className="customer-info">
                        <p><strong>Order ID:</strong> {order.orderId}</p>
                        <p><strong>Order Date:</strong> {new Date(order.OrderDate).toLocaleDateString()}</p>
                        <p><strong>Customer Name:</strong> {order.user ? order.user.username : 'N/A'}</p>
                        <p><strong>Email:</strong> {order.user ? order.user.email : 'N/A'}</p>
                        <p><strong>Phone No:</strong> {order.user ? order.user.phone : 'N/A'}</p>
                    </div>
                    <table className="table table-bordered">
                        <thead className="table-dark">
                            <tr>
                                <th>Product Image</th>

                                <th>Product Name</th>
                                <th>Size</th>
                                <th>Quantity</th>
                                <th>Color</th>
                            </tr>
                        </thead>
                        <tbody>
                            {order.product.map((item, index) => (
                                <tr key={index}>
                                    <td><img src={item.image} className='w-10' alt="" /></td>
                                    <td>{item.name}</td>
                                    <td>{item.sizename}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.color}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button className="btn btn-primary print" onClick={() => window.print()}>Print</button>
                </div>
            )}
        </div>
    );
};

export default Invoice;
