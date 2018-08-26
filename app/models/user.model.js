const mongoose = require('mongoose')
const Schema = mongoose.Schema

let UserSchema = new Schema({
    email: { type: String, required: true, index: { unique: true } },
    username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    admin: {type: Boolean, required: true },
    name: {type: String},
    bio: {type: String},
    url: {type: String},
    company: {type: String}
})

mongoose.model('User', UserSchema)