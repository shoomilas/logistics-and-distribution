import React, { useRef, useState } from "react";
import DynamicTable from "./DynamicDistributionTable"
import styles from "./DistributionSolver.module.css";
import stylesMain from "./MainContent.module.css";

const DistributionSolver = () => {
  const rowsInputRef = useRef();
  const colsInputRef = useRef();
  const [solverTable, setSolverTable] = useState(<div></div>);

  const prepTable = (event) => {
    event.preventDefault();
    const returnedElem = (
      <DynamicTable rows={rowsInputRef.current.value} cols={colsInputRef.current.value}/>
    );
    setSolverTable(returnedElem);
  };

  return (
    <div className={`${styles["distributionsolver"]} ${stylesMain["align-item"]}`}>
      <h1>Optimal distribution problem</h1>      
      <p>Please input the table config data</p>
      <fieldset>
        <form>
          <legend>Input Config</legend>
          <label>Materials:</label>
          <input ref={rowsInputRef} type="number" name="rows" defaultValue="2" min="1" max ="40"/>
          <label>Products:</label>
          <input ref={colsInputRef} type="number" name="cols" defaultValue="2" min="1" max="16"/>
        </form>
      </fieldset>
      <div className={styles.buttons}>
        <button onClick={prepTable}>Prepare Table</button>
      </div>
      <hr />
      {solverTable}
    </div>
  );
};

export default DistributionSolver;
