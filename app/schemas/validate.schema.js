const Joi = require('joi')

const userSchema = Joi.object().keys({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
    email: Joi.string().email().required(),
})

const authenticateUserSchema = Joi.alternatives().try(
  Joi.object({
    username: Joi.string().alphanum().min(2).max(30).required(),
    password: Joi.string().required()
  }),
  Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  })
)

const getDataFromId = Joi.object().keys({
    _id: Joi.string().required()
})

module.exports = {
    userSchema,
    authenticateUserSchema,
    getDataFromId
}