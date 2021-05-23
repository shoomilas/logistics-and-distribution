import {Switch, Route } from 'react-router-dom'
import DistributionSolver from './DistributionSolver'
import MiddlemanSolver from './MiddlemanSolver'

export const MainContent = () => {
    return (
        <Switch>
            <Route path="/MiddlemanSolver">
                <MiddlemanSolver/>
            </Route>
            <Route path="/DistributionSolver">
                <DistributionSolver/>
            </Route>
            <Route path="/">Main Content here.</Route>
        </Switch>
        // <div>
        //     Main content goes here.
        // </div>
    )
}
