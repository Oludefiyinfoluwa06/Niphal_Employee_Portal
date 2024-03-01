const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/profile');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now() + '_' + Math.round(Math.random() * 1e9) + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });


const blogImageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/blog');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now() + '_' + Math.round(Math.random() * 1e9) + path.extname(file.originalname));
    }
});

const uploadBlogImage = multer({ storage: blogImageStorage });

module.exports = {
    upload,
    uploadBlogImage
};