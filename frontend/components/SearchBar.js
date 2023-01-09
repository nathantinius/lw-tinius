import React, {useState} from 'react';
import styles from './SearchBar.module.css';

function SearchBar(props) {
    const [searchValue, setSearchValue] = useState('');
    return (
        <form className={styles.searchBarForm} onSubmit={(e) => {
            e.preventDefault()
            props.handleSearch(searchValue)
        }}>
            <input
                className={styles.searchField}
                type='text'
                value={searchValue}
                placeholder={'Search for a Character'}
                onChange={(e) => setSearchValue(e.target.value)}
            />
            <input type='submit' value='find' className={styles.submitBtn} />
        </form>
    );
}

export default SearchBar;

