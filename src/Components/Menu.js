import { Grid } from "@material-ui/core";
import React from "react";
import {Link} from "react-router-dom";
import {FcSportsMode,FcBusinessContact, FcCalendar, FcLineChart, FcSignature} from 'react-icons/fc';
export default function Menu() {
    return (
    <>
    
        <div className="topnav" id="myTopnav">
        
        <Grid container  align = "left" justifyContent= "left" alignItems = "left" style={{marginLeft: 20}}>
            <Link style={{paddingRight: 40}} to="/userlist"> <FcSignature  size={30} color="primary"/> </Link>
            <Link style={{paddingRight: 40}} to="/userlist"> <FcBusinessContact color="primary"/>Customers </Link>
            <Link style={{paddingRight: 40}} to="/traininglist"><FcSportsMode color="primary"/>Trainings</Link>
            <Link style={{paddingRight: 40}} to="/calendar"><FcCalendar color="primary"/>Calendar</Link>
            <Link style={{paddingRight: 40}} to="/raport"><FcLineChart color="primary"/>Statistics</Link>
        </Grid>
        </div>

        
    
    </>
    )
}