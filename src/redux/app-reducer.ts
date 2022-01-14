import {CurrentWeatherDataType2, DirectGeocodingResponseDataType, OneCallDataType} from "../types/types";
import {BaseThunkType, InferActionsTypes} from "./redux-store";
import {geocodingAPI} from "../api/geocoding-api";
import {weatherAPI} from "../api/weather-api";


let initialState = {
    currentWeatherData: null as CurrentWeatherDataType2 | null,
    oneCallWeatherData: null as OneCallDataType | null,
    directGeocodingData: null as DirectGeocodingResponseDataType | null,
    error: null as string | null,
    buttonStatus: false,
    loadingStatus: false,
}

const appReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'WA/CURRENT_WEATHER_DATA_RECEIVED':
            return {...state, currentWeatherData: action.payload};
        case 'WA/HOURLY_FORECAST_DATA_RECEIVED':
            return {...state, oneCallWeatherData: action.payload};
        case 'WA/FORWARD_GEOCODING_DATA_RECEIVED':
            return {...state, directGeocodingData: action.payload};
        case 'WA/ERROR_OCCURRED':
            return {...state, error: action.error};
        case 'WA/BUTTON_STATUS_CHANGED':
            return {...state, buttonStatus: action.buttonStatus};
        case 'WA/LOADING_STATUS_CHANGED':
            return {...state, loadingStatus: action.loadingStatus};
        default:
            return state;
    }
}

export const actions = {
    currentWeatherDataReceived: (currentWeatherData: CurrentWeatherDataType2 | null) => ({type: 'WA/CURRENT_WEATHER_DATA_RECEIVED', payload: currentWeatherData} as const),
    oneCallWeatherDataReceived: (oneCallWeatherData: OneCallDataType | null) => ({type: 'WA/HOURLY_FORECAST_DATA_RECEIVED', payload: oneCallWeatherData} as const),
    directGeocodingDataReceived: (data: DirectGeocodingResponseDataType | null) => ({type: 'WA/FORWARD_GEOCODING_DATA_RECEIVED', payload: data} as const),
    errorOccurred: (error: string | null) => ({type: 'WA/ERROR_OCCURRED', error} as const),
    buttonStatusChanged: (buttonStatus: boolean) => ({type: 'WA/BUTTON_STATUS_CHANGED', buttonStatus} as const),
    loadingStatusChanged: (loadingStatus: boolean) => ({type: 'WA/LOADING_STATUS_CHANGED', loadingStatus} as const),
}

export const getWeather = (city: string): ThunkType => async (dispatch, getState) => {

    dispatch(actions.buttonStatusChanged(false));

    dispatch(actions.loadingStatusChanged(true));

    const currentError = getState().app.error;
    currentError && dispatch(actions.errorOccurred(null));

    const oneCallData = getState().app.oneCallWeatherData;
    oneCallData && dispatch(actions.oneCallWeatherDataReceived(null));

    const directGeocodingData = getState().app.directGeocodingData;
    directGeocodingData && dispatch(actions.directGeocodingDataReceived(null));

    const geocodingData = await geocodingAPI.getLonLat(city);

    if (geocodingData.length && geocodingData !== 'error') {

        dispatch(actions.directGeocodingDataReceived(geocodingData));

        const directGeocodingData = getState().app.directGeocodingData;

            if(directGeocodingData) {

                const geoCoordinates = {lat: directGeocodingData[0]['lat'], lon: directGeocodingData[0]['lon']};

                const data = await weatherAPI.getWeather(geoCoordinates.lat, geoCoordinates.lon);


                if(data !== 'error') {

                    dispatch(actions.oneCallWeatherDataReceived(data));

                    const geocodingData = getState().app.directGeocodingData;

                    const countryName = geocodingData && geocodingData[0].country;

                    const flagSrc = `https://flagcdn.com/h120/${countryName?.toLowerCase()}.png`;

                    if((window as any)[flagSrc]) {

                        dispatch(actions.buttonStatusChanged(true));

                        dispatch(actions.loadingStatusChanged(false));

                    } else {

                        const currentFlagIcon = new Image();

                        const loadHandler = () => {

                            dispatch(actions.buttonStatusChanged(true));

                            dispatch(actions.loadingStatusChanged(false));

                            currentFlagIcon.removeEventListener('load', loadHandler);

                        };

                        currentFlagIcon.addEventListener('load', loadHandler);

                        currentFlagIcon.src = flagSrc;

                        (window as any)[flagSrc] = currentFlagIcon;

                    }

                } else {

                    dispatch(actions.errorOccurred('An error occurred. Try again. (OneCallAPI phase).'));

                    // const directGeocodingData = getState().app.directGeocodingData;
                    // directGeocodingData && dispatch(actions.directGeocodingDataReceived(null));

                    dispatch(actions.buttonStatusChanged(true));

                    dispatch(actions.loadingStatusChanged(false));

                }

            }

    } else if (geocodingData.length === 0) {

        dispatch(actions.errorOccurred('Incorrect city name'));

        dispatch(actions.buttonStatusChanged(true));

        dispatch(actions.loadingStatusChanged(false));

    } else {

        dispatch(actions.errorOccurred('An error occurred. Try again. (Geocoding phase).'));

        dispatch(actions.buttonStatusChanged(true));

        dispatch(actions.loadingStatusChanged(false));

    }

}

export const initializeApp = (): ThunkType => async (dispatch) => {

    const iconNamesArray = ['01d', '01n', '02d', '02n', '03d', '03n', '04d', '04n', '09d', '09n', '10d', '10n', '11d', '11n', '13d', '13n', '50d', '50n'];

    const iconSizesArray = ['2x', '4x'];

    const promiseArray = [];

    for (const icon of iconNamesArray) {

        for (const size of iconSizesArray) {

            const promise = new Promise<void>((res) => {

                const image = new Image();

                const src: string = `http://openweathermap.org/img/wn/${icon}@${size}.png`

                const loadHandler = () => {

                    image.removeEventListener('load', loadHandler);

                    res();

                };

                image.addEventListener('load', loadHandler);

                image.src = src;

                (window as any)[src] = image;

            });

            promiseArray.push(promise);

        }

    }

    Promise.all(promiseArray).then(() => {

        dispatch(actions.buttonStatusChanged(true));

    });

}

export default appReducer;


export type InitialStateType = typeof initialState;

type ActionsTypes = InferActionsTypes<typeof actions>;

type ThunkType = BaseThunkType<ActionsTypes>;