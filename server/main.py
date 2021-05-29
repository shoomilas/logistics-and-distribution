import time
from fastapi import FastAPI
# from app.api.routes.api import router as api_router
from pydantic import BaseModel
from typing import Optional
from fastapi.middleware.cors import CORSMiddleware

class DistributionData(BaseModel):
    values: Optional[list]
    constraints: Optional[list]
    gains: list
    pieces: Optional[list]

class ComputationDataTest(BaseModel):
    name: str
    description: Optional[str]
    numbah: list

app = FastAPI()
origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {
        "dataRecevied": "",
        "gains": "",
        "optimizeResult": [1,1,1]
    }

@app.post("/api/distribution/")
def create_distribution(distributionData: DistributionData):
    # print(distributionData)
    # values = distributionData.values
    # constraints = distributionData.values
    print(distributionData.__dict__)
    print("========")

    return distributionData.__dict__

    # pieces = to_compute.pieces
    # gains = to_compute.gains
    # x = [0.0, 0.0, 0.0]
    
    # return { "pieces": f"{pieces}", "gains": f"{gains}", "x": f"{x}"}
    
@app.post("/api/distribution2/")
def create_distribution2(to_compute: ComputationDataTest):
    print(to_compute)
    sth_else = to_compute.numbah[0] + to_compute.numbah[1]
    time.sleep(2) 
    return { "result": f"{to_compute.__dict__}", "sum": f"{sth_else}" }
    # return { "some": "here" }

def compute_result(): pass