import React, { useEffect, useRef, useState } from "react";
import useProducts from "../custom-hooks/useProducts";
import Product from "./Product";
import "./ProductList.css";
import { useSnackbar } from "../../../../context/SnackbarContext";

const ProductList: React.FC = () => {
  const {
    products,
    loading,
    acceptPrice,
    networkError,
    reconnecting,
    productStatuses, // Now coming from useProducts
    resetProductStatus, // Function to reset product status
  } = useProducts();
  const { showSnackbar } = useSnackbar();

  // Track previous status to avoid showing the same toast multiple times
  const previousStatusesRef = useRef<{
    [productId: string]: "none" | "success" | "error";
  }>({});

  useEffect(() => {
    // Show a toast notification only if the status of a product has changed
    Object.entries(productStatuses).forEach(([productId, status]) => {
      const previousStatus = previousStatusesRef.current[productId];

      // Show toast only if the status is different from the previous one
      if (status !== previousStatus) {
        if (status === "error") {
          showSnackbar(
            `Error accepting price for product ${productId}`,
            "error"
          );
        } else if (status === "success") {
          showSnackbar(`Price accepted for product ${productId}`, "success");
        }

        // Update the previous status reference
        previousStatusesRef.current[productId] = status;
      }
    });
  }, [productStatuses, showSnackbar]);

  return (
    <div id="product-list-container">
      {loading && !reconnecting && !networkError && (
        <div id="loader">Loading products...</div>
      )}

      {products.length === 0 && !loading && !networkError && !reconnecting && (
        <div id="no-products">No products available</div>
      )}

      {products.map((product) => {
        const acceptPriceStatus = productStatuses[product.productId] || "none"; // Default to "none"

        return (
          <Product
            key={product.productId}
            productId={product.productId}
            price={product.price}
            guid={product.guid}
            onAcceptPrice={acceptPrice}
            reconnecting={reconnecting}
            acceptPriceStatus={acceptPriceStatus} // Pass the status to Product component
            onResetPriceStatus={() => {
              resetProductStatus(product.productId); // Call reset function from useProducts
            }}
          />
        );
      })}
    </div>
  );
};

export default ProductList;
