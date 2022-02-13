import {Response} from 'express'

export const response = (code:number, res: Response, data?: unknown, message?: string) => {
    res.status(code).send({
        message: message ?? '',
        data,
    })
}
