import { Router } from "express";
import * as controller from "./booking.controller.js";

const router = Router();

router.get("/seats", controller.getAllSeats);
router.post("/seats/:seatId", controller.bookSeat);


export default router