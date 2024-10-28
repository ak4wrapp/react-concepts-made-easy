import React, { useCallback, useEffect, useState } from "react";
import { throttle } from "lodash";
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

  const getURLAndOptionsToMakeCall = (connectToLocal: boolean) => {
    let url;
    let options;

    if (connectToLocal) {
      url = "http://localhost:3000/api/random-quote";
    } else {
      url = "https://quotes15.p.rapidapi.com/quotes/random/?language_code=en";
      options = {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "82b37502ecmsh0a3947f3b182369p12ef47jsnb411bc29b91f",
          "x-rapidapi-host": "quotes15.p.rapidapi.com",
        },
      };
    }
    return { url, options };
  };

  const fetchQuote = () => {
    const { url, options } = getURLAndOptionsToMakeCall(false);

    setLoading(true); // Set loading to true while fetching

    fetch(url, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((result) => {
        setQuote(result); // Set the fetched quote
        setError(null);
        setCanFetch(false); // Disable fetching new quotes

        // Re-enable fetching after 1 second
        setTimeout(() => {
          setCanFetch(true);
        }, 1000);
      })
      .catch((error) => {
        setError(error.toString()); // Set error state
      })
      .finally(() => {
        setLoading(false); // Set loading to false after fetching
      });
  };

  useEffect(() => {
    fetchQuote(); // Fetch quote on mount
  }, []); // Run only once when the component mounts

  // Throttle the fetchNewQuote function
  const throttledFetchNewQuote = useCallback(
    throttle(() => {
      if (canFetch) {
        fetchQuote();
      }
    }, 1000), // Throttle to allow fetching every 1 second
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
            className={`material-icons refresh-icon ${
              canFetch ? "" : "disabled"
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
};

export default RandomQuoteGenerator;
