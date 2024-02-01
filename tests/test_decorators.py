import pytest
from unittest.mock import patch, MagicMock
from flask import Flask
from flask_restx import Api, Resource
from werkzeug.exceptions import NotFound
from psycopg2 import OperationalError
from api.decorators import create_con_handle_exceptions

@pytest.fixture
def flask_app_client():
    app = Flask(__name__)
    api = Api(app)

    return app, api, app.test_client()

# Wrapper function to simulate Flask-Restx resource class
def wrap_route(func):
    class DummyResource(Resource):
        pass

    setattr(DummyResource, 'get', func)

    return DummyResource

def test_create_con_handle_exceptions_success(flask_app_client):
    app, api, client = flask_app_client

    with patch('api.decorators.create_db_connection') as mock_create_db_connection:
        mock_conn = MagicMock()
        mock_create_db_connection.return_value = mock_conn

        class DummyResource(Resource):
            @create_con_handle_exceptions
            def get(self, conn):
                return {'status': 'success'}

        api.add_resource(DummyResource, '/success')

        response = client.get('/success')

        assert response.status_code == 200
        assert response.json == {'status': 'success'}
        mock_conn.close.assert_called_once()


def test_create_con_handle_exceptions_operational_error(flask_app_client):
    app, api, client = flask_app_client

    with patch('api.decorators.create_db_connection') as mock_create_db_connection:
        mock_create_db_connection.side_effect = OperationalError("Mocked OperationalError")

        class DummyResource(Resource):
            @create_con_handle_exceptions
            def get(self, conn):
                return {'status': 'success'}

        api.add_resource(DummyResource, '/operational_error')

        response = client.get('/operational_error')

        assert response.status_code == 401
        assert response.json == {'message': "{OperationalError('Mocked OperationalError')}"}


def test_create_con_handle_exceptions_not_found(flask_app_client):
    app, api, client = flask_app_client

    with patch('api.decorators.create_db_connection') as mock_create_db_connection:
        class DummyResource(Resource):
            @create_con_handle_exceptions
            def get(self, conn):
                raise NotFound("Mocked NotFound", response=None)

        api.add_resource(DummyResource, '/not_found')

        response = client.get('/not_found')

        assert response.status_code == 404
        assert response.json == {'message': 'Mocked NotFound. You have requested this URI [/not_found] but did you mean /not_found ?'}


def test_create_con_handle_exceptions_internal_server_error(flask_app_client):
    app, api, client = flask_app_client

    with patch('api.decorators.create_db_connection') as mock_create_db_connection:
        class DummyResource(Resource):
            @create_con_handle_exceptions
            def get(self, conn):
                raise Exception("Mocked Exception")

        api.add_resource(DummyResource, '/internal_server_exception')

        response = client.get('/internal_server_exception')

        assert response.status_code == 500
        assert response.json == {'message': 'Internal Server Error: Mocked Exception'}
