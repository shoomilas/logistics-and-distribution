import React from "react";
import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className={styles["navbar"]}>
      <ul className={styles["navigation"]}>
        <li>
          <Link to="/MiddlemanSolver">Middleman</Link>
        </li>
        <li>
          <Link to="/DistributionSolver">Distribution</Link>
        </li>
        <li>
          <Link to="/">Info</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
