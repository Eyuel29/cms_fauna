import { Response, Request } from "express";
import { fql } from "fauna";
import { experienceSchema } from "../utils/validation_schema";
import FaunaClient from "../fauna_client";

type ExprienceController = {
    createExprience: (req: Request, res: Response) => Promise<void>;
    deleteExprience: (req: Request, res: Response) => Promise<void>;
    updateExprience: (req: Request, res: Response) => Promise<void>;
    getAllExpriences: (req: Request, res: Response) => Promise<void>;
};

const exprienceController: ExprienceController = {
    createExprience: async (req: Request, res: Response) => {
        const { error } = experienceSchema.validate(req.body);
        if (error) {
            res.status(400).json({
                success: false,
                message: error.details[0].message,
            });
            return;
        }

        try {
            const { companyName,role,startDate,endDate,description } = req.body;
            const response = await FaunaClient
            .getClient().query(
                fql `Exprience.create({
                    companyName : ${companyName},
                    role : ${role},
                    startDate : ${startDate},
                    endDate : ${endDate},
                    description : ${description},
                })`
            );

            res.status(201).json({
                success:true, 
                data: response
            });
            return;
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: "Internal server error!",
            });
        }
    },
    getAllExpriences: async (req: Request, res: Response) => {
      try {
        const result = await FaunaClient.getClient()
        .query(fql `Exprience.all()`);
        res.status(200).json({
            success:true, 
            data: result
        });
        return;
      } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message : "Internal server error"
        });     
      }
    },
    updateExprience: async (req: Request, res: Response) => {
        if (!req?.params?.id) {
            res.status(400).json({
                success: false,
                message: "Bad request"
            });     
            return;
        }  

        const { error } = experienceSchema.validate(req.body);
        if (error) {
            res.status(400).json({
                success: false,
                message: error.details[0].message,
            });
            return;
        }


        try {
            const {id} = req.params;
            const { companyName,role,startDate,endDate,description } = req.body;

            const result = await FaunaClient.getClient().query(
                fql `Exprience.byId(${id}).update(
                    companyName : ${companyName},
                    role : ${role},
                    startDate : ${startDate},
                    endDate : ${endDate},
                    description : ${description},
                )`
            );

            res.status(201).json({
                success:true, 
                data: result
            });
            return;
        } catch (error) {
            res.status(500).json({
                success: false,
                message : "Internal server error"
            });     
        }
    },
    deleteExprience: async (req: Request, res: Response) => {
        if (!req?.params?.id) {
            res.status(400).json({
                success: false,
                message: "Bad request"
            });     
            return;
        }  

        try {
            const {id} = req.params;
            const result = await FaunaClient.getClient()
            .query(fql `Exprience.byId(${id}).delete()`);

            res.status(200).json({
                success: true, 
                data: result
            });
            return;
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message : "Internal server error"
            });     
        }
    },
};

export default exprienceController;