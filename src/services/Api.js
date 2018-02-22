import axios from 'axios'

const Axios = axios.create({
    baseURL: "https://www.finnkino.fi/xml"
})

export default Axios
