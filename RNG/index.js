'use-strict';
const PORT=9000;


const express = require("express")
const app=express();
app.use(express.urlencoded({extended:true}));
app.use(express.json())

const fs = require('fs'); 

app.listen(PORT, () => {
    console.log("Listening on port 9000...")
})

app.get('/', (req, res) => {

    number = Math.floor(Math.random() * 10000)
    fs.writeFileSync("./RN.json", JSON.stringify(number))
    res.json(number)
})
