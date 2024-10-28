import React, { useEffect, useState } from "react";
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

  const fetchQuote = () => {
    const url =
      "https://quotes15.p.rapidapi.com/quotes/random/?language_code=en";
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "82b37502ecmsh0a3947f3b182369p12ef47jsnb411bc29b91f",
        "x-rapidapi-host": "quotes15.p.rapidapi.com",
      },
    };

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

  const fetchNewQuote = () => {
    fetchQuote(); // Call fetchQuote to get a new quote
  };

  return (
    <div className="container">
      <div className="quote-box">
        {loading && <div>Loading...</div>}
        {!loading && (
          <span className="material-icons refresh-icon" onClick={fetchNewQuote}>
            refresh
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
