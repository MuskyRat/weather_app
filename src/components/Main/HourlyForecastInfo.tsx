import React from "react";
import style from './HourlyForecastInfo.module.css';
import {useSelector} from "react-redux";
import {selectOneCallWeatherData} from "../../redux/app-selectors";
import icon from '../../assets/noIcon3.png';

const HourlyForecastInfo: React.FC = React.memo(() => {

    const data = useSelector(selectOneCallWeatherData)?.hourly;

    const timezoneOffset = useSelector(selectOneCallWeatherData)?.timezone_offset;

    return (
        <div className={style.weather}>
            {data && <div className={style.headerContainer}>
                <h1 className={style.header}>24 hours Hourly Forecast</h1>
            </div>}
            {data && <div className={style.itemsContainer}><ul className={style.list}>{
                data.filter((e, index) => index > 0 && index < 25).map((e, index) => {

                    let date = new Date((timezoneOffset ? e.dt + timezoneOffset : e.dt) * 1000);

                    const forecastDate = `${date.getUTCDate()}.${date.getUTCMonth() + 1}.${date.getUTCFullYear()}`;

                    const forecastTime = `${date.getUTCHours() >= 12 
                        ? date.getUTCHours() === 12 ? date.getUTCHours() + ' pm' : date.getUTCHours() - 12 + ' pm' 
                        : date.getUTCHours() === 0 ? date.getUTCHours() + 12 + ' am' : date.getUTCHours() + ' am'}`;

                    const iconName = e.weather[0].icon;

                    const src = `http://openweathermap.org/img/wn/${iconName}@2x.png`

                    return  <li key={index} className={style.item}>
                        <div className={style.date}>{forecastDate}</div>
                        <div className={style.time}>{forecastTime}</div>
                        <div className={style.iconContainer}><img className={style.icon} src={src || icon} alt="icon" /></div>
                        <div className={style.deg}>{`${Math.round(e.temp)} C`}</div>
                        <div className={style.feelsLike}>{`${Math.round(e.feels_like)} C`}</div>
                        <div className={style.wind}>{`${Math.round(e.wind_speed)} m/s`}</div>
                        <div className={style.humidity}>{`${Math.round(e.humidity)} %`}</div>
                        {/*<div className={style.pressure}>{`${Math.round(e.pressure / 1.33322390232)} mm`}</div>*/}

                    </li>

                })
            }</ul></div> }

        </div>
    )
})

export default HourlyForecastInfo;