import { prisma } from "@portfolio/database";
import type { NextFunction, Request, Response } from "express";

class ApiError extends Error {
    statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);
        this.name = "ApiError";
        this.statusCode = statusCode;
    }
}

export const createxperience = async (req: Request, res: Response) => {
    try {
        const { title, subtitle, timeDate, description } = req.body

        if (title !== undefined || !title.trim()) {
            throw new ApiError("Title and slug are required", 400);
        }

        const createdata = await prisma.careerExperience.create({
            data: {
                title: title.trim(),
                subtitle,
                timeDate,
                description
            },
        });

        return res.status(201).json({
            status:true,
            message:"experince created sucessfully",
            data:createdata,
        });
    } catch (error) {
        return res.status(400).json({
            status:false,
            message:"something error ocuuried",
        });
    }
}


export const getallexperince = async(req:Request, res:Response) =>{
    try{
        const getdata = await prisma.careerExperience.findMany({
            orderBy: [
                { sortOrder: "asc" },
                { createdAt: "desc" },
            ],
        })

        return res.status(200).json({
            status:true,
            message:"fetched all experince succesfully",
            data:getdata,
        });
    }catch(error){
        return res.status(400).json({
            status:false,
            message:"something errror occured"
        });
    }
}


export const updateproject  = async(req:Request, res:Response)=>{
    try{
        const id  = String(req.params.id);
        const newbody = 
    }catch(error){

    }
}