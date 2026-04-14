import ApiResponse from "../../common/utils/api-response.js";
import * as bookingService from "./booking.service.js";
import ApiError from "../../common/utils/api-error.js";
import { sendTicketConfirmationEmail } from "../../common/config/email.js";

const getAllSeats = async (req, res) => {
	try {
		const seats = await bookingService.getAllSeats();
		return ApiResponse.ok(res, "Seats fetched successfully", seats);
	} catch (error) {
		console.error("Error fetching seats:", error);
		return ApiError.badRequest(res, "Failed to fetch seats");
	}
};

const bookSeat = async (req, res) => {
	try {
		const seatId = parseInt(req.params.seatId);
		const { name, email } = req.body;

		const bookedSeat = await bookingService.bookSeat(seatId, name);

		if (bookedSeat) {
			sendTicketConfirmationEmail(email, {
				...bookedSeat,
				seatId: bookedSeat.id,
				booked_at: new Date(),
			});

			return ApiResponse.ok(res, "Seat booked successfully", bookedSeat);
		}

		return ApiError.badRequest(res, "Failed to book the seat");
	} catch (error) {
		console.error("Error booking seat:", error);
		return ApiError.badRequest(res, error.message);
	}
};

export { getAllSeats, bookSeat };
