import { Request, Response, NextFunction } from "express";
import { DateStub, DocumentT, fql } from "fauna";
import { experienceSchema } from "../utils/validation_schema";
import { Experience } from "../types/model/models";
import faunaClient from "../config/fauna_client";

type ExprienceController = {
    createExprience: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    deleteExprience: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    updateExprience: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getAllExpriences: (req: Request, res: Response, next: NextFunction) => Promise<void>;
};

const experienceProjection = fql `
    experience{
        id,
        companyName,
        role,
        startDate,
        endDate,
        description,
        createdAt,
        updatedAt
    }
`;

const exprienceController: ExprienceController = {
    createExprience: async (req: Request, res: Response, next: NextFunction) => {
        const { error } = experienceSchema.validate(req.body);
        if (error) {
            res.status(400).json({
                success: false,
                message: error.details[0].message,
            });
            return;
        }

        const { companyName,role,startDate,endDate,description } = req.body;
        try {
            const {data: exprience} = await faunaClient.query<DocumentT<Experience>>(
                fql `let exprience = Exprience.create({
                    companyName : ${companyName},
                    role : ${role},
                    startDate : ${startDate},
                    endDate : ${endDate},
                    description : ${description},
                    createdAt: ${DateStub.fromDate(new Date(Date.now()))},
                    updatedAt: ${DateStub.fromDate(new Date(Date.now()))}
                })
                ${experienceProjection}`
            );

            res.status(201).json({
                success:true, 
                data: exprience
            });
            return;
        } catch (error) {
            next(error);
        }
    },
    getAllExpriences: async (req: Request, res: Response, next: NextFunction) => {
      try {
        const {data:experience} = await faunaClient
        .query<DocumentT<Experience>>(fql `
            let experience = Exprience.all()
            ${experienceProjection}
        `);
        res.status(200).json({
            success:true, 
            data: experience
        });
        return;
      } catch (error) {
        next(error);
      }
    },
    updateExprience: async (req: Request, res: Response, next: NextFunction) => {
        const {id} = req.params;
        if (!id) {
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

        const { companyName,role,startDate,endDate,description } = req.body;

        try {

            const {data:experience} = await faunaClient.query<DocumentT<Experience>>(
                fql `let experience = Exprience.byId(${id}).update(
                    companyName : ${companyName},
                    role : ${role},
                    startDate : ${startDate},
                    endDate : ${endDate},
                    description : ${description},
                    updatedAt: ${DateStub.fromDate(new Date(Date.now()))}
                )
                ${experienceProjection}
                `
            );

            res.status(201).json({
                success:true, 
                data: experience
            });
            return;
        } catch (error) {
            next(error);     
        }
    },
    deleteExprience: async (req: Request, res: Response, next: NextFunction) => {
        
        const {id} = req.params;
        if (!id) {
            res.status(400).json({
                success: false,
                message: "Bad request"
            });     
            return;
        }  

        try {
            const {data: experience} = await faunaClient
            .query<DocumentT<Experience>>(fql 
                `let experience = Exprience.byId(${id}).delete()
                ${experienceProjection}`
            );

            res.status(200).json({
                success: true, 
                data: experience
            });
            return;
        } catch (error) {
            next(error);     
        }
    },
};

export default exprienceController;