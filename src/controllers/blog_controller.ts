import { Response, Request } from "express";
import { faunaClient } from "../fauna_client";
import { fql } from "fauna";
import Blog from "../models/Blog";

type BlogController = {
    createBlog: (req: Request, res: Response) => Promise<void>;
    updateBlog: (req: Request, res: Response) => Promise<void>;
    deleteBlog: (req: Request, res: Response) => Promise<void>;
    upVoteBlog: (req: Request, res: Response) => Promise<void>;
    downVoteBlog: (req: Request, res: Response) => Promise<void>;
    commentOnBlog: (req: Request, res: Response) => Promise<void>;
    getSingleBlog: (req: Request, res: Response) => Promise<void>;
    getAllBlogs: (req: Request, res: Response) => Promise<void>;
};


const blogController: BlogController = {
    createBlog: async (req: Request, res: Response) => {
        try {
            if (!Blog.validate(req.body)) {
                res.status(401).json({
                    success : false,
                    message: "Invalid Input!"
                });
                return;
            }

            const response = await faunaClient.query(
                fql `Blog.create(${
                    {
                        

                    }
                })`
            );

            res.status(200).json(response);
            return;
        } catch (error) {
            res.status(500).json({
                success: false,
                error: error
            });     
        }
    },
    updateBlog: async (req: Request, res: Response) => {
        // Implementation goes here
    },
    deleteBlog: async (req: Request, res: Response) => {
        // Implementation goes here
    },
    upVoteBlog: async (req: Request, res: Response) => {
        // Implementation goes here
    },
    downVoteBlog: async (req: Request, res: Response) => {
        // Implementation goes here
    },
    commentOnBlog: async (req: Request, res: Response) => {
        // Implementation goes here
    },
    getSingleBlog: async (req: Request, res: Response) => {
        // Implementation goes here
    },
    getAllBlogs: async (req: Request, res: Response) => {
        try {
            const result = await faunaClient.query(fql `Blog.all()`);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({
                success: false,
                error: error
            });     
        }
    }
};


export default blogController;