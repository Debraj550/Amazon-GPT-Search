from fastapi.responses import JSONResponse
import re
from utils.gptsearch import gpt_response


def search_product(client, query: str):
    try:
        gpt_res = gpt_response(query)
        productDatabase = client["ProductDatabase"]
        airConditionersCollections = productDatabase["AirConditioners"]
        regex_pattern = re.compile(query, re.IGNORECASE)
        cursor = airConditionersCollections.find(
            {"name": {"$regex": regex_pattern}}
        )

        product_data = [dict(product, _id=str(product["_id"]))
                        for product in cursor]

        return JSONResponse(content=product_data)
    except Exception as e:
        return JSONResponse(content={"error": str(e)})


def read_csv(client):
    try:
        productDatabase = client["ProductDatabase"]
        airConditionersCollections = productDatabase["AirConditioners"]
        cursor = airConditionersCollections.find()
        product_data = [dict(product, _id=str(product["_id"]))
                        for product in cursor]
        return JSONResponse(content=product_data)
    except Exception as e:
        return JSONResponse(content={"error check": str(e)})
