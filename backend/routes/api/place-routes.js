const router = require('express').Router();
const {body} = require("express-validator");
const {getAllPlaces, getSpecificPlace, createNewPlace, editPlace, deletePlace} = require("../../controllers/place-controller");

const currentYear = new Date().getFullYear();

const placeValidationRules = [
    body('cuisines').notEmpty().withMessage('Cuisines is required'),
    body('name').notEmpty().withMessage('Type is required'),
    body('founded')
        .notEmpty()
        .withMessage('Founded year is required')
        .isInt({ min: 1673, max: currentYear })
        .withMessage(`Founded year must be a number between 1673 and ${currentYear}`)
];


router.get('/', getAllPlaces);
router.get('/:id', getSpecificPlace);
router.post('/', ...placeValidationRules, createNewPlace);
router.put('/:id', ...placeValidationRules, editPlace);
router.delete('/:id',deletePlace);

module.exports = router;
