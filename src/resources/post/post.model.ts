import { Schema, model } from 'mongoose';
import Post from './post.interface';

const PostSchemaa = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        body: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

export default model<Post>('Post', PostSchemaa);
