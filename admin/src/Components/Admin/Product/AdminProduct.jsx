import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const AdminProduct = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);

  const getAPIData = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:9000/api/product", {
        headers: {
          Authorization: `${token}`,
        },
      });
      setData(res.data.data.reverse());
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProduct = async (_id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.delete(
        `http://localhost:9000/api/product/${_id}`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      if (res.status === 200) {
        toast.success("Product deleted successfully");
        getAPIData();
      } else {
        toast.error("Failed to delete product");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getAPIData();
  }, []);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = data.slice(indexOfFirstProduct, indexOfLastProduct);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  const handleLatestChange = async (e,id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(`http://localhost:9000/api/product/${id}`,{
        isLatest: e.target.checked
      }, {
        headers: {
          Authorization: `${token}`,
        },
      },);
      if (res.status === 200) {
        toast.success("Product updated successfully");
        getAPIData();
      } else {
        toast.error("Failed to update product");
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };
  return (
    <>
      <div className="blue_bg mt-5">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="titlepage justify-content-around d-flex">
                <h2 className="text-center">All Products</h2>
                <Link
                  to="/admin/product/create"
                  className="btn btn-secondary float-end mb-5"
                >
                  Create Product
                </Link>
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
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Brand</th>
                    <th>Category</th>
                    <th>Subcategory</th>
                    <th>Color</th>
                    <th>Size</th>
                    <th>Stock</th>
                    <th>Pic1</th>
                    <th>Pic2</th>
                    {/* <th>Pic3</th>
                    <th>Pic4</th> */}
                    <th>Is Latest</th>
                    <th>Price</th>
                    <th>Discount</th>
                    <th>Final Price</th>
                    <th colSpan={2}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentProducts.map((item, index) => (
                    <tr key={index}>
                      <td>{item.name}</td>
                      <td>{item.brand}</td>
                      <td>{item.category?.category || "N/A"}</td>
                      <td>{item.subcategory?.subcategory || "N/A"}</td>
                      <td>{item.color}</td>
                      <td>{item.sizename?.sizename || "N/A"}</td>
                      <td>{item.stock}</td>
                      <td>
                        {item.pic1 ? (
                          <img
                            src={item.pic1}
                            alt="pic1"
                            style={{ height: 50 }}
                          />
                        ) : (
                          <span className="text-muted">No Image</span>
                        )}
                      </td>
                      <td>
                        {item.pic2 ? (
                          <img
                            src={item.pic2}
                            alt="pic2"
                            style={{ height: 50 }}
                          />
                        ) : (
                          <span className="text-muted">No Image</span>
                        )}
                      </td>
                      {/* <td>
                        {item.pic3 ? (
                          <img
                            src={item.pic3}
                            alt="pic3"
                            style={{ height: 50 }}
                          />
                        ) : (
                          <span className="text-muted">No Image</span>
                        )}
                      </td> */}
                      {/* <td>
                        {item.pic4 ? (
                          <img
                            src={item.pic4}
                            alt="pic4"
                            style={{ height: 50 }}
                          />
                        ) : (
                          <span className="text-muted">No Image</span>
                        )}
                      </td> */}
                      <td>
                        <input
                          type="checkbox"
                          checked={item.isLatest}
                         onChange={(e)=> handleLatestChange(e,item._id)}
                        />
                      </td>
                      <td>{item.price}</td>
                      <td>{item.discount}</td>
                      <td>{item.finalPrice}</td>
                      <td>
                        <Link
                          to={`/editproduct/${item._id}`}
                          className="btn btn-success"
                        >
                          Edit
                        </Link>
                      </td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteProduct(item._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <Pagination
                productsPerPage={productsPerPage}
                totalProducts={data.length}
                paginate={paginate}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const Pagination = ({ productsPerPage, totalProducts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination justify-content-center">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <button onClick={() => paginate(number)} className="page-link">
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default AdminProduct;
