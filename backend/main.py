from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel
from typing import List, Optional
import jwt
import datetime

app = FastAPI(title="Dairy Eco Backend")

SECRET_KEY = "mysecretkey"
ALGORITHM = "HS256"

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")

# Models representing simple mock DB
class User(BaseModel):
    username: str
    email: str

class UserInDB(User):
    hashed_password: str

class Product(BaseModel):
    id: str
    name: str
    price: float
    description: str

class Token(BaseModel):
    access_token: str
    token_type: str

users_db = {}
products_db = [
    {"id": "1", "name": "A2 Milk", "price": 4.5, "description": "Farm Fresh Milk"},
]

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.datetime.utcnow() + datetime.timedelta(minutes=30)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

@app.post("/auth/register")
def register(user: User):
    if user.username in users_db:
        raise HTTPException(status_code=400, detail="Username already registered")
    users_db[user.username] = {
        "username": user.username,
        "email": user.email,
        "hashed_password": "hashed_" + user.username # Simplified password handling
    }
    return {"msg": "User registered successfully"}

@app.post("/auth/login", response_model=Token)
def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user_dict = users_db.get(form_data.username)
    if not user_dict or user_dict["hashed_password"] != "hashed_" + form_data.username:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password"
        )
    access_token = create_access_token(data={"sub": form_data.username})
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/products", response_model=List[Product])
def get_products():
    return products_db

@app.get("/orders")
def get_orders(token: str = Depends(oauth2_scheme)):
    # Requires authentication
    payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    username = payload.get("sub")
    return {"username": username, "orders": []}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
