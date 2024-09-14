import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Places = () => {
    const [places, setPlaces] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:5000/api/place')
            .then((response) => response.json())
            .then((data) => setPlaces(data))
            .catch((error) => console.error('Error fetching places:', error));
    }, []);

    const gotoPlace = (placeId) => {
        navigate(`/places/${placeId}`);
    }

    return (
        <div className="container mt-4">
            {places.length === 0 ? (
                <div className="text-center">
                    <p className="display-5 fw-bold">No places currently available, <a href="/add-place">add one here</a>.</p>
                </div>
            ) : (
                <div className="row">
                    <h1 className="text-center mb-2" style={{ color: '#0A81FF'}}>Places to Rant or Rave About</h1>
                    {places.map((place) => (
                        <div className="col-md-6 mb-4" key={place._id}>
                            <div className="card border-0" style={{ cursor: 'pointer'}} onClick={() => gotoPlace(place._id)}>
                                <div className="card-body text-center d-flex flex-column align-items-center">
                                    <h2 className="card-title" style={{ color: '#0A81FF'}}>{place.name}</h2>
                                    <p className="card-text">{place.cuisines}</p>
                                    <div
                                        style={{
                                            width: '450px',
                                            height: '450px',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            overflow: 'hidden',
                                            backgroundColor: '#f8f9fa'
                                        }}
                                    >
                                        <img
                                            src={place.pic}
                                            alt={place.name}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                            }}
                                        />
                                    </div>
                                    <p className="card-text">Located at {place.city}, {place.state}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Places;
