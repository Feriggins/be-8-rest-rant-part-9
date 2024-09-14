const router = require('express').Router();
const {body} = require("express-validator");
const {addComment, deleteComment} = require("../../controllers/comment-controller");

const commentValidationRules = [
    body('stars').isInt().withMessage('number of stars is required'),
];

router.post('/:id', ...commentValidationRules, addComment);
router.delete('/:id', deleteComment);

module.exports = router;
