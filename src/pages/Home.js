import React, { Component } from 'react'
import Pool from '../components/Pool';
import StarCarousel from '../components/StarCarousel';

const homeStyle = {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
}
export default class Home extends Component {
    render() {
        return (
            <div style = {homeStyle}>
                <StarCarousel />
                <Pool />
                <div></div>
            </div>
        )
    }
}