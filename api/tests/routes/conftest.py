import os
import pytest
from unittest.mock import patch

@pytest.fixture(autouse=True)
def mock_env_variables():
    with patch.dict(os.environ, {
        'DB_NAME': 'test_db',
        'DB_USERNAME': 'test_user',
        'DB_PASSWORD': 'test_password',
        'PAYPAL_CLIENT_MODE': 'SANDBOX',
        'PAYPAL_CLIENT_ID': 'test_client_id',
        'PAYPAL_CLIENT_SECRET': 'test_client_secret'
    }):
        yield
