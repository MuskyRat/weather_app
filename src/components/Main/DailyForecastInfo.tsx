import React from 'react';
import style from './DailyForecastInfo.module.css';
import {useSelector} from "react-redux";
import {selectOneCallWeatherData} from "../../redux/app-selectors";
import icon from "../../assets/noIcon3.png";

const DailyForecastInfo: React.FC = React.memo( () => {

    const data = useSelector(selectOneCallWeatherData)?.daily;

    const timezoneOffset = useSelector(selectOneCallWeatherData)?.timezone_offset;

    return (

        <div className={style.wrapper}>
            {data && <div className={style.headerContainer}>
                <h1 className={style.header}>7 days Daily Forecast</h1>
            </div>}
            {data && <div className={style.itemsContainer}>{
                data.filter((e, index) => index >= 0 && index < 7).map((e, index) => {

                    let date = new Date((timezoneOffset ? e.dt + timezoneOffset : e.dt) * 1000);

                    const forecastDate = `${date.getUTCDate()}.${date.getUTCMonth() + 1}.${date.getUTCFullYear()}`;

                    const iconName = e.weather[0].icon;

                    const src = `http://openweathermap.org/img/wn/${iconName}@2x.png`

                    return  <div key={index} className={style.itemContainer}>
                                <div className={style.item}>
                                    <div className={style.date}>{forecastDate}</div>
                                    <div className={style.descriptionContainer}>
                                        <div className={style.description}>{`${e.weather[0].description[0].toUpperCase()}${e.weather[0].description.slice(1)}`}</div>
                                        <div className={style.iconContainer}><img className={style.icon} src={src || icon} alt="icon" /></div>
                                    </div>
                                    <div className={style.tempNamesInfo}>
                                        <div className={style.tempName}>Temperature:</div>
                                        <div className={style.tempName}>Feels like:</div>
                                        <div className={style.tempName992}>Temp:</div>
                                        <div className={style.tempName992}>Feels:</div>
                                    </div>
                                    <div className={style.tempContainer}>
                                        <div className={style.timeName}>Morning</div>
                                        <div className={style.temperature}>{`${Math.round(e.temp.morn)} C`}</div>
                                        <div className={style.feelsLike}>{`${Math.round(e.feels_like.morn)} C`}</div>
                                    </div>
                                    <div className={style.tempContainer}>
                                        <div className={style.timeName}>Day</div>
                                        <div className={style.temperature}>{`${Math.round(e.temp.day)} C`}</div>
                                        <div className={style.feelsLike}>{`${Math.round(e.feels_like.day)} C`}</div>
                                    </div>
                                    <div className={style.tempContainer}>
                                        <div className={style.timeName}>Evening</div>
                                        <div className={style.temperature}>{`${Math.round(e.temp.eve)} C`}</div>
                                        <div className={style.feelsLike}>{`${Math.round(e.feels_like.eve)} C`}</div>
                                    </div>
                                    <div className={style.tempContainer}>
                                        <div className={style.timeName}>Night</div>
                                        <div className={style.temperature}>{`${Math.round(e.temp.night)} C`}</div>
                                        <div className={style.feelsLike}>{`${Math.round(e.feels_like.night)} C`}</div>
                                    </div>
                                    <div className={style.propContainer}>
                                        <div className={`${style.name} ${style.windName}`}>Wind speed</div>
                                        <div className={style.wind}>{`${Math.round(e.wind_speed)} m/s`}</div>
                                    </div>
                                    <div className={style.propContainer}>
                                        <div className={style.name}>Humidity</div>
                                        <div className={style.humidity}>{`${Math.round(e.humidity)} %`}</div>
                                    </div>
                                    <div className={`${style.propContainer} ${style.pressurePropContainer}`}>
                                        <div className={style.name}>Pressure</div>
                                        <div className={style.pressure}>{`${Math.round(e.pressure / 1.33322390232)} mm Hg`}</div>
                                    </div>
                                </div>
                            </div>

                })
            }</div> }
        </div>

    )

});

export default DailyForecastInfo;