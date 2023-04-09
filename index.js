const express = require("express")
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt');
const cors = require("cors")

const {connection} = require("./config/db")
const {VenderModel} = require("./models/Vender.model")
const {productRouter} = require("./routes/product.route");
const { authenticate } = require("./middlewares/authentication");
const app = express();

require("dotenv").config()


app.use(express.json())
app.use(cors({
    origin : "*"
}))

app.get("/", (req, res) => {
    res.send("Welcome")
})

app.post("/signup", async (req, res) => {
    console.log(req.body)
    const {email, password, name, city} = req.body;
    const userPresent = await VenderModel.findOne({email})
    if(userPresent?.email){
        res.send("Try loggin in, already exist")
    }
    else{
        try{
            bcrypt.hash(password, 4, async function(err, hash) {
                const user = new VenderModel({email,password:hash, name,city})
                await user.save()
                res.send("Sign up successfull")
            });
           
        }
       catch(err){
            console.log(err)
            res.send("Something went wrong, pls try again later")
       }
    }
    
})

app.post("/login", async (req, res) => {
    const {email, password} = req.body;
    try{
        const user = await VenderModel.find({email})
         
      if(user.length > 0){
        const hashed_password = user[0].password;
        bcrypt.compare(password, hashed_password, function(err, result) {
            if(result){
                const token = jwt.sign({"userID":user[0]._id}, 'hush');
                res.send({"msg":"Login successfull","token" : token})
            }
            else{
                res.send("Login failed")
            }
      })} 
      else{
        res.send("Login failed")
      }
    }
    catch{
        res.send("Something went wrong, please try again later")
    }
})

app.use(authenticate)
app.use("/products", productRouter)

app.listen(process.env.port, async () => {
    try{
        await connection;
        console.log("Connected to DB Successfully")
    }
    catch(err){
        console.log("Error connecting to DB")
        console.log(err)
    }
    console.log(`Listening on PORT ${process.env.port}`)
})

