import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Product = () => {
    const [data, setData] = useState([]);

    const getAPIData = async () => {
        try {
            let res = await axios.get("http://localhost:9000/api/product");
            setData(res.data.data);
            console.log(res.data.data)
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAPIData();
    }, []);

    return (
        <>
            <div className="container-fluid page-header mb-5 p-0" style={{ backgroundImage: "url(img/1.jpg)" }}>
                <div className="container-fluid page-header-inner py-5">
                    <div className="container text-center">
                        <h1 className="display-3 text-white mb-3 animated slideInDown">Product</h1>
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb justify-content-center text-uppercase">
                                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                <li className="breadcrumb-item text-white active" aria-current="page">Product</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>
            <div className="blue_bg mt-5">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="titlepage">
                                <h2 className='text-center mb-4'>Our Latest Products</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container mb-5">
                <div className="row">
                    {data.map((item, index) => (
                        <div className='col-md-4 mb-4 mt-5' key={index}>
                            <Link  to={`/product/${item._id}`}><img src={item.pic1} alt="" style={{ borderRadius: "20px", height: 250 }} /></Link>
                            <div style={{ color: "black" }}>{item.name}</div>
                            <div><h5>Category: {item.maincategory}</h5></div>
                            <div><Link className='btn' to={`/product/${item._id}`} style={{ backgroundColor: "#212121", color: "white" }}>View Product</Link></div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Product;
