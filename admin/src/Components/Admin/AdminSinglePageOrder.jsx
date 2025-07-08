import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
const AdminOrder = () => {
    const [orders, setOrders] = useState([]);
    const { _id } = useParams();
    // console.log(_id)
    const [consOrder, setConsOrder] = useState({
        orderid: _id
    })
    const getApiData = async () => {
        try {
            const res = await axios.get("http://localhost:9000/api/order");
            const data = res.data.data
            
            setOrders(data);
        } catch (error) {
            console.log(error.response.data.msg);
        }
    };

    useEffect(() => {
        getApiData();
    }, []);

    const filteredOrders = orders.filter(order => order.orderId === _id);
    console.log(filteredOrders)


    const confirmOrder = async () => {
        try {
            let res = await axios.post("http://localhost:9000/api/order/confirm", consOrder)
            console.log(res);
            toast.success(res.data.message)
            getApiData();
        } catch (error) {
            toast.error(error.response.data.message || error.response.data.msg)

            console.log(error);
        }
    }
    const cancelOrder = async () => {
        try {
            const res = await axios.post("http://localhost:9000/api/order/cancel", { consOrder });
            toast.success(res.data.message);
            getApiData();
        } catch (error) {
            toast.error(error.response.data.message || error.response.data.msg);
            console.log(error);
        }
    };
    return (
        <>
            <div className="blue_bg mt-5">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="titlepage">
                                <h2 className='text-center mb-5'>Orders Details</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                {filteredOrders.map(order => (
                    <div key={order.orderId} className="table-responsive">
                        <div className='d-flex gap-2 justify-content-between'>
                            <h2>Date: {new Date(order.OrderDate).toLocaleDateString()}</h2>
                            <h2>Order Status : {order.OrderStatus}</h2>
                        </div>
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Product Name</th>
                                    <th>Size</th>
                                    <th>Quantity</th>
                                    <th>Category</th>
                                    <th>Subcategory</th>
                                    <th>Marka</th>

                                </tr>
                            </thead>
                            <tbody>
                                {order.product.map(product => (
                                    <tr key={product._id}>
                                        <td><img src={product.image} alt={product.name} className='imgs' /></td>
                                        <td>{product.name}</td>
                                        <td>{product.sizename}</td>
                                        <td>{product.quantity}</td>
                                        <td>{product.maincategory}</td>
                                        <td>{product.subcategory}</td>
                                        <td>{order.AnyMessage || "No-Message"}</td>


                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <td className='lefts'>
                            <button className='btn btn-success' onClick={confirmOrder}>Confirm Order</button>
                            <button className='btn btn-danger' onClick={cancelOrder}>Cancel Order</button>
                        </td>
                    </div>
                ))}
            </div>
        </>
    );
};

export default AdminOrder;
