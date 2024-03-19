import pytest
from flask import Flask
from functools import wraps
from unittest.mock import patch, MagicMock
from psycopg2 import OperationalError

from routes import api as base_api
from routes.product_routes import product_ns


@pytest.fixture
def app():
    app = Flask(__name__)
    app.testing = True
    app.config['SERVER_NAME'] = 'localhost'
    app.config['RESTX_ERROR_404_HELP'] = False

    base_api.init_app(app)
    base_api.add_namespace(product_ns, path='/api')

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

                if exception:
                    mock_db_connection.side_effect = exception

                mock_cursor = mock_db_connection.return_value.cursor.return_value.__enter__.return_value
                mock_cursor.fetchall = MagicMock()
                mock_cursor.fetchone = MagicMock()

                mock_cursor.fetchall.return_value = data
                mock_cursor.fetchone.return_value = data

                # Call the original test function
                return func(*args, **kwargs)

        return wrapper
    return decorator


@mock_db_operations(data={'data': 'fake_data'})
def test_get_products_success(client):
    response = client.get('/api/products')

    assert response.status_code == 200
    assert response.json == {'data': 'fake_data'}


@mock_db_operations(data=None, exception=OperationalError('Invalid database credentials'))
def test_get_products_invalid_credentials(client):
    response = client.get('/api/products')

    assert response.status_code == 401
    assert response.json == {'message': "{OperationalError('Invalid database credentials')}"}


@mock_db_operations(data={})
def test_get_products_no_products_found(client):
    response = client.get('/api/products')

    assert response.status_code == 404
    assert response.json == {'message': 'No products found'}


@mock_db_operations(data=None, exception=Exception("Test error"))
def test_get_products_internal_server_error(client):
    response = client.get('/api/products')

    assert response.status_code == 500
    assert response.json == {'message': 'Internal Server Error: Test error'}


@mock_db_operations(data={'data': 'fake_data'})
def test_get_product_success(client):
    response = client.get('/api/product/1')

    assert response.status_code == 200
    assert response.json == {'data': 'fake_data'}


@mock_db_operations(data=None, exception=OperationalError('Invalid database credentials'))
def test_get_product_invalid_credentials(client):
    response = client.get('/api/product/1')

    assert response.status_code == 401
    assert response.json == {'message': "{OperationalError('Invalid database credentials')}"}


@mock_db_operations(data={})
def test_get_product_not_found(client):
    response = client.get('/api/product/1')

    assert response.status_code == 404
    assert response.json == {'message': "Product not found for product ID '1'"}


@mock_db_operations(data=None, exception=Exception("Test error"))
def test_get_product_internal_server_error(client):
    response = client.get('/api/product/1')

    assert response.status_code == 500
    assert response.json == {'message': 'Internal Server Error: Test error'}


@mock_db_operations(data={'data': 'fake_data'})
def test_get_product_all_info_success(client):
    response = client.get('/api/product/1/all-info')

    assert response.status_code == 200
    assert response.json == {'data': 'fake_data'}


@mock_db_operations(data=None, exception=OperationalError('Invalid database credentials'))
def test_get_product_all_info_invalid_credentials(client):
    response = client.get('/api/product/1/all-info')

    assert response.status_code == 401
    assert response.json == {'message': "{OperationalError('Invalid database credentials')}"}


@mock_db_operations(data=None)
def test_get_product_all_info_not_found(client):
    response = client.get('/api/product/1/all-info')

    assert response.status_code == 404
    assert response.json == {'message': "Product info not found for product ID '1'"}


@mock_db_operations(data=None, exception=Exception("Test error"))
def test_get_product_all_info_internal_server_error(client):
    response = client.get('/api/product/1/all-info')

    assert response.status_code == 500
    assert response.json == {'message': 'Internal Server Error: Test error'}


@mock_db_operations(data=None)
@patch('routes.product_routes.url_for')
@patch('requests.get')
def test_update_product_stock_success(mock_get, mock_url_for, client):
    mock_get.return_value.status_code = 200
    mock_get.return_value.json.return_value = {'status': "COMPLETED"}
    data = {'order_id': 'example_id'}
    response = client.put('/api/product/1/update-stock/50', json=data)

    assert response.status_code == 200
    assert response.json == {'message': 'Stock updated successfully for product ID 1'}


@mock_db_operations(data=None)
@patch('routes.product_routes.url_for')
@patch('requests.get')
def test_update_product_stock_missing_order_id(mock_get, mock_url_for, client):
    data = {}
    response = client.put('/api/product/1/update-stock/50', json=data)

    assert response.status_code == 400
    assert response.json == {'message': 'Missing an order ID corresponding to a completed transaction'}


@mock_db_operations(data=None)
@patch('routes.product_routes.url_for')
@patch('requests.get')
def test_update_product_stock_invalid_order_id(mock_get, mock_url_for, client):
    mock_get.return_value.status_code = 404
    mock_get.return_value.json.return_value = {}
    data = {'order_id': "invalid_id"}
    response = client.put('/api/product/1/update-stock/50', json=data)

    assert response.status_code == 400
    assert response.json == {'message': 'Missing an order ID corresponding to a completed transaction'}


@mock_db_operations(data=None, exception=OperationalError('Invalid database credentials'))
def test_update_product_stock_invalid_credentials(client):
    response = client.put('/api/product/1/update-stock/50')

    assert response.status_code == 401
    assert response.json == {'message': "{OperationalError('Invalid database credentials')}"}


@mock_db_operations(data=None, exception=Exception("Test error"))
def test_update_product_stock_internal_server_error(client):
    response = client.put('/api/product/1/update-stock/50')

    assert response.status_code == 500
    assert response.json == {'message': 'Internal Server Error: Test error'}

@mock_db_operations(data=1)
def test_get_product_stock_success(client):
    response = client.get('/api/product/1')

    assert response.status_code == 200
    assert response.json == 1


@mock_db_operations(data=None, exception=OperationalError('Invalid database credentials'))
def test_get_product_stock_invalid_credentials(client):
    response = client.get('/api/product/1')

    assert response.status_code == 401
    assert response.json == {'message': "{OperationalError('Invalid database credentials')}"}


@mock_db_operations(data={})
def test_get_product_stock_not_found(client):
    response = client.get('/api/product/1')

    assert response.status_code == 404
    assert response.json == {'message': "Product not found for product ID '1'"}


@mock_db_operations(data=None, exception=Exception("Test error"))
def test_get_product_stock_internal_server_error(client):
    response = client.get('/api/product/1')

    assert response.status_code == 500
    assert response.json == {'message': 'Internal Server Error: Test error'}
