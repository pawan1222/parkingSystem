import dotenv from 'dotenv';
import connectDB  from './db/index.js';
import app from './app.js';
import path from "path";

dotenv.config()



connectDB()
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server listening on Port ${process.env.PORT}`);
    })
})
.catch((error) => {
    console.log(`Error in running server ${error}`);
})


