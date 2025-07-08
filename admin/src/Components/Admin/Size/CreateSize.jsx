import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Sidebar';
import toast from 'react-hot-toast';

const CreateSize = () => {
  const navigate = useNavigate();
  const [sizename, setSizeName] = useState("");

  const postData = async (e) => {
    e.preventDefault();

    if (!sizename.trim()) {
      return toast.error("Size name is required");
    }

    try {
      const res = await axios.post("http://localhost:9000/api/size", { sizename });
      if (res.status === 201) {
        toast.success("Size created successfully");
        navigate("/admin/size");
      } else {
        toast.error("Failed to create size");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <div className="blue_bg mt-5">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="titlepage">
                <h2 className="text-center mb-5">Add A New Size</h2>
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
            <form onSubmit={postData}>
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
                Add Size
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateSize;
