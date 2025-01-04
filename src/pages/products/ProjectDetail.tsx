import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../../utils/type";
import { Star } from "lucide-react";
import axios from "axios";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    axios
      .get(`https://dummyjson.com/products/${id}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
      });
  }, [id]);

  return (
    <>
      {product && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:flex-shrink-0">
                <img
                  className="h-96 w-full object-cover md:w-96"
                  src={product.thumbnail}
                  alt={product.title}
                />
              </div>
              <div className="p-8">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {product.title}
                  </h2>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                    {product.category}
                  </span>
                </div>
                <p className="mt-2 text-gray-500">{product.brand}</p>
                <p className="mt-4 text-gray-600">{product.description}</p>
                <div className="mt-6 flex items-center justify-between">
                  <span className="text-3xl font-bold text-gray-900">
                    ${product.price}
                  </span>
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <span className="ml-2 text-gray-600">
                      {product.rating} rating
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetail;
