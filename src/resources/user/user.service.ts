import UserModel from './user.model';
import token from '../../utils/token';

class UserService {
    private user = UserModel;

    /**
     * Register a user
     */

    public async register(
        name: string,
        email: string,
        password: string,
        role: string
    ): Promise<string | Error> {
        try {
            const user = await this.user.create({
                name,
                email,
                password,
                role,
            });
            const accessToken = token.createToken(user);
            return accessToken;
        } catch (error: any) {
            throw new Error('Unable to create user');
        }
    }

    /**
     * Attempt to login user
     */
    public async login(
        email: string,
        password: string
    ): Promise<string | Error> {
        try {
            const user = await this.user.findOne({ email });
            if (!user) {
                throw new Error('unable to find user with that Email Address');
            }
            const checkPass = await user.isValidPassword(password);
            if (checkPass) {
                return token.createToken(user);
            } else {
                throw new Error('Wrong credential given');
            }
        } catch (error: any) {
            throw new Error('Unable to login user');
        }
    }
}

export default UserService;
