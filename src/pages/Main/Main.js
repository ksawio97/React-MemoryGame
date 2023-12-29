import style from './Main.module.css';
import Game from '../../components/Game/Game.js';
import { getCardImages } from '../../utils/GetCardImages.js';

const Main = () => {
    return (
        <div className={style.mainInterface}>
            <h1>Memory Game</h1>
            <Game cardsFaces={getCardImages()}/>
        </div>
    );
};

export default Main;