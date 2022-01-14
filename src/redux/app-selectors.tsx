import {AppStateType} from "./redux-store";


export const selectCurrentWeatherData = (state: AppStateType) => {
    return state.app.currentWeatherData;
};

export const selectOneCallWeatherData = (state: AppStateType) => {
    return state.app.oneCallWeatherData;
};

export const selectDirectGeocodingData = (state: AppStateType) => {
    return state.app.directGeocodingData;
};

export const selectError = (state: AppStateType) => {
    return state.app.error;
};

export const selectButtonStatus = (state: AppStateType) => {
    return state.app.buttonStatus;
};

export const selectLoadingStatus = (state: AppStateType) => {
    return state.app.loadingStatus;
};