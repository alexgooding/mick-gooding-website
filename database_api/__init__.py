from flask import Flask
from .routes.painting_routes import painting_bp
from .routes.product_routes import product_bp
from .routes.cart_routes import cart_bp

app = Flask(__name__)

def create_app():
    app = Flask(__name__)

    app.register_blueprint(painting_bp, url_prefix="/api")
    app.register_blueprint(product_bp, url_prefix="/api")
    app.register_blueprint(cart_bp, url_prefix="/api")

    return app
