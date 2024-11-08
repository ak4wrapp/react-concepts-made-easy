import * as http from "http";

const allowedOrigins = [
  "http://localhost:3000",  // Change Port as needed
  "https://vercel.app",      // vercel.app is where UI is hosted, replace as needed
];

// Example pattern to allow any subdomain of vercel.app or localhost for development
const allowedOriginsPattern = /^(https?:\/\/(.*\.)?vercel\.app|http:\/\/localhost:\d+)$/;


export const requestHandler = (
  req: http.IncomingMessage,
  res: http.ServerResponse
) => {
  const origin = req.headers.origin as string;

  // For now using both REGEX and Array of Origins
  const isCORSEnabled = allowedOriginsPattern.test(origin) || allowedOrigins.includes(origin);
  
  // Handle CORS: Allow only requests from localhost and verex
  if (isCORSEnabled) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Credentials", "true"); // If you need credentials (cookies, HTTP authentication)
  }

  // Handle preflight request (OPTIONS)
  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    res.end();
    return;
  }

  // Log the incoming request
  console.log(`Received ${req.method} request for ${req.url}`);

  if (req.method === "GET" && req.url === "/") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ message: "Hello, World!" }));
  } else if (req.method === "GET" && req.url === "/api/random") {
    const randomData = {
      timestamp: new Date().toISOString(),
      value: Math.random(),
    };
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(randomData));
  } else if (req.method === "GET" && req.url === "/api/random-quote") {
    const url =
      "https://quotes15.p.rapidapi.com/quotes/random/?language_code=en";
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "82b37502ecmsh0a3947f3b182369p12ef47jsnb411bc29b91f",
        "x-rapidapi-host": "quotes15.p.rapidapi.com",
      },
    };

    fetch(url, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(data));
      })
      .catch((error) => {
        res.statusCode = 500;
        res.end(JSON.stringify({ message: error }));
      });
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({ message: "Not Found" }));
  }
};
