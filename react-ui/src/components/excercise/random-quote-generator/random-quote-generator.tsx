import React, { useCallback, useEffect, useMemo, useState } from "react";
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

  const fetchQuote = useCallback(async () => {
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
  }, []);

  useEffect(() => {
    fetchQuote(); // Fetch quote on mount
  }, [fetchQuote]); // Run only once when the component mounts

  const throttledFetchNewQuote = useMemo(
    () =>
      throttle(() => {
        fetchQuote();
      }, 2000),
    [fetchQuote]
  );

  useEffect(() => {
    return () => {
      throttledFetchNewQuote.cancel();
    };
  }, [throttledFetchNewQuote]);

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
