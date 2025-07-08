import axios from "axios";
import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Subcategory = () => {
  const [data, setData] = useState([]);

  const getApiData = async () => {
    try {
      const subRes = await axios.get("http://localhost:9000/api/subcategory");

      setData(subRes.data.data.reverse());
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getApiData();
  }, []);

  const deleteSubcategory = async (_id) => {
    try {
      let res = await axios.delete(
        "http://localhost:9000/api/subcategory/" + _id
      );
      if (res.status === 200) {
        toast.success("Subcategory deleted successfully");
        getApiData(); // Refresh data
      } else {
        toast.error("Failed to delete subcategory");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="blue_bg mt-5">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="titlepage">
                <h2 className="text-center">Admin Subcategory Table</h2>
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
            <Link
              to="/admin/subcategory/create"
              className="btn btn-secondary float-end mb-4"
            >
              Create Subcategory
            </Link>

            <table className="table table-bordered table-hover table-responsive">
              <thead className="table-dark">
                <tr>
                  <th>Category</th>
                  <th>Subcategory</th>
                  <th>Image</th>
                  <th colSpan={2}>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index}>
                    <td>{item.category.category}</td>
                    <td>{item.subcategory}</td>
                    <td>
                      {item.subcategoryImage ? (
                        <img
                          src={item.subcategoryImage}
                          alt="Subcategory"
                          style={{
                            width: "80px",
                            height: "80px",
                            objectFit: "cover",
                            borderRadius: "6px",
                          }}
                        />
                      ) : (
                        "No Image"
                      )}
                    </td>
                    <td>
                      <Link
                        to={`/editsubcategory/${item._id}`}
                        className="btn btn-success"
                      >
                        Edit
                      </Link>
                    </td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => deleteSubcategory(item._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {data.length === 0 && (
              <div className="text-center mt-4 text-muted">
                No subcategories found.
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Subcategory;
