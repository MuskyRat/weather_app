import axios from "axios";
import {CurrentWeatherDataType2, DirectGeocodingResponseDataType} from "../types/types";

const API_KEY = 'dc241c2be3b27011d5826b6cf784e42e';

const instance = axios.create({
    baseURL: 'http://api.openweathermap.org/geo/1.0/',
    params: {
        appid: API_KEY,
    }
});

export const geocodingAPI = {
    getLonLat(city: string) {
        return instance.get<DirectGeocodingResponseDataType>('direct', {
            params: {
                q: city,
                limit: 1,
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