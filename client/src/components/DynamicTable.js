import React, { useState, useRef } from "react";
import styles from "./DynamicTable.module.css";
import _ from "lodash";

const DynamicTable = (props) => {
  const rows = props.rows;
  const cols = props.cols;
  const [msg, setMsg] = useState("...");
  const [data, setData] = useState([rows][cols]);

  const handleEdit = (e,row,col) => {
    let html = parseInt(e.currentTarget.textContent) 
    setMsg(`data[${row}][${col}] = ${html}`)
    console.log(`html: ${html}, ${row} x ${col}`);
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
            <th scope="col">M{col}</th>
          ))}
          <tbody>
          {_.range(rows).map((row) => (
            <tr>
              <td><span className={styles['row-header']}>P{row}</span></td>
              {_.range(cols).map((col) => (
                <td contentEditable
                  onInput={(e) => handleEdit(e, row,col) }
                  suppressContentEditableWarning={true}>
                </td>
              ))}
            </tr>
          ))}
          </tbody>
        </table>
      </center>
      <p>{msg}</p>
    </div>
  );
};

export default DynamicTable;