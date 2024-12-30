import { Response, NextFunction } from "express";
import { DateStub, DocumentT, fql } from "fauna";
import { projectSchema } from "../utils/validation_schema";
import { Project } from "../types/models";
import faunaClient from "../config/fauna_client";
import CMSRequest from "../types/types";

type ProjectController = {
    createProject: (req: CMSRequest, res: Response, next: NextFunction) => Promise<void>;
    deleteProject: (req: CMSRequest, res: Response, next: NextFunction) => Promise<void>;
    updateProject: (req: CMSRequest, res: Response, next: NextFunction) => Promise<void>;
    getAllProject: (req: CMSRequest, res: Response, next: NextFunction) => Promise<void>;
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
    createProject: async (req: CMSRequest, res: Response, next: NextFunction) => {
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
            const {data: project} = await faunaClient.query<DocumentT<Project>>(
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
                 project
            });
            return;
        } catch (error) {
            next(error);
        }
    },
    getAllProject: async (req: CMSRequest, res: Response, next: NextFunction) => {
      try {
        const {data: projects} = await faunaClient
        .query<DocumentT<Project>>(fql `Project.all()
            projects.map(project => {
                ${projectProjection}
            })
        `);
        res.status(200).json({
            success:true, 
            data: projects
        });
        return;
      } catch (error) {
        next(error);     
      }
    },
    updateProject: async (req: CMSRequest, res: Response, next: NextFunction) => {
        const {id} = req.params;
        if (!id) {
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
        const { name,description,startDate,endDate,technologies,url } = req.body;

        try {
            const {data: project} = await faunaClient
            .query<DocumentT<Project>>(
                fql `Project.byId(${id}).update({
                    name : ${name},
                    description : ${description},
                    startDate : ${startDate},
                    endDate : ${endDate},
                    technologies : ${technologies},
                    url : ${url},
                    updatedAt: ${DateStub.fromDate(new Date(Date.now()))}
                })
                ${projectProjection}    
                `
            );

            res.status(201).json({
                success:true, 
                data: project
            });
            return;
        } catch (error) {
            next(error);
        }
    },
    deleteProject: async (req: CMSRequest, res: Response, next: NextFunction) => {
        const {id} = req.params;
        if (!id) {
            res.status(400).json({
                success: false,
                message: "Bad request"
            });     
            return;
        }  

        try {
            const {data: project} = await faunaClient
            .query<DocumentT<Project>>(
                fql `Project.byId(${id}).delete()
                ${projectProjection}`
            );

            res.status(200).json({
                success: true, 
                data: project
            });
            return;
        } catch (error) {
            next(error);
        }
    },
};

export default projectController;