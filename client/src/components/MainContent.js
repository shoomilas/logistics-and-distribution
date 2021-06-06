import { Switch, Route } from "react-router-dom";
import DistributionSolver from "./DistributionSolver";
import MiddlemanSolver from "./MiddlemanSolver";
import styles from "./MainContent.module.css";
import ErrorBoundary from "./ErrorBoundary"

export const MainContent = () => {
  const stuff = `Operational and Logistical Algorithms group projects.
     `
  return (
    <Switch>
      <div className={`${styles["main-content"]} ${styles["align"]}`}>
        <div className={styles["align-item"]}>
          <Route path="/MiddlemanSolver">
            {/* <ErrorBoundary> */}
             <MiddlemanSolver/>
            {/* </ErrorBoundary> */}
          </Route>
          <Route path="/DistributionSolver">
            <DistributionSolver />
          </Route>
          <Route exact path="/">
            <div>{stuff}</div>
          </Route>
        </div>
      </div>
    </Switch>
  );
};
