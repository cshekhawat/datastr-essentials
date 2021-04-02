const request = require('request')
const chalk = require('chalk')

const forecast = (location, callback) => {
    console.log(chalk.cyan(`Fetching Weather For: ${chalk.cyan.underline.inverse(location)}`))
    setTimeout(() => {       
        request({ url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=pk.eyJ1IjoicmJzZmlzdiIsImEiOiJja21lcG52Y3AwZ25kMndwajFxZ294NG5sIn0.FEfJNr15KNVHwFL8oQ1L-A`, json: true }, (error, { body }) => {
            if(error){ console.log(chalk.red.inverse(`Unable to connect to weather service`)); exit} 
            else if(body.message) { console.log(chalk.red.inverse(`${body.message}`)) }    
            else if(body.features.length !== 0 && body.features[0].geometry) { 
                const { geometry : { coordinates }, place_name : city  } =  body.features[0]
                callback(coordinates, city)           
           }
            else {console.log(chalk.red.inverse(`MAYDAY!! MAYDAY!! MAYDAY!!`))}
    })     
 }, 2000)
}

module.exports =  { weatherForecast : forecast }