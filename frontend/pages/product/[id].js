"use client";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axiosInstance from "@/utils/axiosInstance";
import Image from "next/image";
import OrderEnquiryForm from "@/components/OrderEnquiryForm";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProductDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [mainImage, setMainImage] = useState(null);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(`/api/product/get-single-product/${id}`);
      const data = res.data?.data;
      setProduct(data || null);
      setMainImage(data?.pic1 || null);
      setNotFound(!data);
    } catch (error) {
      console.error("Failed to fetch product:", error);
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!router.isReady || !id) return;
    fetchProduct();
  }, [router.isReady, id]);

  if (notFound) {
    return (
      <h1 className="text-center text-2xl text-red-500 mt-10">
        ⚠️ Product Not Found!
      </h1>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Breadcrumb */}
      <p className="text-lg font-bold font-serif text-gray-700 mb-4">
        <span
          className="text-blue-600 cursor-pointer hover:underline"
          onClick={() => router.push("/")}
        >
          Home
        </span>
        <span className="mx-2 text-gray-600">{">"}</span>
        <span className="text-gray-900">
          {loading ? <Skeleton width={150} /> : product?.name}
        </span>
      </p>

      {/* Layout */}
      <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col md:flex-row gap-6">
        {/* Image Section */}
        <div className="md:w-1/2">
          {loading ? (
            <Skeleton height={400} />
          ) : (
            <>
              <Image
                src={mainImage}
                alt={product.name}
                width={500}
                height={500}
                className="w-full h-auto object-cover rounded-md"
              />

              {/* Thumbnail Images */}
              <div className="flex gap-3 mt-4">
                {[product.pic1, product.pic2, product.pic3, product.pic4].map(
                  (pic, idx) =>
                    pic && (
                      <div
                        key={idx}
                        className="w-24 h-24 rounded overflow-hidden border cursor-pointer"
                        onClick={() => setMainImage(pic)}
                      >
                        <Image
                          src={pic}
                          alt={`Product view ${idx + 1}`}
                          width={100}
                          height={100}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )
                )}
              </div>
            </>
          )}
        </div>

        {/* Details Section */}
        <div className="md:w-1/2 flex flex-col">
  <h1 className="text-3xl font-semibold">
    {loading ? <Skeleton width={250} /> : product.name}
  </h1>

  <p className="text-gray-600 mt-2">
    {loading ? <Skeleton count={3} /> : product.description}
  </p>

  <div className="flex items-center mt-3 space-x-4">
    <p className="text-2xl font-bold text-green-600">
      {loading ? <Skeleton width={80} /> : `₹${product.finalPrice || product.price}`}
    </p>
    {!loading && product.discount > 0 && (
      <p className="text-md text-gray-500 line-through">
        ₹{product.price}
      </p>
    )}
  </div>

  <div className="mt-4">
    {loading ? (
      <Skeleton height={40} width={160} />
    ) : (
      <button
        className="mt-2 px-5 py-2 bg-gray-800 text-white font-semibold rounded-md hover:bg-gray-900"
        onClick={() => setShowForm(true)}
      >
        Request Order
      </button>
    )}
  </div>
</div>

      </div>

      {/* Enquiry Form */}
      {!loading && showForm && <OrderEnquiryForm onClose={() => setShowForm(false)} />}
    </div>
  );
};

export default ProductDetail;
