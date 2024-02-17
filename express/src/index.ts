import express,{ Request, Response, Express } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import router from "./routes/Profile";

dotenv.config();

const app:Express = express();
const PORT = process.env.PORT||8000;

connectDB();

//middlewares
app.use(cors());
app.use(express.json());

app.get("/", (_: Request, res: Response) => {
    res.send("Hello World");
});

//routes
app.use("/api", router);

//listen
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});