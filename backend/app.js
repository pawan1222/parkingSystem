import cookieParser from 'cookie-parser';
import express from 'express';
import userRoutes from "./routes/user.route.js"
import parkingRoutes from "./routes/parkingLot.route.js"
import slotRoutes from "./routes/slot.route.js"
import bookingRoutes from "./routes/booking.route.js"
import cors from "cors"

const app = express();

app.use(cookieParser())
app.use(express.json())
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    // origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true
}));

app.get('/',async(req,res) => {

    res.send("Black devil");
})

app.use('/api/user',userRoutes);
app.use('/api/lot',parkingRoutes)
app.use('/api/slots',slotRoutes)
app.use('/api/bookSlot',bookingRoutes)



export default app;