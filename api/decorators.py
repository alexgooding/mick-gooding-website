from flask_restx import abort
from werkzeug.exceptions import HTTPException, NotFound
from functools import wraps
from psycopg2 import OperationalError

from .auth import create_db_connection


def create_con_handle_exceptions(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        conn = None
        try:
            conn = create_db_connection()

            return func(*args, conn=conn, **kwargs)
        except OperationalError as e:
            abort(401, message={e})
        except NotFound as e:
            message = e.description
            if hasattr(e, 'data'):
              message = e.data.get('message')
            abort(e.code, message=message)
        except HTTPException as e:
            abort(e.code, message=e.description)
        except Exception as e:
            print(e)
            abort(500, message=f"Internal Server Error: {e}")
        finally:
            if conn and 'conn' not in kwargs:
                conn.close()

    return wrapper
