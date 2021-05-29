import time
from fastapi import FastAPI
# from app.api.routes.api import router as api_router
from pydantic import BaseModel
from typing import Optional
from fastapi.middleware.cors import CORSMiddleware

import math
from scipy.optimize import linprog
import numpy as np

class distribution_data(BaseModel):
    values: Optional[list]
    constraints: Optional[list]
    gains: list
    pieces_min: Optional[list]
    pieces_max:  Optional[list]

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
def create_distribution(distribution_data: distribution_data):
    print(distribution_data.__dict__)
    print("========")
    result = compute_result(distribution_data)
    # return {"input": distribution_data.__dict__, "result":result}
    return {"input": distribution_data.__dict__, "result": distribution_data.__dict__}
    
@app.post("/api/distribution2/")
def create_distribution(distribution_data: distribution_data):
    print(distribution_data.__dict__)
    print("========")
    result = compute_result2(distribution_data)
    return {"input": distribution_data.__dict__, "result": result}

def define_bounds(min_bounds, max_bounds):
    bounds = []
    for bound in zip(min_bounds,max_bounds):
        min = bound[0]
        max = bound[1]
        if(min==None): min = 0
        if(max==None): max = math.inf
        bound=(min,max)
        bounds.append(bound)
    return bounds

def compute_result2(distribution_data: distribution_data): # original but it minimizes
    defined_bounds = define_bounds(distribution_data.pieces_min, distribution_data.pieces_max)
    print(f"VALUES: {distribution_data.values}")
    print(f"CONSTRAINTS: {distribution_data.constraints}")
    print(f"BOUNDS: {defined_bounds}")
    
    opt = linprog(
        c=distribution_data.gains,
        A_ub=distribution_data.values,
        b_ub=distribution_data.constraints,
        bounds = defined_bounds,
        method="revised simplex"
    ) 

    result = f"{opt}"
    print(result)
    return {'fun': opt['fun'], "msg": opt['message'], "x": list(opt['x'])}


def compute_result(distribution_data: distribution_data): # original but it minimizes
    defined_bounds = define_bounds(distribution_data.pieces_min, distribution_data.pieces_max)
    print(f"VALUES: {distribution_data.values}")
    print(f"CONSTRAINTS: {distribution_data.constraints}")
    print(f"BOUNDS: {defined_bounds}")
    
    opt = linprog(
        c=distribution_data.gains,
        A_ub=distribution_data.values,
        b_ub=distribution_data.constraints,
        bounds = defined_bounds,
        method="revised simplex"
    ) 

    result = f"{opt}"
    print(result)
    return {'fun': opt['fun'], "msg": opt['message'], "x": list(opt['x'])}

       # # bounds=[
    #     #     (-200, 0),
    #     #     (120, float("inf")),
    #     #     (60, float("inf")) ],
    #     # bounds=[
    #     #     (200, float("inf")),
    #     #     (120, 0),
    #     #     (60, 0) ],

        
    #     bounds=[
    #         (200, 200),
    #         (120, math.inf),
    #         (60, math.inf)
    #     ],
    #     method="simplex"

    # valuies             constraints           gains                pieces
    # tabelka_wartosc, limity_wartosci, zyski_wartosci, ograniczenia_wartosci
    # lhs_ineq,       rhs_ineq,           obj,              ograniczenia
    # opt = linprog(c=obj, A_ub=lhs_ineq, b_ub=rhs_ineq, bounds=bnd, method="simplex") 
    # opt = linprog(c=distribution_data.gains, 
    #     A_ub=distribution_data.constraints,
    #     b_ub=distribution_data.constraints,
    #     bounds=distribution_data.pieces,
    #     method="simplex"
    # ) 