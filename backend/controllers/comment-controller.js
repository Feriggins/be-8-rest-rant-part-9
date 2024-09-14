const {Place, Comment} = require('../models');
const {validationResult} = require("express-validator");

exports.addComment = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send({ errors: errors.array() });
    }

    const {id} = req.params;
    const { author, rant, stars, content } = req.body;
    try {
        // Step 1: Find the place by ID
        const place = await Place.findById(id);
        if (!place) {
            return res.status(404).send({ message: 'Place not found' });
        }

        // Step 2: Create a new comment
        const comment = new Comment({
            author,
            rant,
            stars,
            content,
        });

        // Step 3: Save the comment
        const savedComment = await comment.save();

        // Step 4: Add the comment ID to the place's comments array
        place.comments.push(savedComment._id);
        await place.save();

        // Respond with success
        res.status(201).send({ message: 'Comment added to place successfully', comment: savedComment });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
}

exports.deleteComment = (req, res) => {
    const {id} = req.params;

    Comment.findByIdAndDelete(id)
        .then(deletedComment => {
            if (!deletedComment) {
                return res.status(404).send({ message: 'Comment not found' });
            }
            res.status(200).send({ message: 'Comment deleted successfully' });
        })
        .catch(err => {
            res.status(500).send({ error: err.message });
        });
}
