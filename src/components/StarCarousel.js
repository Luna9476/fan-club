import { Carousel } from "react-bootstrap";

export default function StarCarousel() {
    return (
        <Carousel>
            <Carousel.Item style={{height: '700px'}}>
                <img
                    className="d-block w-100"
                    //src="BTS.jpeg"
                    src = "https://img03.sogoucdn.com/v2/thumb/retype_exclude_gif/ext/auto/crop/xy/ai/w/1125/h/633?appid=200698&url=https://pic.baike.soso.com/ugc/baikepic2/13531/cut-20211226003941-1583415352_jpg_1125_750_89400.jpg/1284"
                    alt="First slide"
                />
                <Carousel.Caption>
                    <h3>First slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item style={{height: '600px'}}>
                <img
                    className="d-block w-100"
                    src="1.jpeg"
                    alt="Second slide"
                />

                <Carousel.Caption>
                    <h3>Second slide label</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item style={{height: '600px'}}>
                <img
                    className="d-block w-100"
                    src="haoran.webp"
                    alt="Third slide"
                />

                <Carousel.Caption>
                    <h3>Third slide label</h3>
                    <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    )
}