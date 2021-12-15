import React from "react";
import {Link} from "react-router-dom";


export default function Menu() {
    return (
    <>
    <div className="topnav" id="myTopnav">
        <Link to="/userlist">Customers</Link>
        <Link to="/traininglist">Trainings</Link>
        <Link to="/calendar">Calendar</Link>
        <Link to="/raport">Statistics</Link>
        
        
    </div>
    </>
    )
}