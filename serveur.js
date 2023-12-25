
const mongoose = require("mongoose")
const dbUri = "mongodb://127.0.0.1:27017/Contact"


const contactRoutes = require("./routes/contactRoutes.js")

const express= require("express");

// express app
const app = express();

// pour le script ,css et image
app.use("/css",express.static('css'));
app.use("/js", express.static('js'))
app.use(express.json())

// url
app.use(express.urlencoded({extended:true}))

//connection a la bd
mongoose.connect(dbUri,{useNewUrlParser : true,useUnifiedTopology:true})
.then((result)=>{
    app.listen(3001)
    console.log("connected to db")
}).catch(err =>{
    console.log("error")
})






//utilise les route
app.use(contactRoutes)




// en cas de erreur
/*
app.use((req,res)=>{
    const indexPath = path.join(__dirname,"../html/404Error.html")
    console.log(indexPath)
    res.status(404).sendFile(indexPath)
})
*/
//listen serveur

