import time
from fastapi import FastAPI
# from app.api.routes.api import router as api_router
from pydantic import BaseModel
from typing import Optional
from fastapi.middleware.cors import CORSMiddleware
import pulp as pl
from pulp import LpMaximize, LpProblem, LpStatus, lpSum, LpVariable

import math
from scipy.optimize import linprog
import numpy as np

class distribution_data(BaseModel):
    values: Optional[list]
    constraints:list
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
    result = compute_result_pulp(distribution_data)
    # return {"input": distribution_data.__dict__, "result": result}
    return result

@app.post("/api/distribution2/")
def create_distribution(distribution_data: distribution_data):
    result = compute_result_pulp(distribution_data)
    # return {"input": distribution_data.__dict__, "result": result}
    return { result }

def compute_result_pulp(distribution_data: distribution_data):
    result = {}
    result['x_i']={}
    products_no = len(distribution_data.gains)
    materials_no = len(distribution_data.constraints)
    x = {i: LpVariable(name=f"x{i}", lowBound=0) for i in range(products_no)}
    model = LpProblem(name="resource-distribution", sense=LpMaximize)

    for i in range(products_no):
        up =  distribution_data.pieces_max[i]
        if up != None: x[i].upBound = up
        
        low = distribution_data.pieces_min[i]
        if low != None: x[i].lowBound = low
    
    for i in range(materials_no):
        model += lpSum([ (x[j] * distribution_data.values[i][j] ) for j in range(products_no) ]) <=  distribution_data.constraints[i]
    
    print(distribution_data.values) 
    for i in range(materials_no):
        print(lpSum([ (x[j] * float(distribution_data.values[i][j]*2) ) for j in range(products_no) ]) <=  distribution_data.constraints[i]) 
    model += lpSum( [ (x[i] * float(distribution_data.gains[i]) ) for i in range(products_no) ] )
    
    
    print(model)
    print("===")
    status = model.solve()
    print(f"status: {model.status}, {LpStatus[model.status]}")
    print(f"objective: {model.objective.value()}")

    for var in x.values():
        print(f"{var.name}: {var.value()}")
        result['x_i'][f"{var.name}"] = var.value()
        
    for name, constraint in model.constraints.items():
        print(f"{name}: {constraint.value()}")

    result['optimized'] = f"{model.objective.value()}"
    return result

# def compute_result_pulp2(distribution_data):
#     model = LpProblem(name="resource-allocation", sense=LpMaximize)
#     # products_len = len(distribution_data.gains) # number of products
#     # x = {i: LpVariable(name=f"x{i}", lowBound=0) for i in range(0, products_len)}
#     # materials_len = len(distribution_data.constraints)
#     # for i in range (0,materials_len):
#     #     model += lpSum( distribution_data.values[]  )
#     #     model += lpSum( x[0] * distribution_data.values[i][0] )

#     #############################
#     # x = {i: LpVariable(name=f"x{i}", lowBound=0) for i in range(1, 4)}
#     # x[1].upBound=200
#     # x[2].upBound=120
#     # x[3].upBound=60
#     # model += (5*x[1] + 3*x[2] + 1 * x[3] <= 3600, "Mat 1")
#     # model += (1*x[1] + 2*x[2] + 4 * x[3] <= 4800, "Mat 2")
#     # model += 1800*x[1] + 2400 * x[2] + 3000 * x[3]
#     #############################
#     x = {i: LpVariable(name=f"x{i}", lowBound=0) for i in range(1, 3)}
#     model += (2*x[1] + 1*x[2] <= 1000, "Mat 1")
#     model += (3*x[1] + 3*x[2] <= 2400, "Mat 2")
#     model += (1.5*x[1] + 2*x[2] <= 600, "Mat 3")
#     model += 15*x[1] + 20 * x[2] 
    
    
#     # Solve the optimization problem
#     print(model)
#     print("===")
#     status = model.solve()
#     # Get the results
#     print(f"status: {model.status}, {LpStatus[model.status]}")
#     print(f"objective: {model.objective.value()}")

#     for var in x.values():
#         print(f"{var.name}: {var.value()}")

#     for name, constraint in model.constraints.items():
#         print(f"{name}: {constraint.value()}")

#     result = f"{model.objective.value()}"
#     print(result)
#     return {'res': result}

# def define_bounds(min_bounds, max_bounds):
#     bounds = []
#     for bound in zip(min_bounds,max_bounds):
#         min = bound[0]
#         max = bound[1]
#         # if(min==None): min = -math.inf
#         # if(max==None): max = math.inf
        
#         # if(min==None): min = -math.inf
#         # if(max==None): max = 0

#         if(min==None): min = 0
#         if(max==None): max = math.inf

#         # bound=(min,max)
#         bound=(max,min)
#         bounds.append(bound)
#     return bounds

# def compute_result2(distribution_data: distribution_data): # Trying to maximize
#     defined_bounds = define_bounds(distribution_data.pieces_min, distribution_data.pieces_max)
#     gains = [-x for x in distribution_data.gains]
#     constraints = [-x for x in distribution_data.constraints]
#     constraints = distribution_data.constraints

#     print(f"VALUES: {distribution_data.values}")
#     print(f"CONSTRAINTS: {constraints}")
#     print(f"BOUNDS: {defined_bounds}")
#     print(f"GAINS: {gains}")

#     opt = linprog(
#         # c =  np.transpose(gains),     
#         c = gains,
#         A_ub=distribution_data.values,
#         b_ub=constraints,
#         bounds = defined_bounds,
#         method="revised simplex",
#         options={"disp": True}
#     ) 

#     result = f"{opt}"
#     print(result)
#     return {'fun': -opt['fun'], "msg": opt['message'], "x": list(opt['x'])}

# def compute_result(distribution_data: distribution_data): # original but it minimizes
#     defined_bounds = define_bounds(distribution_data.pieces_min, distribution_data.pieces_max)
#     print(f"VALUES: {distribution_data.values}")
#     print(f"CONSTRAINTS: {distribution_data.constraints}")
#     print(f"BOUNDS: {defined_bounds}")
    
#     opt = linprog(
#         c= distribution_data.gains,   #
#         A_ub=distribution_data.values,
#         b_ub=distribution_data.constraints,
#         bounds = defined_bounds,
#         method="revised simplex",
#     ) 

#     result = f"{opt}"
#     print(result)
#     return {'fun': opt['fun'], "msg": opt['message'], "x": list(opt['x'])}

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
    #     method="simplex