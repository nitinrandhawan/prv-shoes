import Link from "next/link";
import { useEffect, useState } from "react";
import categories from "@/data/categories";

const WomensClothing = () => {
    // Fetch women's clothing category
    const womensCategory = categories.find(cat => cat.name === "womens-shoes");

    if (!womensCategory || !womensCategory.products) {
        return <p className="text-center text-red-500">No products found for this category.</p>;
    }

    // Timer State
    const [timeLeft, setTimeLeft] = useState({ hours: 12, minutes: 30 });
    const [sortOption, setSortOption] = useState("default");
    const [filteredProducts, setFilteredProducts] = useState(womensCategory.products);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                let { hours, minutes, second } = prev;
    
                if (second > 0) {
                    second--;
                } else if (minutes > 0) {
                    minutes--;
                    second = 59;
                } else if (hours > 0) {
                    hours--;
                    minutes = 59;
                    second = 59;
                }
    
                return { hours, minutes, second };
            });
        }, 1000); // Run every 1 second
    
        return () => clearInterval(timer);
    }, []);
    

    // Sorting Function
    useEffect(() => {
        let sortedProducts = [...womensCategory.products];

        if (sortOption === "price-low") {
            sortedProducts.sort((a, b) => a.price - b.price);
        } else if (sortOption === "price-high") {
            sortedProducts.sort((a, b) => b.price - a.price);
        } else if (sortOption === "newest") {
            sortedProducts.sort((a, b) => b.id - a.id);
        }

        setFilteredProducts(sortedProducts);
    }, [sortOption, womensCategory.products]);

    return (
        <div className="max-w-[1360px] mx-auto p-4">
            {/* 🏷️ Banner Section with Offer */}
            <div className="relative w-full h-80 mb-6">
                <img 
                    src="/products/slide-2.png" 
                    alt="Sneakers Collection" 
                    className="w-full h-full object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center rounded-lg text-center px-6">
                    <h1 className="text-white text-5xl md:text-6xl font-extrabold uppercase drop-shadow-md">Womens shoes Collection</h1>
                    {/* Offer Box */}
<div className="mt-4 bg-white/90 px-4 py-2 rounded-lg shadow-md">
    <h2 className="text-2xl font-bold text-orange-500">FLAT 50% OFF</h2>
    <p className="text-lg mt-1 text-black">
        Hurry! Offer ends in 
        <span className="text-red-500">
            {" "}{timeLeft.hours}h {timeLeft.minutes}m {timeLeft.second}s
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

            {/* Sorting and Product Count */}
            <div className="flex justify-between items-center mb-4">
                <p className="text-gray-600">Showing {filteredProducts.length} products</p>
                <div className="flex items-center space-x-2">
                    <span className="text-gray-700">Sort by:</span>
                    <select 
                        className="border px-3 py-1 rounded-md"
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value)}
                    >
                        <option value="default">Default</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                        <option value="newest">Newest</option>
                    </select>
                </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
                {filteredProducts.map((product) => (
                    <Link key={product.id} href={`/shop/product/${product.id}`} legacyBehavior>
                        <a className="border p-4 rounded-md shadow-md cursor-pointer hover:shadow-lg block">
                            <img 
                                src={product.image} 
                                alt={product.name} 
                                className="w-full h-60 object-cover rounded-md"
                            />
                            <h2 className="text-lg font-bold mt-2">{product.name}</h2>
                            <p className="text-gray-500">₹{product.price}</p>
                        </a>
                    </Link>
                ))}
                {/* View All Button */}
<div className="flex justify-center mt-8">
    <Link href="/shop">
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-blue-700 transition-all">
            View All Products
        </button>
    </Link>
</div>
            </div>
        </div>
    );
};

export default WomensClothing;
