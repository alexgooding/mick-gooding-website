import os
import psycopg2
import requests


def create_db_connection():
    conn = psycopg2.connect(
        host="database",
        port="5432",
        database=os.environ['POSTGRES_DB'],
        user=os.environ['POSTGRES_USER'],
        password=os.environ['POSTGRES_PASSWORD']
    )

    return conn

def generate_paypal_access_token(paypal_base_url):
    url = f"{paypal_base_url}/v1/oauth2/token"
    headers = {
        'Content-Type': "application/x-www-form-urlencoded"
    }
    data = {
        'grant_type': "client_credentials",
    }   
    auth = (os.environ['PAYPAL_CLIENT_ID'], os.environ['PAYPAL_CLIENT_SECRET'])
    
    response = requests.post(url=url, headers=headers, data=data, auth=auth)
    
    return response.json()['access_token']
