from fastapi import FastAPI
import uvicorn
import pandas as pd

app = FastAPI()


@app.get("/read-csv")
def read_csv():
    try:
        csv_file_path = "../server/dataset/archive/air conditioners.csv"
        df = pd.read_csv(csv_file_path)
        print("---------", df)
        data = df.to_dict(orient="records")
        print("---------", data)
        return data

    except Exception as e:
        return {"error": str(e)}


if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
