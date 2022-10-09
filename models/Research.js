const Joi = require('joi');
const mongoose = require('mongoose');

const ResearchScema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    Date: { type: Date, default: Date.now },
    researchLead: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    participant: [String],
    description: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },

});

const Research = mongoose.model('Research', ResearchScema);


function validateResearch(research) {
    const schema2 = Joi.object({
        name: Joi.string().min(5).max(25).required(),
        researchLead: Joi.string().min(5).max(25).required(),
        participant: Joi.array(),
        description: Joi.string(),
        Date: Joi.date(),
        __v: Joi.number()
    })

    return schema2.validate(research);
}

exports.Research = Research;
exports.validate = validateResearch;