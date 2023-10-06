const express = require('express')
const app = express()
const path = require('path')
const fetch = require('node-fetch')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

const key = 'b67e81d202909a8fd55f66677a112aba'
let city = 'Tartu'

app.get('/', function (req, res) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`)
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        let description = data.weather[0].description
        let city = data.name 
        let temp = Math.round(parseFloat(data.main.temp)-273.15)
        res.render('index', {
            description: description,
            city: city,
            temp: temp
        })
    })
})

app.listen(3000)
