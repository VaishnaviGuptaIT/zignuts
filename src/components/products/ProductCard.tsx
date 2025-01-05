import { Link } from "react-router-dom";
import { Product } from "../../utils/type";
import { Star } from "lucide-react";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Link
      to={`/products/${product.id}`}
      className="group relative rounded-lg overflow-hidden shadow-glow bg-gradient-primary transition-transform transform hover:scale-[1.05]"
    >
      <div className="absolute inset-0 bg-gradient-radial from-indigo-900 to-slate-900 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <div className="relative">
        <img
          src={product.thumbnail}
          alt={product.title}
          loading="lazy"
          className="w-full h-48 object-cover group-hover:scale-100 transition-transform"
        />
      </div>
      <div className="relative p-6">
        <h3 className="text-lg font-bold text-violet-500 group-hover:text-white line-clamp-1">
          {product.title}
        </h3>
        <p className="text-sm text-blue-500 mb-2">{product.brand}</p>
        <div className="flex items-center justify-between mt-4">
          <span className="text-lg font-bold text-teal-500">${product.price}</span>
          <div className="flex items-center">
            <Star className="h-5 w-5 text-yellow-400" />
            <span className="ml-2 text-sm text-slate-900 group-hover:text-white">{product.rating}</span>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-secondary group-hover:h-2 transition-all"></div>
    </Link>
  );
};

export default ProductCard;
