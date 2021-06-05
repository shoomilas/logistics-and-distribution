import _ from "lodash";
// const _ = require("lodash")

export const initializeData = (nRows, nCols) => { 
// const initializeData = (nRows, nCols) => {
    console.log("initializeData()");
    let nDemandSum = 0;
    let nSupplySum = 0;
    let i, j, k, l;
    let nStop = 0;

    let aTab = [
        [{}, {}, {}, {}, {}, {}],
        [{}, {}, {}, {}, {}, {}],
        [{}, {}, {}, {}, {}, {}],
        [{}, {}, {}, {}, {}, {}],
        [{}, {}, {}, {}, {}, {}],
        [{}, {}, {}, {}, {}, {}]
    ];

    _.range(1,nCols).map((col) => aTab[0][col] = { demand: 0, profit: 0 }) // TODO: Buyers info input handling 
    _.range(1,nRows).map((row) => aTab[row][0] = { supply: 0, profit: 0 }) // TODO: Suppliers info input handling
    aTab[4][0] = { supply: 0, demand: 0 }  // TODO: make this dynamic
    _.range(1,nRows).map((row) => aTab[row][nCols+1] = {alpha: null})
    _.range(1,nCols).map((col) => aTab[nRows+1][col] = {beta: null})
    // Alphas/Betas initialize
    _.range(1,nRows).map((row) => nSupplySum += aTab[row][0].supply)
    _.range(1,nCols).map((col) => nDemandSum += aTab[0][col].demand)
    if (nDemandSum != nSupplySum) {
        aTab[nRows][0] = { supply: nDemandSum, profit: 0}
        aTab[0][nCols] = { demand: nSupplySum, profit: 0}
    }
    _.range(1,nRows).map((row) => _.range(1,nCols).map( (col) => {
        // TODO: handle single cost input
        aTab[row][col].profit = aTab[0][col].profit - aTab[row][col].expense - aTab[row][0].profit;
        aTab[row][col].used = 0;
        // TODO: (OUTPUT DATA) Handle single profits
    }))
    console.log(aTab);
    return aTab;
}

const wyznaczenieInicijalnychWartosciWolumentow = (arr) => {
    
}

let nRows = 4;
let nCols = 4;
let nProfitAtTheEnd, nExpense;
let arr = initializeData(nRows, nCols)