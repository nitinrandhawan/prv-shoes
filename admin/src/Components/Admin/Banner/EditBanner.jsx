import axios from "axios";
import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const EditBanner = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [bannerImage, setBannerImage] = useState(null);
  const [existingImage, setExistingImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const res = await axios.get(`http://localhost:9000/api/banner/${id}`);
        const banner = res.data.data;
        setIsActive(banner.isActive);
        setExistingImage(banner.bannerImage);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load banner");
      }
    };
    fetchBanner();
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setBannerImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    if (bannerImage) {
      formData.append("bannerImage", bannerImage);
    }
    formData.append("isActive", isActive);
const loader = toast.loading("Updating banner...");
    try {
      const res = await axios.put(
        `http://localhost:9000/api/banner/${id}`,
        formData
      );
      if (res.status === 200) {
        toast.success("Banner updated successfully");
        navigate("/admin/banner");
        toast.dismiss(loader);
      } else {
        toast.error("Failed to update banner");
      }
    } catch (error) {
      console.log(error);
        toast.dismiss(loader);
      toast.error("Error updating banner");
    }
  };

  return (
    <div className="container-fluid mt-5">
      <div className="row">
        <div className="col-md-3">
          <Sidebar />
        </div>
        <div className="col-md-9">
          <h2 className="mb-4">Edit Banner</h2>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="mb-3">
              <label className="form-label">Banner Image</label>
              <input
                type="file"
                accept="image/*"
                className="form-control"
                onChange={handleImageChange}
              />
              {preview ? (
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
              ) : existingImage ? (
                <img
                  src={existingImage}
                  alt="Current"
                  style={{
                    width: "200px",
                    height: "auto",
                    marginTop: "10px",
                    borderRadius: "6px",
                  }}
                />
              ) : (
                "No Image"
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
              Update Banner
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditBanner;
