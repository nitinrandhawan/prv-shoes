import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

const Contact = () => {
   const [data, setData] = useState({
      name: "",
      email: "",
      address: "",
      phone: "",
      message: ""
   })

   const getinputData = (e) => {
      const { name, value } = e.target
      setData({ ...data, [name]: value })
   }
   // console.log(data);
   const postData = async (e) => {
      e.preventDefault()
     try {
      let res = await axios.post("http://localhost:9000/api/contact" ,data)
      if (res.status === 200) {
         toast.success("Our team soon Contact You");
         window.location.reload()
      }
     } catch (error) {
      console.log(error);
     }
   }
   return (
      <>
         {/* <!-- banner --> */}
         <div className="blue_bg">
            <div className="container">
               <div className="row">
                  <div className="col-md-12">
                     <div className="titlepage">
                        <h2 className='text-center mt-5'>Contact Us For any Query</h2>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         {/* <!-- contact section --> */}
         {/* <div id="contact"> */}
         <div >
            <div className="container">
               <div className="row mt-5">
                  {/* <div className="col-12"> */}
                  {/* <div className="row gy-4"> */}
                  <div className="col-md-4">
                     <div className="bg-light d-flex flex-column justify-content-center p-4">
                        <h5 className="text-uppercase">// Address //</h5>
                        <p className="m-0"><i className="fa fa-home text-primary me-2"></i>B - 314, Mangolpuri, industrial area, phase 1, New Delhi - 110083</p>
                     </div>
                  </div>
                  <div className="col-md-4">
                     <div className="bg-light d-flex flex-column justify-content-center p-4">
                        <h5 className="text-uppercase">// Email //</h5>
                        <p className="m-0"><i className="fa fa-envelope-open text-primary me-2"></i><a href="mailto:parav0087@gmail.com" className='text-dark'>parav0087@gmail.com</a></p>
                     </div>
                  </div>
                  <div className="col-md-4">
                     <div className="bg-light d-flex flex-column justify-content-center p-4">
                        <h5 className="text-uppercase">// Phone //</h5>
                        <p className="m-0"><i className="fa fa-phone text-primary me-2"></i><a href="tel:+9321227881" className='text-dark'>+91-9321227881</a></p>
                     </div>
                  </div>
                  {/* </div> */}
                  {/* </div> */}
               </div>
               <div className="row mt-5">


                  <div className="col-md-6">
                     <div className="mapouter"><div className="gmap_canvas"><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3500.0828253292643!2d77.0833802!3d28.6871689!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d05900427d3e3%3A0xea667c4fa565c154!2sPRVLITE!5e0!3m2!1sen!2sin!4v1726131078963!5m2!1sen!2sin" style={{height:500 ,width:"100%"}}></iframe></div></div>
                  </div>
                  <div className="col-md-6 ">
                     <form onSubmit={postData} className="">
                        <div className="row">
                           <div className='mb-3'>
                              <input className="form-control" placeholder="Name" type="text" onChange={getinputData} name="name" required />
                           </div>
                           <div className="mb-3">
                              <input className="form-control" placeholder="Phone Number" type="text" onChange={getinputData} name="phone" required />
                           </div>
                           <div className="mb-3">
                              <input className="form-control" placeholder="Email" type="text" onChange={getinputData} name="email" required />
                           </div>
                           <div className="mb-3">
                              <input className="form-control" placeholder="Address" type="text" onChange={getinputData} name="address" required />
                           </div>
                           <div className="mb-3">
                              <input className="form-control" placeholder="Message" type="text" onChange={getinputData} name="message" required />
                           </div>
                           <div className="col-md-12">
                              <button className="btn btn-dark w-100">Send</button>
                           </div>
                        </div>
                     </form>
                  </div>
               </div>
               {/* </div> */}
            </div>
         </div>
         {/* </div> */}
         {/* <!-- end contact section --> */}
      </>
   )
}

export default Contact