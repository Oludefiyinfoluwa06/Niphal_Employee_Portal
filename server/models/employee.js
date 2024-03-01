const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    name: String,
    email: String,
    profilePic: String,
    role: String,
    bio: String,
    department: String,
    facebook: String,
    instagram: String,
    linkedin: String,
    twitter: String,
    password: String,
});

const Employee = mongoose.model('Employee', employeeSchema);
module.exports = Employee;