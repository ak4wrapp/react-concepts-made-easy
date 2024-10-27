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
