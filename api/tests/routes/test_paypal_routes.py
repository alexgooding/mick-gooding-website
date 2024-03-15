import json
import pytest
from flask import Flask
from unittest.mock import patch
from routes import api as base_api
from routes.paypal_routes import paypal_ns


@pytest.fixture
def app():
    app = Flask(__name__)
    app.testing = True
    app.config['SERVER_NAME'] = 'localhost'
    app.config['RESTX_ERROR_404_HELP'] = False

    base_api.init_app(app)
    base_api.add_namespace(paypal_ns, path='/api')

    return app


@pytest.fixture
def client(app):
    return app.test_client()


@patch('routes.paypal_routes.get_access_token', return_value='mocked_access_token')
@patch('requests.post')
def test_order_create_success(mock_post, mock_generate_token, client):
    mock_post.return_value.status_code = 201
    mock_post.return_value.json.return_value = {'id': 'mocked_order_id'}

    response = client.post('/api/paypal/orders/create', data=json.dumps({'example_key': 'example_value'}),
                           content_type='application/json')

    assert response.status_code == 201
    assert response.data.decode('utf-8') == 'mocked_order_id'


@patch('routes.paypal_routes.get_access_token', return_value='mocked_access_token')
@patch('requests.post')
def test_order_create_failure(mock_post, mock_generate_token, client):
    mock_post.return_value.status_code = 400

    response = client.post('/api/paypal/orders/create', data=json.dumps({'example_key': 'example_value'}),
                           content_type='application/json')

    assert response.status_code == 400


@patch('routes.paypal_routes.get_access_token', return_value='mocked_access_token')
@patch('requests.post')
def test_order_capture_success(mock_post, mock_generate_token, client):
    mock_post.return_value.status_code = 200

    response = client.post('/api/paypal/orders/mocked_order_id/capture',
                           data=json.dumps({'example_key': 'example_value'}), content_type='application/json')

    assert response.status_code == 200


@patch('routes.paypal_routes.get_access_token', return_value='mocked_access_token')
@patch('requests.post')
def test_order_capture_failure(mock_post, mock_generate_token, client):
    mock_post.return_value.status_code = 401

    response = client.post('/api/paypal/orders/mocked_order_id/capture',
                           data=json.dumps({'example_key': 'example_value'}), content_type='application/json')

    assert response.status_code == 401


@patch('routes.paypal_routes.get_access_token', return_value='mocked_access_token')
@patch('requests.get')
def test_order_get_success(mock_get, mock_generate_token, client):
    mock_get.return_value.status_code = 200

    response = client.get('/api/paypal/orders/mocked_order_id')

    assert response.status_code == 200


@patch('routes.paypal_routes.get_access_token', return_value='mocked_access_token')
@patch('requests.get')
def test_order_get_failure(mock_get, mock_generate_token, client):
    mock_get.return_value.status_code = 404

    response = client.get('/api/paypal/orders/mocked_order_id')

    assert response.status_code == 404
