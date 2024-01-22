from flask import Flask
from flask_cors import CORS
from .routes.painting_routes import painting_bp
from .routes.product_routes import product_bp
from .routes.cart_routes import cart_bp
from .routes.paypal_routes import paypal_bp


def create_app():
    app = Flask(__name__)
    CORS(app)

    app.register_blueprint(painting_bp, url_prefix="/api")
    app.register_blueprint(product_bp, url_prefix="/api")
    app.register_blueprint(cart_bp, url_prefix="/api")
    app.register_blueprint(paypal_bp, url_prefix="/api")

    return app
