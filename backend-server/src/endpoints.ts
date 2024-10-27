import * as http from "http";

export const requestHandler = (
  req: http.IncomingMessage,
  res: http.ServerResponse
) => {
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
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({ message: "Not Found" }));
  }
};
