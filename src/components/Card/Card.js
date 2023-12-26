import style from './Card.module.css';
import React, { useState } from 'react';

const Card = () => {
    const [classes, setClasses] = useState([style.card]);

    const onClick = () => {
        if (!(style.clicked in classes)) {
            setClasses([...classes, style.clicked])
        }
    }

    return (
        <div className={classes.join(' ')} 
            onClick={onClick}>
        </div>
    );
}
export default Card;