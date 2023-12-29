import style from './Card.module.css';
import React, { memo, useEffect } from 'react';

const Card = ({id, face, faceId, flipped, tryFlip}) => {
    const classes = [style.card, flipped ? style.flipped : style.hidden];

    useEffect(() => {
        console.log(`Card: ${id} rerendered!`);
    });
    return (
        <div className={classes.join(' ')} 
            onClick={() => tryFlip(id)}>
            { flipped ? <img src={face} alt={faceId} className={style.face}></img> : null }   
        </div>
    );
}
//flipped can change
export default memo(Card, (p, n) => p.flipped === n.flipped);