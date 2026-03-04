
"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { GrCart } from "react-icons/gr";
import { client } from "@/sanity/lib/client";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import Toast from "@/components/Toast";

// Product type
type Product = {
  _id: string;
  title: string;
  price: string;
  priceWithoutDiscount: string;
  category: { _id: string; title: string } | null;
  tags: string[];
  badge: string | null;
  imageUrl: string;
  description: string;
  inventory: number;
};

const ProductPage = () => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState({ show: false, message: "" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const query = `*[_type == "products"][0...4] {
          _id,
          title,
          price,
          priceWithoutDiscount,
          category -> { _id, title },
          tags,
          badge,
          "imageUrl": image.asset->url,
          description,
          inventory
        }`;
        const result = await client.fetch(query);
        setProducts(result);
      } catch (error) {
        setError("Error fetching products");
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddToCart = (product: Product) => {
    addToCart({
      _id: product._id,
      title: product.title,
      price: product.price,
      imageUrl: product.imageUrl,
      description: product.description,
    });
    setToast({ show: true, message: `${product.title} added to cart!` });
  };

  return (
    <div>
      {/* Product Listing Section */}
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          {loading ? (
            <p className="text-center text-gray-500">Loading products...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : products.length === 0 ? (
            <p className="text-center text-gray-500">No products available at the moment.</p>
          ) : (
            <div className="flex flex-wrap -m-4">
              {products.map((product, index) => (
                <div key={`${product._id}-${index}`} className="p-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
                  <div className="relative block h-[337px] rounded overflow-hidden group cursor-pointer">
                    <Link href={`/product/${product._id}`} passHref>
                      {product.imageUrl && (
                        <Image
                          alt={product.title}
                          className="object-cover object-center w-full h-full transition-transform duration-300 group-hover:scale-105"
                          src={product.imageUrl}
                          width={312}
                          height={312}
                        />
                      )}
                    </Link>
                    {product.badge && (
                      <div
                        className={`absolute top-2 right-2 px-2 py-1 rounded text-white text-xs font-semibold ${
                          product.badge === "Sale"
                            ? "bg-red-500"
                            : product.badge === "New"
                            ? "bg-blue-500"
                            : "bg-green-500"
                        }`}
                      >
                        {product.badge}
                      </div>
                    )}
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <h2 className="text-gray-900 title-font text-lg font-medium">{product.title}</h2>
                      <p className="mt-1">${Number(product.price).toFixed(2)}</p>
                    </div>
                    <button
                      className="p-2 rounded-md shadow-md cursor-pointer bg-blue-500 text-white hover:bg-blue-600"
                      onClick={() => handleAddToCart(product)}
                      aria-label={`Add ${product.title} to cart`}
                    >
                      <GrCart className="text-2xl" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Toast Notification */}
      <Toast
        message={toast.message}
        isVisible={toast.show}
        onClose={() => setToast({ ...toast, show: false })}
        type="success"
      />
    </div>
  );
};

export default ProductPage;
