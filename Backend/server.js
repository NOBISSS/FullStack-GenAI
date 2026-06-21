require("dotenv").config();
const PORT=process.env.PORT || 3000;
const app=require("./src/app");
const connectToDB=require("./src/config/database");

//connecting to DB
connectToDB();


app.listen(PORT,()=>{
    console.log(`Server is running on PORT ${PORT}`)
})