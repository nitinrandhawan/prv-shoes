import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar';
import { Link } from 'react-router-dom';

const AllProductNames = () => {
    const [AllName, setAllProductNames] = useState([])
    const getAllProductNames = async () => {
        try {
            const response = await axios.get('http://localhost:9000/productNames/v1/getAllNames');
            setAllProductNames(response.data.data);
            console.log(response.data.data)
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getAllProductNames()
    }, [])
    const handleDelte = async(id) =>{
        console.log("i am hit")
        try {
            const res = await axios.delete(`http://localhost:9000/productNames/v1/delete/${id}`)
            console.log(res.data)
            alert('Deleted Successfull')
            getAllProductNames()
        } catch (error) {
            console.log(error)
            alert('Error Delete')

        }
    }
    return (
        <>
            <div className="blue_bg mt-5">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="titlepage justify-content-between d-flex">
                                <h2 className='text-center'>All Products Names </h2>
                                <Link to="/admin/createName" className='btn btn-secondary float-end mb-5'>Create Product Names</Link>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3" style={{ marginTop: "-35px" }}>
                        <Sidebar />
                    </div>
                    <div className="col-md-9">
                        <table className='table table-responsive table-bordered'>

                            <thead>
                                <th>S.No</th>
                                <th>Category</th>
                                <th>SubCategory</th>
                                <th>Product Name</th>
                             
                                <th>Delete</th>
                            </thead>
                            <tbody>
                                {AllName && AllName.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.maincategory}</td>
                                        <td>{item.subcategory}</td>
                                        <td>{item.ProductName}</td>
                                        {/* <td><Link to={`/admin/Edit/${item._id}`} className='btn btn-success'>Edit</Link></td> */}
                                        <td><button onClick={()=>{handleDelte(item._id)}} className='btn btn-danger'>Delete</button></td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AllProductNames