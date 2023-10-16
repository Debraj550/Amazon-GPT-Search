from fastapi import FastAPI
import uvicorn
import json
from fastapi.responses import JSONResponse
from dotenv import load_dotenv
import os
from fastapi.middleware.cors import CORSMiddleware
import google_auth_oauthlib.flow
import googleapiclient.discovery
import googleapiclient.errors
from utils.dbconnection import connect_to_mongodb, disconnect_from_mongodb
from api.product_api import search_product, read_csv

load_dotenv()
app = FastAPI()
client = connect_to_mongodb()
# Enable cors
origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


youtube_api_key = os.getenv("YOUTUBE_API_KEY")


@app.get("/videos/{query}")
async def response(query: str):
    youtube = googleapiclient.discovery.build(
        "youtube", "v3", developerKey=youtube_api_key)
    request = youtube.search().list(

        part="snippet",
        maxResults=5,
        # order="rating",
        q=query,
        regionCode="IN",
        # type="video"
    )

    response = request.execute()
    # return response
    video_data = []
    for item in response.get("items", []):
        video_id = item["id"]["videoId"]
        title = item["snippet"]["title"]
        thumbnail_url = item["snippet"]["thumbnails"]["default"]["url"]
        video_url = f"https://www.youtube.com/watch?v={video_id}"
        video_data.append({
            "title": title,
            "video_url": video_url,
            "thumbnail_url": thumbnail_url,
            "video_id": video_id
        })

    return video_data


@app.get("/search-product/{query}")
async def search_product_endpoint(query: str):
    return search_product(client, query)


@app.get("/get-all-products")
async def read_csv_endpoint():
    return read_csv(client)


if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
    disconnect_from_mongodb(client)
