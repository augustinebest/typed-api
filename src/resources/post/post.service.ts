import Postmodel from './post.model';
import Post from './post.interface';

class PostService {
    private post = Postmodel;
    /**
     * create a new post
     */
    public async create(
        title: string,
        body: string,
        _id: object
    ): Promise<Post> {
        try {
            const post = await this.post.create({
                title,
                body,
                user: _id,
            });
            return post;
        } catch (e: any) {
            throw new Error('Unable to create post');
        }
    }

    /**
     * fetch posts
     */

    public async fetch(id: Object): Promise<Post[]> {
        try {
            const posts = await this.post.find({ user: id });
            return posts;
        } catch (e: any) {
            throw new Error('Unable to create post');
        }
    }
}

export default PostService;
