const express = require('express');

const router = express.Router();

const User = require('../models/User');

/* POST user add. */
router.post('/create', function (req, res, next) {

    const user = new User(req.body)

    user.save().then((data) => {
        res.json(data);
    }).catch((err) => {
        res.status(400).json(err);
    });
});

/* GET find user */
router.get('/find', function (req, res) {
    let keyword = req.query.search;
    User.find({
        username: keyword
    }, (err, data) => {
        if (err) {
            console.log(err);
            res.status(400);
        }
        res.json(data);
    });
});

/* GET list users */
router.get('/list', function (req, res) {
    User.find({}, (err, data) => {
        if (err) {
            console.log(err);
            res.status(400);
        }
        res.json(data);
    });
});

/* GET findOne user */
router.get('/findOne/:id', function (req, res) {
    User.findOne({
        _id: req.params.id
    }, (err, data) => {
        if (err) {
            console.log(err);
            res.status(400);
        }
        res.json(data);
    });
});

/* PUT update user */
router.put('/update/:id', function (req, res) {
    let userId = req.params.id;
    let formData = req.body;

    User.findById(userId).then((data) => {
        data.set(formData);
        return data.save();
    }).then((data) => {
        res.json(data);
    }).catch((err) => {
        console.log(err);
        res.status(400);
    });
});

/* PUT update user status */
router.put('/updateStatusAll', function (req, res) {
    let status = req.body.status;
    User.updateMany({
        active: (status !== true)
    }, {
        active: (status === true)
    }, {
        multi: true
    }, (err, data) => {
        if (err) {
            console.log(err);
            res.status(400);
        }
        res.json(data);
    })
});

/* DELETE user */
router.delete('/delete/:id', function (req, res) {
    User.findByIdAndDelete(req.params.id).then((data) => {
        res.json(data);
    }).catch((err) => {
        console.log(err);
        res.status(400);
    })
})

/* AGGREGATE match user */
router.get('/aggregateMatchCategory', function (req, res) {
    let category = req.body.category;
    User.aggregate([{
        $match: {
            category: category
        }
    }], (err, data) => {
        if (err) {
            console.log(err);
            res.status(400);
        }
        res.json(data);
    })
});

/* AGGREGATE active user and category group */
router.get('/aggregateGroupActiveUsers', function (req, res) {
    User.aggregate([{
        $match: {
            active: true
        }
    }, {
        $group: {
            _id: "$category",
            total: {$sum: 1}
        }
    }], (err, data) => {
        if (err) {
            console.log(err);
            res.status(400);
        }
        res.json(data);
    })
});

module.exports = router;
