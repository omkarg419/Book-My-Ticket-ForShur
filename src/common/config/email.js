import nodemailer from "nodemailer";

// SMTP transporter — works with Mailtrap, Gmail, SendGrid, or any SMTP provider
const transporter = nodemailer.createTransport({
	host: process.env.SMTP_HOST,
	port: Number(process.env.SMTP_PORT) || 587,
	auth: {
		user: process.env.SMTP_USER,
		pass: process.env.SMTP_PASS,
	},
});

const sendEmail = async (to, subject, html) => {
	await transporter.sendMail({
		from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM_EMAIL}>`,
		to,
		subject,
		html,
	});
};

const sendVerificationEmail = async (email, token) => {
	const url = `${process.env.CLIENT_URL}/api/auth/verify-email/${token}`;
	await sendEmail(
		email,
		"Verify your email",
		`<h2>Welcome!</h2><p>Click <a href="${url}">here</a> to verify your email.</p>`,
	);
};

const sendResetPasswordEmail = async (email, token) => {
	const url = `${process.env.CLIENT_URL}/api/auth/reset-password/${token}`;
	await sendEmail(
		email,
		"Reset your password",
		`<h2>Password Reset</h2><p>Click <a href="${url}">here</a> to reset your password. This link expires in 15 minutes.</p>`,
	);
};

const sendTicketConfirmationEmail = async (email, booking) => {
	await sendEmail(
		email,
		`Ticket Confirmed — Seat #${booking.seatId}`,
		`<h2>🎬 Booking Confirmed!</h2>
     <p><strong>Movie:</strong> Dhurandhar The Revenge</p>
     <p><strong>Seat Number:</strong> #${booking.seatId}</p>
     <p><strong>Booked By:</strong> ${booking.name}</p>
     <p><strong>Booking ID:</strong> ${booking.id}</p>
     <p><strong>Date & Time:</strong> ${new Date(booking.booked_at).toLocaleString()}</p>
     <br/>
     <p style="color: gray; font-size: 12px;">Please arrive 15 minutes before the show. Enjoy the movie!</p>`,
	);
};

export {
	sendVerificationEmail,
	sendResetPasswordEmail,
	sendTicketConfirmationEmail,
};
