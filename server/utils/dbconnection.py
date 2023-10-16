from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import os
from dotenv import load_dotenv


load_dotenv()
uri = os.getenv("DB_URI")
client = MongoClient(uri, server_api=ServerApi('1'))


def connect_to_mongodb():
    try:
        client.admin.command('ping')
        print("Connected to MongoDB successfully!")
        return client
    except Exception as e:
        print("Failed to connect to MongoDB:", e)
        return None


def disconnect_from_mongodb(client):
    if client:
        client.close()
        print("Disconnected from MongoDB")

# You can also define other database-related functions here.
