import axios from 'axios';


const url = 'https://objectstorage.us-ashburn-1.oraclecloud.com/p/HYwdJ1-JQU97c-AtCtaYFfB0UQu0airap1tabV12_ia2XyhEoEfAptIYVQW9GtP6/n/idh6hnyu8tqh/b/ECAT-OSB/o/';

export function pushToOBS(suffix, file) {
    let imageURL = url + suffix;
    return axios.put(imageURL, file);
}