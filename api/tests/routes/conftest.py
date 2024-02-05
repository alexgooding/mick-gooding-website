import os
import pytest
from unittest.mock import patch

@pytest.fixture(autouse=True)
def mock_env_variables():
    with patch.dict(os.environ, {
        'POSTGRES_DB': 'test_db',
        'POSTGRES_USER': 'test_user',
        'POSTGRES_PASSWORD': 'test_password',
        'PAYPAL_CLIENT_MODE': 'SANDBOX',
        'PAYPAL_CLIENT_ID': 'test_client_id',
        'PAYPAL_CLIENT_SECRET': 'test_client_secret'
    }):
        yield
