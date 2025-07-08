import React, { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import toast from 'react-hot-toast';
import jsPDF from 'jspdf';

const SinglePageProduct = () => {
    const { _id } = useParams();
    const [product, setProduct] = useState([]);
    const [allCategory, setAllCategory] = useState([]);
    const [allSubcategory, setAllSubcategory] = useState([]);
    const [cate, setCate] = useState();
    const [subcate, setSubcate] = useState();
    const [quantities, setQuantities] = useState(JSON.parse(localStorage.getItem('quantities')) || {});
    const [selectedImages, setSelectedImages] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [filterByName, setFilterByName] = useState('')

    const getApiDataCategory = async () => {
        try {
            let res = await axios.get("http://localhost:9000/api/category");
            setAllCategory(res.data.data);
          
        } catch (error) {
            console.log(error);
        }
    };

    const [selectedMainCategory, setSelectedMainCategory] = useState("");
    const [selectedSubCategory, setSelectedSubCategory] = useState("");

    const getApiDataSubCategory = async () => {
        try {
            let res = await axios.get("http://localhost:9000/api/subcategory");
            setAllSubcategory(res.data.data);
            console.log(res.data.data)
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getApiDataCategory();
        getApiDataSubCategory();
    }, []);

    useEffect(() => {
        getAPIData();
    }, []);

    useEffect(() => {
        localStorage.setItem('quantities', JSON.stringify(quantities));
    }, [quantities]);

    const handleChangeQuantity = (productId, quantity) => {
        setQuantities(prevQuantities => ({
            ...prevQuantities,
            [productId]: quantity
        }));
    };

    const getAPIData = async () => {
        try {
            let res = await axios.get("http://localhost:9000/api/product");
            setProduct(res.data.data);
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    };
    const [AllName, setAllProductNames] = useState([])
    const getAllProductNames = async () => {
        try {
            const response = await axios.get('http://localhost:9000/productNames/v1/getAllNames');
            setAllProductNames(response.data.data);
            // console.log(response.data.data)
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getAllProductNames()
    }, [])
    const filterProductNames = () => {
        // Check if allProductNames is an array before filtering


        const pro = AllName.filter(product => product.maincategory === cate && product.subcategory === subcate);
        return pro
    };

    const [NamesProduct, setNameProduct] = useState('')
    const handlleNames = (e) => {
        setNameProduct(e.target.value);
    };
    const handlleCategory = (e) => {
        console.log("i am change",e.target.value)
        setCate(e.target.value);
    };

    const handlleSubCategory = (e) => {
        setSubcate(e.target.value);
    };
    const handleImageClick = (images) => {
        setSelectedImages(images);
        console.log(images)
        setShowModal(true);
    };
    const userid = sessionStorage.getItem("userid");

    const addtoCart = async (productId, name, image, quantity, sizename, color, stock, maincategory, subcategory) => {
        // Create an object for the product
        const productData = {
            productId: productId,
            name: name,
            image: image,
            quantity: quantity,
            sizename: sizename,
            color: color,
            stock: stock,
            maincategory: maincategory,
            subcategory: subcategory
        };

        // Retrieve the existing cart items from sessionStorage
        let cartItems = JSON.parse(sessionStorage.getItem('cartItems')) || [];

        // Check if the product is already in the cart
        const existingProductIndex = cartItems.findIndex(item => item.productId === productId);

        if (existingProductIndex !== -1) {
            // If the product is already in the cart, update its quantity
            cartItems[existingProductIndex].quantity += quantity;
        } else {
            // If the product is not in the cart, add it to the cart items
            cartItems.push(productData);
            toast.success(`Product added to cart`);
        }
        // Save the updated cart items back to sessionStorage
        sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
        localStorage.removeItem('quantities', JSON.stringify(quantities));
        // Optional: You can display a message or perform any other action after adding the product to the cart
    };
    const downloadImagesToPDF = () => {
        const doc = new jsPDF();

        let imageIndex = 0;
        let rowIndex = 0;
        let colIndex = 0;

        product.forEach((item, index) => {
            if (item.stock > 0) {
                // Add image to the PDF
                const x = 10 + colIndex * 80; // Adjust X position based on column index
                const y = 20 + rowIndex * 100; // Adjust Y position based on row index
                doc.addImage(item.pic1, 'JPEG', x, y, 60, 60); // Adjust position and size as needed
                doc.text(x, y + 70, `${item.name}`); // Add product name
                doc.text(x, y + 80, `Stock: ${item.stock}`); // Add stock below the name
                colIndex++;

                if (colIndex === 2) {
                    colIndex = 0;
                    rowIndex++;
                }

                if (rowIndex === 2) {
                    rowIndex = 0;
                    doc.addPage(); // Add a new page for the next set of images
                }
            }
        });

        // Save the PDF
        doc.save('Product-Images.pdf');
    };
    const [pros,setpros] = useState([])
    const filterSubcategories = () => {
        console.log(cate)
        const pro =  allSubcategory.filter(subcategory => subcategory.maincategory === cate);
        console.log(pro)
        setpros(pro)
    };
 useEffect(()=>{
    filterSubcategories()
 },[cate])
    return (
        <>
            <div className="blue_bg mt-5">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="titlepage">
                                <h2 className='text-center mb-5'>Product Details</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-md-2">
                        <div>
                            <ul className="list-group">
                                <Link to='/singlepage'><li className="list-group-item mb-2">Product <span className='fa fa-list float-end'></span></li></Link>
                                <Link to='/orders'><li className="list-group-item">Orders <span className='fa fa-users float-end'></span></li></Link>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-10 col-12">
                        <div className='row'>
                            <div className='col-3'>
                                <div className="mb-3">
                                    <label htmlFor="category" className="form-label">Category:</label>
                                    <select name="category"onChange={handlleCategory}className='form-control'>
                                        <option selected disabled>Choose Category</option>
                                        {allCategory.map((item, index) => (
                                            <option key={index} value={item.maincategory}>{item.maincategory}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className='col-3'>
                                <div className="mb-3">
                                    <label htmlFor="productName" className="form-label">Sub Category :</label>

                                    <select name="subcategory" onChange={handlleSubCategory} className='form-control'>
                                        <option selected disabled>Choose SubCategory</option>
                                        {pros && pros.map((item, index) => (
                                            <option key={index} value={item.subcategory}>
                                                <p>{console.log("lops",item.subcategory)}</p>
                                                {item.subcategory}</option>
                                        ))}

                                    </select>
                                </div>
                            </div>
                            <div className='col-3'>
                                <div className="mb-3">
                                    <label htmlFor="category" className="form-label">Product Names:</label>
                                    <select name="category" onChange={handlleNames} className='form-control'>
                                        <option value="">All Products</option>
                                        {filterProductNames().map((item, index) => (
                                            <option key={index} value={item.ProductName}>{item.ProductName}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className='col-3'>
                                <label htmlFor="productName" className="invisible ">Sub Category :</label>

                                <div className="text-center mt-2">
                                    <button className="btn btn-primary" onClick={downloadImagesToPDF}> Download Available </button>
                                </div>
                            </div>
                        </div>



                        <div className="table-responsive d-none d-md-block">
                            <table className='table table-bordered'>
                                <thead>
                                    <tr>
                                        <th>Image</th>
                                        <th>Name</th>
                                        <th>Category</th>
                                        <th>SubCategory</th>
                                        <th>Brand</th>
                                        <th>color</th>
                                        <th>Size</th>
                                        <th>Stock</th>
                                        <th>QTY</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {product.filter(item => cate ? item.maincategory === cate : true).filter(item => subcate ? item.subcategory === subcate : true).filter((item => NamesProduct ? item.name == NamesProduct : true)).map((item, index) =>
                                        <tr key={index}>
                                            <td><img src={item.pic1} onClick={() => handleImageClick([item.pic1, item.pic2])} alt="" style={{ height: 50, cursor: 'pointer' }} /></td>
                                            <td><h6>{item.name}</h6></td>
                                            <td><h6>{item.maincategory}</h6></td>
                                            <td><h6>{item.subcategory}</h6></td>
                                            <td><h6>{item.brand}</h6></td>
                                            <td><h6>{item.color}</h6></td>
                                            <td><h6>{item.sizename}</h6></td>
                                            <td><h6>{item.stock}</h6></td>
                                            <td>
                                                <input type="text" min='0' style={{ width: 50 }} value={quantities[item._id] || 0} onChange={(e) => handleChangeQuantity(item._id, parseInt(e.target.value))} />
                                            </td>
                                            <td className=''><button style={{ width: "100%" }} onClick={() => addtoCart(item._id, item.name, item.pic1, quantities[item._id], item.sizename, item.color, item.stock, item.maincategory, item.subcategory)} className='btn btn-success'>add</button></td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <div className="d-md-none">
                            {product.filter(item => cate ? item.maincategory === cate : true).filter(item => subcate ? item.subcategory === subcate : true).map((item, index) => (
                                <div key={index} className="card mb-3">
                                    <img src={item.pic1} onClick={() => handleImageClick([item.pic1, item.pic2])} alt="" style={{ cursor: 'pointer' }} />
                                    <div className="card-body">
                                        <h5 className="card-title">{item.name}</h5>

                                        <div className="col-12 d-flex mb-2 justify-content-around align-items-start">
                                            <div className='col-6'>   <p className="card-text fw-bolder">Brand: {item.brand}</p></div>
                                            <div className='col-6'>    <p className="card-text fw-bolder">Color: {item.color}</p></div>
                                        </div>
                                        <div className="col-12 mb-2 d-flex justify-content-around align-items-start">

                                            <div className='col-6'> <p className="card-text fw-bolder">Size: {item.sizename}</p></div>
                                            <div className='col-6'><p className="card-text fw-bolder">Stock: {item.stock}</p></div>

                                        </div>
                                        <div className="input-group mb-3">
                                            <input type="number" className="form-control" min="0" value={quantities[item._id] || 0} onChange={(e) => handleChangeQuantity(item._id, parseInt(e.target.value))} />
                                            <button className="btn btn-success" type="button" onClick={() => addtoCart(item._id, item.name, item.pic1, quantities[item._id], item.sizename, item.color, item.stock, item.maincategory, item.subcategory)}>Add</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            {/* Bootstrap Modal */}
            <div className="modal  wow fadeInUp" tabIndex="-1" role="dialog" style={{ display: showModal ? 'block' : 'none' }}>
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Product Images</h5>
                            <button type="button" className="close" onClick={() => setShowModal(false)}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
                                <div className="carousel-inner">
                                    {selectedImages.map((image, index) => (
                                        <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                                            <img src={image} onError={(e) => e.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSy7KFpZbV92Ml1NDn5H3E9-Z-rI-GWwfObDXP_ji9OHA&s"} className="d-block w-100" alt={`Slide ${index}`} />
                                        </div>
                                    ))}
                                </div>
                                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Previous</span>
                                </button>
                                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Next</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default SinglePageProduct;
