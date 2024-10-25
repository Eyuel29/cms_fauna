import { Response, Request } from "express";
import { DateStub, DocumentT, fql } from "fauna";
import { experienceSchema } from "../utils/validation_schema";
import FaunaClient from "../fauna_client";
import { Experience } from "../model/model";

type ExprienceController = {
    createExprience: (req: Request, res: Response) => Promise<void>;
    deleteExprience: (req: Request, res: Response) => Promise<void>;
    updateExprience: (req: Request, res: Response) => Promise<void>;
    getAllExpriences: (req: Request, res: Response) => Promise<void>;
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
    createExprience: async (req: Request, res: Response) => {
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
            const {data: exprience} = await FaunaClient
            .getClient().query<DocumentT<Experience>>(
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
            console.log(error);
            res.status(500).json({
                success: false,
                message: "Internal server error!",
            });
        }
    },
    getAllExpriences: async (req: Request, res: Response) => {
      try {
        const {data:experience} = await FaunaClient.getClient()
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
        console.log(error);
        res.status(500).json({
            success: false,
            message : "Internal server error"
        });     
      }
    },
    updateExprience: async (req: Request, res: Response) => {
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

            const {data:experience} = await FaunaClient.getClient().query<DocumentT<Experience>>(
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
            res.status(500).json({
                success: false,
                message : "Internal server error"
            });     
        }
    },
    deleteExprience: async (req: Request, res: Response) => {
        const {id} = req.params;
        if (!id) {
            res.status(400).json({
                success: false,
                message: "Bad request"
            });     
            return;
        }  

        try {
            const {data: experience} = await FaunaClient.getClient()
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
            console.log(error);
            res.status(500).json({
                success: false,
                message : "Internal server error"
            });     
        }
    },
};

export default exprienceController;