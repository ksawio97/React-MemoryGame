import styles from './Game.module.css';
import Card from '../Card/Card.js';
import React, { useEffect, useState } from 'react';
import { shuffledArr } from '../../utils/Shuffle.js'
import { getGridSize } from '../../utils/GetGridSize.js';

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
            guessResult: -1,
            flipped: false
        });
    }
    return cardsInfo;
}

const Game = ({cardsFaces}) => {
    const [[rowsCount, columnsCount]] = useState(getGridSize(cardsFaces.length));

    const [cardsInfo, setCardsInfo] = useState(generateCardsInfo(cardsFaces));
    const [flippedCardsId, setFlippedCardsId] = useState([]);

    useEffect(() => {
        let somethingChanged = false;
        //show flipped cards
        const flipped = new Set(flippedCardsId);
        const newCardsInfo = cardsInfo.map((cardInfo) => {
            const shouldBeFlipped = flipped.has(cardInfo.id);
            //if it's values are different
            if (shouldBeFlipped !== cardInfo.flipped) {
                //if something hasn't changed yet
                if (!somethingChanged)
                    somethingChanged = true;
                cardInfo.flipped = shouldBeFlipped;
            }
            
            return cardInfo;
        });
        //if nothing changed
        if (!somethingChanged)
            return;

        //if two were shown
        if (flippedCardsId.length === 2) {
            //shows if pair was found
            const guessResult = newCardsInfo[flippedCardsId[0]].faceId === newCardsInfo[flippedCardsId[1]].faceId;
            newCardsInfo[flippedCardsId[0]].guessResult = Number(guessResult);
            newCardsInfo[flippedCardsId[1]].guessResult = Number(guessResult);

            //hide them after timer
            setTimeout(() => {
                //reset guess results (do not need to update it bcs this effect function gets it done)
                newCardsInfo[flippedCardsId[0]].guessResult = -1;
                newCardsInfo[flippedCardsId[1]].guessResult = -1;
                setFlippedCardsId([]);
            }, 2000);
        }

        setCardsInfo(newCardsInfo);
    }, [flippedCardsId]);

    const tryFlip = (id) => {
        setFlippedCardsId((flippedCardsId) => {
            if ((flippedCardsId.length === 2) || (flippedCardsId.length === 1 && cardsInfo[flippedCardsId[0]].id === id))
                return flippedCardsId;
            return [...flippedCardsId, id];
        });
    };
    
    return (
        <div className={styles.board}>
            {cardsInfo.map(cardsInfo => 
                <Card key={cardsInfo.id}
                    id={cardsInfo.id}
                    face={cardsInfo.face}
                    faceId={cardsInfo.faceId}
                    flipped={cardsInfo.flipped}
                    guessResult={cardsInfo.guessResult}
                    tryFlip={tryFlip}
                    gridRow={cardsInfo.id % (rowsCount + 1)}
                    gridColumn={cardsInfo.id % (columnsCount + 1)}/>
            )}
        </div>
    );
}

export default Game;