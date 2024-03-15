import os
from auth import generate_paypal_access_token

PAYPAL_SANDBOX_BASE_URL = "https://api-m.sandbox.paypal.com"
PAYPAL_PRODUCTION_BASE_URL = "https://api-m.paypal.com"

paypal_client_mode = os.environ.get('PAYPAL_CLIENT_MODE', "SANDBOX")
paypal_base_url = PAYPAL_SANDBOX_BASE_URL if paypal_client_mode == "SANDBOX" else PAYPAL_PRODUCTION_BASE_URL

access_token_cache = ""

def get_paypal_base_url():
    return paypal_base_url

def get_access_token():
    global access_token_cache
    if not access_token_cache:
        access_token_cache = generate_paypal_access_token(paypal_base_url)
    return access_token_cache

def refresh_access_token():
    global access_token_cache
    access_token_cache = generate_paypal_access_token(paypal_base_url)
