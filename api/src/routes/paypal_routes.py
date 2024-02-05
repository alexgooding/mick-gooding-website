import os
from flask import Response, request
from flask_restx import Namespace, Resource
from functools import wraps
import requests

from auth import generate_paypal_access_token


PAYPAL_SANDBOX_BASE_URL = "https://api-m.sandbox.paypal.com"
PAYPAL_PRODUCTION_BASE_URL = "https://api-m.paypal.com"
paypal_client_mode = os.environ.get('PAYPAL_CLIENT_MODE', "SANDBOX")
paypal_base_url = PAYPAL_SANDBOX_BASE_URL if paypal_client_mode == "SANDBOX" else PAYPAL_PRODUCTION_BASE_URL
access_token_cache = ""

paypal_ns = Namespace(__name__)

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
    
@paypal_ns.route("/paypal/orders/create")
class OrderCreate(Resource):
    @paypal_ns.doc(description=
    """
    Creates a new PayPal order.
    For detailed information on the request payload, response structure, and status codes,
    refer to the [PayPal Orders API documentation](https://developer.paypal.com/docs/api/orders/v2/).
    """)
    @retry_on_error()
    def post(self):
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

@paypal_ns.route("/paypal/orders/<order_id>/capture")
class OrderCapture(Resource):
    @paypal_ns.doc(description=
    """
    Captures an existing PayPal order.
    For detailed information on the request payload, response structure, and status codes,
    refer to the [PayPal Orders API documentation](https://developer.paypal.com/docs/api/orders/v2/).
    """)
    @retry_on_error()
    def post(self, order_id):
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

@paypal_ns.route("/paypal/orders/<order_id>")
class Order(Resource):
    @paypal_ns.doc(description=
    """
    Retrieves an existing PayPal order.
    For detailed information on the response structure, and status codes,
    refer to the [PayPal Orders API documentation](https://developer.paypal.com/docs/api/orders/v2/).
    """)
    @retry_on_error()
    def get(self, order_id):
        headers = {
            'Authorization': f"Bearer {access_token_cache}",
            'Content-Type': "application/json",
            'Prefer': "return=representation"
        }

        response = requests.get(f"{paypal_base_url}/v2/checkout/orders/{order_id}", headers=headers)

        return Response(
            response,
            status=response.status_code
        )
