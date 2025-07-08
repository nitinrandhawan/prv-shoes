import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const SingleProductPage = () => {
    const { _id } = useParams();
    const [product, setProduct] = useState({});

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:9000/api/product/${_id}`);
                setProduct(response.data.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchProduct();
    }, [_id]);

    return (
        <>
            <div className="blue_bg mt-5">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="titlepage">
                                <h2 className='text-center mb-4'>Product Details</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6">
                        <img src={product.pic1} alt={product.name} className="img-fluid" />
                    </div>
                    <div className="col-md-6">
                        <h2>Product Name: <span className='text-danger'>{product.name}</span></h2>
                        <h2>Stock: <span>{product.stock}</span></h2>
                        <h2>Category: <span>{product.maincategory}</span></h2>
                        <h2>SubCategory: <span>{product.subcategory}</span></h2>
                        <h2>Brand: <span>{product.brand}</span></h2>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SingleProductPage;
