

import math
from scipy.optimize import linprog
import numpy as np
def compute_result(distributionData): 
    distributionData = {
        'values': [[5,3,1],[1,2,4]],
        'gains': [1800, 2400, 3000],
        'constraints': [3600, 4800],
        'pieces': [1,1,1]
    } 


    print(distributionData['values'])    
    x0_bounds = (None, 200)
    x1_bounds = (120, math.inf)
    x2_bounds = (60, math.inf)


    opt = linprog(c=distributionData['gains'],  # optymalizujemy zyski
        A_ub=distributionData['values'],        # 
        b_ub=distributionData['constraints'], #?
        bounds=[x0_bounds, x1_bounds, x2_bounds],
        method="simplex")
    # ) 
    print(opt)


d = []
compute_result(d)
