import { Response, Request } from "express";
import { DateStub, DocumentT, fql } from "fauna";
import { projectSchema } from "../utils/validation_schema";
import FaunaClient from "../fauna_client";
import { Project } from "../models/models";

type ProjectController = {
    createProject: (req: Request, res: Response) => Promise<void>;
    deleteProject: (req: Request, res: Response) => Promise<void>;
    updateProject: (req: Request, res: Response) => Promise<void>;
    getAllProject: (req: Request, res: Response) => Promise<void>;
};


const projectProjection = fql `
    project {
        id,
        name,
        description,
        startDate,
        endDate,
        technologies,
        url,
        createdAt,
        updatedAt,
    }
`;


const projectController: ProjectController = {
    createProject: async (req: Request, res: Response) => {
        const { error } = projectSchema.validate(req.body);

        if (error) {
            res.status(400).json({
                success: false,
                message: error.details[0].message,
            });
            return;
        }

        const { name,description,startDate,endDate,technologies,url } = req.body;

        try {
            const {data: project} = await FaunaClient
            .getClient().query<DocumentT<Project>>(
                fql `let project = Project.create({
                    name : ${name},
                    description : ${description},
                    startDate : ${startDate},
                    endDate : ${endDate},
                    technologies : ${technologies},
                    url : ${url},
                    createdAt: ${DateStub.fromDate(new Date(Date.now()))},
                    updatedAt: ${DateStub.fromDate(new Date(Date.now()))}
                })
                ${projectProjection}`
            );

            res.status(201).json({
                success:true, 
                data: project
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
    getAllProject: async (req: Request, res: Response) => {
      try {
        const result = await FaunaClient.getClient()
        .query(fql `Project.all()`);
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
    updateProject: async (req: Request, res: Response) => {
        if (!req?.params?.id) {
            res.status(400).json({
                success: false,
                message: "Bad request"
            });     
            return;
        }  

        const { error } = projectSchema.validate(req.body);
        if (error) {
            res.status(400).json({
                success: false,
                message: error.details[0].message,
            });
            return;
        }

        try {
            const {id} = req.params;
            const { name,description,startDate,endDate,technologies,url } = req.body;
            const response = await FaunaClient
            .getClient().query(
                fql `Project.byId(${id}).update({
                    name : ${name},
                    description : ${description},
                    startDate : ${startDate},
                    endDate : ${endDate},
                    technologies : ${technologies},
                    url : ${url},
                    updatedAt: ${DateStub.fromDate(new Date(Date.now()))}
                })`
            );

            res.status(201).json({
                success:true, 
                data: response
            });
            return;
        } catch (error) {
            res.status(500).json({
                success: false,
                message : "Internal server error"
            });     
        }
    },
    deleteProject: async (req: Request, res: Response) => {
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
            .query(fql `Project.byId(${id}).delete()`);

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

export default projectController;