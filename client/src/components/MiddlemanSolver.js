import React, { useRef, useState } from "react";
import DynamicTable from './DynamicTable' 
import {initializeData} from './../algo/Middleman'
import styles from "./DistributionSolver.module.css";
import _ from "lodash";

const MiddlemanSolver = () => {
    const rowsInputRef = useRef();
    const colsInputRef = useRef();
    const [solverInput, setSolverInput] = useState(<div></div>);    
    let nRows = 4;
    let nCols = 4;
    let nProfitAtTheEnd, nExpense;
    let inData = initializeData(nRows,nCols)

    const prepInputForms = (event) => {
        event.preventDefault(); 
        const BuyersInput = () => (<>I</>)

        const returnedElem = () =>(
            <>
                <BuyersInput/>
                <h1>Single cost input</h1>
                <DynamicTable rows={rowsInputRef.current.value} cols={colsInputRef.current.value} rowsLabel="O" colsLabel="D"/>
            </>
        );
        setSolverInput(returnedElem);
      };

    console.log(inData);

    return (
        <div className={styles["distributionsolver"]}>
        <h1>Optimal distribution problem</h1>      
        <p>Please input the suppliers/buyers config data</p>
        <fieldset>
            <form>
            <legend>Input Config</legend>
            <label>Buyers:</label>
            <input ref={rowsInputRef} type="number" name="rows" defaultValue="3" min="1" max ="40"/>
            <label>Suppliers:</label>
            <input ref={colsInputRef} type="number" name="cols" defaultValue="3" min="1" max="16"/>
            </form>
        </fieldset>
        <div className={styles.buttons}>
            <button onClick={prepInputForms}>Accept</button>
        </div>
        <hr />
        {solverInput}
        <hr/>
        </div>
    )
}

export default MiddlemanSolver