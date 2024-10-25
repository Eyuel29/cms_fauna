import { Response, Request } from "express";
import FaunaClient from "../fauna_client";
import { DateStub, DocumentT, fql } from "fauna";
import { blogSchema } from "../utils/validation_schema";
import { Blog } from "../model/model";

type BlogController = {
    createBlog: (req: Request, res: Response) => Promise<void>;
    getSingleBlog: (req: Request, res: Response) => Promise<void>;
    getAllBlogs: (req: Request, res: Response) => Promise<void>;
    updateBlog: (req: Request, res: Response) => Promise<void>;
    deleteBlog: (req: Request, res: Response) => Promise<void>;
};

const blogProjection = fql `
    customer {
        id,
        title,
        content,
        authorName,
        authorId,
        createdAt,
        updatedAt
    }
`;

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
            const {data: blog} = await FaunaClient.getClient().query<DocumentT<Blog>>(
                fql `let blog = Blog.create({
                    title: ${title},
                    content: ${content},
                    author: ${author},
                    createdAt: ${DateStub.fromDate(new Date(Date.now()))},
                    updatedAt: ${DateStub.fromDate(new Date(Date.now()))}
                })
                ${blogProjection}    
                `
            );

            res.status(201).json(blog);
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
        const {data: blog} = await FaunaClient.getClient().query<DocumentT<Blog>>(
            fql `let blog = Blog.byId(${id})!
            ${blogProjection}`
        );

        res.status(201).json({
            success:true, 
            data: blog
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
            const {data: blogs} = await FaunaClient.getClient().query<DocumentT<Blog>>(
                fql `let blogs = Blog.all()
                    blogs.map(blog => {
                        ${blogProjection}
                    })`
            );
            res.status(200).json({
                success:true, 
                data: blogs ?? []
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message : "Internal server error"
            });     
        }
    },
    deleteBlog: async (req: Request, res: Response) => {
        const {id} = req.params;
        if (!id) {
            res.status(400).json({
                success: false,
                message: "Bad request"
            });    
            return; 
        }

        try {
            const {data: blog} = await FaunaClient.getClient().query<DocumentT<Blog>>(
                fql `let blog = Blog.byId(${id}).delete()
                ${blogProjection}`
            );

            res.status(201).json({
                success:true, 
                data: blog
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
        const {id} = req.params;
        if (!id) {
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
        const { title, content, author } = req.body;

        try {
            const {data: blog} = await FaunaClient.getClient().query<DocumentT<Blog>>(
                fql `let blog = Blog.byId(${id}).update({   
                    title: ${title},
                    content: ${content},
                    author: ${author},
                    updatedAt: ${DateStub.fromDate(new Date(Date.now()))}
                })
                ${blogProjection}`
            );

            res.status(201).json({
                success:true, 
                data: blog
            });
            return;

        } catch (error) {
            res.status(500).json({
                success: false,
                message : "Internal server error"
            });     
        }
    },
};

export default blogController;