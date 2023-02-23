const { Schema, Types, model } = require('mongoose');

const schema = new Schema({
    login: {type: String, required: true, uniq: true},
    password: {type: String, required: true},
    posts: {type: Types.ObjectId, ref: 'Post'}
})

module.exports = model('User', schema);