import { Document, ObjectId } from 'mongoose';

export default interface Post extends Document {
    title: string;
    body: string;
    user: ObjectId;
}
