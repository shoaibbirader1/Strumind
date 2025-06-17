from fastapi import APIRouter

router = APIRouter()

@router.get('/')
def list_users():
    return ["List users endpoint (stub)"]

@router.get('/{user_id}')
def get_user(user_id: int):
    return {"user_id": user_id, "message": "Get user endpoint (stub)"}

@router.put('/{user_id}')
def update_user(user_id: int):
    return {"user_id": user_id, "message": "Update user endpoint (stub)"}

@router.delete('/{user_id}')
def delete_user(user_id: int):
    return {"user_id": user_id, "message": "Delete user endpoint (stub)"} 