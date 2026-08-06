import React, { useCallback, useEffect, useState } from "react";
import throttle from "lodash/throttle";
import "./random-quote-generator.css";

// Define the structure of the quote data
interface Quote {
  content: string; // Adjust based on actual API response
  originator: {
    name: string; // Adjust based on actual API response
  };
}

const RandomQuoteGenerator: React.FC = () => {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [canFetch, setCanFetch] = useState(true); // State to manage fetch permissions

  const fetchQuote = async () => {
    const url = "https://react-concepts-made-easy.onrender.com/api/random-quote";

    setLoading(true); // Set loading to true while fetching

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();

      setQuote(result); // Set the fetched quote
      setError(null);
      setCanFetch(false); // Disable fetching new quotes

      // Re-enable fetching after 1 second
      setTimeout(() => {
        setCanFetch(true);
      }, 1000);
    } catch (err: any) {
      setError(err.toString());
      setQuote(null);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  useEffect(() => {
    fetchQuote(); // Fetch quote on mount
  }, []); // Run only once when the component mounts

  // Throttle the fetchNewQuote function
  const throttledFetchNewQuote = useCallback(
    () => {
      const throttled = throttle(() => {
        if (canFetch) {
          void fetchQuote();
        }
      }, 500);

      throttled();
    },
    [canFetch]
  );

  const fetchNewQuote = () => {
    throttledFetchNewQuote(); // Call the throttled function
  };

  return (
    <div className="container">
      <div className="quote-box">
        {loading && <div>Fetching new Quote...</div>}
        {!loading && (
          <span
            className={`material-icons refresh-icon ${canFetch ? "" : "disabled"
              }`}
            onClick={fetchNewQuote}
            style={{ cursor: canFetch ? "pointer" : "not-allowed" }}
          >
            {canFetch ? "sync" : "sync_disabled"}{" "}
            {/* Change icon based on state */}
          </span>
        )}
        {!!error ? (
          <div className="error">Error fetching quote: {error}</div>
        ) : (
          !loading && (
            <>
              <p>{quote?.content}</p>
              <p>- {quote?.originator.name}</p>
            </>
          )
        )}
      </div>
    </div>
  );
}

export default RandomQuoteGenerator;