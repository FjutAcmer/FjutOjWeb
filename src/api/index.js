import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3000';

export let getUser = () =>{
    return axios.get('/login');
};