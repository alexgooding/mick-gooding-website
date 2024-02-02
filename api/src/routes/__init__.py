from flask_restx import Api

api = Api(
    version='1.0',
    title='Mick Gooding Website API',
    description='API for backend services',
    doc='/api/swagger-ui',
)
