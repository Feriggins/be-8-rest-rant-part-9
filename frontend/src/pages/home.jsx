import React from 'react';
import { Link } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';

function Home() {
    return (
        <div className="text-center">
            <h1 className="display-1 my-5">Rest Rant</h1>
            <Carousel interval={2000}>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="/home-images/brooke-lark-BepcnEnnoPs-unsplash.jpg"
                        alt="First slide"
                        style={{ height: '500px', objectFit: 'cover' }}
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="/home-images/brooke-lark-hzlL6lWX54k-unsplash.jpg"
                        alt="Second slide"
                        style={{ height: '500px', objectFit: 'cover' }}
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="/home-images/eaters-collective-ddZYOtZUnBk-unsplash.jpg"
                        alt="Third slide"
                        style={{ height: '500px', objectFit: 'cover' }}
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="/home-images/lily-banse--YHSwy6uqvk-unsplash.jpg"
                        alt="Fourth slide"
                        style={{ height: '500px', objectFit: 'cover' }}
                    />
                </Carousel.Item>
            </Carousel>
            <div className="my-5">
                <Link to="/places" className="btn btn-primary btn-lg mx-3">
                    Places
                </Link>
                <Link to="/add-place" className="btn btn-success btn-lg mx-3">
                    New Place
                </Link>
            </div>
        </div>
    );
}

export default Home;
