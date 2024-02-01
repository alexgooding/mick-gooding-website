from api import create_base_app
from api.api import create_api

if __name__ == "__main__":
    app = create_base_app()
    api = create_api(app)
    
    app.run(debug=True)
