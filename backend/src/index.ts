import * as dotenv from "dotenv";
import app from "./app";
import mongoose from "mongoose";

dotenv.config();

mongoose.connect(process.env.DB_URI!)
.then(() => console.log('Connect to MongoDB'))
.catch(error => console.error(error));

const PORT: number = parseInt(process.env.PORT!) || 3020;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});