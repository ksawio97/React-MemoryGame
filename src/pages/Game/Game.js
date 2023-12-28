import styles from './Game.module.css';
import Card from '../../components/Card/Card.js';
import React, { useEffect, useState } from 'react';
import { shuffledArr } from '../../utils/shuffle.js'

/**
 * 
 * @param {Array<string>} cardsFaces images src
 * @returns {Array<any>}
 */
function generateCardsInfo(cardsFaces) {
    const cardsCount = cardsFaces.length * 2;
    const getCardFaceId = new Map();
    
    //id starts from 1
    shuffledArr(Array.from({length: cardsCount}, (_, i) => i + 1)).forEach((cardId, index) => {
        getCardFaceId.set(cardId, Math.floor(index / 2));
    });
    
    const cardsInfo = [];
    for (let i = 0; i < cardsCount; i++) {
        const faceId = getCardFaceId.get(i + 1);
        cardsInfo.push({
            id: i,
            face: cardsFaces[faceId],
            faceId: faceId,
            flipped: false
        });
    }
    return cardsInfo;
}

const Game = () => {
    const [cardsInfo, setCardsInfo] = useState(generateCardsInfo(['logo192.png']));
    const [flippedCardsId, setFlippedCardsId] = useState([]);

    useEffect(() => {
        //show flipped cards
        const flipped = new Set(flippedCardsId);
        setCardsInfo(cardsInfo.map((cardInfo) => {
            cardInfo.flipped = flipped.has(cardInfo.id);
            return cardInfo;
        }));
        //if two were shown hide them after timer
        if (flippedCardsId.length === 2) {
            setTimeout(() => {
                setFlippedCardsId([]);
            }, 2000);
        }

    }, [flippedCardsId]);

    const tryFlip = (id) => {
        //if clicked same card or length is max (2)
        if ((flippedCardsId.length === 2) || (flippedCardsId.length === 1 && cardsInfo[flippedCardsId[0]].id === id))
            return;
        setFlippedCardsId([...flippedCardsId, id]);
    };
    
    return (
        <div className={styles.board}>
            {cardsInfo.map((cardsInfo) => 
                <Card key={cardsInfo.id}
                    id={cardsInfo.id}
                    face={cardsInfo.face}
                    faceId={cardsInfo.faceId}
                    flipped={cardsInfo.flipped}
                    tryFlip={tryFlip}/>
            )}
        </div>
    );
}

export default Game;