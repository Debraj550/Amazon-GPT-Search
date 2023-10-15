import subprocess

mongodb_host = ""
mongodb_port = "27017"
database_name = "your-database-name"
collection_name = "your-collection-name"
csv_file_path = "/path/to/your/csv/file.csv"

# mongoimport --uri mongodb+srv://hackonadmin:hackonadmin@hackon-amazon-s3.usvwn6s.mongodb.net/ProductDatabase --collection AirConditioners --type csv --file /Users/debraj/Desktop/Projects/Amazon-GPT-Search/server/dataset/archive/AirConditioners.csv
# Build the mongoimport command
mongoimport_command = [
    "mongoimport",
    "--host", mongodb_host,
    "--port", mongodb_port,
    "--db", database_name,
    "--collection", collection_name,
    "--type", "csv",
    "--file", csv_file_path,
    "--headerline"
]

# Execute the mongoimport command using subprocess
try:
    subprocess.run(mongoimport_command, check=True)
    print("CSV data successfully imported into MongoDB.")
except subprocess.CalledProcessError as e:
    print(f"Error while running mongoimport: {e}")
