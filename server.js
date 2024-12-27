import express from "express";
import cookieParser from 'cookie-parser';
import apiRouter from "./routes/index.js";
import { connectToMongoDB } from "./config/_mongodb.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();
const port = 3000;
app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/", apiRouter);
app.use(errorHandler);

await connectToMongoDB();

app.listen(port, () => {
  console.log("hello sarthak");
  console.log(`Server is running on http://localhost:${port}`);
});
