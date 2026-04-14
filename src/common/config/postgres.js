import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
	host: process.env.PG_HOST || "localhost",
	port: Number(process.env.PG_PORT) || 5432,
	user: process.env.PG_USER ,
	password: process.env.PG_PASSWORD ,
	database: process.env.PG_DATABASE ,
});

pool.on("connect", () => {
	console.log("PostgreSQL connected");
});

pool.on("error", (err) => {
	console.error("Unexpected PostgreSQL error", err);
	process.exit(1);
});

export default pool;
