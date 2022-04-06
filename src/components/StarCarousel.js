import { Carousel } from "react-bootstrap";
import React, { useEffect, useState, Component } from 'react'

import Web3ABI from '../pages/Web3';
import { setuid } from "process";
let w3 = new Web3ABI();

export default function StarCarousel() {

    //get starUrl from promise
    const [starUrl, setStarUrl] = useState([])
    const [starName, setStarName] = useState([])
    const getStarUrl = async () => {
        const starUrl = await w3.GetStars1();
        const urls = starUrl[0].map((url) => {
            return url[3]  //get the url from the array
        })
        const names = starUrl[0].map((name) => {
            return name[1]  //get the name from the array 
        })
        setStarUrl(urls)
        setStarName(names)
        console.log('starUrl', starUrl, urls)
    }

    useEffect(() => {
        getStarUrl()
    }, [])

    return (
        <Carousel>
            {
                starUrl.map((url) => {
                    return (
                        <Carousel.Item style={{ height: '700px' }} key={url}>
                            <img
                                className="d-block w-100"
                                src={url}
                                alt="First slide"
                            />
                            <Carousel.Caption>
                                <h3 style={{ color: "#ffffff" }}>First slide</h3>
                                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    )
                })
            }
        </Carousel>
    )
}