import style from './Main.module.css';
import Game from '../../components/Game/Game.js'
const Main = () => {
    return (
        <div className={style.mainInterface}>
            <h1>Memory Game</h1>
            <Game/>
        </div>
    );
};

export default Main;