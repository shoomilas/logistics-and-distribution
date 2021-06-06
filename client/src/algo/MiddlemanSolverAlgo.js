import _ from "lodash";

export const calculate = (input) => {
    console.log("<MIDDLEMAN_SOLVER_ALGO>");
    console.log(input);
    let nRows = 4; // suppliers + 1 
    let nCols = 4; // buyers + 1
    let nProfitAtTheEnd, nExpense = 0;
    let arr = initializeData(nRows, nCols, input)
    let singleProfitsResult = extractSingleProfitsArray(arr)
    arr = wyznaczenieInicijalnychWartosciWolumentow(arr, nRows, nCols)
    arr = uzupelnianieWolumenowNaFakeDostawcachOdbiorcach(arr, nRows, nCols)
    arr = przetwarzanieIteracjiAlgorystmuOptymalizacyjnego(arr, nRows, nCols)

    console.log("</MIDDLEMAN_SOLVER_ALGO>");
    return {result: 252, arrOut: arr, singleProfits: singleProfitsResult}    
}

const initializeData = (nRows, nCols, input) => {
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
    }))
    console.log(aTab);
    return aTab;
}

const extractSingleProfitsArray = (arr) => {
    let section = arr.slice(1, arr.length+1).map( (x) => x.slice(1, x.length+1))
    let rows = section.length - 2 
    let cols = section[0].length - 2 
    let result = Array.from({length: section.length - 2},()=> Array.from({length: section[0].length - 2}, () => 0))
    _.range(0, rows).map( row => _.range(0, cols).map( (col) => 
            result[row][col] = section[row][col].profit
        )
    )
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
                _.range(1, nRows).map( (row) => aTab[row][nColMax].used = 1)
            }
        }
    }
    return aTab;
}

const uzupelnianieWolumenowNaFakeDostawcachOdbiorcach = (aTab, nRows, nCols) => {
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

///////////////////////////////////////////////////

const pm_AlphaBeta_Calculate = (nProfit, nAlpha, nBeta) => {
    console.log("pm_AlphaBeta_Calculate()");
	let nRet = null;
	if (nAlpha != null && nBeta == null) nRet = nProfit - nAlpha;
	if (nAlpha == null && nBeta != null) nRet = nProfit - nBeta;
	return nRet;
}

//////////////////////////////////////////////////

const przetwarzanieIteracjiAlgorystmuOptymalizacyjnego = (arr, nRows, nCols) => {
    let maxIteration = 5 // 20?
    let nIteration = 0;
    let nStop = 0;
    let nRet = null;
    while (nStop == 0) {
        console.log(`[PROCESSING ALGO] ITERATION ${nIteration}`);
        nIteration++;
        nRet = pm_Iteration_Calculate(arr, nRows, nCols, nIteration);
        if (nRet > 0) {
            // pass
        } else {
            if (nRet = -1) { // nRet = -1 // ?
                console.log("Znaleziono rozwiązanie optymalne.");
                nStop = 1;
            } else {
                console.log("Nieokreślone rozwiązanie")
                nStop = 1;
            }
        }
        if (nIteration > maxIteration) {
            console.log(`Przerwano po ${maxIteration} iteracjach`)
            nStop = 1;
        }
    }
    return arr
}

const pm_Iteration_Calculate = (aTab, nRows, nCols, nIteration) => {
    console.log("pm_Iteration_Calculate()");
    let nRet = null
    aTab = wyzerowanieAlfaBeta(aTab, nRows, nCols)
    aTab = wyznaczenieAlfaBetadlaRowTab(aTab, nRows, nCols)
    aTab = zeroDeltaPrevIt(aTab, nRows, nCols)
    aTab = wyznaczenieDeltaCurIt(aTab, nRows,nCols)
    nRet = wyznaczenieSciezkiDelta(aTab, nRows,nCols)
    return nRet
}

const wyzerowanieAlfaBeta = (aTab, nRows, nCols) => {
    console.log("wyzerowanieAlfaBeta()");
    _.range(1, nRows).map((row) => {
            aTab[row][nCols + 1].alpha = null;
        }
    )
    _.range(1, nCols).map((col) => {
            aTab[nRows + 1][col].beta = null;
        }
    )
    aTab[1][nCols + 1].alpha = 0; 
    return aTab
}
const wyznaczenieAlfaBetadlaRowTab = (aTab, nRows, nCols) => {
    console.log("wyznaczenieAlfaBetadlaRowTab()");
    let nStop = 0;
    while (nStop == 0) {
        nStop = 1;
        _.range(1, nRows).map((row) => _.range(1, nCols).map((col) => {
                let nAlpha = aTab[row][nCols + 1].alpha;
                let nBeta = aTab[nRows + 1][col].beta;
                let nProfit = aTab[row][col].profit;
                if ((nAlpha == null || nBeta == null) && aTab[row][col].volume != null) {
                    nStop = 0;
                    if (nAlpha == null) {
                        aTab[row][nCols + 1].alpha = pm_AlphaBeta_Calculate(nProfit, nAlpha, nBeta);
                    } else {
                        aTab[nRows + 1][col].beta = pm_AlphaBeta_Calculate(nProfit, nAlpha, nBeta);
                    }
                }
            }
        ))
    }
    return aTab
}
const zeroDeltaPrevIt = (aTab, nRows, nCols) => {
    console.log("zeroDeltaPrevIt()");
    _.range(1, nRows).map((row) => _.range(1, nCols).map((col) => {
            aTab[row][col].delta = null;
            aTab[row][col].deltaSign = null;
        }
    ))
    return aTab
}

const wyznaczenieDeltaCurIt = (aTab, nRows, nCols) => {
    _.range(1, nRows).map((row) => _.range(1, nCols).map((col) => {
            if (aTab[row][col].volume == null) {
                aTab[row][col].delta = aTab[row][col].profit - aTab[row][nCols + 1].alpha - aTab[nRows + 1][col].beta;
            }
        }
    ))
    return aTab
}
const wyznaczenieSciezkiDelta = (aTab, nRows, nCols) => {
    console.log("wyznaczenieSciezkiDelta()");
    let nRowMax = 0;
    let nColMax = 0;
    let nMaxValue = -999999;
    let nRet = null

    _.range(1, nRows).map((row) => _.range(1, nCols).map((col) => {
        let nStop = 0;
        if (aTab[row][col].delta > nMaxValue) {
            nRowMax = row;
            nColMax = col;
            nMaxValue = aTab[row][col].delta;
        }
    }))

    if (nMaxValue > 0) {
        let nRowSel = 0;
        let nColSel = 0;
        let nStop = 0;
       _.range(1,nRows).map((row) => {
           if (nStop == 0) {
               if (row != nRowMax) {
                   if (aTab[row][nColMax].delta == null) {
                       nRowSel = row;
                   }
               }
               if (nRowSel > 0) {
                   _.range(1, nCols).map((col) => {
                       if (aTab[nRowMax][col].delta == null && aTab[nRowSel][col].delta == null) {
                           nColSel = col;
                           nStop = 1;
                       }
                   })
               }
           }
       })

        if ((nRowSel * nColSel) != 0) {
            // Wyznaczenie +1/-1 dla delt
            aTab[nRowMax][nColMax].deltaSign = 1;
            aTab[nRowSel][nColSel].deltaSign = 1;
            aTab[nRowSel][nColMax].deltaSign = -1;
            aTab[nRowMax][nColSel].deltaSign = -1;

            let nVolumeChange
            if (aTab[nRowSel][nColMax].volume <= aTab[nRowMax][nColSel].volume) {
                nVolumeChange = aTab[nRowSel][nColMax].volume;
            } else {
                nVolumeChange = aTab[nRowMax][nColSel].volume;
            }

            _.range(1, nRows).map((row) => _.range(1, nCols).map((col) => {
                    if (aTab[row][col].deltaSign != null) {
                        aTab[row][col].volume += aTab[row][col].deltaSign * nVolumeChange;
                        if (aTab[row][col].volume == 0) {
                            aTab[row][col].volume = null;
                        }
                    }
            }))
            	// pm_DrawTable_Delta(nIteration, 1, nRowMax, nColMax, nRowSel, nColSel);
            nRet = 1;
        } else {
            nRet = null;
        }
    } else {
        // Wypisanie do tabeli 'trasy'
        _.range(1, nRows).map((row) => _.range(1, nCols).map((col) => {
            if (aTab[row][col].volume == null) {
                // TODO: ROUTES array save here
                // document.getElementById("wD" + row + "O" + col).innerHTML = 'x';
                console.log("Sth sth wD row O col");
            }
            else {
                // document.getElementById("wD" + row + "O" + col).innerHTML = aTab[row][col].volume;
                console.log("Sth sth wD row O col");
            }
        }))

        console.log("Obliczenie zysku koncowego");
        nRet = -1
    }
    
    return nRet
    // return aTab;
}