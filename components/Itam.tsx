
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { GrCart } from "react-icons/gr";
import { client } from "@/sanity/lib/client";
import { useCart } from "@/context/CartContext";
import Toast from "@/components/Toast";

type Product = {
  _id: string;
  title: string;
  price: string;
  priceWithoutDiscount: string;
  category: { _id: string; title: string };
  tags: string[];
  badge: string | null;
  imageUrl: string;
  description: string;
  inventory: number;
  coloredIcon: boolean;
  newLabel: boolean;
  salesLabel: boolean;
};

const ProductPage = () => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState({ show: false, message: "" });
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const query = `*[_type == "products"] {
          _id,
          title,
          price,
          priceWithoutDiscount,
          category -> {
            _id,
            title
          },
          tags,
          badge,
          "imageUrl": image.asset->url,
          description,
          inventory,
          coloredIcon,
          newLabel,
          salesLabel
        }`;

        const result = await client.fetch(query);
        setProducts(result);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Error fetching products");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleProductClick = (slug: string) => {
    router.push(`/product/${slug}`);
  };

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
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
      <section className="text-gray-600 body-font">
        <h1 className="text-[32px] font-bold text-black mb-10 text-center">
          Our Products
        </h1>
        <div className="container px-5 py-24 mx-auto">
          {loading ? (
            <div className="text-center text-gray-500">
              <div className="loader">Loading...</div>
            </div>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : (
            <div className="flex flex-wrap -m-4">
              {products.length === 0 ? (
                <p className="text-center text-gray-500">
                  No products available at the moment.
                </p>
              ) : (
                products.map((product) => (
                  <div
                    key={product._id}
                    className="p-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
                    onClick={() => handleProductClick(product._id)} // Navigate to details page
                  >
                    <div className="relative block h-[337px] rounded overflow-hidden group cursor-pointer">
                      {product.imageUrl ? (
                        <Image
                          alt={product.title || "Product Image"}
                          className="object-cover object-center w-full h-full transition-transform duration-300 group-hover:scale-105"
                          src={product.imageUrl}
                          width={312}
                          height={312}
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-300" />
                      )}

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
                        <h2 className="text-gray-900 title-font text-lg font-medium">
                          {product.title || "Untitled Product"}
                        </h2>
                        <p className="mt-1">
                          ${Number(product.price).toFixed(2) || "N/A"}
                        </p>
                      </div>
                      <div
                        className={`p-2 rounded-md shadow-md cursor-pointer transition ${
                          product.coloredIcon
                            ? "bg-blue-500 text-white hover:bg-blue-600"
                            : "bg-slate-300 hover:bg-blue-100"
                        }`}
                        onClick={(e) => handleAddToCart(e, product)}
                      >
                        <GrCart className="text-2xl" />
                      </div>
                    </div>
                  </div>
                ))
              )}
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
