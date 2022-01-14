import React from "react";
import { NavLink } from "react-router-dom";
import style from './Navbar.module.css'

const Navbar: React.FC = () => {

    return (
        <div className={style.wrapper}>
            <nav>
                <ul>
                    <li>
                        <NavLink to={'/start'}>Start</NavLink>
                    </li>
                    <li>
                        <NavLink to={'/current_weather'}>Current weather</NavLink>
                    </li>
                    <li>
                        <NavLink to={'/today_hourly_forecast'}>Today hourly forecast</NavLink>
                    </li>
                    <li>
                        <NavLink to={'/7_days_daily_forecast'}>7 days daily forecast</NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    )

};

export default Navbar;