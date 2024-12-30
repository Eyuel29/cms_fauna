import { Request } from "express"

export default interface CMSRequest extends Request {
    user_id: string | number,
    user_role: string | number,
}