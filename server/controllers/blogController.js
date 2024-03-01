const validator = require("validator");
const Blog = require("../models/blog");

const getBlogs = async (req, res) => {
    const blogs = await Blog.find();

    if (!blogs) {
        return res.status(404).json({ error: 'There are no blogs' });
    }

    if (blogs.length === 1 && blogs.length < 2) {
        return res.status(200).json({ blogs: blogs });
    }

    return res.status(200).json({ blogs: blogs });
}

const getWriterBlogs = async (req, res) => {
    const writerId = req.params.id;

    const blogs = await Blog.find({ writer: writerId });

    if (blogs.length === 0 || blogs.length < 1) {
        return res.status(404).json({ error: 'There are no blogs' });
    }

    return res.status(200).json({ blogs });
}

const getEmployeeBlogs = async (req, res) => {
    const employeeId = req.employee.id;

    const blogs = await Blog.find({ writer: employeeId });

    if (blogs.length === 0 || blogs.length < 1) {
        return res.status(404).json({ error: 'There are no blogs' });
    }

    return res.status(200).json({ blogs });
}

const createBlog = async (req, res) => {
    const { title, content, category } = req.body;

    if (validator.isEmpty(title) || validator.isEmpty(content) || validator.isEmpty(category)) {
        return res.status(400).json({ error: 'Invalid input fields' });
    }

    const blogImage = req.file.filename;

    const blog = await Blog.create({ writer: req.employee.id, title, blogImage, content, category });

    if (!blog) {
        return res.status(500).json({ error: 'An error occured, please try again later' });
    }

    return res.status(200).json({ message: 'Blog created successfully' });
}

const getBlogDetails = async (req, res) => {
    const blogId = req.params.id;

    const blogDetails = await Blog.findById(blogId);

    if (!blogDetails) {
        return res.status(404).json({ error: 'Blog not found' });
    }

    return res.status(200).json({ blog: blogDetails });
}

const getEmployeeBlogDetails = async (req, res) => {
    const blogId = req.params.id;

    const blogDetails = await Blog.findById(blogId);

    if (!blogDetails) {
        return res.status(404).json({ error: 'Blog not found' });
    }

    return res.status(200).json({ blog: blogDetails });
}

const updateBlog = async (req, res) => {
    const blogId = req.params.id;

    const { title, content, category } = req.body;

    if (validator.isEmpty(title) || validator.isEmpty(content) || validator.isEmpty(category)) {
        return res.status(400).json({ error: 'Invalid input fields' });
    }

    const blogImage = req.file.filename;

    const blog = await Blog.findByIdAndUpdate(blogId, { title, blogImage, content, category }, { new: true });

    if (!blog) {
        return res.status(500).json({ error: 'An error occurred, please try again later' });
    }

    return res.status(200).json({ message: 'Blog update successfully' });
}

const deleteBlog = async (req, res) => {
    const blogId = req.params.id;

    const blog = await Blog.findByIdAndDelete(blogId);

    if (!blog) {
        return res.status(500).json({ error: 'An error occurred, please try again later' });
    }

    return res.status(200).json({ message: 'Blog deleted successfully' });
}

module.exports = {
    getBlogs,
    getWriterBlogs,
    getEmployeeBlogs,
    createBlog,
    getBlogDetails,
    getEmployeeBlogDetails,
    updateBlog,
    deleteBlog
}