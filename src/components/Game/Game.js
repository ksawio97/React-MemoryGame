import styles from './Game.module.css';
import Card from './Card/Card.js';
import React, { useEffect, useState } from 'react';
import { shuffledArr } from '../../utils/Shuffle.js'
import { getGridSize, getElementRow, getElementColumn, getGridTemplate } from '../../utils/GridSizesFunctions.js';
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

const Game = ({cardsFaces, endGame}) => {
    const [rowsCount, columnsCount] = getGridSize(cardsFaces.length);
    const [rowsTemplate, columnsTemplate] = [getGridTemplate(rowsCount), getGridTemplate(columnsCount)];

    const [cardsInfo, setCardsInfo] = useState(generateCardsInfo(cardsFaces));
    const [flippedCardsId, setFlippedCardsId] = useState([]);
    //cards to stop rerendering
    const [guessedCardsId, setGuessedCardsId] = useState(new Set());

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

                //guessed correctly delete them from remaining pool
                if (guessResult) {
                    setGuessedCardsId((prev) => {
                        prev.add(flippedCardsId[0]);
                        prev.add(flippedCardsId[1]);
                        return prev;
                    });
                }
                //guessed incorrectly reset guessResult
                else {
                    newCardsInfo[flippedCardsId[0]].guessResult = -1;
                    newCardsInfo[flippedCardsId[1]].guessResult = -1;

                    //do not need to update cardsInfo bcs effect function associated with flippedCardsId gets it done
                }
                
                setFlippedCardsId([]);
            }, 2000);
        }

        setCardsInfo(newCardsInfo);
    }, [flippedCardsId, cardsInfo]);

    useEffect(() => {
        if (guessedCardsId.size === cardsInfo.length) {
            endGame();
        }
    }, [guessedCardsId, cardsInfo, endGame]);

    const tryFlip = (id) => {
        setFlippedCardsId((flippedCardsId) => {
            if ((flippedCardsId.length === 2) || (flippedCardsId.length === 1 && cardsInfo[flippedCardsId[0]].id === id))
                return flippedCardsId;
            return [...flippedCardsId, id];
        });
    };
    
    return (
        <div className={styles.board} 
        style={{gridTemplateRows: rowsTemplate, gridTemplateColumns: columnsTemplate}}>
            {cardsInfo.map(cardsInfo => 
                guessedCardsId.has(cardsInfo.id) ? 
                //TODO add animation to placeholder that indicates card disappearing
                //empty placeholder so card stay in same place
                <div style={{gridRow: getElementRow(cardsInfo.id, rowsCount), gridColumn: getElementColumn(cardsInfo.id, columnsCount)}}/> :
                <Card key={cardsInfo.id}
                    id={cardsInfo.id}
                    face={cardsInfo.face}
                    faceId={cardsInfo.faceId}
                    flipped={cardsInfo.flipped}
                    guessResult={cardsInfo.guessResult}
                    tryFlip={tryFlip}
                    gridRow={getElementRow(cardsInfo.id, columnsCount)}
                    gridColumn={getElementColumn(cardsInfo.id, columnsCount)}/>
            )}
        </div>
    );
}

export default Game;