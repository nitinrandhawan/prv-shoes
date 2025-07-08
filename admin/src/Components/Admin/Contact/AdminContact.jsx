import React, { useEffect, useState } from 'react';
import Sidebar from '../Sidebar';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const Admincontact = () => {
  const [data, setData] = useState([]);

  const getApiData = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get("http://localhost:9000/api/contact", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteContact = async (_id) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.delete("http://localhost:9000/api/contact/" + _id, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (res.status === 200) {
        toast.success("Contact Details Deleted successfully");
        getApiData(); // Refresh data after successful deletion
      } else {
        toast.error("Failed to Delete Contact");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getApiData();
  }, []);

  return (
    <>
      <div className="blue_bg mt-5">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="titlepage">
                <h2 className='text-center'>Contact Us Table</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3" style={{ marginTop: 35 }}>
            <Sidebar />
          </div>
          <div className="col-md-9">
            <div className="table-responsive">
              <table className='table table-bordered'>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Phone Number</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th>Message</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <tr key={index}>
                      <td>{item.name}</td>
                      <td>{item.phone}</td>
                      <td>{item.email}</td>
                      <td>{item.address}</td>
                      <td>{item.message}</td>
                      <td>
                        <button className='btn btn-danger' onClick={() => deleteContact(item._id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Admincontact;
