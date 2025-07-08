import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    name: "",
    userName: "",
    email: "",
    phone: "",
    password: ""
  });

  const getInputData = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const postData = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      let res = await axios.post("http://localhost:9000/api/user", data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(res.data.status);
      if (res.data.status === 440) {
        toast.error("Failed to signup");
      } else if (res.status === 200) {
        toast.success("SignUp successfully");
        navigate("/adminhome");
      } else {
        toast.error("Failed to signup");
      }
    } catch (error) {
      console.log(error.response.data.mess);
      toast.error(error.response.data.mess || "Failed to Sign Up");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="blue_bg mt-5 ">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="titlepage">
                <h2 className='text-center'>Create An Account</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6 ">
            <form onSubmit={postData}>
              <div className="">
                <div className='col'>
                  <label htmlFor="">Company Name <span className='text-danger'>*</span></label>
                  <input type="text" className="form-control" name='name' onChange={getInputData} required placeholder="Name" />
                </div>
                <div className='col'>
                  <label htmlFor=""> User Name <span className='text-danger'>*</span></label>
                  <input type="text" className="form-control" name='userName' onChange={getInputData} required placeholder="User Name" />
                </div>
                <div className='col'>
                  <label htmlFor=""> Email <span className='text-danger'>*</span></label>
                  <input type="email" className="form-control" name='email' onChange={getInputData} required placeholder="Email address" />
                </div>
              </div>
              <div className="">
                <div className='col'>
                  <label htmlFor=""> Phone <span className='text-danger'>*</span></label>
                  <input type="text" className="form-control" name='phone' onChange={getInputData} required placeholder="Phone" />
                </div>
                <div className='col'>
                  <label htmlFor=""> Password <span className='text-danger'>*</span></label>
                  <input type="password" className="form-control" name='password' onChange={getInputData} required placeholder="Password" />
                </div>
              </div>
              <div>
                <button className='btn mt-2 mb-3 text-light text-center w-100' style={{ backgroundColor: "#183661" }} disabled={loading}>
                  {loading ? "Signing up..." : "Sign up"}
                </button>
              </div>
            </form>
          </div>
          <div className="col-md-3"></div>
        </div>
      </div>
    </>
  );
}

export default Signup;
