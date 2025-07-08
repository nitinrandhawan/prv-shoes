import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Kids = () => {
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
        <div>
            <div className='breadurmbs'>
                <div className="container-fluid text-center px-4 py-5 bg-warning">
                    <h1>Kids Products</h1>
                    <nav className="text-center w-100 d-flex justify-content-center" aria-label="breadcrumb text-center">
                        <ol class="breadcrumb text-center">
                            <li class="breadcrumb-item text-primary"><a href="/">Home</a></li>
                            <li class="breadcrumb-item"><a href="/product">Products</a></li>
                            <li class="breadcrumb-item active" aria-current="page">Kids</li>
                        </ol>
                    </nav>
                </div>
            </div>
            <div className="container-xxl py-5 mt-4">
                <div className="container">

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
        </div>
    )
}

export default Kids