import { useEffect, useState } from "react";
import { Product } from "../../utils/type";
import ProductCard from "../../components/products/ProductCard";
import axios from "axios";

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const [page, setPage] = useState(1); // Tracks the current page

  const [isLoading, setIsLoading] = useState(false); // Tracks loading state

  const [hasMore, setHasMore] = useState(true); // Tracks if more data is available

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `https://dummyjson.com/products?limit=8&skip=${(page - 1) * 8}`
      );
      const newProducts = response.data.products;

      // Check if there are more products to load
      if (newProducts.length === 0) {
        setHasMore(false);
      }

      // Append new products to the existing list
      setProducts((prevProducts) => [...prevProducts, ...newProducts]);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 100
    ) {
      if (!isLoading && hasMore) {
        setPage((prevPage) => prevPage + 1); // Increment the page number
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isLoading, hasMore]);

  useEffect(() => {
    fetchProducts();
  }, [page]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold mb-6">Featured Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {isLoading && (
        <div className="text-center mt-4">
          <p>Loading more products...</p>
        </div>
      )}
      {!hasMore && (
        <div className="text-center mt-4">
          <p>No more products to load.</p>
        </div>
      )}
    </div>
  );
};

export default Products;
