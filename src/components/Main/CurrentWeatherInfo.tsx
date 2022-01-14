import React from 'react'
import {useSelector} from 'react-redux'
import style from './CurrentWeatherInfo.module.css'
import {selectError, selectOneCallWeatherData} from "../../redux/app-selectors";
import icon from '../../assets/noIcon3.png'

const CurrentWeatherInfo: React.FC = React.memo (() => {

    const data = useSelector(selectOneCallWeatherData)?.current;

    const iconName = data?.weather[0].icon;

    const src = `http://openweathermap.org/img/wn/${iconName}@4x.png`

    return (
        <div className={style.weather}>
            {data && <div className={style.headerContainer}>
                <h1 className={style.header}>Current Weather</h1>
            </div>}
            {data && data.weather[0].icon && <div className={style.iconContainer}><img src={src || icon} alt="icon" className={style.icon}/></div>}
            {data && <div className={style.weatherInfo}>
                {data && data.weather[0].description && <div className={style.description}>Weather: <span>{`${data.weather[0].description[0].toUpperCase()}${data.weather[0].description.slice(1)}`}</span></div>}
                {data && isFinite(data.temp) && <div className={style.temperature}>Temperature: <span>{Math.round(data.temp)} C</span></div>}
                {data && isFinite(data.feels_like) && <div className={style.feelsLike}>Feels like: <span>{Math.round(data.feels_like)} C</span></div>}
                {data && isFinite(data.wind_speed) && <div className={style.windSpeed}>Wind speed: <span>{Math.round(data.wind_speed)} m/s</span></div>}
                {data && isFinite(data.humidity) && <div className={style.humidity}>Humidity: <span>{Math.round(data.humidity)} %</span></div>}
                {data && isFinite(data.pressure) && <div className={style.pressure}>Pressure: <span>{Math.round(data.pressure / 1.33322390232)} mm Hg</span></div>}
            </div>}
        </div>
    )
})

export default CurrentWeatherInfo;