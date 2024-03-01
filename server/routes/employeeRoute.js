const { login, profile, updateProfile, addEmployee, deleteEmployee, getEmployee, logout, getPage } = require('../controllers/employeeController');
const { protectRoute } = require('../middlewares/authMiddleware');
const { upload } = require('../middlewares/fileUploadMiddleware');

const router = require('express').Router();

router.post('/login', login);
router.post('/add', upload.single('profilePic'), addEmployee);
router.get('/profile', protectRoute, profile);
router.get('/:id', getEmployee);
router.put('/profile/update/:id', protectRoute, upload.single('profilePic'), updateProfile);
router.delete('/profile/delete/:id', protectRoute, deleteEmployee);
router.post('/logout', logout);

module.exports = router;