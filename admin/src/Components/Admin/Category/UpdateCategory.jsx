import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const UpdateCategory = () => {
  const { _id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({ category: "" });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    const getCategory = async () => {
      try {
        const res = await axios.get(`http://localhost:9000/api/category/${_id}`);
        setData({ category: res.data.data.category });
        setPreview(res.data.data.image);
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch category");
      }
    };
    getCategory();
  }, [_id]);

  const handleInput = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 2 * 1024 * 1024) {
      toast.error("File size should not exceed 2MB");
      e.target.value = null;
      return;
    }
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!data.category) return toast.error("Category name is required");

    const formData = new FormData();
    formData.append("category", data.category);
    if (image) formData.append("image", image);

    const toastId = toast.loading("Updating category...");
    try {
      const res = await axios.put(`http://localhost:9000/api/category/${_id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.status === 200) {
        toast.success("Category updated successfully", { id: toastId });
        navigate("/admin/category");
      } else {
        toast.error("Failed to update category", { id: toastId });
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
          <h2 className="text-center mb-5">Edit Category</h2>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3" style={{ marginTop: "-35px" }}>
            <Sidebar />
          </div>
          <div className="col-md-9">
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="mb-3">
                <label>Category Name <span className="text-danger">*</span></label>
                <input
                  type="text"
                  className="form-control"
                  name="category"
                  value={data.category}
                  onChange={handleInput}
                  required
                />
              </div>

              <div className="mb-3">
                <label>Category Image</label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  className="form-control"
                  onChange={handleFile}
                />
              </div>

              {preview && (
                <div className="mb-3">
                  <label className="d-block">Preview</label>
                  <img
                    src={preview}
                    alt="Preview"
                    className="img-fluid rounded shadow"
                    style={{ maxHeight: "150px" }}
                  />
                </div>
              )}

              <button
                type="submit"
                className="btn text-light w-100 mt-2 mb-3"
                style={{ backgroundColor: "#183661" }}
              >
                Update Category
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateCategory;
