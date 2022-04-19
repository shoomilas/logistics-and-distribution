import { Routes, Route } from "react-router-dom";
import DistributionSolver from "./DistributionSolver";
import MiddlemanSolver from "./MiddlemanSolver";
import styles from "./MainContent.module.css";

const EntryScreen = () => {
  const headerInfo = `Operational and Logistical Algorithms group projects.
   `;
  return(<div className={`${styles["align-item"]}`}>{headerInfo}</div>)
}

export const MainContent = () => {
  

  return (
    <div className={`${styles["main-content"]} ${styles["align"]}     `}>
      <Routes>
        <Route path="/MiddlemanSolver" element={<MiddlemanSolver />} />
        <Route path="/DistributionSolver" element={<DistributionSolver />} />
        <Route path="/" element={<EntryScreen/>} />
      </Routes>
    </div>
  );
};