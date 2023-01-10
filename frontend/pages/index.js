import {useEffect, useState} from "react";
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import axios from 'axios';
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import CharacterCard from "../components/CharacterCard";
import Caret from "../components/icons/Caret";
import CharacterModal from "../components/CharacterModal";

export async function getServerSideProps() {

    const characterList = await axios({
        method: 'GET',
        url: `http://localhost:1003/api/characters`,
    }).then((result) => {
        return result.data.characterList;
    }).catch(() => {
        return [];
    })

    return {
        props: {
            characterList,
        }
    }
}

export default function Home(props) {
    const [characters, setCharacters] = useState(props.characterList);
    const [selectedCharacter, setSelectedCharacter] = useState(null);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [currentFilter, setCurrentFilter] = useState("All Characters");
    const [favorites, setFavorites] = useState([]);

    const filters = [
        {
            name: "All Characters",
            value: "all"
        },
        {
            name: "The Phantom Menace",
            value: "4"
        },
        {
            name: "Attack of the Clones",
            value: "5"
        },
        {
            name: "Revenge of the Sith",
            value: "6"
        },
        {
            name: "A New Hope",
            value: "1"
        },
        {
            name: "The Empire Strikes Back",
            value: "2"
        },
        {
            name: "Return of the Jedi",
            value: "3"
        },
        {
            name: "My Favorites",
            value: "favorites"
        }
    ]
    const handleSearch = async (value) => {
        let searchResults;
        setLoading(true);
        setCurrentFilter("All Characters")

        if (value !== "") {
            searchResults = await axios({
                method: 'GET',
                url: `http://localhost:1003/api/characters?sid=${value}`,
            }).then((result) => {
                setLoading(false)
                return result.data.character;
            }).catch(() => {
                setLoading(false)
                return [];
            })
        } else {
            searchResults = await axios({
                method: 'GET',
                url: `http://localhost:1003/api/characters`,
            }).then((result) => {
                setLoading(false)
                return result.data.characterList;
            }).catch(() => {
                setLoading(false)
                return [];
            })
        }

        return setCharacters(searchResults)
    }

    const handleFilter = async (filter) => {
        setLoading(true)

        if (filter === "favorites") {
            setLoading(false)
            return setCharacters(favorites);
        }

        if (filter === "all") {
            console.log("allCharacters")
            const allCharacters = await axios({
                method: 'GET',
                url: `http://localhost:1003/api/characters`,
            }).then((result) => {
                setLoading(false)
                return result.data.characterList;
            }).catch(() => {
                return [];
            })

            return setCharacters(allCharacters);
        }

        const filterResults = await axios({
            method: 'GET',
            url: `http://localhost:1003/api/films/${filter}/characters`,
        }).then((result) => {
            setLoading(false)
            return result.data.characters
        }).catch(() => {
            setLoading(false)
            return [];
        })

        return setCharacters(filterResults)
    }

    const handleFavorite = (character) => {
        const exists = favorites.some(f => f.name === character.name);

        if (exists) {
            const filteredFavorites = favorites.filter(fc => fc.name !== character.name);
            if (currentFilter === "My Favorites") {
                setCharacters(filteredFavorites);
            }
            return setFavorites(filteredFavorites)
        }

        return setFavorites((prevState) => ([
            ...prevState, character
        ]))
    }

    useEffect(() => {
        if (modalOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'auto'
        }
    }, [modalOpen]);


    return (
        <>
            {modalOpen ? (
                <CharacterModal
                    setModalOpen={setModalOpen}
                    selectedCharacter={selectedCharacter}
                    handleFavorite={handleFavorite}
                    favorites={favorites}
                />
            ) : null}
            <Head>
                <title>SWAPI - A Lifeway Challenge</title>
                <meta name="description" content="A Lifeway coding challenge for a galaxy far far away."/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
            </Head>
            <Header/>
            <main className={styles.main}>
                <div className={styles.searchContainer}>
                    <SearchBar handleSearch={handleSearch}/>
                    <div style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: "12px"
                    }}>
                        <p>Filter By:</p>
                        <div className={styles.filter} onClick={() => setOpen(!open)}>
                            <p>{currentFilter}</p>
                            <Caret width={'10'} height={'10'}/>
                        </div>
                    </div>
                    {open ? (
                        <div className={styles.filmList}>
                            {filters.map((filter) => {
                                return (
                                    <p
                                        onClick={() => {
                                            setCurrentFilter(filter.name)
                                            setOpen(!open)
                                            handleFilter(filter.value).then(() => console.log("Filtered!"));
                                        }}
                                        className={styles.filterItem}
                                        key={filter.value}
                                    >
                                        {filter.name}
                                    </p>
                                )
                            })}
                        </div>
                    ) : null}
                </div>
                {loading ? (<div>Loading...</div>) : (
                    <>
                        {characters.length === 0 ? (
                            <p>These are not the characters you are looking for.</p>
                        ) : (
                            <>
                                <div className={styles.characterCardWrapper}>
                                    {characters.map((c) => {
                                        return (
                                            <CharacterCard
                                                key={c.name}
                                                character={c}
                                                setModalOpen={setModalOpen}
                                                setSelectedCharacter={setSelectedCharacter}
                                                handleFavorite={handleFavorite}
                                                favorites={favorites}
                                            />
                                        )
                                    })}
                                </div>
                            </>
                        )}
                    </>
                )}
            </main>
        </>
    )
}
