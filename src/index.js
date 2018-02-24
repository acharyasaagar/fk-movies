import Axios from './services/Api'
import xmlToJson from './services/xmlToJson'


const d = new Date()
let today = d.toLocaleDateString() // get today's date as local string
let url = `/Schedule/?area=1038&dt=${today}` // append date to the url

Axios.get(url)
.then((data) => {
   let xmlStr = data.data // get string response
   let parser = new DOMParser() // instantiate domparser for parsing string to xml
   let xmlData = parser.parseFromString(xmlStr, "text/xml") // parse string
   let jsonData = xmlToJson(xmlData) // convert parsed xml to JSON data
   let shows = jsonData.schedule.shows.show // Get the shows array
   shows.forEach((show) => {
    //    console.log(show)
   })
})