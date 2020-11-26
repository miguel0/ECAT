import axios from 'axios';


const url = process.env.ORCL_OBS_PUSH;

export function pushToOBS(suffix, file) {
    let imageURL = url + suffix;
    console.log(imageURL)
    return axios.put(imageURL, file);
}