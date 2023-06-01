const express = require("express");
const cors = require('cors');
const userRoute = require("./routes/user");
const schema = require("./graphqlSchema/schema");
const mongoose = require("mongoose");
const { graphqlHTTP } = require('express-graphql');

require('dotenv/config');

const app = express();

app.use("/graphql",graphqlHTTP({ schema, graphiql:true }))

app.use(cors());
app.use(express.json());

app.use("/user",userRoute);

// 1. Create a NodeJS server that listens on port 3000 and responds to the route "/hello" with the message "Hello World!".
app.get("/hello",(req,res)=>{
    res.send("Hello World!");
})

// 2. Create a function in NodeJS that takes in an array of integers and returns the sum of all even numbers in the array.
// const sumOfEvenNumber = (intArray)=>{
//     const total = intArray.reduce((total, num)=>{
//         if(num%2===0){
//             return total+=num;
//         }
//         return total;
//     },0);
//     console.log(total);
//     return total;
// }

// sumOfEvenNumber([1,2,3,4,5,6]);

// 3. Create a function in NodeJS which runs automatically every 5 seconds and puts a message (“”QUERY RUNNING) in console.
// const automaticRunningQuery = ()=>{
//     setInterval(()=>console.log("QUERY RUNNING"),5000)
// }

// automaticRunningQuery();

if(process.env.NODE_ENV==='production'){
    app.use(express.static('client/build'));

    app.use('*',(req,res)=>{
        res.sendFile(path.join(__dirname,'client','build','index.html'));
    })
}

mongoose.connect(process.env.DB_URL,{useNewUrlParser: true,useUnifiedTopology:true })
.then(()=>{app.listen(process.env.PORT || 8000,()=>console.log("Server has started"))})
.catch(err=>console.log(err))