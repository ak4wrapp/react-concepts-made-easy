// src/components/ProductList.tsx
import React, { useEffect, useRef } from "react";
import useProducts from "../custom-hooks/useProducts";
import Product from "./Product";
import { useSnackbar } from "../../../../context/ SnackbarContext";

const ProductList: React.FC = () => {
  const { products, loading, acceptPrice, networkError, reconnecting } =
    useProducts();
  const { showSnackbar } = useSnackbar(); // Access Snackbar context

  // A ref to keep track of the last seen networkError to prevent triggering the snackbar multiple times for the same error
  const previousNetworkError = useRef<string | null>(null);

  // Show network error in a snackbar (only if networkError is new or changed)
  useEffect(() => {
    if (networkError && networkError !== previousNetworkError.current) {
      showSnackbar(networkError, "error"); // Trigger snackbar for network error
      previousNetworkError.current = networkError; // Update the reference to the current error
    }
  }, [networkError, showSnackbar]); // Only re-run if networkError changes

  // Handle success/error of price acceptance
  const handleAcceptPrice = async (
    productId: string,
    price: number,
    guid: string
  ) => {
    try {
      await acceptPrice(productId, price, guid);
      showSnackbar(
        `Successfully accepted price for ${productId}: $${price}`,
        "success" // Show success message in snackbar
      );
    } catch (error) {
      showSnackbar("Failed to accept price. Please try again.", "error"); // Show error message in snackbar
    }
  };

  return (
    <div id="product-list-container">
      {loading && !reconnecting && !networkError && (
        <div id="loader">Loading products...</div>
      )}

      {products.length === 0 && !loading && !networkError && !reconnecting && (
        <div id="no-products">No products available</div>
      )}

      {products.map((product) => (
        <Product
          key={product.productId}
          productId={product.productId}
          price={product.price}
          guid={product.guid}
          onAcceptPrice={handleAcceptPrice} // Pass the modified handler to Product
          reconnecting={reconnecting}
          error={product.error}
        />
      ))}
    </div>
  );
};

export default ProductList;
