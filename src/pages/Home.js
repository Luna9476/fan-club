import React, { Component } from 'react'
import Pool from '../components/Pool';
import StarCarousel from '../components/StarCarousel';

export default class Home extends Component {
    render() {
        return (
            <div>
                <StarCarousel />
                <Pool />
                <div></div>
            </div>
        )
    }
}