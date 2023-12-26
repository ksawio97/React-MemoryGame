import style from './Card.module.css';
import React, { useState } from 'react';

const Card = ({id, face, faceId, tryClick}) => {
    const [clicked, setClicked] = useState(false);
    const classes = [style.card];
    if (clicked)
        classes.push(style.clicked);

    const onClick = () => {
        if (tryClick(id, faceId)){
            setClicked(true);
            console.log(clicked);
        }
        else {
            if (clicked)
                setClicked(false);
        }
    }

    return (
        <div className={classes.join(' ')} 
            onClick={onClick}>
            { clicked ? <img src={face} alt={faceId} className={style.face}></img> : null }   
        </div>
    );
}

export default Card;