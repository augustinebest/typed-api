import { Response } from 'express';

class SuccessResponse {
    public status: number;
    public message: string;
    public data: object;
    public res: Response;
    constructor(status: number, message: string, data: object, res: Response) {
        this.status = status;
        this.message = message;
        this.data = data;
        this.res = res;
    }

    response() {
        return this.res
            .status(this.status)
            .json({ message: this.message, data: this.data });
    }
}

const successEvent = (
    status: number,
    message: string,
    data: object,
    res: Response
) => {
    const result = new SuccessResponse(status, message, data, res);
    return result.response();
};

export default successEvent;
