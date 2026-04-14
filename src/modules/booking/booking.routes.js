import { Router } from "express";
import * as controller from "./booking.controller.js";
import { authenticate } from "../auth/auth.middleware.js";

const router = Router();

router.get("/seats", controller.getAllSeats);
router.put("/seats/book/:seatId", authenticate, controller.bookSeat);

export default router;
