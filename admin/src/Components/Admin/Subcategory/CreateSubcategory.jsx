import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Sidebar';
import toast from 'react-hot-toast';

const CreateSubcategory = () => {
  const navigate = useNavigate();
  const [allCategory, setAllCategory] = useState([]);
  const [data, setData] = useState({
    category: "",
    subcategory: ""
  });
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

  const getApiDataCategory = async () => {
    try {
      let res = await axios.get("http://localhost:9000/api/category");
      setAllCategory(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const postData = async (e) => {
    e.preventDefault();

    if (!data.category || !data.subcategory || !image) {
      return toast.error("Please fill all fields including image");
    }

    const formData = new FormData();
    formData.append("category", data.category);
    formData.append("subcategory", data.subcategory);
    formData.append("image", image);

    const toastId = toast.loading("Creating subcategory...");
    try {
      let res = await axios.post("http://localhost:9000/api/subcategory", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.status === 200) {
        toast.success("Subcategory created successfully", { id: toastId });
        navigate("/admin/subcategory");
      } else {
        toast.error("Failed to create subcategory", { id: toastId });
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong", { id: toastId });
    }
  };

  useEffect(() => {
    getApiDataCategory();
  }, []);

  return (
    <>
      <div className="blue_bg mt-5">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="titlepage">
                <h2 className="text-center mb-5">Add A New SubCategory</h2>
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
              <div className="mb-3">
                <label>Select Category <span className="text-danger">*</span></label>
                <select
                  name="category"
                  className="form-control"
                  value={data.category}
                  onChange={getInputData}
                >
                  <option value="">Choose Main Category</option>
                  {allCategory.map((item, index) => (
                    <option key={index} value={item._id}>
                      {item.category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label>Subcategory Name <span className="text-danger">*</span></label>
                <input
                  type="text"
                  name="subcategory"
                  className="form-control"
                  placeholder="Subcategory Name"
                  value={data.subcategory}
                  onChange={getInputData}
                />
              </div>

              <div className="mb-3">
                <label>Subcategory Image <span className="text-danger">*</span></label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  className="form-control"
                  onChange={getInputFile}
                />
              </div>

              {preview && (
                <div className="mb-3">
                  <label>Preview</label>
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
                className="btn w-100 mt-2 mb-3 text-light"
                style={{ backgroundColor: "#183661" }}
              >
                Add Subcategory
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateSubcategory;
