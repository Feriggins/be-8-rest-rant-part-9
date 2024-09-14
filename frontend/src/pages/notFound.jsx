import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
    return (
        <div className="d-flex flex-column align-items-center justify-content-center vh-100">
            <img
                src="/not-found-images/ethan-sykes-iISyBKOT2D0-unsplash.jpg"
                alt="Not Found"
                className="mb-4"
                style={{ height: '500px' }}
            />
            <h2 className="text-center mb-3">
                Sorry, the page you're looking for does not exist.
            </h2>
            <Link to="/" className="btn btn-primary">
                Go Back to Home
            </Link>
        </div>
    );
}

export default NotFound;
