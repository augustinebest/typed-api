import { Router, Request, Response, NextFunction, response } from 'express';
import Controller from '../../utils/interfaces/controller.interface';
import HttpException from '../../utils/exceptions/http.exception';
import validationMiddleware from '../../middleware/validation.middleware';
import validate from '../../resources/post/post.validation';
import PostService from './post.service';

class PostController implements Controller {
    public path = '/posts';
    public router = Router();
    private PostService = new PostService();

    constructor() {
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.post(
            `${this.path}`,
            validationMiddleware(validate.create),
            this.create
        );
    }

    private create = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            console.log('request', req.body);
            const { title, body } = req.body;
            const post = await this.PostService.create(title, body);
            res.status(201).json({ post });
        } catch (eror) {
            next(new HttpException(400, 'cannot create post'));
        }
    };
}

export default PostController;
