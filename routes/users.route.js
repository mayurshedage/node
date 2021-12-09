const express = require('express');
const router = express.Router();

const User = require('../models/users.model');

router.get('/', async (req, res) => {
    let searchOptions = {};
    if (req.query.name != null && req.query.name !== '') {
        searchOptions.name = new RegExp(req.query.name, 'i');
    }
    try {
        const users = await User.find(searchOptions);
        res.status(200).send(users);
    } catch (e) {
        console.error(e);
    }
});

router.post('/', async (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        age: req.body.age,
        contact: req.body.contact ?? null,
        createdAt: Math.floor(new Date().getTime() / 1000)
    });
    try {
        const _user = await user.save();
        res.status(200).send(_user);
    } catch (e) {
        res.status(200).send({ error: e.code, message: e.message });
    }
});

module.exports = router;