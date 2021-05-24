import React, { useState, useRef } from "react";
import styles from "./DynamicTable.module.css";
import _, { thru } from "lodash";

const DynamicTable = (props) => {
  const rows = props.rows;
  const cols = props.cols;
  const [msg, setMsg] = useState("...");
  const [data, setData] = useState([rows][cols]);

  const handleDataEdit = (e,row,col) => {
    let html = parseInt(e.currentTarget.textContent) 
    setMsg(`data[${row}][${col}] = ${html}`)
    console.log(`html: ${html}, ${row} x ${col}`);
  }

  const handleLimitEdit = (e,row) => {
    let html = parseInt(e.currentTarget.textContent) 
    setMsg(`limit[${row}] = ${html}`)
    console.log(`limit: ${html}, ${row}`);
  }

  const handleGainEdit = (e,col) => {
    let html = parseInt(e.currentTarget.textContent) 
    setMsg(`gain[${col}] = ${html}`)
    console.log(`gain: ${html}, ${col}`);
  } 

  const handlePiecesEdit = (e,col) => {
    let html = parseInt(e.currentTarget.textContent) 
    setMsg(`pieces[${col}] = ${html}`)
    console.log(`pieces: ${html}, ${col}`);
  }

  const loadData = (e) => {
    setMsg(`Data loaded: ${data}`);
  };

  return (
    <div className={styles["dynamic-table-div"]}>
      <center>
        <table className={styles["dynamic-table"]}>
          <th scope="col"></th>
          {_.range(cols).map((col) => (
            <th scope="col">P{col}</th>
          ))}
          <th scope="col">Limit</th>
          <tbody>
          {_.range(rows).map((row) => (
            <tr>
            <th scope="row">M{row}</th>
              {_.range(cols).map((col) => (
                <td contentEditable
                  onInput={(e) => handleDataEdit(e, row,col) }
                  suppressContentEditableWarning={true}>
                </td>
              ))}
              <td contentEditable
                  onInput={(e) => handleLimitEdit(e, row) }
                  suppressContentEditableWarning={true}></td>
            </tr>
          ))}
          
          <tr>
            <th scope="row">Gain</th>
            {_.range(cols).map((col) => (
                <td contentEditable
                  onInput={(e) => handleGainEdit(e,col) }
                  suppressContentEditableWarning={true}>
                </td>
              ))}
          </tr>
          <tr>
            <th scope="row">Piece(s)</th>
            {_.range(cols).map((col) => (
                <td contentEditable
                  onInput={(e) => handlePiecesEdit(e,col) }
                  suppressContentEditableWarning={true}>
                </td>
              ))}
          </tr>
          </tbody>
        </table>
      </center>
      <p>{msg}</p>
      <div className={styles.buttons}>
          <button onClick={()=>console.log("Data will be sent to the server")}>Send Data</button>
      </div>
    </div>
  );
};

export default DynamicTable;