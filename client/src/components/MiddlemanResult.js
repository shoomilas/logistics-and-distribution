import React from 'react'
import {calculate} from './../algo/MiddlemanSolverAlgo'

import styles from "./DynamicTable.module.css";
import _ from "lodash";

const MiddlemanResult = (props) => {
    let input = props.input
    let input1 = { // TODO: REMOVE SET INPUT
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

    let input2 = { // TODO: REMOVE SET INPUT
        singleCosts: [
            [8.0, 14.0, 17.0],
            [12.0, 9, 19]
            // [12, 9, 7]
        ],
        supply: [20,30],
        costs: [10,12],
        demand: [10,28,27],
        prices: [30,25,30],
    } 
    let input3 = { // TODO: REMOVE SET INPUT
        singleCosts: [
            [8.0, 14.0],
            [12.0, 9]
        ],
        supply: [20,30],
        costs: [10,12],
        demand: [10,28],
        prices: [30,25]
    }
    let input4 = { // Dla tego ma świrować?
        singleCosts: [
            [17.0,15.0,16.0],
            [7.0,7.0,1.0],
            [15.0,14.0,3.0]
        ],
        supply: [20,30,55],
        costs: [10,12,14],
        demand: [28,37,45],
        prices: [30,30,25]
    }

    let input5 = { // Dla tego ma świrować?
        singleCosts: [
            [4,7,2],
            [8,10,4],
        ],
        supply: [20,20],
        costs: [6,9],
        demand: [15,12,18],
        prices: [15,14,16]
    }
    let inputZieja = { // 4dx2o
        singleCosts: [
            [3,4],
            [5,6],
            [7,8],
            [9,10]
        ],
        supply: [20,30,10,10],
        costs: [10,12,9,8],
        demand: [30,44],
        prices: [30,25]
    }

    let inputEwe = {
        singleCosts: [
            [8,14],
            [12,9],
            [17,19],
            [10,15]
        ],
        supply: [20,30,27,14],
        costs: [10,12,30,20],
        demand: [10,28],
        prices: [30,25]
    }

    console.log("[MIDDLEMAN-RESULT] props.input");
    console.log(input);
    // const outputData = calculate(inputZieja)

    // const outputData = calculate(input)
    const outputData = calculate(input1)
    // const outputData = calculate(input2)
    // const outputData = calculate(input3)

    console.log("[MIDDLEMAN-RESULT] ouputData.arrOut");
    console.log(outputData.arrOut); 

    return (
        <div style={{whiteSpace: 'pre'}}>
            <ResultPresenter label="Single transportation costs"><TableOver2DArrayLabeled xLabel='O' yLabel='D' array={outputData.inputData.singleCosts}/></ResultPresenter>
            <br/>
            <ResultPresenter label="Single profits"><TableOver2DArrayLabeled xLabel='O' yLabel='D' array={outputData.singleProfitsArray}/></ResultPresenter>
            <br/>
            <ResultPresenter label="Routes table">
                <TableOver2DArrayLabeledString xLabel='O' yLabel='D' array={outputData.transportationPlan}/>
            </ResultPresenter>
            <br/>
            <ResultPresenter label="End Expense">
                {outputData.endExpense}
            </ResultPresenter>
            <br/>
            <ResultPresenter label="End Big Profit">
                {outputData.endBigProfit}
            </ResultPresenter>
            <br/>
            <ResultPresenter label="End Profit">
                {outputData.endProfit}
            </ResultPresenter>
            <br/>
            <hr/>
            <br/>
            {/* Result: {JSON.stringify(outputData, null, 4)}<br/> */}
            <div>arr state: // TODO: Routes here
                <TableOver2DArrayJson array={outputData.arrOut}/>
                {/* <TableOver2DArray array={outputData.routes}/> */}
            </div>
        </div>
    )
}

export default MiddlemanResult

const ResultPresenter = (props) => {
    return (
        <div style={{ display: "flex" }}>
            <div style={{ flex: "50%" }}>
            <b>{props.label}</b>
            </div>
            <div style={{ flex: "50%" }}>
                {props.children}
            </div>
        </div>
    )
}


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

const TableOver2DArrayLabeledString = (props) => {
    let arrToDisplay = props.array
    let xLabel = props.xLabel
    let yLabel = props.yLabel
    let rows = arrToDisplay.length   
    let cols = arrToDisplay[0].length  

    return(
        <table className={styles["dynamic-table"]}>
            <tr>
                <td></td>{_.range(0,cols).map( (col) => <td><b>{`${xLabel}${col}`}</b></td>)} 
            </tr>
            {_.range(0,rows).map( (row) => 
            <tr><td><b>{`${yLabel}${row}`}</b></td>
                {
                    _.range(0,cols).map( (col)=><td>{arrToDisplay[row][col]}</td>)
                }
            </tr>)}
        </table>
    )
}

const TableOver2DArrayLabeled = (props) => {
    let arrToDisplay = props.array
    let xLabel = props.xLabel
    let yLabel = props.yLabel
    let rows = arrToDisplay.length   
    let cols = arrToDisplay[0].length  

    return(
        <table className={styles["dynamic-table"]}>
            <tr>
                <td></td>{_.range(0,cols).map( (col) => <td><b>{`${xLabel}${col}`}</b></td>)} 
            </tr>
            {_.range(0,rows).map( (row) => 
            <tr><td><b>{`${yLabel}${row}`}</b></td>
                {
                    _.range(0,cols).map( (col)=><td>{+arrToDisplay[row][col]}</td>)
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