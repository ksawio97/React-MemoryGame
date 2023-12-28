import style from './Card.module.css';
import React, { memo } from 'react';

const Card = ({id, face, faceId, flipped, tryFlip}) => {
    const classes = [style.card, flipped ? style.flipped : style.hidden];

    return (
        <div className={classes.join(' ')} 
            onClick={() => tryFlip(id)}>
            { flipped ? <img src={face} alt={faceId} className={style.face}></img> : null }   
        </div>
    );
}

export default memo(Card);