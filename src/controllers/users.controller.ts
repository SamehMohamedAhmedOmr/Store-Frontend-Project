import {Request, Response} from 'express'
import UsersService from "../services/users.service";
import {response} from '../helpers/reponse.helper'
import {SUCCESS, INTERNAL_SERVER_ERROR, NOF_FOUND} from '../helpers/status.codes.helper'

const _service = UsersService

export default class UsersController {

    /**
     * * index
     */
    static index = async (req: Request, res: Response) => {
        try {
            const model = await _service.index()
            return response(SUCCESS, res, model)
        } catch (error) {
            return response(INTERNAL_SERVER_ERROR, res, error)
        }
    }

    /**
     * * single
     */
    static get = async (req: Request, res: Response) => {
        try {
            // get post
            const model = await _service.get(req)
            if (!model) {
                return response(NOF_FOUND, res)
            }
            return response(SUCCESS, res, model)
        } catch (error) {
            return response(INTERNAL_SERVER_ERROR, res, error)
        }
    }
    /**
     * * create
     */
    static create = async (req: Request, res: Response): Promise<void> => {
        try {
            const model = await _service.create(req, res)
            if (model) {
                return response(SUCCESS, res, model)
            } else {
                throw new Error('Unable to create resource')
            }
        } catch (error) {
            return response(INTERNAL_SERVER_ERROR, res, error)
        }
    }

    /**
     * * update
     */
    static update = async (req: Request, res: Response) => {
        try {
            const model = await _service.update(req)
            if (model) {
                return response(SUCCESS, res, model)
            } else {
                throw new Error('Unable to update resource')
            }
        } catch (error) {
            return response(INTERNAL_SERVER_ERROR, res, error)
        }
    }
}
