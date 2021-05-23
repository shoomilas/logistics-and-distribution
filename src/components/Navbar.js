import React from 'react'
import styles from './Navbar.module.css'

const Navbar = () => {
    return (
        <ul className={styles['navigation']}>
            <li>
                <a href="#">Zygu</a>
            </li>
            <li>
                <a href="#">Lypch</a>
            </li>
            <li>
                <a href="#">Info</a>
            </li>
        </ul>
    )
}

export default Navbar
