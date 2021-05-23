import React from 'react'
import styles from './Navbar.module.css'
import { BrowserRouter, Link } from "react-router-dom";

const Navbar = () => {
    return (
        <ul className={styles['navigation']}>
            <li>
                <Link to="/MiddlemanSolver">Zygu</Link>
            </li>
            <li>
            <Link to="/DistributionSolver">Lypch</Link>
            </li>
            <li>
                <a href="#">Info</a>
            </li>
        </ul>
    )
}

export default Navbar
