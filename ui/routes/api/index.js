const router = require('express').Router();


router.use('/login', require('./login'));


router.all('/*', (req, res) => {
    res.status(404).json({
        url: req.url,
        message: 'not found'
    });
});

module.exports = router;