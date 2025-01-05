import { useEffect, useState } from "react";
import { useParams,Link } from "react-router-dom";
import { Product } from "../../utils/type";
import { Star,ArrowLeft } from "lucide-react";
import axios from "axios";
import Loader from "../../components/common/Loader";
const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`https://dummyjson.com/products/${id}`)
      .then((response) => {
        setProduct(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
        setIsLoading(false);
      });
  }, [id]);

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center min-h-screen">
          <Loader />
        </div>
      ) : (
        product && (
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Link to="/">
            <button className="w-60 mb-12 flex items-center py-2 px-6 bg-gradient-to-r from-violet-500 via-indigo-500 to-purple-500 hover:from-violet-600 hover:via-indigo-600 hover:to-purple-600 rounded-xl text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:translate-y-[-2px] active:translate-y-[1px]s">
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Products
              </button>
            </Link>
              
            <div className="group relative rounded-lg overflow-hidden shadow-glow bg-gradient-primary transition-transform transform hover:scale-[1.05]">
              <div className="md:flex">
                <div className="md:w-[40%] flex justify-center">
                  <img
                    className="h-96 w-full object-cover md:w-96"
                    src={product.thumbnail}
                    alt={product.title}
                  />
                </div>
                <div className="md:w-[60%] p-8 md:p-12">
                  <div className="flex flex-col gap-y-2 sm:gap-y-0 sm:flex-row items-center justify-between">
                    <h2 className="text-2xl font-bold text-violet-500">
                      {product.title}
                    </h2>
                    <span className="inline-flex items-center px-6 py-2 bg-gradient-to-r from-violet-500 via-indigo-500 to-purple-500 hover:from-violet-600 hover:via-indigo-600 hover:to-purple-600 rounded-xl text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:translate-y-[-2px] active:translate-y-[1px]">
                      {product.category}
                    </span>
                  </div>
                  <p className="mt-2 text-blue-500">{product.brand}</p>
                  <p className="mt-4 text-gray-600">{product.description}</p>
                  <div className="mt-6 flex flex-col gap-y-2 sm:gap-y-0 sm:flex-row items-center justify-between">
                    <span className="text-3xl font-bold text-teal-500">
                      ${product.price}
                    </span>
                    <div className="flex items-center">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${
                              i < Math.floor(product.rating)
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="ml-2 text-gray-600">
                        {product.rating} rating
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default ProductDetail;
