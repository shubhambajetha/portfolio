import express from "express";

const app = express();

app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse form data

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

export default app;
