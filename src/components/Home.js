import React, { Component } from 'react'
import Pool from './Pool';
import StarCarousel from './StarCarousel';

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
