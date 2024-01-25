from flask import Flask
from flask_cors import CORS
from flask_restx import Api

from .routes.cart_routes import cart_ns
from .routes.painting_routes import painting_ns
from .routes.paypal_routes import paypal_ns
from .routes.product_routes import product_ns

def create_app():
    app = Flask(__name__)
    CORS(app)

    api = Api(
        app,
        version='1.0',
        title='Mick Gooding Website API',
        description='API for backend services',
        doc='/api/swagger-ui',
    )

    api.add_namespace(cart_ns, path='/api')
    api.add_namespace(painting_ns, path='/api')
    api.add_namespace(paypal_ns, path='/api')
    api.add_namespace(product_ns, path='/api')

    return app
