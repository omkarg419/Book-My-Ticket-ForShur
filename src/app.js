import cookieParser from "cookie-parser";
import express from "express";
import authRoute from "./modules/auth/auth.routes.js";
import bookingRoute from "./modules/booking/booking.routes.js";
import ApiError from "./common/utils/api-error.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/booking", bookingRoute);
// Catch-all for undefined routes
app.use((req, res) => {
	throw ApiError.badRequest(`Route ${req.originalUrl} not found`);
});
export default app;
