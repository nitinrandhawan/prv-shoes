import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar'
import { Link } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast';

const Category = () => {
  const [data, setData] = useState([])

  const getApiData = async () => {
    try {
      const res = await axios.get("http://localhost:9000/api/category")
      setData(res.data.data.reverse())
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getApiData()
  }, [])

  const deleteCategory = async (_id) => {
    try {
      const res = await axios.delete("http://localhost:9000/api/category/" + _id)
      if (res.status === 200) {
        toast.success("Category deleted successfully")
        getApiData()
      } else {
        toast.error("Failed to delete category")
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className="blue_bg mt-5">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="titlepage">
                <h2 className="text-center">Admin Category Table</h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3" style={{ marginTop: 35 }}>
            <Sidebar />
          </div>
          <div className="col-md-9">
            <Link to="/admin/category/create" className="btn btn-secondary float-end mb-4">Create Category</Link>
            <table className="table table-bordered table-striped text-center">
              <thead className='table-dark'>
                <tr>
                  <th>Image</th>
                  <th>Category Name</th>
                  <th colSpan={2}>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index}>
                    <td>
                      {item.categoryImage ? (
                        <img src={item?.categoryImage} alt="category" width="70" height="70" style={{ objectFit: "cover", borderRadius: 6 }} />
                      ) : (
                        <span className="text-muted">No image</span>
                      )}
                    </td>
                    <td>{item.category}</td>
                    <td>
                      <Link to={`/editcategory/${item._id}`} className="btn btn-success btn-sm">Edit</Link>
                    </td>
                    <td>
                      <button className="btn btn-danger btn-sm" onClick={() => deleteCategory(item._id)}>Delete</button>
                    </td>
                  </tr>
                ))}
                {data.length === 0 && (
                  <tr>
                    <td colSpan={4} className="text-muted">No categories available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default Category
