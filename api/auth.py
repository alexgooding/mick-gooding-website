import os
import psycopg2
import requests


PAYPAL_SANDBOX_BASE_URL = "https://api-m.sandbox.paypal.com"
PAYPAL_PRODUCTION_BASE_URL = "https://api-m.paypal.com"


def create_db_connection():
    conn = psycopg2.connect(
        host="localhost",
        port="5432",
        database=os.environ['DB_NAME'],
        user=os.environ['DB_USERNAME'],
        password=os.environ['DB_PASSWORD']
    )

    return conn

def generate_paypal_access_token():
    base_url = PAYPAL_SANDBOX_BASE_URL if os.environ['PAYPAL_CLIENT_MODE'] == "SANDBOX" else PAYPAL_PRODUCTION_BASE_URL
    url = f"{base_url}/v1/oauth2/token"
    headers = {
        'Content-Type': "application/x-www-form-urlencoded"
    }
    data = {
        'grant_type': "client_credentials",
    }   
    auth = (os.environ['PAYPAL_CLIENT_ID'], os.environ['PAYPAL_CLIENT_SECRET'])
    
    response = requests.post(url, headers=headers, data=data, auth=auth)
    
    return response.json()['access_token']
