import { Response, Request } from "express";
import { fql } from "fauna";
import FaunaClient from "../fauna_client";
import { certificateSchema } from "../utils/validation_schema";

type CertificateController = {
    createCertificate: (req: Request, res: Response) => Promise<void>;
    deleteCertificate: (req: Request, res: Response) => Promise<void>;
    getAllCertificates: (req: Request, res: Response) => Promise<void>;
};

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

        try {
            const { title,issuer,dateIssued,description,url } = req.body;

            const response = await FaunaClient
            .getClient().query(
                fql `Certificate.create({
                    title: ${title},
                    issuer: ${issuer},
                    dateIssued: ${dateIssued},
                    description: ${description},
                    url: ${url}
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
    getAllCertificates: async (req: Request, res: Response) => {
      try {
        const result = await FaunaClient.getClient()
        .query(fql `Certificate.all()`);
        res.status(201).json({
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
    deleteCertificate: async (req: Request, res: Response) => {
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
            .query(fql `Certificate.byId(${id}).delete()`);

            res.status(201).json({
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

export default certificateController;