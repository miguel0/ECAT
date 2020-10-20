import axios from './api';

export default class PartApi {
    
    getAllParts() { return axios.get('/users') }
    
}