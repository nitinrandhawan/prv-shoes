import React, { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  Navigate,
} from "react-router-dom";
import Navbar from "./Components/HomaPageComponets/Navbar";
import Footer from "./Components/HomaPageComponets/Footer";
import Home from "./Components/user/Home";
import AdminHome from "./Components/Admin/AdminHome";
import CreateProduct from "./Components/Admin/Product/CreateProduct";
import UpdateProduct from "./Components/Admin/Product/UpdateProduct";
import AdminProduct from "./Components/Admin/Product/AdminProduct";
import Orders from "./Components/user/Orders";
import PageNotFound from "./Components/user/PageNotFound";
import AdminOrder from "./Components/Admin/AdminOrder";
import SingleProductPage from "./Components/user/SingleProductPage";
import Category from "./Components/Admin/Category/Category";
import Subcategory from "./Components/Admin/Subcategory/Subcategory";
import CreateCtegory from "./Components/Admin/Category/CreateCtegory";
import UpdateCategory from "./Components/Admin/Category/UpdateCategory";
import CreateSubcategory from "./Components/Admin/Subcategory/CreateSubcategory";
import UpdateSubcategory from "./Components/Admin/Subcategory/UpdateSubcategory";
import CreateSize from "./Components/Admin/Size/CreateSize";
import Size from "./Components/Admin/Size/Size";
import UpdateSize from "./Components/Admin/Size/UpdateSize";
import toast, { Toaster } from "react-hot-toast";
import SingleOrder from "./Components/user/SingleOrder";
import AdminSinglePageOrder from "./Components/Admin/AdminSinglePageOrder";
import Admincontact from "./Components/Admin/Contact/AdminContact";
import Invoice from "./Components/Admin/Invioce";
import CreateName from "./Components/Admin/Product/CreateName";
import Kids from "./Components/user/Kids";
import Mens from "./Components/user/Mens";
import Women from "./Components/user/Women";
import AllProductNames from "./Components/Admin/Product/AllProductNames";
import Signup from "./Components/Admin/Signup";
import Login from "./Components/Admin/Login";
import ProtectedRoute from "./Utils/ProtectedRoute";
import { useEffect } from "react";
import axios from "axios";
import Banner from "./Components/Admin/Banner/Banner";
import CreateBanner from "./Components/Admin/Banner/CreateBanner";
import EditBanner from "./Components/Admin/Banner/EditBanner";

function App() {
  const [token, setToken] = useState(null);
  const tokenVal = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);

  const verifyAdmin = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:9000/api/user/verify-admin",
        {},
        {
          headers: {
            Authorization: `Bearer ${tokenVal}`,
          },
        }
      );
      if (response.status === 200) {
        setToken(true);
        setLoading(false);
        // window.location.href = "/";
      }
    } catch (error) {
      setToken(false);
      setLoading(false);
      localStorage.removeItem("token");
      console.log("error", error);
    }
  };
  useEffect(() => {
    verifyAdmin();
  }, []);

  if (loading || token === null) {
    return <h1>Loading...</h1>;
  }
  return (
    <>
      <BrowserRouter>
        {token && <Navbar />}
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route
            path="/"
            element={token ? <AdminHome /> : <Navigate to="/login" />}
          />

          {token ? (
            <>
              <Route path="/signup" element={<Signup />} />
              <Route path="/adminhome" element={<AdminHome />} />
              <Route path="/admin/product" element={<AdminProduct />} />
              <Route path="/admin/product/create" element={<CreateProduct />} />
              <Route path="/editproduct/:_id" element={<UpdateProduct />} />
              <Route path="/admin/category" element={<Category />} />
              <Route
                path="/admin/category/create"
                element={<CreateCtegory />}
              />
              <Route path="/editcategory/:_id" element={<UpdateCategory />} />
              <Route path="/admin/subcategory" element={<Subcategory />} />
              <Route
                path="/admin/subcategory/create"
                element={<CreateSubcategory />}
              />
              <Route path="/admin/banner" element={<Banner />} />
              <Route path="/admin/banner/create" element={<CreateBanner />} />
              <Route path="/admin/banner/edit/:id" element={<EditBanner />} />
              <Route
                path="/editsubcategory/:_id"
                element={<UpdateSubcategory />}
              />
              <Route path="/admin/size" element={<Size />} />
              <Route path="/admin/size/create" element={<CreateSize />} />
              <Route path="/editsize/:_id" element={<UpdateSize />} />
              <Route path="/admin/createName" element={<CreateName />} />
              <Route path="/admin/order" element={<AdminOrder />} />
              <Route
                path="/adminordersinglpage/:_id"
                element={<AdminSinglePageOrder />}
              />
              <Route path="/admin/contact" element={<Admincontact />} />
              <Route
                path="/admin/NamesOfProduct"
                element={<AllProductNames />}
              />
            </>
          ) : null}

          <Route path="/invoice" element={<Invoice />} />
          <Route
            path="/login"
            element={!token ? <Login /> : <Navigate to="/" />}
          />

          <Route path="/*" element={<PageNotFound />} />
        </Routes>
        {/* <Footer /> */}
        <Toaster />
      </BrowserRouter>
    </>
  );
}

export default App;
