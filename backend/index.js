import express from "express";
import http from "http";
import pg from "pg";
import bcrypt from "bcrypt";
import cors from "cors";
import jwt from "jsonwebtoken";
import path from "path";
import bodyParser from "body-parser";
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const __dirname = path.resolve();

//app.use(express.static(path.join(path.resolve(), "client/build")));

const PORT = process.env.PORT || 4000;

const pool = new pg.Pool({
  connectionString:
    "postgres://kpximuiawluwwe:e36150fe97beb79755c83bd0795d4e467086114c89e42376427a1b40736a870f@ec2-52-19-170-215.eu-west-1.compute.amazonaws.com:5432/d5jc03fa01c9cv",
  ssl: {
    rejectUnauthorized: false,
  },
});

// const pool = new pg.Pool({
//   connectionString:
//     "postgres://xwswrmmwrnwqdq:a65a366140abf6b1bf6bf2a9c1eace9b331cfaf193c425102d7cdbdce15cfc8c@ec2-54-76-249-45.eu-west-1.compute.amazonaws.com:5432/d1o5ga7nmgsr20",
//   ssl: {
//     rejectUnauthorized: false,
//   },
// });
// console.log(path.join(__dirname, "../frontend/build"));

// console.log(path.join(__dirname, "../frontend/build"));

// AVTENTIKACIJA
const TOKEN_SECRET = "secret";
const generateToken = (user) => {
  return jwt.sign(user, TOKEN_SECRET, { expiresIn: "24h" });
};

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    return res.sendStatus(401);
  }
  jwt.verify(token, TOKEN_SECRET, async (err, user) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        //create a new token and send the same way you created initially
        // console.error("EXPIRED TOKEN");
      }
      // console.error("Forbidden access");
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
};
const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  } catch (err) {
    console.error(err);
    return false;
  }
};

const getUser = async (username) => {
  try {
    const { rows } = await pool.query(
      "select * from uporabnik where uporabnisko_ime = $1",
      [username]
    );
    if (rows.length > 0) {
      return rows[0];
    }
    return false;
  } catch (err) {
    console.error(err);
    return false;
  }
};

app.get("/api", async (req, res) => {
  res.sendStatus(200);
});

// REGISTRACIJA
app.post("/api/register", async (req, res) => {
  try {
    const { email, telefonska_stevilka, uporabnisko_ime, geslo } = req.body;
    const hashedPass = await hashPassword(geslo);
    await pool.query(
      "insert into uporabnik(email,telefonska_stevilka,uporabnisko_ime,geslo) values($1,$2,$3,$4)",
      [email, telefonska_stevilka, uporabnisko_ime, hashedPass]
    );
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// PRIJAVA
app.post("/api/login", async (req, res) => {
  try {
    const { uporabnisko_ime, geslo } = req.body;
    const currentUser = await getUser(uporabnisko_ime);
    if (!currentUser) {
      return res.sendStatus(403);
    }
    const validPassword = await bcrypt.compare(geslo, currentUser.geslo);
    if (validPassword) {
      const token = generateToken(currentUser);
      return res.status(200).json({ token });
    }
    res.sendStatus(403);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// DOBI VSE SKIROJE
app.get("/api/skiroji", authenticateToken, async (req, res) => {
  try {
    const { rows } = await pool.query(
      "select * from skiro where v_najemu is not true"
    );
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});
// DOBI SKIRO Z ID
app.get("/api/skiro/:id", authenticateToken, async (req, res) => {
  try {
    const { rows } = await pool.query(
      "select * from skiro where id_skiro = $1",
      [req.params.id]
    );
    res.status(200).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});
// SKIROJI OD TRENUTNO PRIJAVLJENEGA UPORABNIKA
app.get("/api/skirojiUporabnik", authenticateToken, async (req, res) => {
  try {
    const { rows } = await pool.query(
      "select * from skiro inner join postaja on skiro.id_postaja = postaja.id_postaja where id_lastnik = $1",
      [req.user.id_uporabnik]
    );
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// DODAJ SKIRO
app.post("/api/skiro", authenticateToken, async (req, res) => {
  try {
    const { id_postaja, slika_url, naziv, opis, cena, baterija } = req.body;
    let uporabnik = req.user.id_uporabnik;
    const { rows } = await pool.query(
      "insert into skiro(id_lastnik,id_postaja,slika_url,naziv,opis,cena,baterija) values ($1,$2,$3,$4,$5,$6,$7)",
      [uporabnik, id_postaja, slika_url, naziv, opis, cena, baterija]
    );
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// VSI NAJEMI
app.get("/api/najemi", authenticateToken, async (req, res) => {
  try {
    const { rows } = await pool.query("select * from najem");
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});
// VSI NAJEMI TRENUTNO PRIJAVLJENEGA UPORABNIKA
app.get("/api/najemiUporabnik", authenticateToken, async (req, res) => {
  try {
    const { rows } = await pool.query(
      "select * from skiro inner join najem on skiro.id_skiro = najem.id_skiro inner join postaja on najem.id_postaja = postaja.id_postaja where id_uporabnik = $1 order by konec_najema desc",
      [req.user.id_uporabnik]
    );
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});
// DOBI NAJEM Z ID
app.get("/api/najem/:id", authenticateToken, async (req, res) => {
  try {
    const { rows } = await pool.query(
      "select * from najem where id_najem = $1",
      [req.params.id]
    );
    res.status(200).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// USTVARI NAJEM
app.post("/api/najem", authenticateToken, async (req, res) => {
  try {
    const { id_skiro, id_postaja } = req.body;
    await pool.query(
      "insert into najem(id_skiro,id_uporabnik,id_postaja) values($1,$2,$3)",
      [id_skiro, req.user.id_uporabnik, id_postaja]
    );
    await pool.query("update skiro set v_najemu = $1 where id_skiro = $2", [
      true,
      id_skiro,
    ]);
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// ZAKLUCI NAJEM PREKO ID
app.post("/api/zakljuciSkiro", authenticateToken, async (req, res) => {
  try {
    const { id_skiro, id_najem } = req.body;
    await pool.query(
      "update najem set konec_najema = NOW() where id_najem = $1",
      [id_najem]
    );
    await pool.query("update skiro set v_najemu = $1 where id_skiro = $2", [
      false,
      id_skiro,
    ]);
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// VSE POSTAJE
app.get("/api/postaje", authenticateToken, async (req, res) => {
  try {
    const { rows } = await pool.query("select * from postaja");
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// POSTAJA Z ID
app.get("/api/postaja/:id", authenticateToken, async (req, res) => {
  try {
    const { rows } = await pool.query(
      "select * from postaja where id_postaja = $1",
      [req.params.id]
    );
    res.status(200).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// VSI UPORABNIKI
app.get("/api/uporabniki", authenticateToken, async (req, res) => {
  try {
    const { rows } = await pool.query("select * from uporabnik");
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// UPORABNIK Z ID
app.get("/api/uporabnik/:id", authenticateToken, async (req, res) => {
  try {
    const { rows } = await pool.query(
      "select * from uporabnik where id_uporabnik = $1",
      [req.params.id]
    );
    res.status(200).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// UPORABNIK Z TOKEN
app.get("/api/uporabnikToken", authenticateToken, async (req, res) => {
  try {
    res.status(200).json({ username: req.user.uporabnisko_ime });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// DOBI KOORDINATE SKIROJEV
app.get("/koordinate", async (req, res) => {
  try {
    const { rows } = await pool.query(`select * from postaja`);
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  // app.get("*", (req, res) => {
  //   res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
  // });

  // /api/* Misses
  app.get(/^((?!\/api\/).)*$/, function (req, res, next) {
    res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
  });
}

app.listen(PORT, () =>
  console.log(`Server listening on http://localhost:${PORT}/`)
);
