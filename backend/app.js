import cookieParser from 'cookie-parser';
import express from 'express';
import userRoutes from "./routes/user.route.js"
import parkingRoutes from "./routes/parkingLot.route.js"
import slotRoutes from "./routes/slot.route.js"
import bookingRoutes from "./routes/booking.route.js"
import cors from "cors"
import path from "path";

const app = express();

const __dirname = path.resolve();


app.use(cookieParser())
app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173",
    credentials:true
}));

app.get('/',async(req,res) => {

    res.send("Black devil");
})

app.use('/api/user',userRoutes);
app.use('/api/lot',parkingRoutes)
app.use('/api/slots',slotRoutes)
app.use('/api/bookSlot',bookingRoutes)

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

export default app;