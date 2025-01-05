const mongoose = require("mongoose") ;
const Chat = require("./models/chat.js") ;

main().then(() => {
    console.log("Connection Successful") ;
}).catch((err) => {
    console.log(err) ;
})

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp") ;
}

let allChats = [
    {
        from : "neha",
        to : "priti",
        msg : "hello,what are you doing ? ",
        created_at : new Date() ,
    },
    {
        from : "suraj",
        to : "rohit",
        msg : "hello,where are you ? ",
        created_at : new Date() 
    },
    {
        from : "jayesh",
        to : "ajay",
        msg : "hey, how are you",
        created_at : new Date() 
    },
    {
        from : "akshay",
        to : "rohit",
        msg : "send me your photos",
        created_at : new Date() 
    },
    {
        from : "ajay",
        to : "prachi",
        msg : "I love you ..!!",
        created_at : new Date() 
    }
] ;

Chat.insertMany(allChats) ;
