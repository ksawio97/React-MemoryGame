import style from './Main.module.css';
import Game from '../../components/Game/Game.js';
import { getCardImages } from '../../utils/GetCardImages.js';
import { getRandomElements } from '../../utils/Shuffle.js';
import { useState } from 'react';
import UserInput from '../../components/UserInput/UserInput.js';

const Main = () => {
    const allCardsFaces = getCardImages();
    const [cardsFaces, setCardsFaces] = useState([]);
    //const cardsFaces = getRandomElements(getCardImages(), 4);
    const draftCardsFaces = (count) => {
        setCardsFaces(getRandomElements(allCardsFaces, count));
    };

    const endGame = () => {
        setCardsFaces([]);
    }
    return (
        <div className={style.mainInterface}>
            <h1>Memory Game</h1>
            {cardsFaces.length === 0 ? 
            <UserInput maxValue={allCardsFaces.length}
                draftCardsFaces={draftCardsFaces}/>
            : <Game cardsFaces={cardsFaces}
                endGame={endGame}/>}
        </div>
    );
};

export default Main;