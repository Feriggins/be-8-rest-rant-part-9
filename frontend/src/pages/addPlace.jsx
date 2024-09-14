import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';

const AddPlace = () => {
    const [formData, setFormData] = useState({
        name: '',
        pic: '',
        city: '',
        state: '',
        founded: '',
        cuisines: '',
    });

    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const [modalTitle, setModalTitle] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        const errors = [];
        const currentYear = new Date().getFullYear();

        if (!formData.name) {
            errors.push('Place name is required.');
        }
        if (formData.founded && (formData.founded < 1673 || formData.founded > currentYear)) {
            errors.push(`Founded year must be between 1673 and ${currentYear}.`);
        }

        if (errors.length > 0) {
            setModalTitle('Validation Error');
            setModalContent(
                <div>
                    {errors.map((error, index) => (
                        <p key={index}>{error}</p>
                    ))}
                </div>
            );
            setShowModal(true);
            return false;
        }

        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            fetch('http://localhost:5000/api/place', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            })
                .then((response) =>
                    response.json().then((data) => ({ status: response.status, data }))
                )
                .then(({ status, data }) => {
                    if (status === 200) {
                        setModalTitle('Success');
                        setModalContent('Place Successfully Added');
                        setShowModal(true);
                        setTimeout(() => {
                            setShowModal(false);
                            navigate(`/places/${data._id}`); // Assuming backend returns the new place's ID
                        }, 2000);
                    } else if (status === 400) {
                        setModalTitle('Validation Error');
                        setModalContent(
                            <div>
                                {data.errors.map((error, index) => (
                                    <p key={index}>{error.msg}</p>
                                ))}
                            </div>
                        );
                        setShowModal(true);
                    } else if (status === 500) {
                        setModalTitle('Server Error');
                        setModalContent(<p>{data.error}</p>);
                        setShowModal(true);
                    }
                })
                .catch((error) => {
                    setModalTitle('Error');
                    setModalContent(<p>Unexpected error occurred: {error.message}</p>);
                    setShowModal(true);
                });
        }
    };

    return (
        <div className="container mt-4">
            <h2 style={{ color: '#3D8BF3' }}>Add a New Place</h2>

            <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                    <div className="col-md-6">
                        <label htmlFor="name" className="form-label">Place Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="pic" className="form-label">Place Picture URL</label>
                        <input
                            type="text"
                            className="form-control"
                            id="pic"
                            name="pic"
                            value={formData.pic}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-md-4">
                        <label htmlFor="city" className="form-label">City</label>
                        <input
                            type="text"
                            className="form-control"
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="state" className="form-label">State</label>
                        <input
                            type="text"
                            className="form-control"
                            id="state"
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="founded" className="form-label">Founded Year</label>
                        <input
                            type="number"
                            className="form-control"
                            id="founded"
                            name="founded"
                            value={formData.founded}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="cuisines" className="form-label">Cuisines</label>
                    <input
                        type="text"
                        className="form-control"
                        id="cuisines"
                        name="cuisines"
                        value={formData.cuisines}
                        onChange={handleChange}
                    />
                </div>

                <div className="text-center">
                    <button type="submit" className="btn" style={{ backgroundColor: '#0079FF', color: '#fff' }}>
                        Add Place
                    </button>
                </div>
            </form>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{modalTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {modalContent}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default AddPlace;
