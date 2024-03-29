import "./config.js";
import "./db-connect.js";
import express from "express";
import cors from "cors";
import { postsRouter, postsMainPath } from "./routes/postsRoutes.js";
import { usersMainPath, usersRouter } from "./routes/usersRoutes.js";
import { routesInfosHTML } from "./utils/routes-infos-HTML.js";
import {
  errorResponder,
  invalidPathHandler,
} from "./middleware/errorHandling.js";
import cookieParser from "cookie-parser";

const port = process.env.PORT;
const app = express();

app.use(cookieParser());
app.use(express.json());

const allowedOrigins = [
  "https://post-master.onrender.com",
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost/*"
];

const corsOptions = {
  origin: function (origin, callback) {
    console.log('origin:',origin);
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

// Middleware to log the method and path of each request, and the body of POST requests
app.use((req, res, next) => {
  console.log(`current request infos: ${req.method}  ${req.path}`);
  if (req.method !== "GET") {
    console.log(`req.body: ${JSON.stringify(req.body)}`);
  }
  console.log("\n");
  next();
});

app.use(postsMainPath, postsRouter);
app.use(usersMainPath, usersRouter);

app.get("/", (req, res) => res.send(routesInfosHTML(app)));

app.use(invalidPathHandler);
app.use(errorResponder);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port} \n`);
});
