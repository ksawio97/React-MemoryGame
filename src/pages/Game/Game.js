import styles from './Game.module.css';
import Card from '../../components/Card/Card.js';
import React, { useState } from 'react';
import { shuffledArr } from '../../utils/shuffle.js'

/**
 * 
 * @param {Array<string>} cardsFaces images src  
 * @param {function(number, number)}
 * @returns {Array<Card>, Map<number, number>}
 */
function generateCards(cardsFaces, tryClick) {
    const cardsCount = cardsFaces.length * 2;
    const cardPairById = new Map();
    
    //id starts from 1
    shuffledArr(Array.from({length: cardsCount}, (_, i) => i + 1)).forEach((cardId, index) => {
        cardPairById.set(cardId, Math.floor(index / 2));
    });
    
    const cards = [];
    for (let i = 0; i < cardsCount; i++) {
        const faceId = cardPairById.get(i + 1);
        cards.push(
        <Card key={i} 
            id={i} 
            face={cardsFaces[faceId]}
            faceId={faceId}
            tryClick={tryClick}/>);
    }
    return cards;
}

const Game = () => {
    //there can be only 2 clicked cards
    const [[clickedCardId, clickedCardFaceId], setClickedCardInfo] = useState([-1, -1]);
    
    const tryClick = (id, faceId) => {
        if (clickedCardId === id)
            return false;

        setClickedCardInfo([id, faceId]);
        return true;
    };

    const cards = generateCards(['/logo192.png'], tryClick);
    return (
        <div className={styles.board}>
            {cards}
        </div>
    )
}

export default Game;