import React from 'react';
import style from './LocationInfo.module.css';
import {useSelector} from "react-redux";
import {selectDirectGeocodingData, selectOneCallWeatherData} from "../../redux/app-selectors";


const LocationInfo: React.FC = React.memo( () => {

    const oneCallData = useSelector(selectOneCallWeatherData);

    const directGeocodingData = useSelector(selectDirectGeocodingData);

    const cityName = directGeocodingData && directGeocodingData[0].name;

    const countryName = directGeocodingData && directGeocodingData[0].country;

    const flagSrc = `https://flagcdn.com/h120/${countryName?.toLowerCase()}.png`

    return (

        <div className={style.wrapper}>
            {directGeocodingData && oneCallData && <div className={style.container}>
                <div className={style.location}>
                    <img className={style.flagL} src={flagSrc} alt="flg"/>
                    <h1 className={style.header}>{`${cityName}, ${countryName}`}</h1>
                    <img className={style.flagR} src={flagSrc} alt="flg"/>
                </div>
                {/*<div className={style.item}><h1 className={style.b}>Country: {`${countryName}`}</h1></div>*/}
            </div>}
        </div>

    )

});

export default LocationInfo;