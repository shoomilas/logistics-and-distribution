import React from 'react'
import {initializeData} from './../algo/Middleman'

const MiddlemanResult = (props) => {
    const input = props.input
    console.log("[MIDDLEMAN-RESULT] props.input");
    console.log(input);
    return (
        <div>
            Single Costs: {input.singleCosts[0][0]} <br/>
            Supplier: {input.supply[0]} <br/>
        </div>
    )
}

export default MiddlemanResult
