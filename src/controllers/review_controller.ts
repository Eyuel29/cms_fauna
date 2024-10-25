import { Response, Request } from "express";
import { fql } from "fauna";
import { reviewSchema } from "../utils/validation_schema";
import FaunaClient from "../fauna_client";

type ReviewController = {
    createReview: (req: Request, res: Response) => Promise<void>;
    deleteReview: (req: Request, res: Response) => Promise<void>;
    updateReview: (req: Request, res: Response) => Promise<void>;
    getAllReview: (req: Request, res: Response) => Promise<void>;
};

const ReviewController: ReviewController = {
    createReview: async (req: Request, res: Response) => {
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
            const response = await FaunaClient
            .getClient().query(
                fql `Review.create({
                    reviewerEmail: ${reviewerEmail},
                    rating: ${rating},
                    content: ${content},
                    reviewerName: ${reviewerName},
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
    getAllReview: async (req: Request, res: Response) => {
      try {
        const result = await FaunaClient.getClient()
        .query(fql `Review.all()`);
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
    updateReview: async (req: Request, res: Response) => {
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
            const response = await FaunaClient
            .getClient().query(
                fql `Review.byId(${id}).update({
                    reviewerEmail: ${reviewerEmail},
                    rating: ${rating},
                    content: ${content},
                    reviewerName: ${reviewerName},
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
    deleteReview: async (req: Request, res: Response) => {
        const {id} = req.params;
        if (!id) {
            res.status(400).json({
                success: false,
                message: "Bad request"
            });     
            return;
        }  

        try {
            const result = await FaunaClient.getClient()
            .query(fql `Review.byId(${id}).delete()`);

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

export default ReviewController;