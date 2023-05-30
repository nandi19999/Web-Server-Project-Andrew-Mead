const request = require('request')
const geocode = (address, callback) => {
    const url = 'http://api.positionstack.com/v1/forward?access_key=fdd0c71cbbf6be1ce39b73dd8374641b&query=' + address
    request({url: url, json: true}, (error, response) => {
        const loc = {
            latitude: 0,
            longitude: 0
        }
        if(error) {
            console.log('Network error occured')
        } else if(response.body.error) {
            console.log('wrong format passed')
        } else if(response.body.data.length === 0) {
            console.log('Place not found')
        } else {
            loc.latitude = response.body.data[0].latitude
            loc.longitude = response.body.data[0].longitude
            /* console.log('Latitude is ' +response.body.data[0].latitude)
            console.log('Longitude is ' +response.body.data[0].longitude) */
            callback('success', loc)
        }
    })
}

module.exports = geocode