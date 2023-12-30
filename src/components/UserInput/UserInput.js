import styles from './UserInput.module.css';
import { useState } from 'react';

const UserInput = ({maxValue, draftCardsFaces}) => {
    const minValue = 2;
    const sliderStyles = [styles.rangeSlider]; 

    const [sliderValue, setSliderValue] = useState(minValue);

    sliderStyles.push((() => {
        const percent = (sliderValue - minValue) * 100 / (maxValue - minValue);
        //0% - 20%
        if (percent <= 20)
            return styles.easy;
        //20% - 80%
        if (percent <= 80)
            return styles.medium;
        //80% - 100%
        else
            return styles.hard;
    })());

    return (
        <>
            <h3>Distinct cards count: {sliderValue}</h3>
            <div className={styles.rangeSliderContainer}>
                <input
                    type="range"
                    min={minValue}
                    max={maxValue}
                    value={sliderValue}
                    className={sliderStyles.join(' ')}
                    onChange={(event) => setSliderValue(event.target.value)}/>
            </div>
            <button className={styles.confirmButton}
                onClick={() => draftCardsFaces(sliderValue)}>
                Confirm
            </button>
        </>
    );   
}

export default UserInput;