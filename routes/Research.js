const asyncMiddleware = require('../middleware/async')
const login = require('../middleware/login')
const isAdmin = require('../middleware/admin')
const { Research, validate } = require('../models/Research')
const mongoose = require('mongoose');
const express = require('express');
const { join } = require('path');
const router = express.Router();


router.get('/', asyncMiddleware(async (req, res) => {
    const researchs = await Research.find().sort('name');
    res.send(researchs);
}));

router.post('/', login, asyncMiddleware(async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let research = new Research({
        name: req.body.name,
        Date: req.body.Date,
        researchLead: req.body.researchLead,
        participant: req.body.participant,
        description: req.body.description
    });
    research = await research.save();

    res.send(research);
}));

router.put('/:id', asyncMiddleware(async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const research = await Research.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        Date: req.body.Date,
        researchLead: req.body.researchLead,
        participant: req.body.participant,
        description: req.body.description
    }, { new: true });

    if (!research) return res.status(404).send('research not found');

    res.send(research);
}));

router.delete('/:id', [login, isAdmin], asyncMiddleware(async (req, res) => {
    const research = await Research.findByIdAndRemove(req.params.id);
    if (!research) return res.status(404).send('research not found');

    res.send(research);
}));


router.get('/:id', asyncMiddleware(async (req, res) => {
    const research = await Research.findById(req.params.id);
    if (!research) return res.status(404).send('research not found');

    res.send(research);
}));

module.exports = router;