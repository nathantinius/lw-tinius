import React, {useEffect, useState} from 'react';
import Image from 'next/image';
import axios from 'axios';
import styles from './CharacterCard.module.css';
import characterImages from '../data/characterImages.json';
import Heart from "./icons/Heart";
import slugify from "../functions/slugify";

function CharacterCard({character, setModalOpen, setSelectedCharacter, handleFavorite, favorites}) {
    const [species, setSpecies] = useState("Human");

    const imgRef = slugify(character.name)

    const getSpecies = async (speciesId) => {
        return await axios({
            method: "GET",
            url: `http://localhost:1003/api/species/${speciesId.split("/")[5]}`
        }).then((result) => {
            setSpecies(result.data.speciesName)
            return result.data.speciesName
        })
    }

    const isFavorite = favorites.some(f => f.name === character.name);

    useEffect(() => {
        if (character.species.length > 0) {
            getSpecies(character.species[0]).then((result) => {
                setSpecies(result)
            })
        }
    }, [character]);


    return (
        <div
            className={styles.container}
            onClick={() => {
                setSelectedCharacter({...character, species});
                setModalOpen(true)
            }}
            data-testid={'characterCard'}
        >

            <div
                className={styles.heartWrapper}
                onClick={(e) => {
                    e.stopPropagation()
                    handleFavorite(character)
                }}
                data-testid={`heart-${imgRef}`}
            >
                <Heart width={"20"} height={"20"} selected={!!isFavorite} testId={`heart-svg-${imgRef}`} />
            </div>
            <Image src={characterImages[imgRef]} alt={character.name} width='130' height='130'
                   className={styles.profileImage}/>
            <div style={{textAlign: "center"}}>
                <h3>{character.name}</h3>
                <p>{species}</p>
            </div>
        </div>

    );
}

export default CharacterCard;