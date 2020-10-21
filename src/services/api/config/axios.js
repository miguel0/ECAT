import axios from 'axios';
import { apiOrigin } from '../../../variables';

export default axios.create({
    baseURL: apiOrigin,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});