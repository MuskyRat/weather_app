import React from 'react';
import style from './Error.module.css';
import {useSelector} from "react-redux";
import {selectError} from "../../redux/app-selectors";

const Error: React.FC = () => {

    const error = useSelector(selectError);

    return (

        <div className={style.wrapper}>

            <div className={style.error}>Error: {error}</div>

        </div>

    )

};

export default Error;