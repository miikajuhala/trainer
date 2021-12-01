import React from "react";
import {Link} from "react-router-dom";


export default function Menu() {
    return (
    <>
        <Link to="/userlist">Userlist</Link>
        <Link to="/raport">Raport</Link>
        <Link to="/calendar">Calendar</Link>
        <Link to="/traininglist">Traininglist</Link>
    </>
    )
}