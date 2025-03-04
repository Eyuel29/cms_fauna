import {Request, Response, NextFunction } from "express";
import { DateStub, DocumentT, fql, ServiceError } from "fauna";
import { reviewSchema } from "../utils/validation_schema";
import { Review } from "../types/model/models";
import faunaClient from "../config/fauna_client";

type ReviewController = {
    createReview: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    deleteReview: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    updateReview: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getAllReview: (req: Request, res: Response, next: NextFunction) => Promise<void>;
};


const reviewProjection = fql `
    review {    
        id,
        reviewerName,
        reviewerEmail,
        rating,
        content,
        createdAt,
        updatedAt
    }
`;


const ReviewController: ReviewController = {
    createReview: async (req: Request, res: Response, next: NextFunction) => {
        const { error } = reviewSchema.validate(req.body);
        if (error) {
            res.status(400).json({
                success: false,
                message: error.details[0].message,
            });
            return;
        }

        const { reviewerEmail,rating,content,reviewerName } = req.body;
        try {
            const {data: review} = await faunaClient
                .query<DocumentT<Review>>(
                fql `let review = Review.create({
                    reviewerEmail: ${reviewerEmail},
                    rating: ${rating},
                    content: ${content},
                    reviewerName: ${reviewerName},
                    createdAt: ${DateStub.fromDate(new Date(Date.now()))},
                    updatedAt: ${DateStub.fromDate(new Date(Date.now()))}
                })
                ${reviewProjection}`
            );

            res.status(201).json({
                success:true, 
                data: review
            });
            return;
        } catch (error) {
            next(error);
        }
        
    },
    getAllReview: async (req: Request, res: Response, next: NextFunction) => {
      try {
        const {data: reviews} = await faunaClient
        .query<DocumentT<Review>>(fql `
            let reviews = Review.all()
            reviews.map(review =>{
                ${reviewProjection}
            })
        `);
        res.status(200).json({
            success:true, 
            data: reviews ?? []
        });
        return;
      } catch (error) {
        next(error);
      }
    },
    updateReview: async (req: Request, res: Response, next: NextFunction) => {
        const {id} = req.params;
        if (!id) {
            res.status(400).json({
                success: false,
                message: "Bad request"
            });     
            return;
        }  

        const { error } = reviewSchema.validate(req.body);
        if (error) {
            res.status(400).json({
                success: false,
                message: error.details[0].message,
            });
            return;
        }

        const { reviewerEmail,rating,content,reviewerName } = req.body;
        try {
            const {data:review} = await faunaClient
                .query<DocumentT<Review>>(
                fql `let review = Review.byId(${id}).update({
                    reviewerEmail: ${reviewerEmail},
                    rating: ${rating},
                    content: ${content},
                    reviewerName: ${reviewerName},
                    updatedAt: ${DateStub.fromDate(new Date(Date.now()))}
                })
                ${reviewProjection}
                `
            );

            res.status(201).json({
                success:true, 
                data: review
            });
            return;
        } catch (error) {
            next(error);     
        }
    },
    deleteReview: async (req: Request, res: Response, next: NextFunction) => {
        const {id} = req.params;
        if (!id) {
            res.status(400).json({
                success: false,
                message: "Bad request"
            });     
            return;
        }  

        try {
            const {data: review} = await faunaClient
            .query<DocumentT<Review>>(fql 
                `Review.byId(${id}).delete()
                ${reviewProjection}`
            );

            res.status(200).json({
                success: true, 
                data: review
            });
            return;
        } catch (error) {
            next(error);     
        }
    },
};

const handleServiceError = (error: ServiceError, res: Response) => {
    switch (error.code) {
        case "document_not_found":
            res.status(404).json({
                success: false,
                message: "Document not found!"
            });
            break;
        case "constraint_failure":
            res.status(409).json({
                success: false,
                message: "Document already exists!"
            });
            break;
        case "invalid_query":
            res.status(400).json({
                success: false,
                message: "Unable to create a document!"
            });
            break;
        default:
            break;
    }
}

export default ReviewController;