import React, { useState, useRef } from "react";
import styles from "./DynamicTable.module.css";
import _, { thru } from "lodash";

const DynamicTable = (props) => {
  const rows = props.rows;
  const cols = props.cols;
  const [msg, setMsg] = useState("...");
  
  // const [data, setData] = useState([rows][cols]);
  const [data, setData] = useState(
    Array.from({length: rows},()=> Array.from({length: cols}, () => null))
  );

  const [gains, setGains] = useState(Array.from({length: cols}), () => null)
  const [pieces, setPieces] = useState(Array.from({length: cols}), () => null)
  const [constraints, setConstraints] = useState(Array.from({length: rows}), () => null)

  const handleChange2d = (arr, setter, row, column, value) => {
    let copy = [...arr];
    copy[row][column] = +value;
    setter(copy);
    console.log(`[UPDATE ARRAY] ${copy}`);
  };

  const handleChange1d = (arr, setter, row, value) => {
    let copy = [...arr];
    copy[row] = +value;
    setter(copy);
  };

  const handleDataEdit = (e,row,col) => {
    let val = parseInt(e.currentTarget.textContent) 
    setMsg(`data[${row}][${col}] = ${val}`)
    handleChange2d(data, setData, row, col, val)
    console.log(`[UPDATE] data[${row}][${col}] = ${val}`);
  }
  
  const handleLimitEdit = (e,row) => {
    let val = parseInt(e.currentTarget.textContent) 
    // setMsg(`limit[${row}] = ${val}`)
    // console.log(`limit: ${val}, ${row}`);
    handleChange1d(constraints, setConstraints, row, val)
    setMsg(`constraints[${row}] = ${val}`)
    console.log(`[UPDATE] constraints[${row}] = ${val}`);
  }

  const handleGainEdit = (e,col) => {
    let val = parseInt(e.currentTarget.textContent) 
    handleChange1d(gains, setGains, col, val)
    setMsg(`gain[${col}] = ${val}`)
    console.log(`[UPDATE] gains[${col}] = ${val}`);
  } 

  const handlePiecesEdit = (e,col) => {
    let val = parseInt(e.currentTarget.textContent) 
    // setMsg(`pieces[${col}] = ${val}`)
    // console.log(`pieces: ${val}, ${col}`);

    handleChange1d(pieces, setPieces, col, val)
    setMsg(`pieces[${col}] = ${val}`)
    console.log(`[UPDATE] pieces[${col}] = ${val}`);
  }

  const loadData = (e) => {
    setMsg(`Data loaded: ${data}`);
  };

  const sendComputationDataToServer = async () => {
    setMsg("Data sent to the server. Processing...")
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "text/plain"); 
    var raw = JSON.stringify({
      "values": data,
      "constraints": constraints,
      "pieces": pieces,
      "gains": gains
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    const handleResult = (result) => {
      setMsg(result)
    }
    
    const handleError = (error) => {
      setMsg(error)
      console.log('[ERROR]', error)
    }

    await fetch("http://127.0.0.1:8000/api/distribution/", requestOptions)
      .then(response => response.text())
      .then(result =>  handleResult(result)) // console.log('[RESULT] ', result))
      .catch(error => handleError(error)); 
  }

  return (
    <div className={styles["dynamic-table-div"]}>
      <center>
        <table className={styles["dynamic-table"]}>
          <th scope="col"></th>
          {_.range(cols).map((col) => (
            <th scope="col">P{col}</th>
          ))}
          <th scope="col">Constraints</th>
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
          <button onClick={sendComputationDataToServer}>Send Data</button>
      </div>
    </div>
  );
};

export default DynamicTable;