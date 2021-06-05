import React, { useRef, useState } from "react";
import DynamicTable from './DynamicTable' 
import {initializeData} from './../algo/Middleman'
import styles from "./DistributionSolver.module.css";
import _ from "lodash";

const MiddlemanSolver = () => {
    const rowsInputRef = useRef();
    const colsInputRef = useRef();
    const [solverInput, setSolverInput] = useState(<div></div>);    
    const [outcomeComponent, setOutcomeComponent] = useState(<div></div>);
    const [singleCostArray, setSingleCostArray] = useState()
    // const [suppliersArray, setSuppliersArray] = useState([])
    
    let nRows = 4
    let nCols = 4
    let nProfitAtTheEnd, nExpense

    console.log("[MiddlemanSolver.js: SingleCostsTable]");
    console.log(singleCostArray);

    const prepOutcome = (event) => {
        // TODO: Why is it not able to access dateArray from inside of this function????
        console.log("[SOLVE CLICKED] singleCostArray:"); 
        console.log(singleCostArray);
        const returnedElem = () => (<div>
            {/* <h3>{singleCostArray[0][0]}</h3> */}
            <h2>Why is it not able to access dateArray from inside of this function????</h2>
        </div>)
        setOutcomeComponent(returnedElem)
    }

    const prepInputForms = (event) => {
        event.preventDefault(); 
        let suppliersArr = []
        const refreshSingleCosts = (outputData) => {
            // console.log("[OUTPUT FROM DYNAMIC TABLE]");
            // console.log(outputData);
            setSingleCostArray(outputData)
        }
        setSingleCostArray(Array.from({length: rowsInputRef.current.value},() => Array.from({length: colsInputRef.current.value}, () => 0)))
        const SuppliersInput = () => (<>{_.range(0,rowsInputRef.current.value).map((x) => <div>
                <form>
                    <p><b>Supplier #{x}</b></p>
                    <label>Supply:</label>
                    <input type="number" name="supply" defaultValue="0" min="0" onChange={ (e) => {
                        suppliersArr[x] = e.value
                        console.log(`Setting suppliersArr[${x}] as ${e.currentTarget.value}`)
                    } }/>
                    <label>Cost:</label>
                    <input type="number" name="cost" defaultValue="0" min="0"/>
                </form>
            </div>)}</>)
        
        const BuyersInput = () => (<>{_.range(0,colsInputRef.current.value).map((x) => <div>
            <form>
                <p><b>Buyer #{x}</b></p>
                <label>Demand:</label><input   type="number" name="demand" defaultValue="0" min="1"  />
                <label>Price:</label><input  type="number" name="price" defaultValue="0" min="1"  />
            </form>
        </div>)}</>)

        const returnedElem = () => (
            <>
                <div style={{display: "flex"}}>
                <div style={{flex: "50%"}}><SuppliersInput/></div>
                <div style={{flex: "50%"}}><BuyersInput/></div>
                </div>
                <h1>Single cost input</h1>
                <DynamicTable handleDataEdit={refreshSingleCosts} rows={rowsInputRef.current.value} cols={colsInputRef.current.value} rowsLabel="O" colsLabel="D" defaultValue={0}/>
                <div className={styles.buttons}>
                    {/* <button onClick={prepOutcome}>Solve</button> */}
                    <button onClick={prepOutcome}>Solve</button>
                </div>
            </>
        );
        setSolverInput(returnedElem);
      };

    return (
        <div className={styles["distributionsolver"]}>
        <h1>Middleman problem solver</h1>      
        <p>Please input the suppliers/buyers config data</p>
        <fieldset>
            <form>
                <legend>Input Config</legend>
                <label>Suppliers:</label>
                <input ref={rowsInputRef} type="number" name="rows" defaultValue="3" min="1" max ="40"/>
                <label>Buyers:</label>
                <input ref={colsInputRef} type="number" name="cols" defaultValue="3" min="1" max="16"/>
            </form>
        </fieldset>
        <div className={styles.buttons}>
            <button onClick={prepInputForms}>Accept</button>
        </div>
        <hr/>
        {solverInput}
        <hr/>
        {outcomeComponent}
        </div>
    )
}

export default MiddlemanSolver