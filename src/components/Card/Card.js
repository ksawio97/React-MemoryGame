import style from './Card.module.css';
import React, { memo } from 'react';

//guessResult can be -1 witch means do not show if correct 0 incorrect and 1 correct
const Card = ({id, face, faceId, flipped, guessResult, tryFlip}) => {
    const classes = [style.card, flipped ? style.flipped : style.hidden];

    if (0 <= guessResult && guessResult <= 1)
        classes.push([style.incorrect, style.correct][guessResult]);

    return (
        <div className={classes.join(' ')} 
            onClick={() => tryFlip(id)}>
            { flipped ? <img src={face} alt={faceId} className={style.face}></img> : null }  
        </div>
    );
}
//flipped and guessResult can change
export default memo(Card, (p, n) => p.flipped === n.flipped && p.guessResult === n.guessResult);