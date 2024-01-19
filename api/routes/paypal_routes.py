import os
from flask import Blueprint, Response, request
from functools import wraps
import requests

from ..auth import generate_paypal_access_token


PAYPAL_SANDBOX_BASE_URL = "https://api-m.sandbox.paypal.com"
PAYPAL_PRODUCTION_BASE_URL = "https://api-m.paypal.com"
paypal_base_url = PAYPAL_SANDBOX_BASE_URL if os.environ['PAYPAL_CLIENT_MODE'] == "SANDBOX" else PAYPAL_PRODUCTION_BASE_URL
access_token_cache = ""

paypal_bp = Blueprint("paypal_routes", __name__)

def retry_on_error(max_retries=3, retry_codes=[400, 401]):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            global access_token_cache

            retries = 0
            while retries < max_retries:
                response = func(*args, **kwargs)
                if response.status_code not in retry_codes:
                    return response
                else:
                    # Refresh access token on 400 or 401 by default
                    access_token_cache = generate_paypal_access_token()

                retries += 1
                print(f"Retrying... ({retries}/{max_retries})")
            
            return response

        return wrapper

    return decorator

@paypal_bp.route("/paypal/user-info", methods=['GET'])
@retry_on_error()
def get_user_info():
    headers = {
        'Authorization': f"Bearer {access_token_cache}",
        'Content-Type': "application/x-www-form-urlencoded",
    }
    params = {'schema': "openid"}

    response = requests.get(f"{paypal_base_url}/v1/identity/openidconnect/userinfo", headers=headers, params=params)
    
    return Response(
        response.text,
        status=response.status_code
    )
    
@paypal_bp.route("/paypal/orders/create", methods=['POST'])
@retry_on_error()
def create_order():
    headers = {
        'Authorization': f"Bearer {access_token_cache}",
        'Content-Type': "application/json",
    }
    payload = request.get_data()
    response = requests.post(f"{paypal_base_url}/v2/checkout/orders", headers=headers, data=payload)
    
    response_data = response.json()

    return Response(
        response_data.get('id'),
        status=response.status_code
    )

@paypal_bp.route("/paypal/orders/<order_id>/capture", methods=['POST'])
@retry_on_error()
def capture_order(order_id):
    headers = {
        'Authorization': f"Bearer {access_token_cache}",
        'Content-Type': "application/json",
    }
    payload = request.get_data()
    response = requests.post(f"{paypal_base_url}/v2/checkout/orders/{order_id}/capture", headers=headers, data=payload)

    return Response(
        response,
        status=response.status_code
    )
