import { prisma } from "@portfolio/database";
import { Request, Response } from "express";

export const createdetails = async (req: Request, res: Response) => {
    try {
        const projectListingId = String(req.params.projectListingId);
        const { overview, problemStatement, solution, features, challenges, architecture, role, duration } = req.body;

        const listing = await prisma.projectListing.findUnique({
            where: { id: projectListingId },
            select: { id: true },
        });

        if (!listing) {
            return res.status(404).json({ status: false, message: "Project listing not found" });
        }

        const details = await prisma.projectDetails.create({
            data: {
                projectListingId,
                overview,
                problemStatement,
                solution,
                features,
                challenges,
                architecture,
                role,
                duration,
            },
        });

        return res.status(201).json({ status: true, message: "Project details created successfully", data: details });
    } catch (error) {
        if (typeof error === "object" && error !== null && "code" in error && error.code === "P2002") {
            return res.status(409).json({ status: false, message: "Project details already exist" });
        }
        console.error("Create project details error:", error);
        return res.status(500).json({ status: false, message: "Could not create project details" });
    }
};

export const getdeatils = async (req: Request, res: Response) => {
    try {
        const projectListingId = String(req.params.projectListingId);
        const details = await prisma.projectDetails.findUnique({
            where: { projectListingId },
            include: { projectListing: true },
        });

        if (!details) {
            return res.status(404).json({ status: false, message: "Project details not found" });
        }

        return res.status(200).json({ status: true, message: "Project details fetched successfully", data: details });
    } catch (error) {
        console.error("Get project details error:", error);
        return res.status(500).json({ status: false, message: "Could not fetch project details" });
    }
};

export const getalldetails = async (_req: Request, res: Response) => {
    try {
        const details = await prisma.projectDetails.findMany({
            orderBy: { createdAt: "desc" },
            include: { projectListing: true },
        });

        return res.status(200).json({
            status: true,
            message: "Project details fetched successfully",
            count: details.length,
            data: details,
        });
    } catch (error) {
        console.error("Get all project details error:", error);
        return res.status(500).json({ status: false, message: "Could not fetch project details" });
    }
};

export const updateproject = async (req: Request, res: Response) => {
    try {
        const projectListingId = String(req.params.projectListingId);
        const { overview, problemStatement, solution, features, challenges, architecture, role, duration } = req.body;
        const data = {
            ...(overview !== undefined && { overview }),
            ...(problemStatement !== undefined && { problemStatement }),
            ...(solution !== undefined && { solution }),
            ...(features !== undefined && { features }),
            ...(challenges !== undefined && { challenges }),
            ...(architecture !== undefined && { architecture }),
            ...(role !== undefined && { role }),
            ...(duration !== undefined && { duration }),
        };

        if (Object.keys(data).length === 0) {
            return res.status(400).json({ status: false, message: "Provide at least one field to update" });
        }

        const details = await prisma.projectDetails.update({ where: { projectListingId }, data });
        return res.status(200).json({ status: true, message: "Project details updated successfully", data: details });
    } catch (error) {
        if (typeof error === "object" && error !== null && "code" in error && error.code === "P2025") {
            return res.status(404).json({ status: false, message: "Project details not found" });
        }
        console.error("Update project details error:", error);
        return res.status(500).json({ status: false, message: "Could not update project details" });
    }
};

export const deleteproject = async (req: Request, res: Response) => {
    try {
        const projectListingId = String(req.params.projectListingId);
        await prisma.projectDetails.delete({ where: { projectListingId } });
        return res.status(200).json({ status: true, message: "Project details deleted successfully" });
    } catch (error) {
        if (typeof error === "object" && error !== null && "code" in error && error.code === "P2025") {
            return res.status(404).json({ status: false, message: "Project details not found" });
        }
        console.error("Delete project details error:", error);
        return res.status(500).json({ status: false, message: "Could not delete project details" });
    }
};
