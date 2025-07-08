import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div style={{ marginTop: "50px", marginBottom: "50px" }}>
      <ul className="list-group">
        <Link to='/'><li className="list-group-item mb-3">Dashboard<span className='fa fa-list float-end'></span></li></Link>

        <Link to='/admin/category'><li className="list-group-item mb-3">Category <span className='fa fa-list float-end'></span></li></Link>
        <Link to='/admin/subcategory'><li className="list-group-item mb-3">Subcategory <span className='fa fa-list float-end'></span></li></Link>
        <Link to='/admin/size'><li className="list-group-item mb-3">Size <span className='fa fa-list float-end'></span></li></Link>
        <Link to='/admin/product'><li className="list-group-item mb-3">Product <span className='fa fa-list float-end'></span></li></Link>
        <Link to='/admin/order'><li className="list-group-item mb-3">Orders <span className='fa fa-list float-end'></span></li></Link>
        <Link to='/admin/contact'><li className="list-group-item mb-3">Contact <span className='fa fa-list float-end'></span></li></Link>
        <Link to='/signup'><li className="list-group-item">Create New Account for User <span className='fa fa-list float-end'></span></li></Link>
      </ul>
    </div>
  )
}

export default Sidebar