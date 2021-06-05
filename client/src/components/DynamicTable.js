import React, { useState} from "react";
import styles from "./DynamicTable.module.css";
import _ from "lodash";

const DynamicTable = (props) => {
  
  const rowsLabel = props.rowsLabel
  const colsLabel = props.colsLabel
  const defaultValue = (props.defaultValue == undefined) ? null : props.defaultValue
  const rows = props.rows;
  const cols = props.cols;
  const [msg, setMsg] = useState("...");
  const [data, setData] = useState(
    Array.from({length: rows},()=> Array.from({length: cols}, () => defaultValue))
  );
  
  const handleChange2d = (arr, setter, row, column, value) => {
    let copy = [...arr];
    copy[row][column] = value;
    setter(copy);
    console.log(`[UPDATE ARRAY] ${copy}`);

    props.handleDataEdit(data)
  };

  const handleDataEdit = (e,row,col) => {
    let val = parseFloat(e.currentTarget.textContent) 
    setMsg(`data[${row}][${col}] = ${val}`)
    handleChange2d(data, setData, row, col, val)
    console.log(`[UPDATE] data[${row}][${col}] = ${val}`);
  }

  return (
    <div className={styles["dynamic-table-div"]}>
      <center>
        <table className={styles["dynamic-table"]}>
          <th scope="col"></th>
          {_.range(cols).map((col) => (
            <th scope="col">{rowsLabel}{col}</th>
          ))}
          <tbody>
          {_.range(rows).map((row) => (
            <tr>
              <td><span className={styles['row-header']}>{props.colsLabel}{row}</span></td>
              {_.range(cols).map((col) => (
                <td contentEditable
                  onInput={(e) => handleDataEdit(e, row,col) }
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