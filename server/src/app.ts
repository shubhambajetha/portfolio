import express from "express";
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

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/api/listings", createlisting);
app.get("/api/listings", getallisting);
app.get("/api/listings/:id", getlisting);
app.patch("/api/listings/:id", upadtelisting);
app.delete("/api/listings/:id", deleteListing);

app.post("/api/listings/:projectListingId/details", createdetails);
app.get("/api/listings/:projectListingId/details", getdeatils);
app.patch("/api/listings/:projectListingId/details", updateproject);
app.delete("/api/listings/:projectListingId/details", deleteproject);
app.get("/api/project-details", getalldetails);

export default app
