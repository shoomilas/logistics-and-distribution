import React, { useRef, useState } from "react";
import DynamicTable from "./DynamicTable";
import MiddlemanResult from "./MiddlemanResult";
import ErrorBoundary from "./ErrorBoundary"
import styles from "./DistributionSolver.module.css";
import _ from "lodash";

const MiddlemanSolver = () => {
  const rowsInputRef = useRef();
  const colsInputRef = useRef();
  const [solverInput, setSolverInput] = useState(<div></div>);
  const [outcomeComponent, setOutcomeComponent] = useState(<div></div>);
  const [singleCostArray, setSingleCostArray] = useState();

  let nRows = 4;
  let nCols = 4;
  let nProfitAtTheEnd, nExpense;

  console.log("[MiddlemanSolver.js: SingleCostsTable]");
  console.log(singleCostArray);

    let inputData
  
  const prepOutcome = (event) => {
    const returnedElem = () => (
      <div>
      {/* <ErrorBoundary> */}
        <MiddlemanResult input={inputData} />
      {/* </ErrorBoundary> */}
      </div>
    );

    setOutcomeComponent(returnedElem);
  };

  const prepInputForms = (event) => {
    event.preventDefault();
    let suppliers = +rowsInputRef.current.value
    let buyers = +colsInputRef.current.value
    
    inputData = {
        singleCosts: (Array(suppliers).fill(0).map(() => Array(buyers).fill(0.0))),
        supply: (new Array(suppliers)).fill(0),
        costs: (new Array(suppliers)).fill(0),
        demand: (new Array(buyers)).fill(0),
        prices: (new Array(buyers)).fill(0),
      };
    console.log(`SINGLE COSTS: ${inputData.singleCosts}`);

    const refreshSingleCosts = (outputData) => {
      inputData.singleCosts = outputData;
      setSingleCostArray(outputData);
    };

    const handleFormInput = (e, arrayToUpdate, index, arrayName='foo') => {
      arrayToUpdate[index] = +e.currentTarget.value;
      console.log(
        `Setting ${arrayName}[${index}] as ${arrayToUpdate[index]}`
      );
    };

    const SuppliersInput = () => (
      <>
        {_.range(0, rowsInputRef.current.value).map((x) => (
          <div>
            <form>
                <b>Supplier #{x}</b><br/>
              <label>Supply:</label>
              <input
                type="number"
                name="supply"
                defaultValue="0"
                min="0"
                onChange={(e) => handleFormInput(e, inputData.supply, x)}
              />
              <label>Cost:</label>
              <input
                type="number"
                name="cost"
                defaultValue="0"
                min="0"
                onChange={(e) => handleFormInput(e, inputData.costs, x)}
              />
            </form>
          </div>
        ))}
      </>
    );

    const BuyersInput = () => (
      <>
        {_.range(0, colsInputRef.current.value).map((x) => (
          <div>
            <form>
                <b>Buyer #{x}</b><br/>
              <label>Demand:</label>
              <input
                type="number"
                name="demand"
                defaultValue="0"
                min="1"
                onChange={(e) => handleFormInput(e, inputData.demand, x)}
              />
              <label>Price:</label>
              <input
                type="number"
                name="price"
                defaultValue="0"
                min="1"
                onChange={(e) => handleFormInput(e, inputData.prices, x)}
              />
            </form>
          </div>
        ))}
      </>
    );

    const returnedElem = () => (
      <>
        <div style={{ display: "flex" }}>
          <div style={{ flex: "50%" }}>
            <SuppliersInput />
          </div>
          <div style={{ flex: "50%" }}>
            <BuyersInput />
          </div>
        </div>
        <h1>Single cost input</h1>
        <DynamicTable
          handleDataEdit={refreshSingleCosts}
          rows={rowsInputRef.current.value}
          cols={colsInputRef.current.value}
          rowsLabel="B"
          colsLabel="S"
          defaultValue={0}
        />
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
          <input
            ref={rowsInputRef}
            type="number"
            name="rows"
            defaultValue="3"
            min="1"
            max="40"
          />
          <label>Buyers:</label>
          <input
            ref={colsInputRef}
            type="number"
            name="cols"
            defaultValue="3"
            min="1"
            max="16"
          />
        </form>
      </fieldset>
      <div className={styles.buttons}>
        <button onClick={prepInputForms}>Accept</button>
      </div>
      <hr />
      {solverInput}
      <hr />
      {outcomeComponent}
    </div>
  );
};

export default MiddlemanSolver;
