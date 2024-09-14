const {Place, Comment} = require('../models');
const {validationResult} = require("express-validator");

const filterUndefinedAndEmpty = (obj) => {
    return Object.entries(obj).reduce((acc, [key, value]) => {
        if (value !== undefined && value !== '') {
            acc[key] = value;
        }
        return acc;
    }, {});
};


exports.getAllPlaces = (req, res) => {
    //get the user
    Place.find().populate('comments').lean()
        .then(places => {
            if (!places){
                res.status(500).send([]);
            }
            res.status(200).send(places);
        })
        .catch(err => {
            res.status(500).send({error: err.message});
        });
};

exports.getSpecificPlace = (req, res) => {
    const {id} = req.params;
    Place.findById(id).populate('comments').lean()
        .then(place => {
            if (!place){
                res.status(404).send({});
            }
            res.status(200).send(place);
        })
        .catch(err => {
            res.status(404).send({error: err.message});
        });
}

exports.createNewPlace = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send({ errors: errors.array() });
    }

    //catch the pic
    if (!req.body.pic){
        req.body.pic = 'https://picsum.photos/350/350';
    }

    const filteredBody = filterUndefinedAndEmpty(req.body);
    const newPlace = new Place(filteredBody);

    newPlace.save()
        .then(newPlace => {
            res.status(200).send(newPlace);
        })
        .catch(err => {
            res.status(500).send({error: err.message});
        });
}

exports.editPlace = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send({ errors: errors.array() });
    }

    //catch the pic
    if (!req.body.pic){
        req.body.pic = 'https://picsum.photos/350/350';
    }

    const { id } = req.params;
    const updateData = filterUndefinedAndEmpty(req.body);

    Place.findByIdAndUpdate(
        id,
        updateData,
        { new: true, runValidators: true } // Options to return the updated document and run validations
    )
        .then((updatedPlace) => {
            if (!updatedPlace) {
                return res.status(404).send({ message: 'Place not found' });
            }
            res.status(200).send(updatedPlace);
        })
        .catch((err) => {
            res.status(500).send({ error: err.message });
        });
};

exports.deletePlace = (req, res) => {
    const {id} = req.params;

    Place.findById(id)
        .then(async (place) => {
            if (!place) {
                return res.status(404).send({ message: 'Place not found' });
            }

            // Delete the associated comments
            await Comment.deleteMany({ _id: { $in: place.comments } });

            // Now, delete the place
            await Place.findByIdAndDelete(id);

            res.status(200).send({ message: 'Place and associated comments deleted successfully' });
        })
        .catch((err) => {
            res.status(500).send({ error: err.message });
        });
}
