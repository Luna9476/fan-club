import { Carousel } from "react-bootstrap";
import React, { useEffect, useState, Component } from 'react'

import Web3ABI from '../pages/Web3';
let w3 = new Web3ABI();

export default function StarCarousel() {

    //get starUrl from promise
    const[starUrl, setStarUrl] = useState()
    const getStarUrl = async () => {
        const starUrl = await w3.GetStars1();
        setStarUrl(starUrl)
        console.log('starUrl',starUrl)
        console.log('starUrl[0]',starUrl[0])

    }

    // console.log('url',url)
    useEffect(() => {
        getStarUrl()
    }, [])

    return (
        <Carousel>
            <Carousel.Item style={{height: '700px'}}>
                <img
                    className="d-block w-100"
                    src= {starUrl[0][0][3]}
                    alt="First slide"
                />
                <Carousel.Caption>
                    <h3 style = {{color: "#ffffff"}}>First slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item style={{height: '700px'}}>
                <img
                    className="d-block w-100"
                    src="haoran.jpeg"
                    alt="Second slide"
                />

                <Carousel.Caption>
                    <h3 style = {{color: "#ffffff"}}>Second slide label</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item style={{height: '700px'}}>
                <img
                    className="d-block w-100"
                    src="jingting.jpeg"
                    alt="Third slide"
                />

                <Carousel.Caption>
                    <h3 style = {{color: "#ffffff"}}>Third slide label</h3>
                    <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    )
}