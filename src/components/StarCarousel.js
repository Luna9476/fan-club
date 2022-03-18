import { Carousel } from "react-bootstrap";

export default function StarCarousel() {
    return (
        <Carousel>
            <Carousel.Item style={{height: '700px'}}>
                <img
                    className="d-block w-100"
                    src="BTS.jpeg"
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