import Axios from "axios";
import {endPoints} from "../constant/endPoints";

const method = {
    GET: 'get',
    PUT: 'put',
    POST: 'post',
    DELETE: 'delete'
};

const sendRequest = (method, url, data) => {
    const authorization = localStorage.getItem('Jwt token');
    const headers = {authorization};
    return Axios.request({method, url, data, headers});
    
    //return Axios.request({method, url, data});
};

const sendPostRequest = (method, url, data) => {
    const authorization = localStorage.getItem('Jwt token');
    const headers = {authorization, 'Content-Type': 'multipart/form-data'};
    return Axios.request({method, url, data, headers});
};

export const RestRequest = {
    get: (endpoint, parameters, data) => sendRequest(method.GET, endpoint, data),
    put: (endpoint, parameters, data) => sendRequest(method.PUT, endpoint, data),
    //post: (endpoint, parameters, data) => {
    //    if (endpoint === endPoints.postFact) {
    //        sendPostRequest(method.POST, endpoint, data)
    //    }
    //    else {
    //        sendRequest(method.POST, endpoint, data)
    //    }
    //},
    post: (endpoint, parameters, data) => sendRequest(method.POST, endpoint, data),
    delete: (endpoint, parameters, data) => sendRequest(method.DELETE, endpoint, data)
};
