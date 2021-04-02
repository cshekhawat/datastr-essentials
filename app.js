const yargs = require('yargs')
const { weatherForecast } = require('./forecast')
const { geoCoordinates } = require('./geoCoordinates')
const chalk = require('chalk')

// Create fetch command
yargs.command({
    command: 'fetch',
    describe: 'Fetch Weather',
    builder: {
        location: {
            describe: 'Enter Location',
            demandOption: true,
            type: 'string'
        }        
    },
    handler(argv) {
        weatherForecast(argv.location, (coordinates, city) => geoCoordinates(coordinates, city))
    }
})

/* MERGE SORT*/
yargs.command({
    command: 'sort',
    describe: 'Merge Sorting',
    builder: {
        inputdata: {
            describe: 'Feed Array',
            demandOption: true,
            type: 'array'
        }        
    },
    handler(argv) {
        console.log(argv.inputdata)
        const sortedData= sortWithMerge(argv.inputdata);
        console.log(chalk.greenBright(`PRINT MERGE SORT --------- ${chalk.inverse.red(sortedData)}`))
    }
})

const merge = (larr, rarr) => {
    let tempArray = []    
    while (larr.length && rarr.length) {        
        if (larr[0] < rarr[0]) {  /* Take smaller among the smallest element of left and right */
            tempArray.push(larr.shift())  
        } else {
            tempArray.push(rarr.shift()) 
        }
    }  
    return [ ...tempArray, ...larr, ...rarr ] /* Concatenating the leftover elements */
}

const sortWithMerge = (data) => {
    const half = data.length / 2     
    if(data.length < 2){
      return data 
    }    
    const left = data.splice(0, half) /* Spit Array into half */
    return merge(sortWithMerge(left),sortWithMerge(data))   /* run recursive merge sort on splitted array */
  }


yargs.parse()