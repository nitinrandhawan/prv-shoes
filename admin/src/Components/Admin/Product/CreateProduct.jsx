import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const CreateProduct = () => {
  const navigate = useNavigate();
  const [allCategory, setAllCategory] = useState([]);
  const [allSubcategory, setAllSubcategory] = useState([]);
  const [allSize, setAllSize] = useState([]);

  const [data, setData] = useState({
    name: "",
    maincategory: "",
    subcategory: "",
    brand: "",
    color: "",
    sizename: "",
    stock: "",
    description: "",
    pic1: "",
    pic2: "",
    pic3: "",
    pic4: "",
    price: "",
    discount: "",
    isLatest: false,
  });

  const getInputData = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const calculateFinalPrice = (price, discount) => {
    const p = parseFloat(price) || 0;
    const d = parseFloat(discount) || 0;
    const discountedAmount = (p * d) / 100;
    return (p - discountedAmount).toFixed(2);
  };

  const getInputFile = (e) => {
    const { name, files } = e.target;
    setData({ ...data, [name]: files[0] });
  };

  const getApiDataCategory = async () => {
    try {
      const res = await axios.get("http://localhost:9000/api/category");
      setAllCategory(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getApiDataSubCategory = async () => {
    try {
      const res = await axios.get("http://localhost:9000/api/subcategory");
      setAllSubcategory(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getApiDataSize = async () => {
    try {
      const res = await axios.get("http://localhost:9000/api/size");
      setAllSize(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getApiDataCategory();
    getApiDataSubCategory();
    getApiDataSize();
  }, []);

  const postData = async (e) => {
    e.preventDefault();
    if (
      !data.name ||
      !data.maincategory ||
      !data.subcategory ||
      !data.sizename ||
      !data.color ||
      !data.brand ||
      !data.stock ||
      !data.pic1 ||
      !data.price ||
      !data.discount
    ) {
      return toast.error("Please fill all required fields including pic1.");
    }

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("category", data.maincategory); // sending maincategory ID
    formData.append("subcategory", data.subcategory); // sending subcategory ID
    formData.append("sizename", data.sizename); // sending size ID
    formData.append("brand", data.brand);
    formData.append("color", data.color);
    formData.append("stock", data.stock);
    formData.append("description", data.description);
    formData.append("pic1", data.pic1);
    formData.append("price", data.price);
    formData.append("discount", data.discount);
    formData.append("isLatest", data.isLatest); 
    if (data.pic2) formData.append("pic2", data.pic2);
    if (data.pic3) formData.append("pic3", data.pic3);
    if (data.pic4) formData.append("pic4", data.pic4);

    const loader = toast.loading("Adding product...");
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:9000/api/product",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 201) {
        toast.dismiss(loader);
        toast.success("Product added successfully");
        navigate("/admin/product");
      } else {
        toast.error("Failed to add product");
      }
    } catch (error) {
      toast.dismiss(loader);

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
                <h2 className="text-center mb-5">Add A New Product</h2>
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
                <label>
                  Product Category <span className="text-danger">*</span>
                </label>
                <select
                  name="maincategory"
                  onChange={getInputData}
                  className="form-control"
                  required
                >
                  <option value="">Choose Category</option>
                  {allCategory.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.category}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label>
                  Product Sub Category <span className="text-danger">*</span>
                </label>
                <select
                  name="subcategory"
                  onChange={getInputData}
                  className="form-control"
                  required
                >
                  <option value="">Choose Subcategory</option>
                  {allSubcategory
                    .filter((sub) => sub.category._id === data.maincategory)
                    .map((item) => (
                      <option key={item._id} value={item._id}>
                        {item.subcategory}
                      </option>
                    ))}
                </select>
              </div>
              <div className="mb-3">
                <label>
                  Product Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={data.name}
                  onChange={getInputData}
                  required
                  placeholder="Product name"
                />
              </div>
              <div className="mb-3">
                <label>
                  Product Brand <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="brand"
                  value={data.brand}
                  onChange={getInputData}
                  required
                  placeholder="Brand"
                />
              </div>
              <div className="mb-3">
                <label>
                  Product Color <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="color"
                  value={data.color}
                  onChange={getInputData}
                  required
                  placeholder="Color"
                />
              </div>
              <div className="mb-3">
                <label>
                  Product Size <span className="text-danger">*</span>
                </label>
                <select
                  name="sizename"
                  onChange={getInputData}
                  className="form-control"
                  required
                >
                  <option value="">Choose Size</option>
                  {allSize.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.sizename}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label>
                  Product Stock <span className="text-danger">*</span>
                </label>
                <input
                  type="number"
                  className="form-control"
                  name="stock"
                  value={data.stock}
                  onChange={getInputData}
                  required
                  placeholder="Stock"
                />
              </div>
              <div className="mb-3">
                <label>Description</label>
                <textarea
                  name="description"
                  rows="5"
                  className="form-control"
                  placeholder="Description..."
                  value={data.description}
                  onChange={getInputData}
                ></textarea>
              </div>
              <div className="mb-3">
                <label>
                  Product Pic 1 <span className="text-danger">*</span>
                </label>
                <input
                  type="file"
                  className="form-control"
                  name="pic1"
                  onChange={getInputFile}
                  required
                />
              </div>
              <div className="mb-3">
                <label>Product Pic 2</label>
                <input
                  type="file"
                  className="form-control"
                  name="pic2"
                  onChange={getInputFile}
                />
              </div>
              <div className="mb-3">
                <label>Product Pic 3</label>
                <input
                  type="file"
                  className="form-control"
                  name="pic3"
                  onChange={getInputFile}
                />
              </div>
              <div className="mb-3">
                <label>Product Pic 4</label>
                <input
                  type="file"
                  className="form-control"
                  name="pic4"
                  onChange={getInputFile}
                />
              </div>
              <div>
                <div className="mb-3">
                  <label>
                    Price <span className="text-danger">*</span>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    name="price"
                    value={data.price}
                    onChange={getInputData}
                    required
                    placeholder="Price"
                  />
                </div>

                <div className="mb-3">
                  <label>Discount (%)</label>
                  <input
                    type="number"
                    className="form-control"
                    name="discount"
                    value={data.discount}
                    onChange={getInputData}
                    placeholder="Discount Percentage"
                  />
                </div>

                {/* Final Price Display */}
                <div className="mb-3">
                  <label className="fw-bold">
                    Final Price:{" "}
                    <span className="text-success">
                      ₹{calculateFinalPrice(data.price, data.discount)}
                    </span>
                  </label>
                </div>
              </div>
              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="latestProduct"
                  name="isLatest"
                  checked={data.isLatest}
                  onChange={(e) =>
                    setData((prev) => ({
                      ...prev,
                      isLatest: e.target.checked,
                    }))
                  }
                />
                <label className="form-check-label" htmlFor="latestProduct">
                  Latest Product
                </label>
              </div>

              <button
                className="btn mt-2 mb-3 text-light w-100"
                style={{ backgroundColor: "#183661" }}
              >
                Add Product
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateProduct;
