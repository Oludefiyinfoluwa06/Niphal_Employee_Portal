const { getBlogs, createBlog, getBlogDetails, updateBlog, deleteBlog, getWriterBlogs, getEmployeeBlogs, getEmployeeBlogDetails } = require('../controllers/blogController');
const { protectRoute } = require('../middlewares/authMiddleware');
const { uploadBlogImage } = require('../middlewares/fileUploadMiddleware');

const router = require('express').Router();

router.get('/all', getBlogs);
router.get('/writer', getWriterBlogs);
router.get('/employee', protectRoute, getEmployeeBlogs);
router.post('/create', protectRoute, uploadBlogImage.single('blogImage'), createBlog);
router.get('/:id', getBlogDetails);
router.get('/employee/:id', protectRoute, getEmployeeBlogDetails);
router.put('/update/:id', protectRoute, uploadBlogImage.single('blogImage'), updateBlog);
router.delete('/delete/:id', protectRoute, deleteBlog);

module.exports = router;