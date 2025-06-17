from fastapi import APIRouter

router = APIRouter()

@router.get('/')
def list_projects():
    return ["List projects endpoint (stub)"]

@router.get('/{project_id}')
def get_project(project_id: int):
    return {"project_id": project_id, "message": "Get project endpoint (stub)"}

@router.post('/')
def create_project():
    return {"message": "Create project endpoint (stub)"}

@router.put('/{project_id}')
def update_project(project_id: int):
    return {"project_id": project_id, "message": "Update project endpoint (stub)"}

@router.delete('/{project_id}')
def delete_project(project_id: int):
    return {"project_id": project_id, "message": "Delete project endpoint (stub)"} 