import styles from './Game.module.css';
import Card from '../../components/Card/Card.js';
const Game = () => {
    const cards = [];
    for (let i = 0; i < 10; i++)
        cards.push(<Card/>);

    return (
        <div className={styles.board}>
            {cards}
        </div>
    )
}

export default Game;