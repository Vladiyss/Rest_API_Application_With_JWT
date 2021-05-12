import {endPoints} from "../constant/endPoints";

export const signin = (user) => {
    return fetch(endPoints.login, {
        method: 'POST',
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:8098/login'
        },
        body: JSON.stringify(user)
    }).then(res => res.json())
    .catch(err => console.log(err));
  }
  
  export const signup = (user) => {
    return fetch(endPoints.registration, {
        method: 'POST',
        headers: {
        Accept: 'Application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }).then(res => res.json())
    .catch(err => console.log(err));
  }
  
  //export const signout = () => {
  //  return fetch('/signout', {
  //    method: 'PUT',
  //  })
  //}