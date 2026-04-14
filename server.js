import dotenv from 'dotenv/config';
import app from './src/app.js';
import connectDB from './src/common/config/mongo.js';

const PORT = process.env.PORT || 5000;

const start= async () => {
  // db connection
  await connectDB();

  app.listen(PORT, () => {
		console.log(`Server is running on port ${PORT} in ${process.env.NODE_ENV} mode`);
	});
}

start().catch((err) => {
  console.error('Error starting the server:', err);
  process.exit(1);
});