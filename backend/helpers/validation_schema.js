const Joi = require('@hapi/joi')

const userSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email : Joi.string().email().lowercase().required(),
    password: Joi.string().min(8).required()
})

module.exports = {
    userSchema 
}