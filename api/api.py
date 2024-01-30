from flask import Flask
from .routes import api as base_api
from .routes.cart_routes import cart_ns
from .routes.painting_routes import painting_ns
from .routes.paypal_routes import paypal_ns
from .routes.product_routes import product_ns


def create_api(app: Flask):
    base_api.init_app(app)

    base_api.add_namespace(cart_ns, path='/api')
    base_api.add_namespace(painting_ns, path='/api')
    base_api.add_namespace(paypal_ns, path='/api')
    base_api.add_namespace(product_ns, path='/api')

    return base_api
