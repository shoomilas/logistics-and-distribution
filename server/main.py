from fastapi import FastAPI
# from app.api.routes.api import router as api_router

app = FastAPI()

@app.get("/")
def read_root():
    return {
        "dataRecevied": "",
        "gains": "",
        "optimizeResult": [1,1,1]
    }

@app.post("/api/compute/")
def create_computation(to_compute):
    return { "result": f"{to_compute}"}
    