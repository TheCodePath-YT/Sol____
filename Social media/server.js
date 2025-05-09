import app from "./index.js";
import { connectToDB } from "./src/config/connectToDB.js";

app.listen(3000,async()=>{
    connectToDB();
    console.log("App is connected")
})