from fastapi import FastAPI
import uvicorn
import pandas as pd
import json

app = FastAPI()


@app.get("/read-csv")
async def read_csv():
    try:
        csv_file_path = "../server/dataset/archive/air conditioners.csv"
        df = pd.read_csv(csv_file_path)
        data = df.to_json(orient="records")
        # data1 = json.loads(data)
        # print(type(data1))
        return data

    except Exception as e:
        return {"error": str(e)}


if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
