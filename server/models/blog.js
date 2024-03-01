const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const blogSchema = new Schema({
    writer: Schema.Types.ObjectId,
    title: String,
    blogImage: String,
    content: String,
    category: String,
}, { timestamps: true });

const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;