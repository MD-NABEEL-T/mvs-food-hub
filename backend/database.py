'''from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017/")
db = client["foodapp"]
users_collection = db["users"]
    
print("✅ MongoDB connected successfully!")

'''
from pymongo import MongoClient
from bson.objectid import ObjectId

# Connect to MongoDB
client = MongoClient("mongodb://localhost:27017/")

db = client["foodapp"]


users_collection = db["users"]


users = list(users_collection.find({}))


if users:
    print(type(users))
else:
    print("No users found in the database.")
