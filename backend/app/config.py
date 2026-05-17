import os
from datetime import timedelta

class Config:
    SECRET_KEY = os.environ.get("SECRET_KEY", "dev-secret-key")
    JWT_SECRET_KEY = os.environ.get("JWT_SECRET_KEY", "dev-jwt-secret")
    JWT_TOKEN_LOCATION = ['headers']
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=1)
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    if os.environ.get("DATABASE_URL"):
        SQLALCHEMY_DATABASE_URI = os.environ.get("DATABASE_URL").replace("postgres://", "postgresql://")
    else:
        DB_USER = os.environ.get('DB_USER', 'user')
        DB_PASSWORD = os.environ.get('DB_PASSWORD', 'password')
        DB_HOST = os.environ.get('DB_HOST', 'db')
        DB_NAME = os.environ.get('DB_NAME', 'invictus_db')
        SQLALCHEMY_DATABASE_URI = f"postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:5432/{DB_NAME}"