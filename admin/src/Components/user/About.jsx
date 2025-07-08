import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function About() {
    const [about, setAbout] = useState(false)
    const Location = window.location.pathname
    // console.log(Location)
    useEffect(() => {
        if (Location === "/about") {
            console.log("hellos")
            setAbout(true)
        }
    }, [Location])
    return (
        <>
            {/* <!-- Page Header Start --> */}
            {about ? (
                <div className="container-fluid page-header mb-5 p-0" style={{ backgroundImage: "url(img/1.jpg)" }}>
                    <div className="container-fluid page-header-inner py-5">
                        <div className="container text-center">
                            <h1 className="display-3 text-white mb-3 animated slideInDown">About</h1>
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb justify-content-center text-uppercase">
                                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                    <li className="breadcrumb-item text-white active" aria-current="page">About</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>

            ) : null}

            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <p className='about_text'>WELCOME TO OUR COMPANY!</p>
                        <p>A flexible, lightweight and ergonomic range of footwear, giving you the maximum degree of comfort.</p>
                    </div>
                    <div className="col-md-12">
                        <p>Don't you get tired of wearing the same old shoes everywhere you go? Do you not think it's time to change your style? Well then what are you waiting for? Come to <strong>PAV Enterprises India (P) Ltd.</strong> and get a feather-touch array of footwear which would blow your minds away in terms of comfort! A Manufacturer and Supplier of <strong>Gents Footwear,Ledis Footwear and Sports Shoes</strong> in nature, our company is using the finest array of raw materials for our production process, so that the clients get nothing but A-grade product. Having shock-absorbent features, such goods would exceed your expectations beyond all doubt. From School Shoes and Ladies footwear to Sandals, one can find all there needs under our roof at the most affordable prices. Be it a hot summer month or a nice breezy autumn, get ready to feel the butter-smooth comfort under your feet. Having a low maintenance feature, enables these to be a top choice in the Indian Market.</p>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <h3>Ambit of Products</h3>
                            <p>After a tiring day of work or a family outing, no one has the time to sit, start washing or polishing the shoes. Being dust resistant in nature, the machine washable characteristics give our Shoes further advantage. We offer:</p>
                            <ul>
                                <li>Kids Shoes</li>
                                <li> Ladies Footwear</li>
                                <li>Sandals</li>
                                <li>School Shoes</li>
                                <li>Sleepers</li>
                                <li> Sports Shoes</li>
                                <li> Gents Footwear</li>
                            </ul>
                        </div>
                        <div className="col-md-6">
                            <video className='vedio_tag' controls>
                                <source src="img/vedio.mp4" type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    </div>
                </div>
            </div>



        </>
    )
}
