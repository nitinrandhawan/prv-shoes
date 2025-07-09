import axios from "axios";
import React, { useState } from "react";
import Sidebar from "../Sidebar";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const CreateBanner = () => {
  const navigate = useNavigate();
  const [bannerImage, setBannerImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isActive, setIsActive] = useState(true);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setBannerImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!bannerImage) {
      toast.error("Banner image is required");
      return;
    }

    const formData = new FormData();
    formData.append("bannerImage", bannerImage);
    formData.append("isActive", isActive);
const loader = toast.loading("Creating banner...");
    try {
      const res = await axios.post("http://localhost:9000/api/banner", formData);
      if (res.status === 201) {
        toast.success("Banner created successfully");
        navigate("/admin/banner");
        toast.dismiss(loader);
      } else {
        toast.error("Failed to create banner");
      }
    } catch (err) {
      console.error(err);
        toast.dismiss(loader);
      toast.error("Error creating banner");
    }
  };

  return (
    <div className="container-fluid mt-5">
      <div className="row">
        <div className="col-md-3">
          <Sidebar />
        </div>
        <div className="col-md-9">
          <h2 className="mb-4">Create Banner</h2>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="mb-3">
              <label className="form-label">Banner Image *</label>
              <input
                type="file"
                accept="image/*"
                className="form-control"
                onChange={handleImageChange}
              />
              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  style={{
                    width: "200px",
                    height: "auto",
                    marginTop: "10px",
                    borderRadius: "6px",
                  }}
                />
              )}
            </div>

            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="isActive"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
              />
              <label className="form-check-label" htmlFor="isActive">
                Is Active
              </label>
            </div>

            <button type="submit" className="btn btn-primary">
              Create Banner
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateBanner;
