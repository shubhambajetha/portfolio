import express from "express";
import multer from "multer";
import { randomUUID } from "node:crypto";
import { mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
    createlisting,
    deleteListing,
    getallisting,
    getlisting,
    upadtelisting,
} from "./controllers/projectlisting/listingController.ts";
import {
    createdetails,
    deleteproject,
    getalldetails,
    getdeatils,
    updateproject,
} from "./controllers/projectdetails/detailscontroller.ts";
import {
    createxperience,
    deleteproject as deleteexperience,
    getallexperince,
    updateproject as updateexperience,
} from "./controllers/experince/experince.Controller.ts";

const app = express();
const listingUploadDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../uploads/listing");
mkdirSync(listingUploadDirectory, { recursive: true });
const listingUpload = multer({
    storage: multer.diskStorage({
        destination: listingUploadDirectory,
        filename: (_req, file, callback) => {
            const extensionByMimeType: Record<string, string> = {
                "image/jpeg": ".jpg",
                "image/png": ".png",
                "image/webp": ".webp",
                "image/gif": ".gif",
            };
            callback(null, `${randomUUID()}${extensionByMimeType[file.mimetype] ?? ".img"}`);
        },
    }),
    limits: { fileSize: 10 * 1024 * 1024 },
    fileFilter: (_req, file, callback) => {
        callback(null, ["image/jpeg", "image/png", "image/webp", "image/gif"].includes(file.mimetype));
    },
});

const allowedOrigins = (process.env.CORS_ORIGINS ?? "http://localhost:3000")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

app.use((req, res, next) => {
    const origin = req.headers.origin;

    if (origin && allowedOrigins.includes(origin)) {
        res.setHeader("Access-Control-Allow-Origin", origin);
        res.setHeader("Vary", "Origin");
        res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE,OPTIONS");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
    }

    if (req.method === "OPTIONS") {
        return res.sendStatus(204);
    }

    return next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../uploads")));

const listingImageFields = listingUpload.fields([
    { name: "thumbnailFile", maxCount: 1 },
    { name: "galleryFiles", maxCount: 20 },
]);

app.post("/api/listings", listingImageFields, createlisting);
app.get("/api/listings", getallisting);
app.get("/api/listings/:id", getlisting);
app.patch("/api/listings/:id", listingImageFields, upadtelisting);
app.delete("/api/listings/:id", deleteListing);

app.post("/api/listings/:projectListingId/details", createdetails);
app.get("/api/listings/:projectListingId/details", getdeatils);
app.patch("/api/listings/:projectListingId/details", updateproject);
app.delete("/api/listings/:projectListingId/details", deleteproject);
app.get("/api/project-details", getalldetails);

app.post("/api/experience", createxperience);
app.get("/api/experience", getallexperince);
app.patch("/api/experience/:id", updateexperience);
app.delete("/api/experience/:id", deleteexperience);

export default app;
