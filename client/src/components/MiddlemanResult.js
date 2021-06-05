import React from 'react'
import {calculate} from './../algo/MiddlemanSolverAlgo'

const MiddlemanResult = (props) => {
    let input = props.input

    input = {   // TODO: REMOVE
        singleCosts: [
            [8.0, 14.0, 17.0],
            [12.0, 9, 19],
            [12, 9, 7]
        ],
        supply: [20,30,15],
        costs: [10,12,15],
        demand: [10,28,27],
        prices: [30,25,30],
    }

    console.log("[MIDDLEMAN-RESULT] props.input");
    console.log(input);

    const outputData = calculate(input)
    console.log("[MIDDLEMAN-RESULT] ouputData.arrOut");
    console.log(outputData.arrOut);

    return (
        <div>
            Single Costs [0][0]: {input.singleCosts[0][0]} <br/>
            Single Costs [0][1]: {input.singleCosts[0][1]} <br/>
            Supplier[0]: {input.supply[0]} <br/>
            Supplier[1]: {input.supply[1]} <br/>
            Result: {outputData.result}
        </div>
    )
}

export default MiddlemanResult
