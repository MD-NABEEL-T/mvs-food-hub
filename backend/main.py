# main.py
from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from passlib.hash import bcrypt
from database import users_collection   

app = FastAPI(title="MVS Food Hub API (backend + static)")

# OPTIONAL: allow CORS during development (if you ever test from another origin)
# You can remove or restrict allow_origins in production.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Serve static frontend files from ./static at /static
app.mount("/static", StaticFiles(directory="static"), name="static")


# Request models
class SignupRequest(BaseModel):
    name: str
    email: EmailStr
    password: str


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


@app.get("/")
def root():
    return {"message": "MVS Food Hub API running"}


@app.post("/signup")
def signup(payload: SignupRequest):
    # Basic server-side validation
    if len(payload.password) < 8:
        raise HTTPException(status_code=400, detail="Password must be at least 8 characters")

    # Check for existing user by email
    if users_collection.find_one({"email": payload.email}):
        raise HTTPException(status_code=400, detail="Email already registered")

    # Hash password and insert
    try:
        user_doc = {
            "name": payload.name,
            "email": payload.email,
            "password": bcrypt.hash(payload.password)
        }
        result = users_collection.insert_one(user_doc)
        return {"message": "User registered successfully", "user_id": str(result.inserted_id)}
    except Exception as e:
        # Don't leak internal errors in production; fine for dev
        raise HTTPException(status_code=500, detail=f"Server error: {str(e)}")


@app.post("/login")
def login(payload: LoginRequest):
    user = users_collection.find_one({"email": payload.email})
    if not user:
        raise HTTPException(status_code=401, detail="Invalid email or password")

    # Verify hashed password
    try:
        if not bcrypt.verify(payload.password, user["password"]):
            raise HTTPException(status_code=401, detail="Invalid email or password")
    except Exception:
        # If verification fails for some reason, return generic auth error
        raise HTTPException(status_code=401, detail="Invalid email or password")

    return {"message": "Login successful", "user_id": str(user["_id"]), "name": user.get("name")}

