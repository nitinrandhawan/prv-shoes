import React, { useEffect, useState } from 'react'
// import Testimonials from './Testimonials'

import img from './shoes (1).jpg'
import img2 from './shoes (2).jpg'
import img3 from './shoes (3).jpg'
import './home.css'

import axios from 'axios'
import { Link } from 'react-router-dom'
export default function Home() {
    let [data, setData] = useState([])

    const getAPIData = async () => {
        try {
            let res = await axios.get("http://localhost:9000/api/product")
            console.log(res);
            setData(res.data.data)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getAPIData()
    }, [])
    return (
        <>

            {/* <!-- Carousel Start --> */}
            <div className="container-fluid p-0 mb-5">
                <div id="header-carousel" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img className="banare" src={img} alt="Image" />

                        </div>
                        <div className="carousel-item">
                            <img className="banare" src={img2} alt="Image" />
                        </div>
                        <div className="carousel-item">
                            <img className="banare" src={img3} alt="Image" />
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#header-carousel"
                        data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#header-carousel"
                        data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
            {/* <!-- Carousel End --> */}

            {/* <About /> */}
            <div className="container-xxl py-5 mt-4">
                <div className="container">
                    <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                        {/* <h6 className="text-primary text-uppercase">// Best in Fashion //</h6> */}
                        <h1 className="mb-5">Our Products</h1>
                    </div>
                    <div className="row g-4">
                        {
                            data.slice(0, 8).map((item, index) => {
                                return <div key={index} className="col-lg-3 col-md-6" data-wow-delay="0.1s">
                                    <Link to={`/product/${item._id}`} className="team-item">
                                        <div className="position-relative overflow-hidden">
                                            <img className="img-fluid" src={item.pic1} style={{ height: "230px", width: "100%" }} alt="" />
                                            <div className="team-overlay position-absolute start-0 top-0 w-100 h-100">
                                                {/* <img src={item.pic2} className='position-absolute start-0 top-0 w-100 h-100' style={{ height: "230px", width: "100%" }} alt="" /> */}
                                                {/* <Link className="btn btn-square w-100 position-absolute start-0 bottom-0 w-100 h-100'" to={`/product/${item._id}`}><i className="fa fa-shopping-cart"></i> Add to Cart</Link> */}
                                            </div>
                                        </div>
                                        <div className="bg-light text-center p-1">
                                            <h5 className="fw-bold mb-0" style={{ height: "50px" }}>{item.name}</h5>
                                            {/* <small><del className='text-danger'>&#8377;{item.baseprice}</del> &#8377;{item.finalprice} <sup className='text-success'>{item.discount}% Off</sup></small> */}
                                        </div>
                                    </Link>
                                </div>
                            })
                        }
                    </div>
                </div>
            </div>
            <div className="container-xxl py-5 mt-4">
                <div className="container">
                    {data.filter(item => item.maincategory === "Male").length > 0 && (
                        <div className="text-center" data-wow-delay="0.1s">
                            {/* <h6 className="text-primary text-uppercase">// Best in Fashion //</h6> */}
                            <h1 className="mb-5">Mens Shoes</h1>
                        </div>
                    )}


                    <div className="row g-4">
                        {
                            data.reverse().map((item, index) => {
                                if (item.maincategory === "Male") {
                                    return (
                                        <div key={index} className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                                            <Link to={`/product/${item._id}`} className="team-item">
                                                <div className="position-relative overflow-hidden">
                                                    <img className="img-fluid" src={item.pic1} style={{ height: "230px", width: "100%" }} alt="" />
                                                    <div className="team-overlay position-absolute start-0 top-0 w-100 h-100">
                                                        {/* <img src={item.pic2} className='position-absolute start-0 top-0 w-100 h-100' style={{ height: "230px", width: "100%" }} alt="no-img" /> */}
                                                    </div>
                                                </div>
                                                <div className="bg-light text-center p-1">
                                                    <h5 className="fw-bold mb-0" style={{ height: "50px" }}>{item.name}</h5>
                                                    {/* <small><del className='text-danger'>&#8377;{item.baseprice}</del> &#8377;{item.finalprice} <sup className='text-success'>{item.discount}% Off</sup></small> */}
                                                </div>
                                            </Link>
                                        </div>
                                    );
                                } else {
                                    return null;
                                }
                            })
                        }
                    </div>

                </div>
            </div>
            {/*  */}
            <div className="container mt-5">
                <div className="row mt-5 mb-3">
                    <h3 className='text-center'>Our Categories</h3>
                </div>
                <div className="row">
                    <a href='/Kids' className="col-md-4 pointers mb-2">
                        <img src="img/13.jpeg" alt="" className='img-fluid' />
                    </a>
                    <a href='/Mens' className="col-md-4 pointers mb-2">
                        <img src="img/12.jpeg" alt="" className='img-fluid' />
                    </a>
                    <a href='/Womens' className="col-md-4 pointers mb-2">
                        <img src="img/11.jpeg" alt="" className='img-fluid' />
                    </a>
                </div>
            </div>
            {/*  */}

            {/* <!-- Product Section End --> */}
            <div className="container-xxl py-5 mt-4">
                <div className="container">
                    {data.filter(item => item.maincategory === "Kids").length > 0 && (
                        <div className="text-center" data-wow-delay="0.1s">
                            {/* <h6 className="text-primary text-uppercase">// Best in Fashion //</h6> */}
                            <h1 className="mb-5">Kids Shoes</h1>
                        </div>
                    )}


                    <div className="row g-4">
                        {
                            data.reverse().slice(1, 9).map((item, index) => {
                                // Check if maincategory is "Kids"
                                if (item.maincategory === "Kids") {
                                    return (
                                        <div key={index} className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                                            <div className="team-item">
                                                <div className="position-relative overflow-hidden">
                                                    <img className="img-fluid" src={item.pic1} style={{ height: "230px", width: "100%" }} alt="" />
                                                    <div className="team-overlay position-absolute start-0 top-0 w-100 h-100">
                                                        <img src={item.pic2} className='position-absolute start-0 top-0 w-100 h-100' style={{ height: "230px", width: "100%" }} alt="" />
                                                        {/* <Link className="btn btn-square w-100 position-absolute start-0 bottom-0 w-100 h-100'" to={`/product/${item._id}`}><i className="fa fa-shopping-cart"></i> Add to Cart</Link> */}
                                                    </div>
                                                </div>
                                                <div className="bg-light text-center p-1">
                                                    <h5 className="fw-bold mb-0" style={{ height: "50px" }}>{item.name}</h5>
                                                    {/* <small><del className='text-danger'>&#8377;{item.baseprice}</del> &#8377;{item.finalprice} <sup className='text-success'>{item.discount}% Off</sup></small> */}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                } else {
                                    return null; // Render nothing if maincategory is not "Male"
                                }
                            })
                        }
                    </div>

                </div>
            </div>

            <div className="container-xxl py-5 mt-4">
                <div className="container">
                  
                    {data.filter(item => item.maincategory === "Kids").length > 0 && (
                        <div className="text-center" data-wow-delay="0.1s">
                            <h1 className="mb-5">Women Shoes</h1>
                            </div>
                    )}
                    <div className="row g-4">
                        {
                            data.reverse().map((item, index) => {
                                // Check if maincategory is "Kids"
                                if (item.maincategory === "Female") {
                                    return (
                                        <div key={index} className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                                            <div className="team-item">
                                                <div className="position-relative overflow-hidden">
                                                    <img className="img-fluid" src={item.pic1} style={{ height: "230px", width: "100%" }} alt="" />
                                                    <div className="team-overlay position-absolute start-0 top-0 w-100 h-100">
                                                        <img src={item.pic2} className='position-absolute start-0 top-0 w-100 h-100' style={{ height: "230px", width: "100%" }} alt="" />
                                                        {/* <Link className="btn btn-square w-100 position-absolute start-0 bottom-0 w-100 h-100'" to={`/product/${item._id}`}><i className="fa fa-shopping-cart"></i> Add to Cart</Link> */}
                                                    </div>
                                                </div>
                                                <div className="bg-light text-center p-1">
                                                    <h5 className="fw-bold mb-0" style={{ height: "50px" }}>{item.name}</h5>
                                                    {/* <small><del className='text-danger'>&#8377;{item.baseprice}</del> &#8377;{item.finalprice} <sup className='text-success'>{item.discount}% Off</sup></small> */}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                } else {
                                    return null; // Render nothing if maincategory is not "Male"
                                }
                            })
                        }
                    </div>

                </div>
            </div>
            {/* <Testimonials /> */}
        </>
    )
}
