const express = require('express')
const path = require('path')
const hbs = require('hbs')

const geocode = require('../mod/geocode.js')
const forecast = require('../mod/forecast.js')

const publicDir = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

const app = express()

app.use(express.static(publicDir))

app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath)

app.get('', (req, res) => {
    res.render('weather', {
        title: 'Weather',
        author: 'Andrew Mead'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        author: 'Andrew Mead'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        author: 'Take help from Andrew Mead'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.search) {
        res.send('a place name is required')
    } 
    //res.render('weather')
    const adt = {
        location: {
            latitude: '0',
            longitude: '0'
        },
        forecast: {
            message: ''
        }
    }
    //res.send(adt)
    geocode(req.query.search, (error, data) => {
        if(error != 'success') {
            res.send({error: 'There is a neteork error'})
        } else {
            adt.location.latitude = data.latitude
            adt.location.longitude = data.longitude
            forecast(data.latitude, data.longitude, (error, prediction) => {
                if(error == 'Success') {
                    const strn = 'Temperature in Celcius is ' + prediction.current.temperature + ' and there is a ' + prediction.current.precip +
                    ' % chance of rain.' 
                    adt.forecast.message = strn
                    res.send(adt)
                } else {
                    res.send({error: 'internal error'})
                }
            })
        }
    })
})

app.listen(3000, () => {
    console.log('Server listens on port 3000')
})