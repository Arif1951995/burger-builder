import axios from 'axios'

const instance = axios.create({
    baseURL: "https://burger-builder-be307.firebaseio.com/"
})

export default instance