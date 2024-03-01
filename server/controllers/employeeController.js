const validator = require('validator');
const Employee = require('../models/employee');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
}

const login = async (req, res) => {
    const { email, password } = req.body;

    if (validator.isEmpty(email) || validator.isEmpty(password)) {
        return res.status(400).json({ error: 'Invalid input fields' });
    }

    const employee = await Employee.findOne({ email });

    if (!employee) {
        return res.status(400).json({ error: 'Email does not exist' });
    }

    const passwordMatch = await bcrypt.compare(password, employee.password);

    if (!passwordMatch) {
        return res.status(400).json({ error: 'Incorrect password' });
    }

    const token = generateToken(employee._id);

    req.session.token = token;
    req.session.employee = employee;

    return res.status(200).json({ message: 'Login successful', token: token, employee: employee });
}

const addEmployee = async (req, res) => {
    const { name, email, role, bio, department, facebook, instagram, linkedin, twitter, password } = req.body;

    if (validator.isEmpty(name) || !validator.isEmail(email) || validator.isEmpty(role) || validator.isEmpty(bio) || validator.isEmpty(department) || validator.isEmpty(facebook) || validator.isEmpty(instagram) || validator.isEmpty(linkedin) || validator.isEmpty(twitter) || validator.isEmpty(password)) {
        return res.status(400).json({ error: 'Invalid input fields' });
    }

    const emailExists = await Employee.findOne({ email });

    if (emailExists) {
        return res.status(400).json({ error: 'Email exists, use another email' });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const profilePic = req.file.filename;
    
    const employee = await Employee.create({ name, email, profilePic, role, bio, department, facebook, instagram, linkedin, twitter, password: hash });

    if (!employee) {
        return res.status(500).json({ error: 'An error occurred, please try again later' });
    }

    return res.status(200).json({ message: 'Employee added successfully' });

}

const profile = async (req, res) => {
    const { name, email, profilePic, role, bio, department, facebook, instagram, linkedin, twitter, password } = await Employee.findById(req.employee.id);
    
    return res.status(200).json({ employee: { name, email, profilePic, role, bio, department, facebook, instagram, linkedin, twitter, password } });
}

const getEmployee = async (req, res) => {
    const { name, email, profilePic, role, bio, department, facebook, instagram, linkedin, twitter, password } = await Employee.findById(req.params.id);
    
    return res.status(200).json({ employee: { name, email, profilePic, role, bio, department, facebook, instagram, linkedin, twitter, password } });
}

const updateProfile = async (req, res) => {
    const employeeId = req.employee.id;

    const { name, email, profilePic, role, bio, department, facebook, instagram, linkedin, twitter, password } = req.body;

    if (validator.isEmpty(name) || !validator.isEmail(email) || !validator.isURL(profilePic) || validator.isEmpty(role) || validator.isEmpty(bio) || validator.isEmpty(department) || !validator.isURL(facebook) || !validator.isURL(instagram) || !validator.isURL(linkedin) || !validator.isEmpty(twitter) || validator.isEmpty(password)) {
        return res.status(400).json({ error: 'Invalid input fields' });
    }

    const employee = await Employee.findByIdAndUpdate(employeeId, { name, email, profilePic, role, bio, department, facebook, instagram, linkedin, twitter, password }, { new: true });

    if (!employee) {
        return res.status(500).json({ error: 'An error occurred, please try again later' });
    }

    return res.status(200).json({ message: 'Profile updated successfully' });
}

const deleteEmployee = async (req, res) => {
    const employeeId = req.params.id;

    const employee = await Employee.findByIdAndDelete(employeeId);

    if (!employee) {
        return res.status(400).json({ error: 'An error occurred, please try again later' });
    }

    return res.status(200).json({ error: 'Employee details deleted succesfully' });
}

const logout = async (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ error: 'Error logging out' });
        }

        return res.status(200).json({ message: 'Logout successful' });
    });
}

module.exports = {
    login,
    addEmployee,
    profile,
    getEmployee,
    updateProfile,
    deleteEmployee,
    logout,
}