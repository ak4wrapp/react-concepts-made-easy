# React Concepts Made Easy

Welcome to the **React Concepts Made Easy** project! This repository is designed to help you explore and understand various concepts in React and Node.js. The project is structured into two main components: a backend server and a React UI.

## Project Structure

### Backend Server

The `backend-server` folder contains a Node.js application that serves as the backend for the project. It provides a WebSocket server for real-time updates and an HTTP API for fetching data.

#### Features

- **WebSocket Integration**: Receive real-time price updates and order notifications.
- **HTTP API**: Endpoints to retrieve data such as current prices and orders.
- **Dynamic Price Changes**: Prices change at configurable intervals, with GUIDs for tracking.
- **Order Management**: Create and manage orders associated with specific prices.

#### Getting Started

1. Navigate to the `backend-server` directory:
   ```bash
   cd backend-server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm run start
   ```
4. The server will run on http://localhost:3000

#### HTTP Endpoints

- Hello World: Simple endpoint to verify the server is running.
  - Request:
    ```http
    GET http://localhost:3000/
    ```
  - Response:
    ```json
    {
      "message": "Hello, World!"
    }
    ```
- Get Random Data: Returns a random value with a timestamp.
  - Request:
    ```http
    GET http://localhost:3000/api/random
    ```
  - Response:
    ```json
    {
      "timestamp": "2024-01-01T12:00:00Z",
      "value": 0.123456
    }
    ```

##### To make a request from UI code:

- Get random data:
  ```javascript
  fetch("http://localhost:3000/api/random")
    .then((response) => response.json())
    .then((data) => console.log(data));
  ```

#### Web Socket Endpoints

To test the WebSocket connection:

1. Use a WebSocket client (like the browser console or a tool like Postman).

2. Connect to the WebSocket server:
   ```bash
   const socket = new WebSocket('ws://localhost:3000');
   ```
3. Listen for messages:
   ```bash
   socket.onmessage = function(event) {
        console.log('Message from server ', event.data);
    };
   ```
4. Send messages to the server:
   - To request the current price:
   ```bash
   socket.send(JSON.stringify({ type: 'GetPrice' }));
   ```
   - To accept a price (replace guid with the actual GUID):
   ```bash
   socket.send(JSON.stringify({ type: 'AcceptPrice', guid: 'your-guid-here' }));
   ```
   - To get the updated list of orders:
   ```bash
   socket.send(JSON.stringify({ type: 'GetOrders' }));
   ```

##### To make a request from UI code:

- Get random data:

  ```javascript
  const socket = new WebSocket("ws://localhost:3000");
  socket.onopen = () => {
    socket.send(JSON.stringify({ type: "GetPrice" }));
  };
  socket.onmessage = (event) => {
    console.log("Message from server", event.data);
  };
  ```

### React UI

The react-ui folder contains the React frontend application that interacts with the backend server. It provides a user interface for displaying prices, accepting orders, and receiving real-time updates.

#### Features

Responsive Design: The UI adapts to different screen sizes.
Real-Time Updates: Receive updates for prices and orders as they occur.
User-Friendly Interface: Simple navigation and intuitive layout for ease of use.

Getting Started

Navigate to the react-ui directory:

```bash
cd react-ui
```

Install dependencies:

```bash
npm i
```

Start the React application:

```bash
npm start
```

The application will typically run on http://localhost:3000 if the backend is not running on that port. If the backend server is on port 3000, the React app will run on http://localhost:3001 automatically to avoid conflicts.
