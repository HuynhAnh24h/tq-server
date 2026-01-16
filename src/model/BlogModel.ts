/**
 * @copyright 2025 Huynh Anh Developer
 * @license Apache-2.0
 */
// Node module
import { IBlog } from '@/types/blog/BlogType';
import { Schema, model } from 'mongoose';

// Blog Schema
const BlogSchema = new Schema<IBlog>({
  title: {
    type: String,
    required: [true, 'Title is required'],
    unique: [true, 'Title must be unique'],
    maxlength: [180, 'Title must be less than 180 characters'],
  },
  slug: {
    type: String,
    required: [true, 'Slug us required'],
    unique: [true, 'Slug must be uniqe'],
    maxlength: [180, 'Title mus be less than 180 characters'],
  },
  content: {
    type: String,
    required: [true, 'Content is requied'],
  },
  banner: {
    publicId: {
      type: String,
      required: [true, 'Banner public id is required'],
    },
    url:{
        type: String,
        required:[true, 'Url image is required']
    },
    width:{
        type: Number,
        required: [true,'Width is required']
    },
    height:{
        type: Number,
        required: [true, 'Height is required']
    }
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'BlogCategory'
  },
  viewsCount: {
    type: Number,
    default: 0
  },
  likeCount:{
    type:Number,
    default: 0
  },
  commentCount:{
    type: Number,
    default: 0
  },
  status:{
    type:String,
    enum: {
        values:['draft','published'],
        message: '{VALUE} is not supported'
    },
    default: 'draft'
  }
},{timestamps: true});

const BlogModel = model<IBlog>("Blog", BlogSchema)
export default BlogModel