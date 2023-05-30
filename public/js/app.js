console.log('file connected to app')


const weatherInfo = document.querySelector('form')
const search = document.querySelector('input')

const message1 = document.querySelector('#message1')
const message2 = document.querySelector('#message2')

weatherInfo.addEventListener('submit', (e) => {
    e.preventDefault()
    console.log(search.value)
    const url = '/weather?search=' + search.value
    fetch(url).then((response) => {
        response.json().then((data) => {
            console.log('Latitude is ' + data.location.latitude + ' longitude is ' + data.location.longitude)
            console.log(data.forecast.message)
            message1.textContent = 'Latitude is ' + data.location.latitude + ' longitude is ' + data.location.longitude
            message2.textContent = data.forecast.message
        })
    })
})