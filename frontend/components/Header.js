import React from 'react';
import styles from './Header.module.css';
import SearchBar from "./SearchBar";

function Header(props) {
    return (
        <div className={styles.container}>
            <h3 style={{color: "var(--swapi-white)"}}>SWAPI</h3>
        </div>
    );
}

export default Header;