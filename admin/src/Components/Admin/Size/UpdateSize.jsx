import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../Sidebar';
import toast from 'react-hot-toast';

const UpdateSize = () => {
  const { _id } = useParams();
  const navigate = useNavigate();
  const [sizename, setSizeName] = useState("");

  const getSizeData = async () => {
    try {
      const res = await axios.get(`http://localhost:9000/api/size/${_id}`);
      setSizeName(res.data.data.sizename || "");
    } catch (error) {
      console.error("Failed to fetch size:", error);
    }
  };

  const updateSize = async (e) => {
    e.preventDefault();
    if (!sizename.trim()) return toast.error("Size name is required");

    try {
      const res = await axios.put(`http://localhost:9000/api/size/${_id}`, { sizename });
      if (res.status === 200) {
        toast.success("Size updated successfully");
        navigate("/admin/size");
      } else {
        toast.error("Failed to update size");
      }
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getSizeData();
  }, []);

  return (
    <>
      <div className="blue_bg mt-5">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="titlepage">
                <h2 className="text-center mb-5">Update Size</h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3" style={{ marginTop: "-35px" }}>
            <Sidebar />
          </div>
          <div className="col-md-9">
            <form onSubmit={updateSize}>
              <div className="mb-3">
                <label htmlFor="sizename">Size Name <span className="text-danger">*</span></label>
                <input
                  type="text"
                  id="sizename"
                  name="sizename"
                  className="form-control"
                  placeholder="Enter size name"
                  value={sizename}
                  onChange={(e) => setSizeName(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn w-100 mt-2 mb-3 text-light"
                style={{ backgroundColor: "#183661" }}
              >
                Update Size
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateSize;
