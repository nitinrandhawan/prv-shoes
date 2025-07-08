import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Orders = () => {
    const UserString = sessionStorage.getItem('user');
    const User = JSON.parse(UserString);
    const [store, setStore] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [ordersPerPage] = useState(8); // Number of orders per page
    const [filter, setFilter] = useState('all'); // Filter condition: 'all', 'confirmed', 'canceled'

    const getApiData = async () => {
        try {
            let res = await axios.get("http://localhost:9000/api/order");
            const userOrders = res.data.data.filter((orders) => orders.user.userId === User._id);
            setStore(userOrders);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getApiData();
    }, []);

    // Filter orders according to the filter condition
    const filteredOrders = () => {
        if (filter === 'all') return store;
        return store.filter(order => order.OrderStatus === filter);
    };

    // Pagination logic
    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = filteredOrders().slice(indexOfFirstOrder, indexOfLastOrder);

    const paginate = pageNumber => setCurrentPage(pageNumber);

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
                <div className="row">
                    <div className="col-md-12">
                        <div className="table-responsive d-md-block d-none">
                            <table className='table table-bordered'>
                                <thead>
                                    <tr>
                                        <th>Order Id</th>
                                        <th>See Order Details</th>
                                        <th>Order Date</th>
                                        <th>Order Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentOrders.reverse().map((order, index) => (
                                        order.product.map((product, idx) => (
                                            <tr key={index + idx}>
                                                <td>{product._id}</td>
                                                <td><Link className='btn btn-success' to={`/singleorder/${product._id}`}>See Order Details</Link></td>
                                                <td>{new Date(order.OrderDate).toLocaleDateString()}</td>
                                                <td>{order.OrderStatus}</td>
                                            </tr>
                                        ))
                                    ))}
                                </tbody>
                            </table>
                            {/* Pagination */}
                            <nav>
                                <ul className="pagination">
                                    {Array.from({ length: Math.ceil(filteredOrders().length / ordersPerPage) }, (_, i) => (
                                        <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                                            <button onClick={() => paginate(i + 1)} className="page-link">{i + 1}</button>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </div>
                        <div className="col-12 d-md-none">
                            {currentOrders.reverse().map((order, index) => (
                                order.product.map((product, idx) => (
                                    <div key={index + idx} className="card mb-3">
                                        <div className="card-body">
                                            <h5 className="card-title">Order Id: {product._id}</h5>
                                            <p className="card-text">Order Date: {new Date(order.OrderDate).toLocaleDateString()}</p>
                                            <p className="card-text">Order Status: {order.OrderStatus}</p>
                                            <Link className='btn btn-success' to={`/singleorder/${product._id}`}>See Order Details</Link>
                                        </div>
                                    </div>
                                ))
                            ))}
                            {/* Pagination */}
                            <nav>
                                <ul className="pagination">
                                    {Array.from({ length: Math.ceil(filteredOrders().length / ordersPerPage) }, (_, i) => (
                                        <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                                            <button onClick={() => paginate(i + 1)} className="page-link">{i + 1}</button>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Orders;
