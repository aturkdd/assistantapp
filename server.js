import express from "express";
import helmet from "helmet";
import logger from "morgan";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
import _ from "lodash";
import { router } from "./src/routes/router.js";
import cors from "cors";
import { connectDB } from "./src/config/mongoose.js";

try {
   await connectDB()
  const fileName = fileURLToPath(import.meta.url);
  const __dirname = dirname(fileName);
  //const __dirname = path.resolve(path.dirname(""));
  const app = express();
  app.set("env", process.env.NODE_ENV);
  const origin =
    process.env.NODE_ENV === "development"
      ? [
          "http://localhost:8080",
          "http://localhost:3000",
          "http://localhost:3000",
          "http://localhost:3001",
          process.env.URL,
        ]
      : [process.env.URL];
  console.log(origin);
  app.use(
    cors({
      origin: [...origin],
      credentials:true, 
      optionSuccessStatus:200,
      
    })
  );
  app.use(logger("dev"));

  app.use(helmet());
  app.use(express.json({ limit: "2500mb" }));// as for newer version of express we do not need to use body.parser and use express it self instead 
  app.use(express.urlencoded({ limit: "2500mb", extended: true }));

  app.disable("x-powered-by");
  //___________________________NOT_____________________
  //    This line instructs Express.js
  //     to disable the "x-powered-by" header in the HTTP response.
  //      The "x-powered-by" header is often set by default
  //       in Express to indicate the framework used to
  //       serve the application. However, for security reasons,
  //       some developers prefer to disable or change this header
  //       to avoid revealing unnecessary
  //    information about the technology stack.
  //__________________________________________________________________

  app.use(
    "/",
    (req, res, next) => {
      console.log("------------Request Query--------", req.query);
      console.log("------------Request Body--------", req.body);
      console.log("------------Request Path--------", req.path);
      console.log("------------Request header--------", req?.headers);
      next();
    },
    router
  );

  app.use(express.static(path.join(__dirname, "frontEnd","assistant-app")));
 //  app.use(express.static(`${__dirname}/frontEnd/index.html`));
  console.log(__dirname);
  // app.get("/*", (_req, res) => {
  //   res.sendFile(path.join(__dirname, "frontEnd", "index.html"));
  // });

  app.use(function (err, req, res, next) {
    err.status = err.status || 500;
    if (req.app.get("env") !== "development") {
      return res.status(err.status).json({
        status: err.status,
        message: err.message,
      });
    }
    return res.status(err.status).json({
      status: err.status,
      message: err.message,
      cause: err.cause
        ? {
            status: err.cause.status,
            message: err.cause.message,
            stack: err.cause.stack,
          }
        : null,
      stack: err.stack,
    });
  });

  app.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}`);
    console.log("Press Ctrl-C to terminate...");
  });
} catch (err) {
  console.error(err);
  process.exitCode = 1;
}
