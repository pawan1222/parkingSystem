import cookieParser from 'cookie-parser';
import express from 'express';
import userRoutes from "./routes/user.route.js"
import parkingRoutes from "./routes/parkingLot.route.js"

const app = express();


app.use(cookieParser())
app.use(express.json())

app.get('/',async(req,res) => {

    res.send("Black devil");
})

app.use('/api/user',userRoutes);
app.use('/api/lot',parkingRoutes)






export default app;