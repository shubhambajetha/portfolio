
import { prisma } from "@portfolio/database";
import { NextFunction, Request, Response } from "express";


class ApiError extends Error {
    statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);
        this.name = "ApiError";
        this.statusCode = statusCode;
    }
}

const parseStringArray = (
    value: unknown,
    field: string
): string[] => {
    if (Array.isArray(value) && value.every(
        (item) => typeof item === "string"
    )) {
        return value;
    }

    if (typeof value === "string") {
        try {
            const parsed: unknown = JSON.parse(value);

            if (
                Array.isArray(parsed) &&
                parsed.every((item) => typeof item === "string")
            ) {
                return parsed;
            }
        } catch {
            // Invalid JSON is handled below.
        }
    }

    throw new ApiError(`${field} must be an array of strings`, 400);
};

const parseBoolean = (value: unknown, field: string): boolean => {
    if (value === true || value === "true") return true;
    if (value === false || value === "false") return false;

    throw new ApiError(`${field} must be a boolean`, 400);
};

const parseSortOrder = (value: unknown): number => {
    if (
        value === "" ||
        value === null ||
        value === undefined
    ) {
        throw new ApiError("sortOrder must be a valid integer", 400);
    }

    const parsed = Number(value);

    if (!Number.isInteger(parsed)) {
        throw new ApiError("sortOrder must be a valid integer", 400);
    }

    return parsed;
};

const getErrorCode = (error: unknown): string | undefined => {
    if (
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        typeof error.code === "string"
    ) {
        return error.code;
    }

    return undefined;
};

const handleError = (
    error: unknown,
    res: Response,
    next: NextFunction
) => {
    if (error instanceof ApiError) {
        return res.status(error.statusCode).json({
            status: false,
            message: error.message,
        });
    }

    const code = getErrorCode(error);

    if (code === "P2002") {
        return res.status(409).json({
            status: false,
            message: "A listing with this unique value already exists",
        });
    }

    if (code === "P2025") {
        return res.status(404).json({
            status: false,
            message: "Project listing not found",
        });
    }

    return next(error);
};


export const createlisting = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const {
            title,
            slug,
            description,
            images,
            liveUrl,
            githubUrl,
            category,
            technologies,
            featured,
            status,
            sortOrder,
            published,
        } = req.body;

        if (
            typeof title !== "string" ||
            !title.trim() ||
            typeof slug !== "string" ||
            !slug.trim()
        ) {
            throw new ApiError("Title and slug are required", 400);
        }

        const uploadedFile = (req as Request & { file?: { filename: string } }).file;
        const thumbnail = uploadedFile
            ? `/uploads/listing/${uploadedFile.filename}`
            : null;

        const listing = await prisma.projectListing.create({
            data: {
                title: title.trim(),
                slug: slug.trim(),
                description,
                thumbnail,
                images: images === undefined
                    ? []
                    : parseStringArray(images, "images"),
                liveUrl: liveUrl || null,
                githubUrl: githubUrl || null,
                category,
                technologies: technologies === undefined
                    ? []
                    : parseStringArray(technologies, "technologies"),
                featured: featured === undefined
                    ? false
                    : parseBoolean(featured, "featured"),
                status: status || "COMPLETED",
                sortOrder: sortOrder === undefined
                    ? 0
                    : parseSortOrder(sortOrder),
                published: published === undefined
                    ? true
                    : parseBoolean(published, "published"),
            },
        });

        return res.status(201).json({
            status: true,
            message: "Listing created successfully",
            data: listing,
        });
    } catch (error) {
        console.error("Create listing error:", error);
        return handleError(error, res, next);
    }
};


export const getlisting = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const id = String(req.params.id);

        const listing = await prisma.projectListing.findUnique({
            where: { id },
        });

        if (!listing) {
            return res.status(404).json({
                status: false,
                message: "Project listing not found",
            });
        }

        return res.status(200).json({
            status: true,
            message: "Listing fetched successfully",
            data: listing,
        });
    } catch (error) {
        console.error("Get listing error:", error);
        return handleError(error, res, next);
    }
};


export const getallisting = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const listings = await prisma.projectListing.findMany({
            orderBy: [
                { sortOrder: "asc" },
                { createdAt: "desc" },
            ],
        });

        return res.status(200).json({
            status: true,
            message: "Listings fetched successfully",
            count: listings.length,
            data: listings,
        });
    } catch (error) {
        console.error("Get all listings error:", error);
        return handleError(error, res, next);
    }
};



export const upadtelisting = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const id = String(req.params.id);

        const existingListing = await prisma.projectListing.findUnique({
            where: { id },
        });

        if (!existingListing) {
            return res.status(404).json({
                status: false,
                message: "Project listing not found",
            });
        }

        const {
            title,
            slug,
            description,
            images,
            liveUrl,
            githubUrl,
            category,
            technologies,
            featured,
            status,
            sortOrder,
            published,
        } = req.body;

        if (
            title !== undefined &&
            (typeof title !== "string" || !title.trim())
        ) {
            throw new ApiError("Title must be a non-empty string", 400);
        }

        if (
            slug !== undefined &&
            (typeof slug !== "string" || !slug.trim())
        ) {
            throw new ApiError("Slug must be a non-empty string", 400);
        }

        const uploadedFile = (req as Request & { file?: { filename: string } }).file;
        const thumbnail = uploadedFile
            ? `/uploads/listing/${uploadedFile.filename}`
            : undefined;

        const data = {
            ...(title !== undefined && { title: title.trim() }),
            ...(slug !== undefined && { slug: slug.trim() }),
            ...(description !== undefined && { description }),
            ...(thumbnail !== undefined && { thumbnail }),
            ...(images !== undefined && {
                images: parseStringArray(images, "images"),
            }),
            ...(liveUrl !== undefined && { liveUrl: liveUrl || null }),
            ...(githubUrl !== undefined && { githubUrl: githubUrl || null }),
            ...(category !== undefined && { category }),
            ...(technologies !== undefined && {
                technologies: parseStringArray(technologies, "technologies"),
            }),
            ...(featured !== undefined && {
                featured: parseBoolean(featured, "featured"),
            }),
            ...(status !== undefined && { status }),
            ...(sortOrder !== undefined && {
                sortOrder: parseSortOrder(sortOrder),
            }),
            ...(published !== undefined && {
                published: parseBoolean(published, "published"),
            }),
        };

        if (Object.keys(data).length === 0) {
            throw new ApiError("Provide at least one field to update", 400);
        }

        const updatedListing = await prisma.projectListing.update({
            where: { id },
            data,
        });

        return res.status(200).json({
            status: true,
            message: "Project listing updated successfully",
            data: updatedListing,
        });
    } catch (error) {
        console.error("Update listing error:", error);
        return handleError(error, res, next);
    }
};


export const deleteListing = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const id = String(req.params.id);

        const deletedListing = await prisma.projectListing.delete({
            where: { id },
        });

        return res.status(200).json({
            status: true,
            message: "Project listing deleted successfully",
            data: {
                id: deletedListing.id,
            },
        });
    } catch (error) {
        console.error("Delete listing error:", error);
        return handleError(error, res, next);
    }
};


