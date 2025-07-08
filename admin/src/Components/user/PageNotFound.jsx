import React from 'react'
import { Link } from 'react-router-dom'

const PageNotFound = () => {
    return (
        <>
            <div className="blue_bg mt-5">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="titlepage">
                                <h2 className='text-center mb-5'>404 Page Not Fount !!!!!!</h2>
                                <Link to='/' className='btn btn-success '>Home page</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PageNotFound