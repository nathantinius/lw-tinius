import React, {useMemo, useState} from 'react';
import Image from "next/image";
import axios from "axios";
import slugify from "../functions/slugify";
import styles from './CharacterModal.module.css';
import characterImages from '../data/characterImages.json';


function CharacterModal({setModalOpen, selectedCharacter, handleFavorite, favorites}) {
    const [starships, setStarships] = useState(null);
    const [films, setFilms] = useState(null);
    const isFavorite = favorites.some(f => f.name === selectedCharacter.name);

    const getFilms = async (filmIds) => {
        const filmsList = [];

        for (let f of filmIds) {
            const film = await axios({
                method: "GET",
                url: `http://localhost:1003/api/films/${f.split("/")[5]}`
            }).then((result) => {
                return result.data.film
            }).catch(() => {
                return null
            })

            filmsList.push(film);
        }
        return filmsList
    }

    const getStarships = async (starshipIds) => {
        const starshipsList = [];

        for (let s of starshipIds) {
            const starship = await axios({
                method: 'GET',
                url: `http://localhost:1003/api/starships/${s.split("/")[5]}`,
            }).then((result) => {
                return result.data.starship;
            }).catch(() => {
                return null;
            })

            starshipsList.push(starship);
        }
        return starshipsList;
    }

    useMemo(() => {
        getStarships(selectedCharacter.starships).then((result) => {
            setStarships(result)
        })

        getFilms(selectedCharacter.films).then((result) => {
            setFilms(result)
        })
    }, [selectedCharacter]);


    return (
        <div className={styles.container} onClick={() => setModalOpen(false)}>
            <div className={styles.characterProfileContainer}
                 data-testid={`characterModal-${slugify(selectedCharacter.name)}`}>
                <div className={styles.nameWrapper}>
                    <Image className={styles.profileImage} alt={selectedCharacter.name}
                           src={characterImages[slugify(selectedCharacter.name)]}
                           width={'100'} height={'100'}/>
                    <div className={styles.speciesWrapper}>
                        <h1>{selectedCharacter.name}</h1>
                        <p>{selectedCharacter.species}</p>
                    </div>
                </div>
                <div className={styles.profileStats}>
                    <div className={styles.statSection}>
                        <h3>About Me:</h3>
                        <ul>
                            <li>
                                <p><span style={{fontWeight: 600}}>DOB:</span> {selectedCharacter.birth_year}</p>
                            </li>
                            <li>
                                <p><span style={{fontWeight: 600}}>HEIGHT:</span> {selectedCharacter.height}</p>
                            </li>
                            <li>
                                <p><span style={{fontWeight: 600}}>MASS:</span> {selectedCharacter.mass}</p>
                            </li>
                            <li>
                                <p><span style={{fontWeight: 600}}>HAIR:</span> {selectedCharacter.hair_color}</p>
                            </li>
                            <li>
                                <p><span style={{fontWeight: 600}}>EYES:</span> {selectedCharacter.eye_color}</p>
                            </li>
                        </ul>
                    </div>
                    <div className={styles.statSection}>
                        <h3>My Movies:</h3>
                        {!films ? (
                            <p>loading...</p>
                        ) : (
                            <ul>
                                {films.map((f) => {
                                    return <li key={f.title}>
                                        <p>{f.title}</p>
                                    </li>
                                })}
                            </ul>
                        )}
                    </div>
                    <div className={styles.statSection}>
                        <h3>Starships I've Flown:</h3>
                        {!starships ? (
                            <>
                                <p>loading...</p>
                            </>
                        ) : (
                            <>
                                {starships.length <= 0 ? (
                                    <p>I don't fly Starships</p>
                                ) : (
                                    <>
                                        <ul>
                                            {starships.map((s) => {
                                                return <li key={s.name}>
                                                    <p>{s.name}</p>
                                                </li>
                                            })}
                                        </ul>
                                    </>
                                )}
                            </>
                        )}
                    </div>
                </div>
                {isFavorite ? (
                    <div className={"button"} onClick={() => handleFavorite(selectedCharacter)}>Remove from
                        Favorites</div>
                ) : (
                    <div className={"button"} onClick={() => handleFavorite(selectedCharacter)}>Add to Favorites</div>
                )}
            </div>
        </div>
    );
}

export default CharacterModal;