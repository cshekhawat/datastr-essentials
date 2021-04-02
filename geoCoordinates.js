const request = require('request')
const http = require('http')
const chalk = require('chalk')

const geoCoordinates = (coordinates, city) => {
    let [Longitude, Latitude] = coordinates;
        console.log(chalk.greenBright(`Coordinates Latitude: ${chalk.yellowBright.underline.inverse(Latitude)} -- Longitude: ${chalk.yellowBright.underline.inverse(Longitude)}`))
        console.log(chalk.greenBright(`City Info: ${chalk.yellowBright.underline.inverse(city)}`))
        request({ url: `http://api.weatherstack.com/current?access_key=f9038f6e829dd323422266504c2dc875&query=${Latitude},${Longitude}`, json: true }, (error,  { body }) => {         
        if(error){
            console.log(chalk.red.inverse(`ERROR`))
        }
        else if(body.error) { console.log(chalk.red.inverse(`Unable to find location`)) }
        else {const {temperature, feelslike } =  body.current
        console.log(chalk.cyan(`It's currently ${chalk.blue.underline.inverse(temperature)} degrees out. Feels Like ${chalk.red.underline.inverse(feelslike)}`))
      }
    })
}

const geoCoordinatesForHttp = (coordinates, city) => {
    let [Longitude, Latitude] = coordinates;
        console.log(chalk.greenBright(`Coordinates Latitude: ${chalk.yellowBright.underline.inverse(Latitude)} -- Longitude: ${chalk.yellowBright.underline.inverse(Longitude)}`))
        console.log(chalk.greenBright(`City Info: ${chalk.yellowBright.underline.inverse(city)}`))
        const req = http.request({ url: `http://api.weatherstack.com/current?access_key=f9038f6e829dd323422266504c2dc875&query=${Latitude},${Longitude}`, json: true }, (response) => {         
        let data = ''  
        response.on('data', (q) => {
            data = data + q.toString()
        })
        response.on('end', () => {
            const body  = JSON.parse(data)
        })
        response.on('error', () => {
            console.log('Error: ',error)
        })
    })
}


module.exports = { geoCoordinates ,  geoCoordinatesHttp: geoCoordinatesForHttp }