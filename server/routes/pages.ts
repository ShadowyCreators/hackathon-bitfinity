import path from "path";
import express from "express";

const pagesRoutes = (app: any) => {

    app.get("/", (req: any, res: any) => {
        app.use(express.static(path.join(__dirname, "..", "..", "build")));

        res.sendFile(path.join(__dirname, "..", "..", "build", "index.html"))
    });

    app.get(["/collection/*", "/me"], (req: any, res: any) => {

        res.sendFile(path.join(__dirname, "..", "..", "build", "index.html"))
    });

}

export default pagesRoutes;
