import express from "express"
import moviesRouter from "./routers/movies.js"

const app = express();
const port= process.env.SERVER_PORT;

app.use("/api/movies", moviesRouter);

app.listen(() => {
    console.log(`Server listen on ${port}`);
});
