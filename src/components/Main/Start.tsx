import React from "react";
import style from './Start.module.css';

const Start: React.FC = () => {

    return (

        <div className={style.wrapper}>

            <div className={style.start}>

                <p className={style.text}>
                    <b>Welcome to Get The Weather</b>, a weather web-application made with Open Weather API, React.js and Redux.<br />

                    In this application you can find information about the weather in a specific city.<br />

                    To get the weather, type a city name into the text field and press 'Get The Weather' button.<br />

                    To specify your request you could also add ", country name" after a city name to your request, e.g. Saint Petersburg, US.<br />

                    You can type your request in your language, e.g. in Russian "Санкт-Петербург".<br />

                    Get The Weather provides current weather data, 24 hours hourly weather forecast and 7 days daily weather forecast.<br />
                </p>

                <p className={style.text}>
                    <b>Thanks for choosing Get The Weather!</b>
                </p>

            </div>

        </div>

    )

};

export default Start;