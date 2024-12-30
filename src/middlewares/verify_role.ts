import { Response, NextFunction } from "express";
import CMSRequest from "../types/types";

const sendErrorResponse = require('../utils/sendErrorResponse');

const verifyRoles = (...allowedRoles: Number[]) => {
    return (req: CMSRequest, res: Response, next: NextFunction) => {
        if (!req?.user_role) return sendErrorResponse(res, 401, "Unauthorized!");

        const rolesArray: Number[] = [...allowedRoles];
        const uRole = !Array.isArray(req.user_role) ? [req.user_role] : req.user_role;
        const result = uRole.map(user_role => rolesArray.includes(user_role)).find(val => val === true);
        if (!result) return sendErrorResponse(res, 403, "Forbidden!");
        next();
        
    }
}

module.exports = verifyRoles