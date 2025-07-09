import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateProduct = () => {
  const { _id } = useParams();
  const navigate = useNavigate();

  const [allCategory, setAllCategory] = useState([]);
  const [allSubcategory, setAllSubcategory] = useState([]);
  const [allSize, setAllSize] = useState([]);
  const [existingProduct, setExistingProduct] = useState({});
  const [data, setData] = useState({
    name: "",
    brand: "",
    category: "",
    subcategory: "",
    color: "",
    sizename: "",
    stock: "",
    description: "",
    pic1: null,
    pic2: null,
    pic3: null,
    pic4: null,
     price: "",
    discount: "",
    isLatest: false, 
  });

  const getInputData = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

    const calculateFinalPrice = (price, discount) => {
    const p = parseFloat(price) || 0;
    const d = parseFloat(discount) || 0;
    const discountedAmount = (p * d) / 100;
    return (p - discountedAmount).toFixed(2);
  };
  const getInputFile = (e) => {
    const { name, files } = e.target;
    setData((prev) => ({ ...prev, [name]: files[0] }));
  };

  const fetchAllData = async () => {
    try {
      const [categoryRes, subcategoryRes, sizeRes, productRes] =
        await Promise.all([
          axios.get("http://localhost:9000/api/category"),
          axios.get("http://localhost:9000/api/subcategory"),
          axios.get("http://localhost:9000/api/size"),
          axios.get(`http://localhost:9000/api/product/${_id}`),
        ]);
      setAllCategory(categoryRes.data.data);
      setAllSubcategory(subcategoryRes.data.data);
      setAllSize(sizeRes.data.data);
      const product = productRes.data.data;
      setExistingProduct(product);
      setData({
        ...product,
        pic1: null,
        pic2: null,
        pic3: null,
        pic4: null,
      });
      setData((prev) => ({
        ...prev,  
        category: product.category._id || "",
        subcategory: product.subcategory._id || "",
        sizename: product.sizename._id || "",
      }));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("category", data.category);
    formData.append("subcategory", data.subcategory);
    formData.append("sizename", data.sizename);
    formData.append("brand", data.brand);
    formData.append("color", data.color);
    formData.append("stock", data.stock);
    formData.append("description", data.description);
    formData.append("isLatest", data.isLatest); 

    if (data.pic1) formData.append("pic1", data.pic1);
    if (data.pic2) formData.append("pic2", data.pic2);
    if (data.pic3) formData.append("pic3", data.pic3);
    if (data.pic4) formData.append("pic4", data.pic4);

    const loader = toast.loading("Updating product...");
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `http://localhost:9000/api/product/${_id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.dismiss(loader);
      if (res.status === 200) {
        toast.success("Product updated successfully");
        navigate("/admin/product");
      } else {
        toast.error("Failed to update product");
      }
    } catch (error) {
      toast.dismiss(loader);
      console.log(error);
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
                <h2 className="text-center mb-5">Update Product</h2>
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
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label>
                  Product Category <span className="text-danger">*</span>
                </label>
                <select
                  name="category"
                  className="form-control"
                  value={data.category}
                  onChange={getInputData}
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
                  className="form-control"
                  value={data.subcategory}
                  onChange={getInputData}
                  required
                >
                  <option value="">Choose Subcategory</option>
                  {allSubcategory
                    .filter((sub) => sub.category._id === data.category)
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
                  name="name"
                  className="form-control"
                  value={data.name}
                  onChange={getInputData}
                  required
                />
              </div>
              <div className="mb-3">
                <label>
                  Product Brand <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="brand"
                  className="form-control"
                  value={data.brand}
                  onChange={getInputData}
                  required
                />
              </div>
              <div className="mb-3">
                <label>
                  Product Color <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="color"
                  className="form-control"
                  value={data.color}
                  onChange={getInputData}
                  required
                />
              </div>
              <div className="mb-3">
                <label>
                  Product Size <span className="text-danger">*</span>
                </label>
                <select
                  name="sizename"
                  className="form-control"
                  value={data.sizename}
                  onChange={getInputData}
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
                  name="stock"
                  className="form-control"
                  value={data.stock}
                  onChange={getInputData}
                  required
                />
              </div>
              <div className="mb-3">
                <label>Description</label>
                <textarea
                  name="description"
                  rows="5"
                  className="form-control"
                  value={data.description}
                  onChange={getInputData}
                ></textarea>
              </div>
              <div className="mb-3">
                <label>Product Pic 1</label>
                <input
                  type="file"
                  name="pic1"
                  className="form-control"
                  onChange={getInputFile}
                />
              </div>
              <div className="mb-3">
                <label>Product Pic 2</label>
                <input
                  type="file"
                  name="pic2"
                  className="form-control"
                  onChange={getInputFile}
                />
              </div>
              <div className="mb-3">
                <label>Product Pic 3</label>
                <input
                  type="file"
                  name="pic3"
                  className="form-control"
                  onChange={getInputFile}
                />
              </div>
              <div className="mb-3">
                <label>Product Pic 4</label>
                <input
                  type="file"
                  name="pic4"
                  className="form-control"
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
                type="submit"
                className="btn mt-2 mb-3 text-light w-100"
                style={{ backgroundColor: "#183661" }}
              >
                Update Product
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateProduct;
