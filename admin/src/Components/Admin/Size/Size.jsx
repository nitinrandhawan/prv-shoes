import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Sidebar from '../Sidebar';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const Size = () => {
  const [data, setData] = useState([]);

  const getApiData = async () => {
    try {
      let res = await axios.get("http://localhost:9000/api/size");
      setData(res.data.data.reverse());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getApiData();
  }, []);

  const deleteSize = async (_id) => {
    try {
      let res = await axios.delete("http://localhost:9000/api/size/" + _id);
      if (res.status === 200) {
        toast.success("Size deleted successfully");
        getApiData(); // Refresh after delete
      } else {
        toast.error("Failed to delete size");
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
                <h2 className="text-center">Admin Size Table</h2>
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
            <Link to="/admin/size/create" className="btn btn-secondary float-end mb-4">
              Create Size
            </Link>

            <table className="table table-bordered table-hover table-responsive">
              <thead className="table-dark">
                <tr>
                  <th>S.No</th>
                  <th>Size</th>
                  <th colSpan={2}>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={item._id}>
                    <td>{index + 1}</td>
                    <td>{item.sizename}</td>
                    <td>
                      <Link to={`/editsize/${item._id}`} className="btn btn-success">
                        Edit
                      </Link>
                    </td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => deleteSize(item._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {data.length === 0 && (
              <div className="text-center mt-4 text-muted">No sizes found.</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Size;
