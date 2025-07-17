'use client'
import { useParams } from "next/navigation";

const ShopBySubCategory =  () => {
  const { id } = useParams();
  const sortedProducts = [];
  console.log("id", id);

  return (
    <div className="max-w-[1360px] mx-auto p-4">
      <div className="relative w-full h-80 mb-6">
        <img
          src="/products/slide-3.png"
          alt="Sneakers Collection"
          className="w-full h-full object-cover rounded-lg"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center rounded-lg text-center px-6">
          <h1 className="text-white text-5xl md:text-6xl font-extrabold uppercase drop-shadow-md">
            Sneakers Collection
          </h1>
          {/* Offer Box */}
          <div className="mt-4 bg-white/90 px-4 py-2 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-orange-500">FLAT 50% OFF</h2>
            <p className="text-lg mt-1 text-black">
              Hurry! Offer ends in
              <span className="text-red-500">
                {" "}
                {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
              </span>
            </p>
            <Link href="/shop">
              <button className="mt-2 px-4 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition">
                Shop Now
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <p className="text-gray-600 text-lg">
          Showing 1-{sortedProducts.length} out of{" "}
          {mensCategory?.products.length || 0} products
        </p>
        <div className="flex items-center">
          <span className="mr-2 text-gray-600 text-lg">Sort by:</span>
          <select
            className="border rounded-md px-3 py-1 text-gray-700"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="default">Default</option>
            <option value="priceLowHigh">Price: Low to High</option>
            <option value="priceHighLow">Price: High to Low</option>
            <option value="latest">Latest</option>
          </select>
        </div>
      </div>

      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
          {sortedProducts.map((product) => (
            <Link key={product.id} href={`/shop/product/${product.id}`}>
              <div className="border p-4 rounded-md shadow-md cursor-pointer hover:shadow-lg transition-all">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-60 object-cover rounded-md"
                />
                <h2 className="text-lg font-bold mt-2">{product.name}</h2>
                <p className="text-gray-500">₹{product.price}</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 text-lg">Loading products...</p>
      )}

      <div className="flex justify-center mt-8">
        <Link href="/shop">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-blue-700 transition-all">
            View All Products
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ShopBySubCategory;
