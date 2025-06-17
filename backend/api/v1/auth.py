from fastapi import APIRouter, Depends

router = APIRouter()

@router.post('/register')
def register():
    return {"message": "Register endpoint (stub)"}

@router.post('/login')
def login():
    return {"message": "Login endpoint (stub)"}

@router.get('/me')
def get_current_user():
    return {"message": "Get current user endpoint (stub)"} 