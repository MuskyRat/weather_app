import React, {useEffect} from 'react';
import style from './App.module.css';
import CurrentWeatherInfo from "./components/Main/CurrentWeatherInfo";
import Form from "./components/Navbar/Form";
import {Provider, useDispatch, useSelector} from "react-redux";
import store from './redux/redux-store';
import LocationInfo from "./components/Main/LocationInfo";
import HourlyForecastInfo from "./components/Main/HourlyForecastInfo";
import DailyForecastInfo from "./components/Main/DailyForecastInfo";
import Preloader from "./components/Main/Preloader";
import Error from "./components/Main/Error";
import {
    selectDirectGeocodingData,
    selectError,
    selectLoadingStatus,
    selectOneCallWeatherData
} from "./redux/app-selectors";
import {initializeApp} from "./redux/app-reducer";
import Start from "./components/Main/Start";

const App: React.FC = React.memo(() => {

    const loadingStatus = useSelector(selectLoadingStatus);

    const error = useSelector(selectError);

    const geocodingData = useSelector(selectDirectGeocodingData);

    const oneCallData = useSelector(selectOneCallWeatherData);

    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(initializeApp());

    }, [])

    return (
        <div className={style.wrapper}>
            <div className={style.container}>
                <Form/>
                <div className={style.mainContainer}>
                    {!geocodingData && !oneCallData && !error && !loadingStatus && <Start />}
                    {error && <Error />}
                    {loadingStatus && <Preloader/>}
                    {geocodingData && oneCallData && !loadingStatus && !error && <LocationInfo/>}
                    {geocodingData && oneCallData && !loadingStatus && !error && <CurrentWeatherInfo/>}
                    {geocodingData && oneCallData && !loadingStatus && !error && <HourlyForecastInfo/>}
                    {geocodingData && oneCallData && !loadingStatus && !error && <DailyForecastInfo/>}
                    {/*<Preloader />*/}
                </div>
            </div>
        </div>
    );
})

const AppContainer: React.FC = React.memo(() => {

    return (
        <Provider store={store}>
            <App/>
        </Provider>
    )
})

export default AppContainer;