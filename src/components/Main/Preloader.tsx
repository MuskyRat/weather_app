import React from 'react';
import style from './Preloader.module.css';
import spinner from '../../assets/DoubleRing-1s-200px.svg'

const Preloader: React.FC = React.memo( () => {

    return (

        <div className={style.wrapper}>
            <div className={style.location}></div>
            <div className={style.currentWeather}>
                <img src={spinner} alt="preloader"/>
            </div>
            <div className={style.hourlyForecast}></div>
        </div>

    )

});

export default Preloader;