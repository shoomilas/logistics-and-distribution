import React, { useState } from "react";
import styles from "./DynamicTable.module.css";
import _ from "lodash";

const DynamicTable = (props) => {
  const apiAddress = "http://127.0.0.1:8000/api/distribution/";
  const rows = props.rows;
  const cols = props.cols;
  const [msg, setMsg] = useState("...");
  const [data, setData] = useState(
    Array.from({ length: rows }, () => Array.from({ length: cols }, () => null))
  );
  let resultFromServer = {}
  
  const [gains, setGains] = useState(
    Float32Array.from({ length: cols }),
    () => null
  );
  const [pieces, setPieces] = useState(
    Array.from({ length: cols }),
    () => null
  );
  const [piecesMax, setPiecesMax] = useState(
    Array.from({ length: cols }),
    () => null
  );
  const [constraints, setConstraints] = useState(
    Array.from({ length: rows }),
    () => null
  );

  const handleChange2d = (arr, setter, row, column, value) => {
    let copy = [...arr];
    copy[row][column] = value;
    setter(copy);
    console.log(`[UPDATE ARRAY] ${copy}`);
  };

  const handleChange1d = (arr, setter, row, value) => {
    let copy = [...arr];
    copy[row] = +value;
    setter(copy);
  };

  const handleDataEdit = (e, row, col) => {
    let val = parseFloat(e.currentTarget.textContent);
    setMsg(`data[${row}][${col}] = ${val}`);
    handleChange2d(data, setData, row, col, val);
    console.log(`[UPDATE] data[${row}][${col}] = ${val}`);
  };

  const handleLimitEdit = (e, row) => {
    let val = parseInt(e.currentTarget.textContent);
    handleChange1d(constraints, setConstraints, row, val);
    setMsg(`constraints[${row}] = ${val}`);
    console.log(`[UPDATE] constraints[${row}] = ${val}`);
  };

  const handleGainEdit = (e, col) => {
    let val = parseInt(e.currentTarget.textContent);
    handleChange1d(gains, setGains, col, val);
    setMsg(`gain[${col}] = ${val}`);
    console.log(`[UPDATE] gains[${col}] = ${val}`);
  };

  const handlePiecesEdit = (e, col) => {
    let val = parseInt(e.currentTarget.textContent);

    handleChange1d(pieces, setPieces, col, val);
    setMsg(`pieces_min[${col}] = ${val}`);
    console.log(`[UPDATE] pieces_min[${col}] = ${val}`);
  };

  const handlePiecesMaxEdit = (e, col) => {
    let val = parseInt(e.currentTarget.textContent);
    handleChange1d(piecesMax, setPiecesMax, col, val);
    setMsg(`pieces_max[${col}] = ${val}`);
    console.log(`[UPDATE] pieces_max[${col}] = ${val}`);
  };

  const sendComputationDataToServer = async () => {
    setMsg("Data sent to the server. Processing...");
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "text/plain");
    var raw = JSON.stringify({
      values: data,
      constraints: constraints, // TODO: change to "Limits"
      pieces_min: pieces,
      pieces_max: piecesMax,
      gains: gains,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const handleResult = (result) => {
      resultFromServer = JSON.parse(result)
      let xiValues = _.values(resultFromServer["x_i"])

      const resultFormatted = (<>
        <h1>Result:</h1>
        {/* <p><b>as Json</b> {JSON.stringify(resultFromServer)}</p> */}
        <table>
          <tr>
            <td><b>Maximized product profit</b>:</td>
            <td>{resultFromServer.optimized}</td>
          </tr>
          <tr>
            <td><b>x<sub>i</sub></b> <em>(product amount)</em>:</td>
            <td>{  _.range(0,xiValues.length).map( (i) => <>x<sub>{i}</sub> = {xiValues[i]}<br/></>  ) }</td>
          </tr>
        </table>
      </>)
      setMsg(resultFormatted)
    };

    const handleError = (error) => {
      console.log("[ERROR]", error);
      setMsg(`[ERROR] ${error}`);
    };

    await fetch(apiAddress, requestOptions)
      .then((response) => response.text())
      .then((result) => handleResult(result))
      .catch((error) => handleError(error));
  };

  return (
    <div className={styles["dynamic-table-div"]}>
      <center>
        <table className={styles["dynamic-table"]}>
          <th scope="col"></th>
          {_.range(cols).map((col) => (
            <th scope="col">P{col}</th>
          ))}
          <th scope="col">Limit(h)</th>
          <tbody>
            {_.range(rows).map((row) => (
              <tr>
                <th scope="row">M{row}</th>
                {_.range(cols).map((col) => (
                  <td
                    contentEditable
                    onInput={(e) => handleDataEdit(e, row, col)}
                    suppressContentEditableWarning={true}
                  ></td>
                ))}
                <td
                  contentEditable
                  onInput={(e) => handleLimitEdit(e, row)}
                  suppressContentEditableWarning={true}
                ></td>
              </tr>
            ))}

            <tr>
              <th scope="row">Gain</th>
              {_.range(cols).map((col) => (
                <td
                  contentEditable
                  onInput={(e) => handleGainEdit(e, col)}
                  suppressContentEditableWarning={true}
                ></td>
              ))}
            </tr>
            <tr>
              <th scope="row">Pieces:min</th>
              {_.range(cols).map((col) => (
                <td
                  contentEditable
                  onInput={(e) => handlePiecesEdit(e, col)}
                  suppressContentEditableWarning={true}
                ></td>
              ))}
            </tr>

            <tr>
              <th scope="row">Pieces:max</th>
              {_.range(cols).map((col) => (
                <td
                  contentEditable
                  onInput={(e) => handlePiecesMaxEdit(e, col)}
                  suppressContentEditableWarning={true}
                ></td>
              ))}
            </tr>
          </tbody>
        </table>
      </center>
      <div className={styles.buttons}>
        <button onClick={sendComputationDataToServer}>Send Data</button>
      </div>
      <p>{msg}</p>
    </div>
  );
};

export default DynamicTable;
