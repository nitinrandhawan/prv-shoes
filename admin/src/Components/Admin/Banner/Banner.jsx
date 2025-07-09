import axios from "axios";
import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Banner = () => {
  const [data, setData] = useState([]);

  const getApiData = async () => {
    try {
      const res = await axios.get("http://localhost:9000/api/banner");
      setData(res.data.data.reverse());
    } catch (error) {
      console.error(error);
      toast.error("Failed to load banners");
    }
  };

  useEffect(() => {
    getApiData();
  }, []);

  const deleteBanner = async (_id) => {
    try {
      const res = await axios.delete(`http://localhost:9000/api/banner/${_id}`);
      if (res.status === 200) {
        toast.success("Banner deleted successfully");
        getApiData();
      } else {
        toast.error("Failed to delete banner");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error deleting banner");
    }
  };

  return (
    <>
      <div className="blue_bg mt-5">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="titlepage">
                <h2 className="text-center">Admin Banner Table</h2>
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
              to="/admin/banner/create"
              className="btn btn-secondary float-end mb-4"
            >
              Create Banner
            </Link>

            <table className="table table-bordered table-hover table-responsive">
              <thead className="table-dark">
                <tr>
                  <th>S.No</th>
                  <th>Banner Image</th>
                  <th>Is Active</th>
                  <th colSpan={2}>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={item._id}>
                    <td>{index + 1}</td>
                    <td>
                      {item.bannerImage ? (
                        <img
                          src={item.bannerImage}
                          alt="Banner"
                          style={{
                            width: "100px",
                            height: "60px",
                            objectFit: "cover",
                            borderRadius: "6px",
                          }}
                        />
                      ) : (
                        "No Image"
                      )}
                    </td>
                    <td>{item.isActive ? "Yes" : "No"}</td>
                    <td>
                      <Link
                        to={`/admin/banner/edit/${item._id}`}
                        className="btn btn-success"
                      >
                        Edit
                      </Link>
                    </td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => deleteBanner(item._id)}
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
                No banners found.
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
