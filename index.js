const express = require("express") ;
const app = express() ;
const port = 8080 ;
const path = require("path") ;
const mongoose = require("mongoose") ;
const Chat = require("./models/chat.js") ;
var methodOverride = require('method-override') ;


main().then(() => {
    console.log("Connection Successful") ;
}).catch((err) => {
    console.log(err) ;
})

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/fakewhatsapp") ;
}

app.set("view engine", "ejs") ;
app.set("views", path.join(__dirname,"views")) ;
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true})) ;
app.use(methodOverride('_method')) ;

// let chat1 = new Chat({
//     from : "neha",
//     to : "priya",
//     msg : "send me your dbms notes",
//     created_at : new Date() 
// }) ;
// chat1.save().then((res) => {
//     console.log(res) ;
// }).catch((err) => {
//     console.log(err) ;
// }) ;

// show all chats
app.get("/chats",async (req,res) => {
    let chats = await Chat.find() ;    // asynchonouse function
    res.render("index.ejs",{chats}) ;
});

// new route
app.get("/chats/new" , (req,res) => {
    res.render("newChat.ejs") ;
}) ;

//create route
app.post("/chats" , (req,res) => {
    let {from,to,msg} = req.body ;
    let chat1 = new Chat({
        from : from,
        msg : msg,
        to : to,
        created_at : new Date() 
    }) ;
    console.log(chat1) ;
    chat1.save().then(() => {console.log("chat was sent")}).catch((err) => {console.log(err)}) ;
    res.redirect("/chats") ;
})

//edit route
app.get("/chats/:id/edit", async(req,res) => {
    let {id} = req.params ;
    let chat = await Chat.findById(id) ;
    res.render("edit.ejs", {chat}) ;
}) ;

//update route
app.put("/chats/:id", async(req,res)=> {
    let {id} = req.params ;
    let {msg: newMsg} = req.body ;
    let updateChat = await Chat.findByIdAndUpdate(id,{msg : newMsg},{runValidators:true , new:true}) ;
    console.log(updateChat.msg) ;
    res.redirect("/chats") ;
})

// delete route
app.delete("/chats/:id",async(req,res) => {
    let {id} = req.params ;
    let deletedChat = await Chat.findByIdAndDelete(id) ;
    res.redirect("/chats") ;
})

app.get("/", (req,res) => {
    res.send("Go To The /chats to view all chats") ;
})

app.listen(port, (req,res) => {
    console.log("Listening on 8080 port") ;
})