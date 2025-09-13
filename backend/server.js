import dotenv from 'dotenv';
import connectDB  from './db/index.js';
import app from './app.js';

dotenv.config()

const port=process.env.PORT || 4000;

connectDB()
.then(() => {
    app.listen(port, () => {
        console.log(`Server listening on Port ${port}`);
    })
})
.catch((error) => {
    console.log(`Error in running server ${error}`);
})
