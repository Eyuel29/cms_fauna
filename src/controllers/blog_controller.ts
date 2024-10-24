import { Response, Request } from "express";
import FaunaClient from "../fauna_client";
import { fql } from "fauna";
import { blogSchema } from "../utils/validation_schema";

type BlogController = {
    createBlog: (req: Request, res: Response) => Promise<void>;
    getSingleBlog: (req: Request, res: Response) => Promise<void>;
    getAllBlogs: (req: Request, res: Response) => Promise<void>;
    updateBlog: (req: Request, res: Response) => Promise<void>;
    upVoteBlog: (req: Request, res: Response) => Promise<void>;
    downVoteBlog: (req: Request, res: Response) => Promise<void>;
    commentOnBlog: (req: Request, res: Response) => Promise<void>;
    deleteReaction: (req: Request, res: Response) => Promise<void>;
    deleteComment: (req: Request, res: Response) => Promise<void>;
    deleteBlog: (req: Request, res: Response) => Promise<void>;
};

const blogController: BlogController = {
    createBlog: async (req: Request, res: Response) => {
        const { error } = blogSchema.validate(req.body);
        if (error) {
            res.status(400).json({
                success: false,
                message: error.details[0].message,
            });
            return;
        }

        try {
            const { title, content, author } = req.body;
            const response = await FaunaClient.getClient().query(
                fql `Blog.create({
                    title: ${title},
                    content: ${content},
                    author: ${author}
                })`
            );

            res.status(201).json(response);
            return;
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Internal server error!",
            });     
        }
    },
    getSingleBlog: async (req: Request, res: Response) => {
    
      if (!req?.params?.id) {
        res.status(400).json({
            success: false,
            message: "Bad request"
        });
        return;     
      }  

      try {
        const {id} = req.params;
        const result = await FaunaClient.getClient().query(fql `Blog.byId(${id})`);

        res.status(201).json({
            success:true, 
            data: result.data.data ?? []
        });
        return;
      } catch (error) {
        res.status(500).json({
            success: false,
            message : "Internal server error"
        });     
      }
    },
    getAllBlogs: async (req: Request, res: Response) => {
        try {
            const result = await FaunaClient.getClient().query(fql `Blog.all()`);
            res.status(201).json({
            success:true, 
            data: result.data.data
        });
        } catch (error) {
            res.status(500).json({
                success: false,
                message : "Internal server error"
            });     
        }
    },
    deleteBlog: async (req: Request, res: Response) => {
        if (!req?.params?.id) {
            res.status(400).json({
                success: false,
                message: "Bad request"
            });    
            return; 
        }  

        try {
            const {id} = req.params;
            const result = await FaunaClient.getClient().query(
                fql `Blog.byId(${id}).delete()`
            );

            res.status(201).json({
                success:true, 
                data: result.data.data
            });
            return;
        } catch (error) {
            res.status(500).json({
                success: false,
                message : "Internal server error"
            });     
        }  
    },
    updateBlog: async (req: Request, res: Response) => {
        if (!req?.params?.id) {
            res.status(400).json({
                success: false,
                message: "Bad request"
            });     
            return;
        }  

        const { error } = blogSchema.validate(req.body);
        if (error) {
            res.status(400).json({
                success: false,
                message: error.details[0].message,
            });
            return;
        }

        try {
            const {id} = req.params;
            const { title, content, author } = req.body;

            const result = await FaunaClient.getClient().query(
                fql `Blog.byId(${id}).update({   
                    title: ${title},
                    content: ${content},
                    author: ${author},
                })`
            );

            res.status(201).json({
                success:true, 
                data: result.data.data
            });
            return;
        } catch (error) {
            res.status(500).json({
                success: false,
                message : "Internal server error"
            });     
        }
    },
    upVoteBlog: async (req: Request, res: Response) => {

    },
    downVoteBlog: async (req: Request, res: Response) => {
        
    },
    commentOnBlog: async (req: Request, res: Response) => {},
    deleteReaction: async (req: Request, res: Response) => {},
    deleteComment: async (req: Request, res: Response) => {},
};

export default blogController;