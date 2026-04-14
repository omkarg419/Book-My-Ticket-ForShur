import ApiError from "../../common/utils/api-error.js";
import pool from "../../common/config/postgres.js";

const getAllSeats = async () => {
	const { rows } = await pool.query(
		"SELECT id, isbooked, name FROM seats ORDER BY id ASC",
	);
	return rows;
};

const bookSeat = async (seatId, name) => {
	let conn;
	try {
		conn = await pool.connect();

		await conn.query("BEGIN");

		const sql = "SELECT * FROM seats where id = $1 and isbooked = 0 FOR UPDATE";
		const result = await conn.query(sql, [seatId]);

		if (result.rowCount === 0) {
			throw ApiError.forbidden("Seat already booked");
		}

		const sqlU = `
  UPDATE seats 
  SET isbooked = 1, name = $2 
  WHERE id = $1 AND isbooked = 0
  RETURNING *;
`;
		const updateResult = await conn.query(sqlU, [seatId, name]);
		await conn.query("COMMIT");

		return updateResult.rows[0];
	} catch (err) {
		await conn.query("ROLLBACK");
		throw ApiError.forbidden("Failed to book the seat. Please try again.", err);
	} finally {
		conn.release();
	}
};

export { getAllSeats, bookSeat };
