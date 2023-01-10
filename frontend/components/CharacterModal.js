import React from 'react';
import styles from './CharacterModal.module.css';
import Image from "next/image";
import characterImages from '../data/characterImages.json';
import slugify from "../functions/slugify";
import starships from '../data/starships.json';
import films from '../data/films.json';

function CharacterModal({setModalOpen, selectedCharacter, handleFavorite, favorites}) {
    const isFavorite = favorites.some(f => f.name === selectedCharacter.name);

    return (
        <div className={styles.container} onClick={() => setModalOpen(false)}>
            <div className={styles.characterProfileContainer} data-testid={`characterModal-${slugify(selectedCharacter.name)}`}>
                <div className={styles.nameWrapper}>
                    <Image className={styles.profileImage} alt={selectedCharacter.name} src={characterImages[slugify(selectedCharacter.name)]}
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
                        <ul>
                            {selectedCharacter.films.map((f) => {
                                return <li key={films[f].name}>
                                    <p>{films[f].name}</p>
                                </li>
                            })}
                        </ul>
                    </div>
                    <div className={styles.statSection}>
                        {selectedCharacter.starships.length <= 0 ? (
                            <h3>I don't fly Starships</h3>
                        ) : (
                            <>
                                <h3>Starships I've Flown:</h3>
                                <ul>
                                    {selectedCharacter.starships.map((s) => {
                                        return <li key={starships[s].name}>
                                            <p>{starships[s].name}</p>
                                        </li>
                                    })}
                                </ul>
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