import { Router, Request, Response, NextFunction, response } from 'express';
import Controller from '../../utils/interfaces/controller.interface';
import HttpException from '../../utils/exceptions/http.exception';
import validationMiddleware from '../../middleware/validation.middleware';
import validate from '../../resources/post/post.validation';
import PostService from './post.service';
import authenticated from '../../middleware/authenticated.middleware';
import successEvent from '../../utils/response/http.success';

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
            authenticated,
            validationMiddleware(validate.create),
            this.create
        );
        this.router.get(`${this.path}/:id`, authenticated, this.fetch);
    }

    private create = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { title, body } = req.body;
            const { _id } = req.user;
            const post = await this.PostService.create(title, body, _id);
            successEvent(200, 'success', post, res);
        } catch (eror) {
            next(new HttpException(400, 'cannot create post'));
        }
    };

    private fetch = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { id } = req.params;
            const posts = await this.PostService.fetch(id);
            successEvent(200, 'success', posts, res);
        } catch (eror) {
            next(new HttpException(400, 'cannot fetch post'));
        }
    };
}

export default PostController;
