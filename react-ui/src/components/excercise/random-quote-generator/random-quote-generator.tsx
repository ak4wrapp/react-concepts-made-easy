import React, { useCallback, useEffect, useState } from "react";
import throttle from "lodash/throttle";
import "./random-quote-generator.css";

// Define the structure of the quote data
interface Quote {
  content: string;
  originator: {
    name: string;
  };
}

const RandomQuoteGenerator: React.FC = () => {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchQuote = async () => {
    const url =
      "https://react-concepts-made-easy.onrender.com/api/random-quote";

    setLoading(true);

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setQuote(result);
      setError(null);
    } catch (err: any) {
      setError(err.toString());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote(); // Fetch quote on mount
  }, []); // Run only once when the component mounts

  // Throttle the fetchQuote function to prevent too frequent requests
  const throttledFetchNewQuote = useCallback(
    throttle(() => {
      fetchQuote(); // Call the fetchQuote function
    }, 2000), // Throttle to allow fetching every 2 seconds
    []
  );

  return (
    <div className="container">
      <div className="quote-box">
        {loading && !quote && <div>Fetching new Quote...</div>}
        {error && !loading && (
          <div className="error">Error fetching quote: {error}</div>
        )}

        {/* Display quote */}
        {!loading && !error && quote && (
          <>
            <p>{quote.content}</p>
            <p>- {quote.originator.name}</p>
          </>
        )}

        {/* Fetch new quote button */}
        <span
          className={`material-icons refresh-icon`}
          onClick={throttledFetchNewQuote} // Use throttled function directly
          style={{ cursor: "pointer" }} // We can keep this since it's clear
        >
          sync
        </span>
      </div>
    </div>
  );
};

export default RandomQuoteGenerator;
