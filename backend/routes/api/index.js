const router = require('express').Router();
const placeRoutes = require('./place-routes');
const commentRoutes = require('./comment-routes');

router.use('/place', placeRoutes);
router.use('/comment', commentRoutes);

module.exports = router;
