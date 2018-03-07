import Axios from './services/Api'
import xmlToJson from './services/xmlToJson'
import createCards from './services/createCards'

const d = new Date()
let today = d.toLocaleDateString() // get today's date as local string
let url = `/Schedule/?area=1038&dt=${today}` // append date to the url
const showcase = document.getElementById('showcase')


Axios.get(url)
.then((data) => {
  let xmlStr
  let parser
  let xmlData
  let jsonData
    xmlStr = data.data // get string response
    parser = new DOMParser() // instantiate domparser for parsing string to xml
    xmlData = parser.parseFromString(xmlStr, "text/xml") // parse string
    jsonData = xmlToJson(xmlData) // convert parsed xml to JSON data
    let shows = jsonData.schedule.shows.show // Get the shows array
    shows.forEach((show) => {
    let newcard = createCards(show.images.eventmediumimageportrait, show.originaltitle)
    showcase.appendChild(newcard)
   })
})
console.log(jsonData)
console.log(123)
