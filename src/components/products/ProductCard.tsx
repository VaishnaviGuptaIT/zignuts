import { Link } from "react-router-dom";
import { Product } from "../../utils/type";
import { Star } from "lucide-react";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Link to={`/products/${product.id}`} className="group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform group-hover:scale-[1.02]">
        <img
          src={product.thumbnail}
          alt={product.title}
          loading="lazy"
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600">
            {product.title}
          </h3>
          <p className="text-sm text-gray-500 mb-2">{product.brand}</p>
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-gray-900">
              ${product.price}
            </span>
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="ml-1 text-sm text-gray-600">
                {product.rating}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
