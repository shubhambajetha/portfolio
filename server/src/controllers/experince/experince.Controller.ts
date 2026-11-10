import { prisma } from "@portfolio/database";
import type { Request, Response } from "express";

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
        const { title, subtitle, timeDate, endtimedate, description } = req.body

        if (typeof title !== "string" || !title.trim()) {
            throw new ApiError("Title is required", 400);
        }

        const createdata = await prisma.careerExperience.create({
            data: {
                title: title.trim(),
                subtitle,
                timeDate,
                endtimedate,
                description
            },
        });

        return res.status(201).json({
            status: true,
            message: "experince created sucessfully",
            data: createdata,
        });
    } catch (error) {
        return res.status(400).json({
            status: false,
            message: "something error ocuuried",
        });
    }
}


export const getallexperince = async (req: Request, res: Response) => {
    try {
        const getdata = await prisma.careerExperience.findMany({
            orderBy: { createdAt: "desc" },
        })

        return res.status(200).json({
            status: true,
            message: "fetched all experince succesfully",
            data: getdata,
        });
    } catch (error) {
        return res.status(400).json({
            status: false,
            message: "something errror occured"
        });
    }
}


export const updateproject = async (req: Request, res: Response) => {
    try {
        const id = String(req.params.id)

        const exisitingid = await prisma.careerExperience.findUnique({
            where: { id }
        });

        if (!exisitingid) {
            return res.status(400).json({
                status: false,
                message: "there is no existing product found",
            });
        }

        const { title, subtitle, timeDate, endtimedate, description } = req.body

        if (title !== undefined && (typeof title !== "string" || !title.trim())) {
            return res.status(400).json({
                status: false,
                message: "kindly provide and trim the value before update",
            });
        }
        const data = {
            ...(title !== undefined && { title: title.trim() }),
            ...(subtitle !== undefined && { subtitle }),
            ...(timeDate !== undefined && { timeDate }),
            ...(endtimedate !== undefined && { endtimedate }),
            ...(description !== undefined && { description }),
        }

        const updatExperince = await prisma.careerExperience.update({
            where: { id },
            data
        });

        return res.status(200).json({
            status: true,
            data: updatExperince,
            message: "carrer experince update sucessfully",
        });
    } catch (errror) {
        return res.status(400).json({
            status: false,
            mesage: "something error ocuured kindly fixed",
        });
    }
}

export const deleteproject = async (req: Request, res: Response) => {
    try {
        const id = String(req.params.id);

        const existingid = await prisma.careerExperience.findUnique({
            where: { id }
        })

        if (!existingid) {
            return res.status(404).json({
                status: false,
                mesage: "there is no existing id found kindly check",
            });
        }

        const deleteexperince = await prisma.careerExperience.delete({
            where: { id },
        });

        return res.status(200).json({
            status: true,
            message: "The project deleted succesfully",
            data: deleteexperince
        })


    } catch (error) {
        console.error("Delete experience error:", error);
        return res.status(500).json({
            status: false,
            message: "Could not delete experience",
        });
    }
}
