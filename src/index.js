import Axios from './services/Api'

Axios.get('/TheatreAreas')
.then(data => console.log(data.data))
