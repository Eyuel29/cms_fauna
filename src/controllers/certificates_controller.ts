import { Response, Request, NextFunction } from "express";
import { DateStub, DocumentT, fql } from "fauna";
import { certificateSchema } from "../utils/validation_schema";
import { Certificate } from "../types/models";
import faunaClient from "../config/fauna_client";
import {validateCerfiticate} from "../middlewares/validate_files";

type CertificateController = {
    createCertificate: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    deleteCertificate: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getAllCertificates: (req: Request, res: Response, next: NextFunction) => Promise<void>;
};


const certificateProjection = fql `
    certificate {
        id,
        title,
        issuer,
        dateIssued,
        description,
        url,
        createdAt,
        updatedAt
    }
`;


const certificateController: CertificateController = {
    createCertificate: async (req: Request, res: Response, next: NextFunction) => {
        console.log(req.file);
        
        const { error } = certificateSchema.validate(req.body);
        if (error) {
            res.status(400).json({
                success: false,
                message: error.details[0].message,
            });
            return;
        }

        const { title,issuer,dateIssued,description,url } = req.body;

        try {
            const {data: certificate} = await faunaClient.query<DocumentT<Certificate>>(
                fql `let certificate = Certificate.create({
                    title: ${title},
                    issuer: ${issuer},
                    dateIssued: ${dateIssued},
                    description: ${description},
                    url: ${url},
                    createdAt: ${DateStub.fromDate(new Date(Date.now()))},
                    updatedAt: ${DateStub.fromDate(new Date(Date.now()))}
                })
                ${certificateProjection}`
            );

            res.status(201).json({
                success:true, 
                data: certificate
            });
            return;
        } catch (error) {
            next(error);     
        }
    },
    getAllCertificates: async (req: Request, res: Response, next: NextFunction) => {
      try {
        const {data: certificates} = await faunaClient
        .query<DocumentT<Certificate>>(fql `
            let certificates = Certificate.all()
            certificates.map( certificate =>{
                    ${certificateProjection}
                }
            )
            `
        );
        res.status(201).json({
            success:true, 
            data: certificates ?? []
        });
        return;
      } catch (error) {
        next(error);
      }
    },
    deleteCertificate: async (req: Request, res: Response, next: NextFunction) => {
        const {id} = req.params;

        if (!id) {
            res.status(400).json({
                success: false,
                message: "Bad request"
            });     
            return;
        }  

        try {
            const {data: certificate} = await faunaClient
            .query<DocumentT<Certificate>>(fql 
                `let certificate = Certificate.byId(${id}).delete()
                ${certificateProjection}`
            );

            res.status(201).json({
                success: true, 
                data: certificate
            });
            
            return;
        } catch (error) {
            next(error);     
        }
    },
};

export default certificateController;