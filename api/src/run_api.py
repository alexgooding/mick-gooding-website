import os

from api import create_base_app, create_api


def create_app():
    app = create_base_app()
    api = create_api(app)

    app.config['RESTX_ERROR_404_HELP'] = False

    return app

def run_dev_server():
    app = create_app()
    
    app.run(host="0.0.0.0", debug=True)

def run_prod_server():
    # Use gunicorn for production
    host = os.getenv("HOST", "0.0.0.0")
    port = os.getenv("PORT", 5000)
    workers = os.getenv("WORKERS", 4)

    bind_address = f"{host}:{port}"
    cmd = [
        "gunicorn",
        "-w", str(workers),
        "-b", bind_address,
        "--chdir", "/app/src",
        "run_api:create_app()",
    ]

    os.execvp("gunicorn", cmd)

if __name__ == "__main__":
    environment = os.getenv("ENVIRONMENT", "dev")

    if environment == "dev":
        run_dev_server()
    elif environment == "prod":
        run_prod_server()
    else:
        print("Invalid environment. Set ENVIRONMENT=dev or ENVIRONMENT=prod.")
