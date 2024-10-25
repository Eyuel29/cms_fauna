import { Response, Request } from "express";
import { DateStub, DocumentT, fql } from "fauna";
import FaunaClient from "../fauna_client";
import { certificateSchema } from "../utils/validation_schema";
import { Certificate } from "../model/model";

type CertificateController = {
    createCertificate: (req: Request, res: Response) => Promise<void>;
    deleteCertificate: (req: Request, res: Response) => Promise<void>;
    getAllCertificates: (req: Request, res: Response) => Promise<void>;
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
    createCertificate: async (req: Request, res: Response) => {
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
            const {data: certificate} = await FaunaClient
            .getClient().query<DocumentT<Certificate>>(
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
            console.log(error);
            res.status(500).json({
                success: false,
                message: "Internal server error!",
            });     
        }
    },
    getAllCertificates: async (req: Request, res: Response) => {
      try {
        const {data: certificates} = await FaunaClient.getClient()
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
        console.log(error);
        res.status(500).json({
            success: false,
            message : "Internal server error"
        });     
      }
    },
    deleteCertificate: async (req: Request, res: Response) => {
        const {id} = req.params;
        if (!id) {
            res.status(400).json({
                success: false,
                message: "Bad request"
            });     
            return;
        }  

        try {
            const {data: certificate} = await FaunaClient.getClient()
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
            console.log(error);
            res.status(500).json({
                success: false,
                message : "Internal server error"
            });     
        }
    },
};

export default certificateController;