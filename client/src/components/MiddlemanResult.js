import React from 'react'
import {calculate} from './../algo/MiddlemanSolverAlgo'

import styles from "./DynamicTable.module.css";
import _ from "lodash";

const MiddlemanResult = (props) => {
    let input = props.input

    input = {   // TODO: REMOVE SET INPUT
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
        <div style={{whiteSpace: 'pre'}}>
            Single Costs [0][0]: {input.singleCosts[0][0]} <br/>
            Single Costs [0][1]: {input.singleCosts[0][1]} <br/>
            Supplier[0]: {input.supply[0]} <br/>
            Supplier[1]: {input.supply[1]} <br/>
            Result: {JSON.stringify(outputData, null, 4)}<br/>

            <div>Single Costs:
                <TableOver2DArray array={outputData.singleProfits}/>
            </div>

            <div>Routes:
                <TableOver2DArrayJson array={outputData.arrOut}/>
                {/* <TableOver2DArray array={outputData.routes}/> */}
            </div>

        </div>
    )
}

export default MiddlemanResult


const TableOver2DArrayJson = (props) => {
    let arrToDisplay = props.array
    let rows = arrToDisplay.length   
    let cols = arrToDisplay[0].length  

    return(
        <table style={{whiteSpace: 'pre', maxHeight: '100px', fontSize: 'xx-small'}}>
            {_.range(0,rows).map( (row) => 
            <tr>
                {
                    _.range(0,cols).map( (col)=> <td>{JSON.stringify(arrToDisplay[row][col])}</td>)
                    
                }
            </tr>)}
        </table>
    )

}

const TableOver2DArray = (props) => {
    let arrToDisplay = props.array
    let rows = arrToDisplay.length   
    let cols = arrToDisplay[0].length  

    return(
        <table className={styles["dynamic-table"]}>
            {_.range(0,rows).map( (row) => 
            <tr>
                {
                    _.range(0,cols).map( (col)=> <td>{+arrToDisplay[row][col]}</td>)
                }
            </tr>)}
        </table>
    )

}