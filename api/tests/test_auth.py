import os
from unittest.mock import patch, MagicMock
import pytest
from auth import create_db_connection, generate_paypal_access_token

@pytest.mark.parametrize("db_env_variables, expected_conn_params", [
    (
        {'DB_NAME': 'test_db', 'DB_USERNAME': 'test_user', 'DB_PASSWORD': 'test_password'},
        {
            'host': 'localhost',
            'port': '5432',
            'database': 'test_db',
            'user': 'test_user',
            'password': 'test_password'
        }
    ),
])
def test_create_db_connection(db_env_variables, expected_conn_params):
    with patch.dict(os.environ, db_env_variables):
        with patch('psycopg2.connect') as mock_connect:
            # Mocking psycopg2 connection
            mock_conn = MagicMock()
            mock_connect.return_value = mock_conn

            # Call the function
            result = create_db_connection()

            # Assert that the function returned the mock connection
            assert result == mock_conn

            # Assert that psycopg2.connect was called with the correct parameters
            mock_connect.assert_called_once_with(**expected_conn_params)

@pytest.mark.parametrize("missing_env_variables", [
    {'DB_USERNAME': 'test_user', 'DB_PASSWORD': 'test_password'},
    {'DB_NAME': 'test_db', 'DB_PASSWORD': 'test_password'},
    {'DB_NAME': 'test_db', 'DB_USERNAME': 'test_user'},
    {},
])
def test_create_db_connection_missing_env_variables(missing_env_variables):
    with patch.dict(os.environ, missing_env_variables):
        with pytest.raises(KeyError):
            # The following line should raise a KeyError since DB_NAME is not defined in os.environ
            create_db_connection()

@pytest.mark.parametrize("paypal_env_variables, expected_post_params", [
    (
        {'PAYPAL_CLIENT_MODE': 'SANDBOX', 'PAYPAL_CLIENT_ID': 'test_client_id', 'PAYPAL_CLIENT_SECRET': 'test_client_secret'},
        {
            'url': 'https://api-m.sandbox.paypal.com/v1/oauth2/token',
            'headers': {'Content-Type': 'application/x-www-form-urlencoded'},
            'data': {'grant_type': 'client_credentials'},
            'auth': ('test_client_id', 'test_client_secret')
        }
    ),
])
def test_generate_paypal_access_token(paypal_env_variables, expected_post_params):
    with patch.dict(os.environ, paypal_env_variables):
        with patch('requests.post') as mock_post:
            # Mocking response
            mock_response = MagicMock()
            mock_response.json.return_value = {'access_token': 'mocked_access_token'}
            mock_post.return_value = mock_response

            # Call the function
            result = generate_paypal_access_token()

            # Assert that the function returned the mocked access token
            assert result == 'mocked_access_token'

            # Assert that requests.post was called with the correct parameters
            mock_post.assert_called_once_with(**expected_post_params)

@pytest.mark.parametrize("missing_env_variables", [
    {'PAYPAL_CLIENT_MODE': 'SANDBOX', 'PAYPAL_CLIENT_ID': 'test_client_id'},
    {'PAYPAL_CLIENT_MODE': 'SANDBOX', 'PAYPAL_CLIENT_SECRET': 'test_client_secret'},
    {'PAYPAL_CLIENT_ID': 'test_client_id', 'PAYPAL_CLIENT_SECRET': 'test_client_secret'},
    {},
])
def test_generate_paypal_access_token_missing_env_credentials(missing_env_variables):
    with patch.dict(os.environ, missing_env_variables):
        with pytest.raises(KeyError):
            # The following line should raise a KeyError since one or more PayPal credentials are missing
            generate_paypal_access_token()
