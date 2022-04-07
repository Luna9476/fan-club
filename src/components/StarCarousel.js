import { Carousel } from "react-bootstrap";
import React, { useEffect, useState, Component } from 'react'

import Web3ABI from '../pages/Web3';
import { setuid } from "process";
let w3 = new Web3ABI();

export default function StarCarousel() {

    //get starUrl from promise
    const [starUrl, setStarUrl] = useState([])
    const getStarUrl = async () => {
        const [starUrl] = await w3.GetStars1();  //get array[0] of the array result which back from GetStars1 function
        const starInfo = starUrl.map((item) => {  //change the array to object with map function
            const [,name,introduction,url,vote] = item
            return {url,name,introduction,vote:vote.toString()}  
        })
        .sort((a,b)=>b.vote-a.vote)
        .slice(0,3)

        setStarUrl(starInfo)
        console.log('starUrl', starUrl, starInfo)
        console.log('starInfo', starInfo)
    }

    useEffect(() => {
        getStarUrl()
    }, [])

    return (
        <Carousel>
            {
                starUrl.map((item) => {
                    return (
                        <Carousel.Item style={{ height: '700px' }} key={item.url}>
                            <img
                                className="d-block w-100"
                                src={item.url}
                                alt="First slide"
                            />
                            <Carousel.Caption>
                                <h3 style={{ color: "#ffffff" }}>{item.name}</h3>
                                <p>{item.introduction}</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    )
                })
            }
        </Carousel>
    )
}