// TODO: Configure the environment variables
var path = require("path");
const fetch = require("node-fetch");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const express = require("express");
require('regenerator-runtime')


const PORT = 8081;
dotenv.config();
const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static("dist"))


app.get('/', function (req, res) {

    res.sendFile(path.resolve('dist/index.html'))
})


app.post('/apiurl', async (req, res) => {

    let url = req.body.userUrl
    console.log('server ' + url);
    const StandardURL = 'https://api.meaningcloud.com/sentiment-2.1'
    const key = process.env.API_KEY;
    
    let apiUrl = `${StandardURL}?key=${key}&url=${url}&lang=en`
    

    fetch(apiUrl).then((response) => {
        return response.json();
    })
        .then((data) => {
            
            
        return res.send(data);
        })
        .catch(error => {
            console.log(error);
        })

})







// designates what port the app will listen to for incoming requests
app.listen(PORT, (error) => {
    if (error) throw new Error(error)
    console.log(`Server listening on port ${PORT}!`)
})


