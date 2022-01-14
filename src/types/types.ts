export type CurrentWeatherDataType2 = {
    coord: {
        lon: number,
        lat: number
    },
    weather: [
        {
            id: number,
            main: string,
            description: string,
            icon: string
        }
    ],
    base: string,
    main: {
        temp: number,
        feels_like: number,
        temp_min: number,
        temp_max: number,
        pressure: number,
        humidity: number,
        sea_level: number,
        grnd_level: number
    },
    visibility: number,
    wind: {
        speed: number,
        deg: number,
        gust: number
    },
    clouds: {
        all: number
    },
    dt: number,
    sys: {
        country: string,
        sunrise: number,
        sunset: number
    },
    timezone: number,
    id: number,
    name: string,
    cod: number | string
}

export type OneCallDataType = {
    lat: number,
    lon: number,
    timezone: string,
    timezone_offset: number,
    current: CurrentWeatherDataType,
    minutely: Array<MinutelyWeatherDataType>,
    hourly: Array<HourlyWeatherDataType>,
    daily: Array<DailyWeatherDataType>,
    alerts: Array<AlertsWeatherDataType>
}

export type CurrentWeatherDataType = {
    dt: number,
    sunrise: number,
    sunset: number,
    temp: number,
    feels_like: number,
    pressure: number,
    humidity: number,
    dew_point: number,
    uvi: number,
    clouds: number,
    visibility: number,
    wind_speed: number,
    wind_deg: number,
    weather: [
        {
            id: number,
            main: string,
            description: string,
            icon: string
        }
    ],
    rain: {
        '1h': number
    }
}

export type MinutelyWeatherDataType = {
    dt: number,
    precipitation: number
}

export type HourlyWeatherDataType = {
    dt: number,
    temp: number,
    feels_like: number,
    pressure: number,
    humidity: number,
    dew_point: number,
    uvi: number,
    clouds: number,
    visibility: number,
    wind_speed: number,
    wind_deg: number,
    wind_gust: number,
    weather: [
        {
            id: number,
            main: string,
            description: string,
            icon: string
        }
    ],
    pop: number
}

export type DailyWeatherDataType = {
    dt: number,
    sunrise: number,
    sunset: number,
    moonrise: number,
    moonset: number,
    moon_phase: number,
    temp: {
        day: number,
        min: number,
        max: number,
        night: number,
        eve: number,
        morn: number
    },
    feels_like: {
        day: number,
        night: number,
        eve: number,
        morn: number
    },
    pressure: number,
    humidity: number,
    dew_point: number,
    wind_speed: number,
    wind_deg: number,
    weather: [
        {
            id: number,
            main: string,
            description: string,
            icon: string
        }
    ],
    clouds: number,
    pop: number,
    rain: number,
    uvi: number
}

export type AlertsWeatherDataType = {
    sender_name: string,
    event: string,
    start: number,
    end: number,
    description: string,
    tags: Array<string>
}

export type DirectGeocodingResponseDataType = Array<DirectGeocodingDataType>

export type DirectGeocodingDataType = {
    name: string,
    local_names: {
        af: string,
        ar: string,
        ascii: string,
        az: string,
        bg: string,
        ca: string,
        da: string,
        de: string,
        el: string,
        en: string,
        eu: string,
        fa: string,
        feature_name: string,
        fi: string,
        fr: string,
        gl: string,
        he: string,
        hi: string,
        hr: string,
        hu: string,
        id: string,
        it: string,
        ja: string,
        la: string,
        lt: string,
        mk: string,
        nl: string,
        no: string,
        pl: string,
        pt: string,
        ro: string,
        ru: string,
        sk: string,
        sl: string,
        sr: string,
        th: string,
        tr: string,
        vi: string,
        zu: string
    },
    lat: number,
    lon: number,
    country: string
}




