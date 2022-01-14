import axios from "axios";
import {CurrentWeatherDataType2} from "../types/types";

const API_KEY = 'dc241c2be3b27011d5826b6cf784e42e';

const instance = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5/',
    params: {
        appid: API_KEY,
    }
})

export const weatherAPI = {
    getCurrentWeather(city: string) {
        return instance.get<CurrentWeatherDataType2>('weather', {
                params: {
                    q: city,
                    // lang: 'ru',
                    units: 'metric',
                }}).then( res => res.data )
                    .catch( (error: any) => {
                        if(error.response) {
                            console.log(error.response);
                            return error.response.data
                        } else if (error.request) {
                            console.log(error.request);
                            return {cod: '405'} as CurrentWeatherDataType2
                        } else {
                            console.log('Error', error.message);
                            return {cod: '405'} as CurrentWeatherDataType2
                        }
                    }
                    )
    },
    getWeather(latitude: number, longitude: number) {
        return instance.get<CurrentWeatherDataType2>('onecall', {
            params: {
                lat: latitude,
                lon: longitude,
                exclude: 'minutely,alerts',
                units: 'metric',
            }}).then( res => res.data )
            .catch( (error: any) => {
                    if(error.response) {
                        console.log(error.response);
                        return error.response.data
                    } else if (error.request) {
                        console.log(error.request);
                        return 'error'
                    } else {
                        console.log('Error', error.message);
                        return 'error'
                    }
                }
)
    },

}