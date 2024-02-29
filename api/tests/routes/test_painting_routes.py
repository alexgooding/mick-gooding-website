import pytest
from flask import Flask
from functools import wraps
from unittest.mock import patch, MagicMock
from psycopg2 import OperationalError

from routes import api as base_api
from routes.painting_routes import painting_ns


@pytest.fixture
def app():
    app = Flask(__name__)
    app.testing = True
    app.config['SERVER_NAME'] = 'localhost'

    base_api.init_app(app)
    base_api.add_namespace(painting_ns, path='/api')

    return app

@pytest.fixture
def client(app):
    return app.test_client()

def mock_db_operations(data, exception=None):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            with patch('decorators.create_db_connection') as mock_db_connection:
                mock_db_connection.return_value = MagicMock()

                mock_cursor = mock_db_connection.return_value.cursor.return_value.__enter__.return_value
                mock_cursor.fetchall = MagicMock()

                if exception:
                    mock_cursor.fetchall.side_effect = exception
                else:
                    mock_cursor.fetchall.return_value = data

                # Call the original test function
                return func(*args, **kwargs)

        return wrapper
    return decorator

@mock_db_operations(data={'data': 'fake_data'})
def test_get_paintings_success(client):
    response = client.get('/api/paintings')

    assert response.status_code == 200
    assert response.json == {'data': 'fake_data'}

@mock_db_operations(data=None)
def test_get_paintings_bad_request(client):
    # Simulate a bad request by providing an invalid value for a parameter
    response = client.get('/api/paintings?order=invalid_value')

    assert response.status_code == 400
    assert response.json == {'message': 'The browser (or proxy) sent a request that this server could not understand.'}

@mock_db_operations(data=None, exception=OperationalError('Invalid database credentials'))
def test_get_paintings_invalid_credentials(client):
    response = client.get('/api/paintings')

    assert response.status_code == 401
    assert response.json == {'message': "{OperationalError('Invalid database credentials')}"}

@mock_db_operations(data={})
def test_get_paintings_no_paintings_found(client):
    response = client.get('/api/paintings')

    assert response.status_code == 404
    assert response.json == {'message': 'No paintings found. You have requested this URI [/api/paintings] but did you mean /api/paintings or /api/painting/<int:painting_id>/products ?'}

@mock_db_operations(data=None, exception=Exception("Test error"))
def test_get_paintings_internal_server_error(client):
    response = client.get('/api/paintings')

    assert response.status_code == 500
    assert response.json == {'message': 'Internal Server Error: Test error'}

@mock_db_operations(data={'data': 'fake_data'})
def test_get_painting_products_success(client):
    response = client.get('/api/painting/1/products')

    assert response.status_code == 200
    assert response.json == {'data': 'fake_data'}

@mock_db_operations(data=None, exception=OperationalError('Invalid database credentials'))
def test_get_painting_products_invalid_credentials(client):
    response = client.get('/api/painting/1/products')

    assert response.status_code == 401
    assert response.json == {'message': "{OperationalError('Invalid database credentials')}"}

@mock_db_operations(data={})
def test_get_painting_products_no_products_found(client):
    response = client.get('/api/painting/1/products')

    assert response.status_code == 404
    assert response.json == {'message': 'No products found for the specified painting. You have requested this URI [/api/painting/1/products] but did you mean /api/painting/<int:painting_id>/products or /api/paintings ?'}

@mock_db_operations(data=None, exception=Exception("Test error"))
def test_get_painting_products_internal_server_error(client):

    response = client.get('/api/painting/1/products')
    assert response.status_code == 500
    assert response.json == {'message': 'Internal Server Error: Test error'}
