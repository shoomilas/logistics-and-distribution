import React from 'react'
import styles from './Navbar.module.css'
import { Link } from "react-router-dom";

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
                <Link to="/">Info</Link>
            </li>
        </ul>
    )
}

export default Navbar
