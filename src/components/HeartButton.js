import React, { Component } from 'react'
import classes from './HeartButton.module.css';

function HeartButton(props) {
    return (
        <div className={classes.container}>
            <img src="/image/heart.gif"/>
            <button className={classes.btn} onClick={props.onClick}><b>Vote</b></button>
        </div>
    )
}

export default HeartButton;