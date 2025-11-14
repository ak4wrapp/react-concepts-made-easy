import logging
from flask import Flask, request
from flask_sock import Sock

# Import your handlers here (you will need to implement "handle_product_connection" and "handle_order_connection" in Python)
from .productWebSocket import handle_product_connection
from .ordersWebSocket import handle_order_connection

app = Flask(__name__)
sock = Sock(app)

logging.basicConfig(level=logging.INFO)

@sock.route('/products')
def products(ws):
    logging.info("Client connected to /products")
    try:
        handle_product_connection(ws)
    except Exception as e:
        logging.error(f"WebSocket error: {e}")
    finally:
        logging.info("Client disconnected from /products")

@sock.route('/orders')
def orders(ws):
    logging.info("Client connected to /orders")
    try:
        handle_order_connection(ws)
    except Exception as e:
        logging.error(f"WebSocket error: {e}")
    finally:
        logging.info("Client disconnected from /orders")

# Optionally, handle unknown paths via regular Flask routes
@app.route('/<path:unknown_path>')
def unknown(unknown_path):
    logging.warning(f"Unknown path: /{unknown_path}")
    return 'Unknown path', 404

def setup_websocket_server():
    # This is not strictly required in Flask, as app.run() starts the server.
    # But this function is added to mirror the TypeScript API.
    app.run(debug=True)

# Only run if executed as a script
if __name__ == '__main__':
    setup_websocket_server()
