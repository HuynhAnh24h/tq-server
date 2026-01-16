/**
 * @copyright 2025 Huynh Anh Developer
 * @license Apache-2.0
 */
// Node module
import { Schema, model } from 'mongoose';
import { IBlogCategory } from '@/types/blog/BlogType';

const BlogCategorySchema = new Schema<IBlogCategory>({
  title: {
    type: String,
    required: [true, 'Title is required'],
    unique: [true, 'Title is unique'],
    maxlength: [180, 'Title must be 180 characters'],
  },
  slug: {
    type: String,
    required: [true, 'Slung is required'],
    unique: [true, 'Slung is unique'],
    maxlength: [180, 'Slug mus be 180 characters'],
  },
  banner: {
    publicId: {
      type: String,
      required: [true, 'Banner public id is required'],
    },
    url: {
      type: String,
      required: [true, 'Url image is required'],
    },
    width: {
      type: Number,
      required: [true, 'Width is required'],
    },
    height: {
      type: Number,
      required: [true, 'Height is required'],
    },
  },
});

const BlogCategoryModel = model<IBlogCategory>('BlogCategory', BlogCategorySchema)

export default BlogCategoryModel
