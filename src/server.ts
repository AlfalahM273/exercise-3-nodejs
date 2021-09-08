import * as dotenv from "dotenv";
dotenv.config();
import app from './index';
const port = process.env.PORT || 8080; // default port to listen

// // start the Express server
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
