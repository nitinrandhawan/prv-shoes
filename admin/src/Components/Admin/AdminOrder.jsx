import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'jspdf-autotable';

const AdminOrder = () => {
    const [orders, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 10; // Number of orders to display per page

    const getApiData = async () => {
        try {
            const res = await axios.get("http://localhost:9000/api/order");
            setOrders(res.data.data);
            console.log(res.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getApiData();
    }, []);

    // Calculate total number of pages
    const totalPages = Math.ceil(orders.length / ordersPerPage);

    // Slice orders to display only orders for the current page
    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleInvoice = async (orderId) => {
        try {
            window.location.href = `/invoice?orderId=${orderId}`;
        } catch (error) {
            console.log(error);
        }
    };

    const deleteOrders = async (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axios.delete(`http://localhost:9000/api/order/delete/${id}`);
                    console.log(res.data);
                    Swal.fire(
                        'Deleted!',
                        'Your order has been deleted.',
                        'success'
                    );
                    getApiData(); // Refresh the orders list
                } catch (error) {
                    console.log(error);
                    Swal.fire(
                        'Error!',
                        'There was an error deleting the order.',
                        'error'
                    );
                }
            }
        });
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
                <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-center">
                        {Array.from({ length: totalPages }, (_, i) => (
                            <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                                <button className="page-link" onClick={() => handlePageChange(i + 1)}>{i + 1}</button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
            <div className="container">
                <div className="table-responsive">
                    <table className='table table-bordered'>
                        <thead>
                            <tr>
                                <th><h4>Date</h4></th>
                                <th><h4>Order Id</h4></th>
                                <th><h4>Name</h4></th>
                                <th><h4>Contact Number</h4></th>
                                <th><h4>Status</h4></th>
                                <th><h4>Print Bill</h4></th>
                                <th><h4>Delete</h4></th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentOrders.reverse().map(order => (
                                <tr key={order.orderId}>
                                    <td>{new Date(order.OrderDate).toLocaleDateString()}</td>
                                    <td><Link to={`/adminordersinglpage/${order.orderId}`} className='btn underline mb-1'> {order.orderId}</Link></td>
                                    <td><h6>{order.user.username}</h6></td>
                                    <td><h6>{order.user.phone}</h6></td>
                                    <td><h4>{order.OrderStatus}</h4></td>
                                    <td>
                                        <button className="btn btn-success" onClick={() => handleInvoice(order.orderId)}>Print Order</button>
                                    </td>
                                    <td>
                                        <button className="btn btn-danger" onClick={() => deleteOrders(order.orderId)}>Delete Order</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* Pagination */}
            </div>
        </>
    );
};

export default AdminOrder;
