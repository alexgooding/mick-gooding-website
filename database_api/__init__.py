from flask import Flask
from .routes.painting_routes import painting_bp

app = Flask(__name__)

def create_app():
    app = Flask(__name__)

    app.register_blueprint(painting_bp, url_prefix="/api")

    return app
