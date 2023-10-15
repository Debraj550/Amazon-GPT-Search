from fastapi import FastAPI
import uvicorn
import json
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from fastapi.responses import JSONResponse
from dotenv import load_dotenv
import os

load_dotenv()
app = FastAPI()

uri = os.getenv("DB_URI")
client = MongoClient(uri, server_api=ServerApi('1'))
try:
    client.admin.command('ping')
    print("--------------------\n Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)


# post function takes a query then process and send it to gpt
# gpt resoponse then map to database values
# fetch and give resp .///// hackonadmin, hackonadmin

@app.get("/search-product/{query}")
async def search_product(query: str):
    try:
        productDatabase = client["ProductDatabase"]
        airConditionersCollections = productDatabase["AirConditioners"]
        cursor = airConditionersCollections.find(
            {"name": {"$regex": query, "$options": "i"}})
        product_data = [dict(product, _id=str(product["_id"]))
                        for product in cursor]
        return JSONResponse(content=product_data)
    except Exception as e:
        return JSONResponse(content={"error": str(e)})


@app.get("/get-all-products")
async def read_csv():
    try:
        productDatabase = client["ProductDatabase"]
        airConditionersCollections = productDatabase["AirConditioners"]
        cursor = airConditionersCollections.find()
        product_data = [dict(product, _id=str(product["_id"]))
                        for product in cursor]
        return JSONResponse(content=product_data)

    except Exception as e:
        return {"error check": str(e)}


if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
