import _ from "lodash";
// const _ = require("lodash")

export const calculate = (input) => {
    console.log("<MIDDLEMAN_SOLVER_ALGO>");
    console.log(input);
    let nRows = 4;
    let nCols = 4;
    let nProfitAtTheEnd, nExpense;
    let arr = initializeData(nRows, nCols, input)
    let singleProfitsResult = singleProfitsArray(arr)
    arr = wyznaczenieInicijalnychWartosciWolumentow(arr, nRows, nCols)

    console.log("</MIDDLEMAN_SOLVER_ALGO>");
    return {result: 252, arrOut: arr, singleProfits: singleProfitsResult}    
}

const initializeData = (nRows, nCols, input) => { 
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
    
    _.range(1, nCols).map((col) => aTab[0][col] = {demand: 0, profit: 0})
    _.range(1, nRows).map((row) => aTab[row][0] = {supply: 0, profit: 0})
    aTab[4][0] = {supply: 0, demand: 0}  // TODO: make this dynamic (nRows instaed of 4?)
    _.range(1, nRows).map((row) => aTab[row][nCols + 1] = {alpha: null})
    _.range(1, nCols).map((col) => aTab[nRows + 1][col] = {beta: null})
    // Alphas/Betas initialize
    _.range(1, nRows).map((row) => nSupplySum += aTab[row][0].supply)
    _.range(1, nCols).map((col) => nDemandSum += aTab[0][col].demand)
    if (nDemandSum != nSupplySum) {
        aTab[nRows][0] = {supply: nDemandSum, profit: 0}
        aTab[0][nCols] = {demand: nSupplySum, profit: 0}
    }

    // Handle input
    _.range(1,nCols).map( (col) => aTab[0][col] = { demand: input.demand[col-1], profit: input.prices[col-1]} )
    _.range(1,nRows).map( (row) => aTab[row][0] = { supply: input.supply[row-1], profit: input.costs[row-1]} )
    _.range(1,nRows).map((row) => _.range(1,nCols).map((col) => { 
        aTab[row][col].expense = input.singleCosts[row-1][col-1]
    }))

    // Calculate single profits
    _.range(1, nRows).map((row) => _.range(1, nCols).map((col) => {
        aTab[row][col].profit = aTab[0][col].profit - aTab[row][col].expense - aTab[row][0].profit;
        aTab[row][col].used = 0;
        // TODO: Slice, output table
    }))
    console.log(aTab);
    return aTab;
}

const singleProfitsArray = (arr) => {
    let section = arr.slice(1, arr.length+1).map( (x) => x.slice(1, x.length+1))
    let rows = 3
    let cols = 3


    let result = Array.from({length: section.length - 2},()=> Array.from({length: section[0].length - 2}, () => 0))
    console.log("SECITON HERE");
    console.log(section);
    
    _.range(0, rows).map( row => _.range(0, cols).map( (col) => 
            // result[row][col] = section[row][col]
            console.log(result[row][col] = section[row][col].profit)
            // console.log( ` ${row} ${col}`)
        )
    )

    console.log("/SECITON HERE");
    return result
}

const wyznaczenieInicijalnychWartosciWolumentow = (aTab, nRows, nCols) => {
    let nStop = 0;
    while (nStop == 0) {
        let nRowMax = 0;
        let nColMax = 0;
        let nMaxValue = -999999;

        nStop = 1;
        _.range(1, nRows).map((row) => _.range(1, nCols).map((col) => {
            if (aTab[row][col].used === 0) {
                nStop = 0;
                if (aTab[row][col].profit > nMaxValue) {
                    nRowMax = row;
                    nColMax = col;
                    nMaxValue = aTab[row][col].profit;
                }
            }
        }))
        if (nStop == 0) {
            if (aTab[0][nColMax].demand >= aTab[nRowMax][0].supply) {
                aTab[nRowMax][nColMax].volume = aTab[nRowMax][0].supply;
                aTab[0][nColMax].demand -= aTab[nRowMax][0].supply;
                aTab[nRowMax][0].supply = 0;
                _.range(1, nCols).map((cols) => aTab[nRowMax][cols].used = 1)
            } else {
                aTab[nRowMax][nColMax].volume = aTab[0][nColMax].demand;
                aTab[nRowMax][0].supply -= aTab[0][nColMax].demand;
                aTab[0][nColMax].demand = 0;
                _.range(1, nRows).map((rows) => aTab[rows][nColMax].used = 1)
                _.range(1, nRows).map( (row) => aTab[row][nColMax].used = 1)
            }
        }
    }
    return aTab;
}

///////////////////////////////////////////////////

const UzupelnianieWolumenowNaFakeDostawcachOdbiorcach = (aTab, nRows, nCols) => {
    _.range(1, nRows).map((row) => {
        aTab[row][nCols].volume = (aTab[row][0].supply > 0) ? aTab[row][0].supply : null;
        aTab[row][0].supply = 0;
    })
    _.range(1, nCols).map((cols) => {
        aTab [nRows][cols].volume = (aTab[0][cols].demand > 0) ? aTab [0][cols].demand : null;
        aTab[0][cols].demand = 0;
    })
    return aTab;
}

const PrzetwarzanieIteracjiAlgorystmuOptymalizacyjnego = () => {
    let nIteration = 0;
    let nStop = 0;
    while (nStop == 0) {
        nIteration++;
        let nRet = pm_Iteration_Calculate(nIteration);
        if (nRet > 0) {
        } else {
            if (nRet = -1) {
                console.log("Znaleziono rozwiązanie optymalne.");
                nStop = 1;
            } else {
                console.log("Nieokreślone rozwiązanie")
                nStop = 1;
            }
        }
        if (nIteration > 20) {
            console.log("Przerwano po 20 iteracjach")
            nStop = 1;
        }
    }
    // return result;
}

const pm_Iteration_Calculate = (nIteration) => {
    return []
}

// const WyzerowanieAlfaBeta = (arr, nRows, nCols) => {
//     _.range(1, nRows).map((row) => {
//             aTab[row][nCols + 1].alpha = null;
//         }
//     )
//     _.range(1, nCols).map((col) => {
//             aTab[nRows + 1][col].beta = null;
//         }
//     )
// }
// const WyznaczenieAlfaBetadlaRowTab = (arr, nRows, nCols) => {
//     aTab[1][nCols + 1].alpha = 0;
//     nStop = 0;
//     while (nStop == 0) {
//         nStop = 1;
//         _.range(1, nRows).map((row) => _.range(1, nCols).map((cols) => {
//                 nAlpha = aTab[i][nCols + 1].alpha;
//                 nBeta = aTab[nRows + 1][j].beta;
//                 nProfit = aTab[i][j].profit;
//                 if ((nAlpha == null || nBeta == null) && aTab[i][j].volume != null) {
//                     nStop = 0;
//                     if (nAlpha == null) {
//                         aTab[i][nCols + 1].alpha = pm_AlphaBeta_Calculate(nProfit, nAlpha, nBeta);
//                     } else {
//                         aTab[nRows + 1][j].beta = pm_AlphaBeta_Calculate(nProfit, nAlpha, nBeta);
//                     }
//                 }
//             }
//         ))
//     }
// }
// const ZeroDeltaPrevIt = (arr, nRows, nCols) => {
//     _.range(1, nRows).map((row) => _.range(1, nCols).map((col) => {
//             aTab[row][col].delta = null;
//             aTab[row][col].deltaSign = null;
//         }
//     ))
// }

// const WyznaczenieDeltaCurIt = (arr, nRows, nCols) => {
//     _.range(1, nRows).map((row) => _.range(1, nCols).map((col) => {
//             if (aTab[row][col].volume == null) {
//                 aTab[row][col].delta = aTab[row][col].profit - aTab[row][nCols + 1].alpha - aTab[nRows + 1][col].beta;
//             }
//         }
//     ))
// }
// const WyznaczenieSciezkiDelta = (arr, nRows, nCols) => {
//     nRowMax = 0;
//     nColMax = 0;
//     nMaxValue = -999999;

//     _.range(1, nRows).map((row) => _.range(1, nCols).map((col) => {
//             nStop = 0;
//             if (aTab[row][col].delta > nMaxValue) {
//                 nRowMax = row;
//                 nColMax = col;
//                 nMaxValue = aTab[row][col].delta;
//             }
//         }))

//     if (nMaxValue > 0) {
//         nRowSel = 0;
//         nColSel = 0;
//         nStop = 0;
//        _.range(1,nRows).map((row) => {
//            if (nStop == 0) {
//                if (i != nRowMax) {
//                    if (aTab[row][nColMax].delta == null) {
//                        nRowSel = row;
//                    }
//                }
//                if (nRowSel > 0) {
//                    _.range(1, nCols).map((col) => {
//                        if (aTab[nRowMax][col].delta == null && aTab[nRowSel][col].delta == null) {
//                            nColSel = col;
//                            nStop = 1;
//                        }
//                    })
//                }
//            }
//        })

//         if ((nRowSel * nColSel) != 0) {
//             // Wyznaczenie +1/-1 dla delt
//             aTab[nRowMax][nColMax].deltaSign = 1;
//             aTab[nRowSel][nColSel].deltaSign = 1;
//             aTab[nRowSel][nColMax].deltaSign = -1;
//             aTab[nRowMax][nColSel].deltaSign = -1;

//             if (aTab[nRowSel][nColMax].volume <= aTab[nRowMax][nColSel].volume) {
//                 nVolumeChange = aTab[nRowSel][nColMax].volume;
//             } else {
//                 nVolumeChange = aTab[nRowMax][nColSel].volume;
//             }

//             _.range(1, nRows).map((row) => _.range(1, nCols).map((col) => {
//                     if (aTab[row][col].deltaSign != null) {
//                         aTab[row][col].volume += aTab[row][col].deltaSign * nVolumeChange;
//                         if (aTab[row][col].volume == 0) {
//                             aTab[row][col].volume = null;
//                         }
//                     }
//             }))
//             //	pm_DrawTable_Delta(nIteration, 1, nRowMax, nColMax, nRowSel, nColSel);
//             nRet = 1;
//         } else {
//             nRet = null;
//         }
//     } else {
//         // Wypisanie do tabeli 'trasy'
//         _.range(1, nRows).map((row) => _.range(1, nCols).map((col) => {
//                 if (aTab[row][col].volume == null) {
//                     document.getElementById("wD" + row + "O" + col).innerHTML = 'x';
//                 }
//                 else {
//                     document.getElementById("wD" + row + "O" + col).innerHTML = aTab[row][col].volume;
//                 }
//             }))
//         }

// }