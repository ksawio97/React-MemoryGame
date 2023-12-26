import styles from './Game.module.css';
import Card from '../../components/Card/Card.js';
const Game = () => {
    const cards = [];
    for (let i = 0; i < 20; i++)
        cards.push(<Card key={i}/>);

    return (
        <div className={styles.board}>
            {cards}
        </div>
    )
}

export default Game;