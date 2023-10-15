import fastapi
from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import os
import google_auth_oauthlib.flow
import googleapiclient.discovery
import googleapiclient.errors


app = FastAPI(debug=True)


# origins = [
#     "http://localhost.tiangolo.com",
#     "https://localhost.tiangolo.com",
#     "http://localhost",
#     "http://localhost:4001",
#     "http://localhost:4000",
#     "http://localhost:59981",
# ]
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


api_key = "AIzaSyBhD5FzIGHoTs2k9zKiEyIU6fGZlZCoyuo"


@app.get("/videos/{query}")
async def response(query: str):
    youtube = googleapiclient.discovery.build(
        "youtube", "v3", developerKey=api_key)

    # search = f"samsungtabletunder60000graycolor"
    request = youtube.search().list(

        part="snippet",
        maxResults=10,
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


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
