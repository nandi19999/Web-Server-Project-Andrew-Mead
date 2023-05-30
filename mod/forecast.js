const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=0bdda20c875fd967c72c7898a8070b65&query=' + latitude + ',' + longitude
    request({url: url, json: true}, (error, response) => {
        if(error) {
            callback('Error Occured', undefined)
        } else if(response.body.error) {
            callback('Bad Request', undefined)
        }
        callback('Success', response.body)
    })
}

module.exports = forecast