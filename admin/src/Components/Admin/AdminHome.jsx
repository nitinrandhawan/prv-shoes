import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';

const AdminHome = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          {/* Sidebar */}
          <div className="col-md-3 bg-light min-vh-100 p-3 shadow-sm">
            <Sidebar />
          </div>

          {/* Main Content */}
          <div className="col-md-9 d-flex flex-column justify-content-center align-items-start p-5">
            <div className="bg-white p-4 rounded shadow-sm w-100">
              <h1 className="display-5 fw-bold  text-center">Welcome Back, Admin! 👋</h1>
              <p className="mt-3 fs-5 text-secondary text-center">
                Manage your store efficiently using the admin dashboard. Navigate through the sidebar to update products, check orders, handle users, and more.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminHome;
