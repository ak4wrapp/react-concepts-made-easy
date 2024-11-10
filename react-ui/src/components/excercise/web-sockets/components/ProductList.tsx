import React, { useEffect, useRef, useState } from "react";
import useProducts from "../custom-hooks/useProducts";
import Product from "./Product";
import "./ProductList.css";
import { useSnackbar } from "../../../../context/SnackbarContext";

const ProductList: React.FC = () => {
  const { products, loading, acceptPrice, networkError, reconnecting } =
    useProducts();
  const { showSnackbar } = useSnackbar(); // Access Snackbar context

  // Track success/error for each product using a map or object
  const [acceptPriceStatuses, setAcceptPriceStatuses] = useState<{
    [productId: string]: { success: boolean; error: boolean };
  }>({});

  // A ref to keep track of the last seen networkError to prevent triggering the snackbar multiple times for the same error
  const previousNetworkError = useRef<string | null>(null);

  // Show network error in a snackbar (only if networkError is new or changed)
  useEffect(() => {
    if (networkError && networkError !== previousNetworkError.current) {
      showSnackbar(networkError, "error"); // Trigger snackbar for network error
      previousNetworkError.current = networkError; // Update the reference to the current error
    }
  }, [networkError, showSnackbar]);

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

      // Update the success state for this product
      setAcceptPriceStatuses((prev) => ({
        ...prev,
        [productId]: { success: true, error: false },
      }));
    } catch (error) {
      showSnackbar(
        `Failed to accept price for ${productId}. Please try again.`,
        "error"
      ); // Show error message in snackbar

      // Update the error state for this product
      setAcceptPriceStatuses((prev) => ({
        ...prev,
        [productId]: { success: false, error: true },
      }));
    }
  };

  // Reset the price success and error states for a single product
  const handleResetPriceStatus = (productId: string) => {
    setAcceptPriceStatuses((prev) => ({
      ...prev,
      [productId]: { success: false, error: false },
    }));
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
          onAcceptPrice={handleAcceptPrice}
          reconnecting={reconnecting}
          acceptPriceSuccess={
            acceptPriceStatuses[product.productId]?.success || false
          }
          acceptPriceError={
            acceptPriceStatuses[product.productId]?.error || false
          }
          onResetPriceStatus={() => handleResetPriceStatus(product.productId)}
        />
      ))}
    </div>
  );
};

export default ProductList;
