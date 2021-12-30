import express from "express";
import http from "http";
import pg from "pg"

//app.use(express.static(path.join(path.resolve(), "client/build")));

const PORT = process.env.PORT || 4000

const pool = new pg.Pool({
    connectionString: "postgres://kpximuiawluwwe:e36150fe97beb79755c83bd0795d4e467086114c89e42376427a1b40736a870f@ec2-52-19-170-215.eu-west-1.compute.amazonaws.com:5432/d5jc03fa01c9cv",
    ssl: {
        rejectUnauthorized: false
    }
})

pool.query(
    `SELECT *
    FROM POSTAJA;`
    )
    .then(res => console.log(res.rows))
    .catch(rej => console.log(rej))


const app = express();
const server = http.createServer(app)
server.listen(PORT, () => console.log("Listening...."))