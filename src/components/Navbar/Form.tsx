import React, {ChangeEvent, FormEvent, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {selectButtonStatus, selectDirectGeocodingData, selectOneCallWeatherData,} from "../../redux/app-selectors";
import {actions, getWeather} from "../../redux/app-reducer";
import style from './Form.module.css';
import logo from '../../assets/logo.png';

const Form: React.FC = React.memo (() => {

    const buttonStatus = useSelector(selectButtonStatus);

    const oneCallWeatherData = useSelector(selectOneCallWeatherData);

    const forwardGeocodingData = useSelector(selectDirectGeocodingData);

    const dispatch = useDispatch();

    const [city, setCity] = useState('');

    const updateCity = (e: ChangeEvent<HTMLInputElement>) => {
        setCity(e.target.value);
        e.stopPropagation();
    };

    const submitHandler = (e: FormEvent) => {
        e.preventDefault();
        if(city === '') {
            forwardGeocodingData && dispatch(actions.directGeocodingDataReceived(null));
            oneCallWeatherData && dispatch(actions.oneCallWeatherDataReceived(null));
            dispatch(actions.errorOccurred('Enter a city name'))
        } else {
            dispatch(getWeather(city));
        }
    };

    return (
        <div className={style.wrapper}>

            <div className={style.logoContainer}>
                <img className={style.logo} src={logo} alt="logo"/>
            </div>

            <div className={style.formContainer}>
                <form onSubmit={submitHandler} className={style.form} >
                    <input type='text' value={city} onChange={updateCity} placeholder='Enter a city...' autoFocus={true}/>
                    <button disabled={!buttonStatus} type='submit'>Get the weather</button>
                </form>
            </div>

        </div>
    )
})

export default Form;