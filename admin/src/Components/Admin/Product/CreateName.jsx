import React, { useEffect, useState } from 'react';
import Sidebar from '../Sidebar';
import axios from 'axios';

const CreateName = () => {
    const [allCategory, setAllCategory] = useState([]);
    const [allSubcategory, setAllSubcategory] = useState([]);
    const [selectedMainCategory, setSelectedMainCategory] = useState("");
    const [data, setData] = useState({
        ProductName: "", // Add ProductName field to data state
        subcategory: "",
        maincategory: ""
    });

    const getApiDataCategory = async () => {
        try {
            let res = await axios.get("http://localhost:9000/api/category");
            setAllCategory(res.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    const getInputFile = (e) => {
        const { name, files } = e.target;
        setData({ ...data, [name]: files[0] });
    };

    const getInputData = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const getApiDataSubCategory = async () => {
        try {
            let res = await axios.get("http://localhost:9000/api/subcategory");
            setAllSubcategory(res.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    const filterSubcategories = () => {
        return allSubcategory.filter(subcategory => subcategory.maincategory === selectedMainCategory);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:9000/productNames/v1/createNames", data);
            console.log("Product name created successfully");
            // Reset form data after successful submission
            setData({
                ProductName: "",
                subcategory: "",
                maincategory: ""
            });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getApiDataCategory();
        getApiDataSubCategory();
    }, []);

    return (
        <>
            <div className="blue_bg mt-5">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="titlepage">
                                <h2 className='text-center mb-5'>Add A New Name</h2>
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
                                <label htmlFor="">Product Category <span className='text-danger'>*</span></label>
                                <select name="maincategory" onChange={(e) => { getInputData(e); setSelectedMainCategory(e.target.value); }} className='form-control'>
                                    <option selected disabled>Choose Category</option>
                                    {allCategory.map((item, index) => (
                                        <option key={index} value={item.maincategory}>{item.maincategory}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="">Product Sub Category <span className='text-danger'>*</span></label>
                                <select name="subcategory" onChange={getInputData} className='form-control'>
                                    <option selected disabled>Choose Sub Category</option>
                                    {filterSubcategories().map((item, index) => (
                                        <option key={index} value={item.subcategory}>{item.subcategory}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor=""> Enter Product Name <span className='text-danger'>*</span></label>
                                <input type="text" name="ProductName" value={data.ProductName} onChange={getInputData} className='form-control' />
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CreateName;
