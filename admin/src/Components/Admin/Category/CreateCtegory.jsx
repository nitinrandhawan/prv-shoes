import React, { useState } from 'react';
import Sidebar from '../Sidebar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const CreateCategory = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({ maincategory: '' });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const getInputData = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const getInputFile = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 2 * 1024 * 1024) { 
    toast.error("File size should not exceed 2MB");
    e.target.value = null; 
    return;
  }

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const postData = async (e) => {
    e.preventDefault();

    if (!data.maincategory || !image) {
      return toast.error("Please provide all fields");
    }

    const formData = new FormData();
    formData.append('category', data.maincategory);
    formData.append('image', image);

    const toastId = toast.loading("Uploading category...");

    try {
      const res = await axios.post("http://localhost:9000/api/category", formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (res.status === 200) {
        toast.success("Category created successfully", { id: toastId });
        navigate("/admin/category");
      } else {
        toast.error("Failed to add category", { id: toastId });
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong", { id: toastId });
    }
  };

  return (
    <>
      <div className="blue_bg mt-5">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="titlepage">
                <h2 className='text-center mb-5'>Add A New Category</h2>
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
            <form onSubmit={postData} encType="multipart/form-data">
              <div className="row">
                <div className="col mb-3">
                  <label>Category Name <span className="text-danger">*</span></label>
                  <input
                    type="text"
                    className="form-control"
                    name="maincategory"
                    onChange={getInputData}
                    required
                    placeholder="Enter category name"
                  />
                </div>

                <div className="col mb-3">
                  <label>Category Image <span className="text-danger">*</span></label>
                  <input
                    type="file"
                    accept="image/*"
                    className="form-control"
                    name="image"
                    onChange={getInputFile}
                    required
                  />
                </div>

                {preview && (
                  <div className="col-md-3 mb-3">
                    <label className="d-block">Preview</label>
                    <img src={preview} alt="Preview" className="img-fluid rounded shadow" />
                  </div>
                )}

                <div className="col-12">
                  <button
                    type="submit"
                    className="btn text-light w-100 mt-2 mb-3"
                    style={{ backgroundColor: "#183661" }}
                  >
                    Add Category
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateCategory;
